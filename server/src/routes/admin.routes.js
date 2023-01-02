const express = require('express');
const router = express.Router();

const { authProtect } = require('../middleware/auth.middleware');

const {
  addNewUser,
  changeUserStatus,
  getAllUsers,
  updateUserData,
  updateUserPassword,
  getSingleUser,
} = require('../controllers/admin.controller');

router.get('/', authProtect(true), getAllUsers);
router.post('/new', authProtect(true), addNewUser);
router.put('/:id', authProtect(true), updateUserData);
router.put('/:id/auth', authProtect(true), updateUserPassword);
router.put('/:id/:status', authProtect(true), changeUserStatus);
router.get('/:id', authProtect(true), getSingleUser);

module.exports = router;
