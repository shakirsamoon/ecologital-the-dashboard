const User = require('../models/user.model');

const { hashPassword } = require('../util/common.util');

const createUser =
  (res) =>
  async ({ name, email, password }) => {
    // Check if user exits
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists.');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    let userData = {
      name,
      email,
      password: hashedPassword,
    };

    // Create user
    return await User.create(userData);
  };

const changeUserPassword =
  (res) =>
  async ({ id, password }) => {
    const user = await User.findById(id);

    if (!user) {
      res.status(400);
      throw new Error('User not exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    user.password = hashedPassword;
    await user.save();

    return user;
  };

const changeUserData =
  (res) =>
  async ({ id, data: { name, headline, gender } }) => {
    const user = await User.findById(id);

    if (!user) {
      res.status(400);
      throw new Error('User not exists');
    }

    user.name = name;
    user.headline = headline;
    user.gender = gender;
    await user.save();

    return user;
  };

module.exports = {
  createUser,
  changeUserPassword,
  changeUserData,
};
