const mongoose = require('../lib/mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  userId: {
    type: Number,
    unique: false,
    required: true,
  },
  roomId: {
    type: Number,
    unique: false,
    required: true,
  },
  timeFrom: {
    type: Date,
    unique: false,
    required: true,
  },
  timeTo: {
    type: Date,
    unique: false,
    required: true,
  },
});

exports.Booking = mongoose.model('Booking', schema);
