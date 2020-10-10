const path = require('path');

const readFile = require('../utils/read-func.js');

const jsonCardsPath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
  readFile(jsonCardsPath)
    .then((cards) => {
      res.send(cards);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: 'Не удалось прочитать файл :(' });
    });
};

module.exports = getCards;
