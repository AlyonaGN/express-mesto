const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((newCard) => {
      res.send({ data: newCard });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошло какое-то удивительное недоразумение' });
      }
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(() => {
      const ERROR_CODE = 500;
      res.status(ERROR_CODE).send({ message: 'Мне очень жаль, но что-то пошло не так' });
    });
};

const deleteCard = (req, res) => {
  const { id } = req.params;
  Card.findById(id)
    .orFail(new Error('NotFound'))
    .then((card) => {
      if (req.user._id !== card.owner) {
        return res.status(403).send({ message: 'Невозможно удалить карточку другого пользователя' });
      }

      return Card.deleteOne({ _id: id })
        .then((deletedCard) => res.send({ data: deletedCard }))
        .catch((error) => {
          if (error.name === 'CastError') {
            res.status(400).send({ message: 'Переданы некорректные данные' });
          } else if (error.message === 'NotFound') {
            res.status(404).send({ message: 'Не удалось найти и удалить карточку' });
          } else {
            res.status(500).send({ message: 'Произошло какое-то удивительное недоразумение' });
          }
        });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (error.message === 'NotFound') {
        res.status(404).send({ message: 'Не удалось найти и удалить карточку' });
      } else {
        res.status(500).send({ message: 'Произошло какое-то удивительное недоразумение' });
      }
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
};
