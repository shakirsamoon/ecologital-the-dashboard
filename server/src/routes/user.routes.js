const express = require('express');
const router = express.Router();

const { authProtect } = require('../middleware/auth.middleware');

const {
  getCurrentUser,
  loginUser,
  registerUser,
  updateUserData,
  updateUserPassword,
  setupUser,
} = require('../controllers/user.controller');

router.get('/', authProtect(), getCurrentUser);
router.put('/', authProtect(), updateUserData);
router.put('/auth', authProtect(), updateUserPassword);
router.put('/setup', authProtect(), setupUser);
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
