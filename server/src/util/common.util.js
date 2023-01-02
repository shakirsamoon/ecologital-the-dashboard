const bcrypt = require('bcrypt');

// Hash password with salt
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Compare hashed passwords
const compareHashedPasswords = async (password1, password2) => {
  return await bcrypt.compare(password1, password2);
};

module.exports = { hashPassword, compareHashedPasswords };
