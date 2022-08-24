const router = require('express').Router();

const {
  getUserMe,
  updateUser,
} = require('../controllers/users');

router.get('/me', getUserMe);
router.patch('/me', updateUser);

module.exports = router;