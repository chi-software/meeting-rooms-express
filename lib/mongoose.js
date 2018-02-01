const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect(config.get('mongoose:testUri'));
} else {
  mongoose.connect(config.get('mongoose:uri'));
}

module.exports = mongoose;
