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
  require('./models/practice');
  require('./models/technology');
  require('./models/room');
  require('./models/booking');

  async.each(Object.keys(mongoose.models), (modelName, next) => {
    mongoose.models[modelName].ensureIndexes(next);
  }, callback);
};

const createRooms = (callback) => {
  const rooms = [
    { id: 1, number: 1, description: 'Room №1' },
    { id: 2, number: 2, description: 'Room №2' },
    { id: 3, number: 3, description: 'Room №3' },
    { id: 4, number: 4, description: 'Room №4' },
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

const createPractices = (callback) => {
  const practices = [
    { id: 1, name: 'Node', description: 'Build custom Node.js projects' },
    { id: 2, name: 'React', description: 'Build custom SPA' },
    { id: 3, name: 'Ruby', description: 'Build custom RoR projects' },
    { id: 4, name: 'Python', description: 'Build custom Flask projects' },
  ];

  async.each(practices, (data, next) => {
    const practice = new mongoose.models.Practice(data);
    practice.save(next);
  }, callback);
};

const createTechnologies = (callback) => {
  const technologies = [
    { id: 1, practice_id: 1, name: 'Node', description: 'Node.js ^6.11.0' },
    { id: 2, practice_id: 1, name: 'Express', description: 'Express.js ^4.15.0' },
    { id: 3, practice_id: 2, name: 'React', description: 'React.js' },
    { id: 4, practice_id: 2, name: 'Lodash', description: 'Lodash' },
    { id: 5, practice_id: 2, name: 'Moment', description: 'Moment' },
    { id: 6, practice_id: 2, name: 'Redux', description: 'Redux' },
    { id: 7, practice_id: 3, name: 'RoR', description: 'Ruby' },
    { id: 8, practice_id: 4, name: 'Python', description: 'Flask' },
  ];

  async.each(technologies, (data, next) => {
    const technology = new mongoose.models.Technology(data);
    technology.save(next);
  }, callback);
};

const createUsers = (callback) => {
  const users = [{
    roleId: 1,
    departmentId: 1,
    firstName: 'Admin',
    lastName: 'Admin',
    email: 'admin@mail.com',
    password: '12345678',
  }, {
    roleId: 1,
    departmentId: 1,
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
  createPractices,
  createTechnologies,
  createUsers,
  createRooms,
  createBookings,
], (err) => {
  mongoose.disconnect();
  process.exit(err ? 255 : 0);
});
