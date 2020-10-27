const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((usersData) => {
      res.send({ data: usersData });
    })
    .catch((error) => {
      const ERROR_CODE = 500;
      if (error.name === 'ErrorName') {
        return res.status(ERROR_CODE).send({ message: 'Мне очень жаль, но что-то пошло не так' });
      }
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

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => {
      res.send({ data: newUser });
    })
    .catch((error) => {
      const ERROR_CODE = 400;
      if (error.name === 'ErrorName') {
        return res.status(ERROR_CODE).send({ message: 'Не удалось создать пользователя, попробуйте ещё раз' });
      }
    });
};

const updateProfile = (req, res) => {
  const id = req.user._id;
  User.findByIdAndUpdate(id, { name: `f${((Math.random() * 1e8)).toString(16)}` }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      const ERROR_CODE = 400;
      if (error.name === 'ErrorName') {
        return res.status(ERROR_CODE).send({ message: 'Не удалось обновить профиль, попробуйте ещё раз' });
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
};
