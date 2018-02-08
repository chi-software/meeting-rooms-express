const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user').User;
const config = require('../config');

const SELECT = '-__v -hashPassword';

const generateToken = (user) => {
  return jwt.sign({ _id: user._id }, config.get('secret'), { expiresIn: 60 * 60 * 24 });
};

const errHandler = res => {
  const error_codes = {
    access_denied: { message: 'Unauthorized user!', cd: 401 },
    user_not_found: { message: 'Authentication failed. User not found.', cd: 401 },
    wrong_password: { message: 'Authentication failed. Wrong password.', cd: 401 },
    bad_request: { message: 'Bad request', cd: 400 },
    user_exists: { message: 'User already exist', cd: 409 },
  };

  return cd => {
    error = error_codes[cd] || { message: cd, cd: 500 };

    res.status(error.cd).json({ message: error.message });
  };
};

const userController = () => ({
  register(req, res) {
    return new Promise(resolve => {
      if (!req.body.password || !req.body.email) throw 'bad_request';

      resolve(User.findOne({ email: req.body.email }));
    })
    .then(existingUser => {
      if (existingUser) throw 'user_exists';

      return User.create({ email: req.body.email, hashPassword: bcrypt.hashSync(req.body.password, 10) });
    })
    .then(newUser => {
      return res.json({ email: newUser.email });
    })
    .catch(errHandler(res));
  },

  signIn(req, res) {
    User
      .findOne({ email: req.body.email })
      .then(user => {
        if (!user) throw 'user_not_found';
        if (!req.body.password || !user.comparePassword(req.body.password)) throw 'wrong_password';

        res.json({ token: generateToken(user) });
      })
      .catch(errHandler(res));
  },

  getUsers(req, res, next) {
    User.find({}, SELECT, (err, results) => {
      if (err) {
        next(err);
      } else {
        res.send(results);
      }
    });
  },

  loginRequired(req, res, next) {
    Promise
      .resolve(req.user ? User.findById(req.user._id) : void(0))
      .then(user => {
        if (!user) {
          throw 'access_denied';
        }

        next();
      })
      .catch(errHandler(res));
  }
});

module.exports = userController;
