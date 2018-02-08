'use strict';

const express = require('express');
const apiController = require('../controllers/apiController')();
const userController = require('../controllers/userController')();
const roomController = require('../controllers/roomController')();
const bookingController = require('../controllers/bookingController')();

const apiRouter = express.Router();

const router = () => {
  apiRouter.route('/practices')
    .get(userController.loginRequired, apiController.getPractices);

  apiRouter.route('/practices/:practice_id')
    .get(userController.loginRequired, apiController.getPracticesById);

  apiRouter.route('/practices/:practice_id/technologies')
    .get(userController.loginRequired, apiController.getTechnologies);

  apiRouter.route('/practices/:practice_id/technologies/:technology_id')
    .get(userController.loginRequired, apiController.getTechnologiesById);

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
