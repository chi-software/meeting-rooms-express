'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const app = require('../app.js');
const config = require('../config');
const User = require('../models/user').User;

const should = chai.should();
chai.use(chaiHttp);

describe('Wrong API calls', () => {
  describe('GET /index', () => {
    it('it should return 404', done => {
      chai.request(app)
        .get('/index')
        .end((err,res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('GET /api/index', () => {
    it('it should return 404', done => {
      chai.request(app)
        .get('/api/index')
        .end((err,res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});

describe('API without Token', () => {
  describe('GET api/bookings', () => {
    it('it should return 401', done => {
      chai.request(app)
        .get('/api/bookings')
        .end((err,res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});

describe('API with token', () => {
  let token;

  function getAuthorizationHeaders() {
    return { 'Authorization': token };
  }

  before(done => {
    User.findOne({
      email: 'admin@mail.com'
    }, (err, user) => {
      if (err) {
        done();
      } else {
        token = jwt.sign(
          { _id: user._id },
          config.get('secret'),
          { expiresIn: 60 * 60 * 24 }
        );
        done();
      }
    });
  });

  describe('GET api/users', () => {
    it('it should return 200 and res should be an array(2)', done => {
      chai.request(app)
        .get('/api/users')
        .set(getAuthorizationHeaders())
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2);
          res.body[0].should.have.property('_id');
          res.body[0].should.have.property('email');
          res.body[0].should.have.property('firstName');
          res.body[0].should.have.property('lastName');
          res.body[0].should.have.property('department');
          res.body[0].should.have.property('role');
          done();
        });
    });
  });

  describe('GET api/bookings', () => {
    it('it should return 200 and res should be an array(4)', done => {
      chai.request(app)
        .get('/api/bookings')
        .set(getAuthorizationHeaders())
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(4);
          res.body[0].should.have.property('_id');
          res.body[0].should.have.property('userId');
          res.body[0].should.have.property('roomId');
          res.body[0].should.have.property('timeFrom');
          res.body[0].should.have.property('timeTo');
          done();
        });
    });
  });

  describe('POST api/bookings', () => {
    it('it should return 200 and res should be an object', done => {
      const booking = {
        roomId: '1',
        userId: '1',
        timeFrom: new Date(),
        timeTo: new Date(),
      };

      chai.request(app)
        .post('/api/bookings')
        .set(getAuthorizationHeaders())
        .send(booking)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('userId');
          res.body.should.have.property('roomId');
          res.body.should.have.property('timeFrom');
          res.body.should.have.property('timeTo');
          done();
        });
    });
  });

  describe('GET NEW BOOKINGS', () => {
    it('it should return 200 and res should be an array(5)', done => {
      chai.request(app)
        .get('/api/bookings')
        .set(getAuthorizationHeaders())
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(5);
          res.body[0].should.have.property('_id');
          res.body[0].should.have.property('userId');
          res.body[0].should.have.property('roomId');
          res.body[0].should.have.property('timeFrom');
          res.body[0].should.have.property('timeTo');
          done();
        });
    });
  });

  describe('GET api/rooms', () => {
    it('it should return 200 and res should be an array(4)', done => {
      chai.request(app)
        .get('/api/rooms')
        .set(getAuthorizationHeaders())
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(4);
          res.body[0].should.have.property('_id');
          res.body[0].should.have.property('number');
          res.body[0].should.have.property('description');
          done();
        });
    });
  });

});
