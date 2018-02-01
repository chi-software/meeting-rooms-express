const mongoose = require('../lib/mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const schema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  practice_id: {
    type: Number,
    unique: false,
    required: true,
  },
  name: {
    type: String,
    unique: false,
    required: true,
  },
  description: {
    type: String,
    unique: false,
    required: true,
  },
});

schema.plugin(mongoosePaginate);

exports.Technology = mongoose.model('Technology', schema);
