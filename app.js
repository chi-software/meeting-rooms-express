const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const apiRouter = require('./routes/apiRoutes')();
const authRouter = require('./routes/authRoutes')();
const config = require('./config');

const app = express();

// no logger info in test mode
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  jwt.verify(req.headers.authorization, config.get('secret'), (err, payload) => {
    if (err) {
      req.user = undefined;
    }
    req.user = payload;
    next();
  });
});

app.use('/api', apiRouter);
app.use('/auth', authRouter);

app.use((req, res) => {
  res.status(404).send('oups, not found this');
});

app.use((err, req, res) => {
  res.status(err.status || 500).send(err.message);
});

module.exports = app;
