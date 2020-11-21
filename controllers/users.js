const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((usersData) => {
      res.send({ data: usersData });
    })
    .catch(() => {
      const ERROR_CODE = 500;
      res.status(ERROR_CODE).send({ message: 'Мне очень жаль, но что-то пошло не так' });
    });
};

const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(new Error('NotFound'))
    .then((userData) => {
      res.send({ data: userData });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (error.message === 'NotFound') {
        res.status(404).send({ message: 'Объект не найден' });
      } else {
        res.status(500).send({ message: 'Что-то пошло не так' });
      }
    });
};

const getMyUser = (req, res) => {
  const id = req.user._id;
  User.findById(id)
    .orFail(new Error('NotFound'))
    .then((userData) => {
      res.send({ data: userData });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (error.message === 'NotFound') {
        res.status(404).send({ message: 'Объект не найден' });
      } else {
        res.status(500).send({ message: 'Что-то пошло не так' });
      }
    });
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      });
    })
    .then((newUser) => {
      res.send({ data: newUser });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошло какое-то удивительное недоразумение' });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'my-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  getUser,
  getMyUser,
  createUser,
  login,
};
