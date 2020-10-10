const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();
const path = require('path');
const userRoutes = require('./routes/users.js');
const cardsRoutes = require('./routes/cards.js');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', userRoutes);
app.use('/', cardsRoutes);
app.use((req, res) => {
  res.status(404);
  res.json({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`I am listening to PORT ${PORT}`);
});
