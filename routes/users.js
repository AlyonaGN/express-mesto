const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
  getMyUser,
} = require('../controllers/users.js');

router.get('/users', getUsers);
router.get('/users/me', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
}), getMyUser);
router.get('/users/:id', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
}), getUser);

module.exports = router;
