const express = require('express');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users.js');
const cardsRoutes = require('./routes/cards.js');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '5f957cb8592a2157d0595aff',
  };
  next();
});
app.use('/', userRoutes);
app.use('/', cardsRoutes);
app.use((req, res) => {
  res.status(404);
  res.json({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`I am listening to PORT ${PORT}`);
});
