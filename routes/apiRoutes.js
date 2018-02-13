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
    .get(userController.loginRequired, roomController.getRooms);

  // BOOKINGS
  apiRouter.route('/bookings')
    .get(userController.loginRequired, bookingController.getBookings)
    .post(userController.loginRequired, bookingController.postBooking);

  // BOOKING
  apiRouter.route('/bookings/:_id')
    .get(userController.loginRequired, bookingController.getBooking)
    .put(userController.loginRequired, bookingController.putBooking)
    .delete(userController.loginRequired, bookingController.deleteBooking);

  // USERS
  apiRouter.route('/users')
    .get(userController.loginRequired, userController.getUsers);

  // USER
  apiRouter.route('/users/:_id')
    .get(userController.loginRequired, userController.getUser)
    .put(userController.loginRequired, userController.editUser);

  return apiRouter;
};

module.exports = router;
