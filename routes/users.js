const router = require('express').Router();

const {
  getUserMe,
  updateUser,
} = require('../controllers/users');

const { validationUpdateUser } = require('../utils/validations');

router.get('/me', getUserMe);
router.patch('/me', validationUpdateUser, updateUser);

module.exports = router;
