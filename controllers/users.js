const readFile = require('../utils/read-func.js');
const path = require('path');
const jsonUsersDataPath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => {
  readFile(jsonUsersDataPath)
    .then((usersData) => {
      res.send(usersData);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getUser = (req, res) => {
  const { id } = req.params;
  readFile(jsonUsersDataPath)
    .then((usersData) => {
      const selectedUser = usersData.find(user => user._id === id);
      return selectedUser;
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({"message": "Нет пользователя с таким id"});
      }
      res.send(user);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  getUsers,
  getUser
}