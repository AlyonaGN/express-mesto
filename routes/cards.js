const router = require('express').Router();
const {
  createCard,
  getCards,
  deleteCard,
} = require('../controllers/cards.js');

router.post('/cards', createCard);
router.get('/cards', getCards);
router.delete('/cards/:cardId', deleteCard);

module.exports = router;
