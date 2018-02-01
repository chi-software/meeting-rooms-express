'use strict';

const express = require('express');
const apiController = require('../controllers/apiController')();
const userController = require('../controllers/userController')();

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

  return apiRouter;
};

module.exports = router;
