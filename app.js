const express = require('express');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/users.js');
const cardsRoutes = require('./routes/cards.js');
const {
  login,
  createUser,
} = require('./controllers/users.js');
const auth = require('./middlewares/auth.js');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use('/', userRoutes);
app.use('/', cardsRoutes);
app.use((req, res) => {
  res.status(404);
  res.json({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`I am listening to PORT ${PORT}`);
});
