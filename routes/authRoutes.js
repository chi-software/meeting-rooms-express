'use strict';

const express = require('express');
const userController = require('../controllers/userController')();

const authRouter = express.Router();

const router = () => {
  authRouter.route('/register')
    .post(userController.register);

  authRouter.route('/sign_in')
    .post(userController.signIn);

  return authRouter;
};

module.exports = router;
