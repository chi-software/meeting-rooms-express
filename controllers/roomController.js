const Room = require('../models/room').Room;

const SELECT = '-_id -__v';

const roomController = () => {

  const getRooms = (req, res, next) => {
    Room.find({}, SELECT, (err, results) => {
      if (err) {
        next(err);
      } else {
        res.send(results);
      }
    });
  };

  return {
    getRooms,
  };
};

module.exports = roomController;
