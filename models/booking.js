const mongoose = require('../lib/mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  userId: {
    type: String,
    unique: false,
    required: true,
  },
  roomId: {
    type: String,
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
  bookingType: {
    type: String,
    unique: false,
    required: false,
  },
  bookingStatus: {
    type: String,
    unique: false,
    required: false,
  }
});

exports.Booking = mongoose.model('Booking', schema);
