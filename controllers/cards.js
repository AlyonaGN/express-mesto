const readFile = require('../utils/read-func.js');
const path = require('path');
const jsonCardsPath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
  readFile(jsonCardsPath)
    .then((cards) => {
      res.send(cards);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = getCards;