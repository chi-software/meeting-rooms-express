const Booking = require('../models/booking').Booking;

const SELECT = '-__v';

const bookingController = () => {

  const getBookings = (req, res, next) => {
    Booking.find({}, SELECT, (err, results) => {
      if (err) {
        next(err);
      } else {
        res.send(results);
      }
    });
  };

  const getBooking = (req, res, next) => {
    Booking.findById(req.params._id, SELECT, (err, results) => {
      if (err) {
        next(err);
      } else {
        res.send(results);
      }
    });
  };

  const postBooking = (req, res) => {
    return new Promise(resolve => {
      if (!req.body.roomId || !req.body.userId || !req.body.timeFrom || !req.body.timeTo) {
        return res.json({ err: 'bad_request' });
      }

      resolve(Booking.create({
        userId: req.body.userId,
        roomId: req.body.roomId,
        timeFrom: req.body.timeFrom,
        timeTo: req.body.timeTo
      }));
    })
      .then(newBooking => {
        return res.json(newBooking);
      })
      .catch(err => console.log(err));
  };

  const putBooking = (req, res) => {
    return new Promise(resolve => {
      if (!req.params._id) {
        return res.json({ err: 'bad_request' });
      }

      resolve(Booking.findById(req.params._id, (err, results) => {
        if (err) {
          res.send(err);
        }
        results.roomId = req.body.roomId || results.roomId;
        results.userId = req.body.userId || results.userId;
        results.timeFrom = req.body.timeFrom || results.timeFrom;
        results.timeFrom = req.body.timeFrom || results.timeFrom;

        results.save(function (err) {
          if (err) {
            res.send(err);
          }
          res.json({ results });
        });
      }));
    })
      .catch(err => console.log(err));
  };

  const deleteBooking = (req, res) => {
    return new Promise(resolve => {
      if (!req.params._id) {
        return res.json({ err: 'bad_request' });
      }

      resolve(Booking.remove({
        _id: req.params._id
      }));
    })
      .then(() => {
        return res.json('success');
      })
      .catch(err => console.log(err));
  };

  return {
    getBooking,
    getBookings,
    postBooking,
    putBooking,
    deleteBooking
  };
};

module.exports = bookingController;
