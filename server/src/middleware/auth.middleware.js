const asyncHandler = require('express-async-handler');

const User = require('../models/user.model');

const { verifyJwtToken } = require('../util/jwt.util');

const authProtect = (isAdmin = false) =>
  asyncHandler(async (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Get Token from header
        token = req.headers.authorization.split(' ')[1];

        // Verify Token
        const decoded = verifyJwtToken(token);

        // Get User from the Token
        const user = await User.findById(decoded.id).select('-password');

        if (isAdmin && user.type !== 'admin') {
          res.status(401);
          throw new Error("User doesn't have admin privileges");
        }

        req.user = user;

        next();
      } catch (error) {
        console.log('error:', error);
        res.status(401);
        throw new Error('Not authorized');
      }
    }

    if (!token) {
      res.status(401);
      throw new Error('No token available');
    }
  });

module.exports = {
  authProtect,
};
