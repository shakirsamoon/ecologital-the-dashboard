const asyncHandler = require('express-async-handler');

const User = require('../models/user.model');

const userService = require('../services/user.service');

const addNewUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Create user
  const user = await userService.createUser(res)({ name, email, password });

  if (user) {
    res.status(200).json({ message: 'User created', userId: user._id });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const changeUserStatus = asyncHandler(async (req, res) => {
  const { id, status } = req.params;

  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    throw new Error('User not exists');
  }

  const newStatus =
    status === 'true' ? true : status === 'false' ? false : null;

  if (newStatus === null) {
    res.status(400);
    throw new Error('Invalid data');
  }

  user.status = newStatus;
  await user.save();

  res.status(200).json({ message: 'User status updated', userId: user._id });
});

const updateUserPassword = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!password) {
    res.status(400);
    throw new Error('Invalid data');
  }

  const user = await userService.changeUserPassword(res)({ id, password });

  res.status(200).json({ message: 'User password updated', userId: user._id });
});

const updateUserData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, headline, gender } = req.body;

  if (!name || !headline || !gender) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const user = await userService.changeUserData(res)({
    id,
    data: { name, headline, gender },
  });

  res.status(200).json({ message: 'User data updated', userId: user._id });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } })
    .select('-password')
    .lean();

  res.status(200).json({ users });
});

const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    throw new Error('User not exists');
  }

  res.status(200).json({ user });
});

module.exports = {
  addNewUser,
  changeUserStatus,
  getAllUsers,
  updateUserData,
  updateUserPassword,
  getSingleUser,
};
