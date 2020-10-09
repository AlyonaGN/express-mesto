const fsPromises = require('fs').promises;

const reader = (pathUrl) => {
  return fsPromises.readFile(pathUrl, {encoding: 'utf8' })
    .then((file) => {
      return JSON.parse(file);
    });
};

module.exports = reader;

