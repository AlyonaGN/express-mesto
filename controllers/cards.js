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
        return res.status(ERROR_CODE).send({ message: 'Не удалось создать карточку :(' });
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
        return res.status(ERROR_CODE).send({ message: 'Мне очень жаль, но что-то пошло не так' });
      }
    });
};

const deleteCard = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndRemove(id)
    .then((card) => {
      res.send({ data: card });
    })
    .catch((error) => {
      const ERROR_CODE = 404;
      if (error.name === 'ErrorName') {
        return res.status(ERROR_CODE).send({ message: 'Не удалось найти карточку :(' });
      }
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
};
