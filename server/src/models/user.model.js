const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Name is required'],
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      require: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      require: [true, 'Password is required'],
    },
    headline: {
      type: String,
    },
    gender: {
      type: String,
    },
    type: {
      type: String,
      default: 'user',
    },
    regStatus: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
