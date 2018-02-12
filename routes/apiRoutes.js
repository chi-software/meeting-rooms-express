'use strict';

const express = require('express');
const userController = require('../controllers/userController')();
const roomController = require('../controllers/roomController')();
const bookingController = require('../controllers/bookingController')();

const apiRouter = express.Router();

const router = () => {
  // AUTH
  apiRouter.route('/auth/register')
    .post(userController.register);

  apiRouter.route('/auth/sign_in')
    .post(userController.signIn);

  // ROOMS
  apiRouter.route('/rooms')
    .get(roomController.getRooms);

  // BOOKINGS
  apiRouter.route('/bookings')
    .get(bookingController.getBookings)
    .post(bookingController.postBooking);

  apiRouter.route('/bookings/:_id')
    .get(bookingController.getBooking)
    .put(bookingController.putBooking)
    .delete(bookingController.deleteBooking);

  // USERS
  apiRouter.route('/users')
    .get(userController.getUsers);

  return apiRouter;
};

module.exports = router;
