const async = require('async');
const mongoose = require('./lib/mongoose');
const bcrypt = require('bcrypt');

mongoose.set('debug', true);

const open = (callback) => {
  mongoose.connection.on('open', callback);
};

const dropDatabase = (callback) => {
  const db = mongoose.connection.db;
  db.dropDatabase(callback);
};

const requireModels = (callback) => {
  require('./models/user');
  require('./models/room');
  require('./models/booking');

  async.each(Object.keys(mongoose.models), (modelName, next) => {
    mongoose.models[modelName].ensureIndexes(next);
  }, callback);
};

const createRooms = (callback) => {
  const rooms = [
    { number: 1, description: 'Room №1' },
    { number: 2, description: 'Room №2' },
    { number: 3, description: 'Room №3' },
    { number: 4, description: 'Room №4' },
  ];

  async.each(rooms, (data, next) => {
    const room = new mongoose.models.Room(data);
    room.save(next);
  }, callback);
};

const createBookings = (callback) => {
  const bookings = [
    { userId: 1, roomId: 1, timeFrom: new Date, timeTo: new Date },
    { userId: 1, roomId: 2, timeFrom: new Date, timeTo: new Date },
    { userId: 2, roomId: 3, timeFrom: new Date, timeTo: new Date },
    { userId: 2, roomId: 4, timeFrom: new Date, timeTo: new Date },
  ];

  async.each(bookings, (data, next) => {
    const booking = new mongoose.models.Booking(data);
    booking.save(next);
  }, callback);
};

const createUsers = (callback) => {
  const users = [{
    firstName: 'Admin',
    lastName: 'Admin',
    email: 'admin@mail.com',
    password: '12345678',
  }, {
    firstName: 'Admin',
    lastName: 'Admin',
    email: 'alex@gmail.com',
    password: 'password',
  }];

  async.each(users, (data, next) => {
    const user = new mongoose.models.User(data);
    user.hashPassword = bcrypt.hashSync(data.password, 10);
    user.save(next);
  }, callback);
};

async.series([
  open,
  dropDatabase,
  requireModels,
  createUsers,
  createRooms,
  createBookings,
], (err) => {
  mongoose.disconnect();
  process.exit(err ? 255 : 0);
});
