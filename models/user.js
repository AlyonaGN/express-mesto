const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /https?:\/\/(www\.)?([^#\s])+\.[^#\s]+#?$/.test(v);
      },
      message: 'Пожалуйста, введите ссылку',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
