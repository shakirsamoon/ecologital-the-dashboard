const asyncHandler = require('express-async-handler');

const { compareHashedPasswords } = require('../util/common.util');
const { generateJwtToken } = require('../util/jwt.util');

const User = require('../models/user.model');

const userService = require('../services/user.service');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Create user
  const user = await userService.createUser(res)({ name, email, password });

  const { password: _, ...userData } = user.toObject();

  if (user) {
    res.status(201).json({
      token: generateJwtToken({ id: user._id }),
      user: userData,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check for User
  const user = await User.findOne({ email });

  if (user && (await compareHashedPasswords(password, user.password))) {
    const { password: _, ...userData } = user.toObject();

    res.status(200).json({
      token: generateJwtToken({ id: user._id }),
      user: userData,
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

const setupUser = asyncHandler(async (req, res) => {
  const { username, gender, headline } = req.body;

  if (!username || !gender || !headline) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (req.user.regStatus) {
    res.status(400);
    throw new Error('User account already setup');
  }

  // Check if username exits
  const usernameExists = await User.findOne({ username });

  if (usernameExists) {
    res.status(400);
    throw new Error('Username exists');
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { username, gender, headline, regStatus: true } },
    { new: true }
  );

  const { password: _, ...userData } = updatedUser.toObject();

  res.status(200).json({ message: 'User setup done', user: userData });
});

const updateUserPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;

  if (!password) {
    res.status(400);
    throw new Error('Invalid data');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  const updatedUser = await userService.changeUserPassword(res)({
    id: req.user._id,
    password,
  });

  const { password: _, ...userData } = updatedUser.toObject();

  // const userData = {
  //   name: updatedUser.name,
  //   email: updatedUser.email,
  //   gender: updatedUser.gender,
  //   regStatus: updatedUser.regStatus,
  //   headline: updatedUser.headline,
  // };

  res.status(200).json({ message: 'User Password updated', user: userData });
});

const updateUserData = asyncHandler(async (req, res) => {
  const { name, headline, gender } = req.body;

  if (!name || !headline || !gender) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  const updatedUser = await userService.changeUserData(res)({
    id: req.user._id,
    data: { name, headline, gender },
  });

  const { password: _, ...userData } = updatedUser.toObject();

  res.status(200).json({ message: 'User data updated', user: userData });
});

const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUserData,
  setupUser,
  updateUserPassword,
};
