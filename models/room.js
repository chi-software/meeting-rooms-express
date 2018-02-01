const mongoose = require('../lib/mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  number: {
    type: Number,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    unique: false,
    required: false,
  },
});

exports.Room = mongoose.model('Room', schema);
