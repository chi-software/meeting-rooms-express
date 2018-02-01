const mongoose = require('../lib/mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    unique: true,
    required: true,
  },
});

exports.Role = mongoose.model('Role', schema);
