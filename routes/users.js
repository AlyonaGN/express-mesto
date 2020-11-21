const router = require('express').Router();
const {
  getUsers,
  getUser,
  getMyUser,
} = require('../controllers/users.js');

router.get('/users', getUsers);
router.get('/users/me', getMyUser);
router.get('/users/:id', getUser);

module.exports = router;
