const router = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  updateProfile
} = require('../controllers/users.js');

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);
router.patch('/users/me', updateProfile);

module.exports = router;
