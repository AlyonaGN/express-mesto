const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((newCard) => {
      res.send({ data: newCard });
    })
    .catch((error) => {
      const ERROR_CODE = 400;
      if (error.name === 'ErrorName') {
        res.status(ERROR_CODE).send({ message: 'Не удалось создать карточку :(' });
      }
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((error) => {
      const ERROR_CODE = 500;
      if (error.name === 'ErrorName') {
        res.status(ERROR_CODE).send({ message: 'Мне очень жаль, но что-то пошло не так' });
      }
    });
};

const deleteCard = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndRemove(id)
    .orFail(new Error('NotFound'))
    .then((card) => {
      res.send({ data: card });
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
