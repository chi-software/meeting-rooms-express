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
  describe('GET api/practices', () => {
    it('it should return 401', done => {
      chai.request(app)
        .get('/api/practices')
        .end((err,res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe('GET api/practices/:practice_id', () => {
    it('it should return 401', done => {
      chai.request(app)
        .get('/api/practices/1')
        .end((err,res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe('GET api/practices/:practice_id/technologies', () => {
    it('it should return 401', done => {
      chai.request(app)
        .get('/api/practices/1/technologies')
        .end((err,res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe('GET api/practices/:practice_id/technologies/:technology_id', () => {
    it('it should return 401', done => {
      chai.request(app)
        .get('/api/practices/1/technologies/1')
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
          { expiresIn: 60 * 5 }
        );
        done();
      }
    });
  });

  describe('GET api/practices', () => {
    it('it should return 200 and res should be an array(4)', done => {
      chai.request(app)
        .get('/api/practices')
        .set(getAuthorizationHeaders())
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(4);
          res.body[0].should.have.property('id');
          res.body[0].should.have.property('name');
          res.body[0].should.have.property('description');
          done();
        });
    });
  });

  describe('GET api/practices/:practice_id', () => {
    it('it should return 200 and res should be an array(1)', done => {
      chai.request(app)
        .get('/api/practices/2')
        .set(getAuthorizationHeaders())
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          res.body[0].should.have.property('id');
          res.body[0].should.have.property('name');
          res.body[0].should.have.property('description');
          done();
        });
    });
  });

  describe('GET api/practices/:practice_id/technologies', () => {
    it('it should return 200 and res should be an array(4)', done => {
      chai.request(app)
        .get('/api/practices/2/technologies')
        .set(getAuthorizationHeaders())
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(4);
          res.body[0].should.have.property('id');
          res.body[0].should.have.property('name');
          res.body[0].should.have.property('description');
          done();
        });
    });
  });

  describe('GET api/practices/:practice_id/technologies?page=1&per=2', () => {
    it('it should return 200 and res should be an array(2)', done => {
      chai.request(app)
        .get('/api/practices/2/technologies?page=1&per=2')
        .set(getAuthorizationHeaders())
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2);
          res.body[0].should.have.property('id');
          res.body[0].should.have.property('name');
          res.body[0].should.have.property('description');
          res.body[0].should.have.property('practice_id');
          done();
        });
    });
  });

  describe('GET api/practices/:practice_id/technologies/:technology_id', () => {
    it('it should return 200 and res should be an array(1)', done => {
      chai.request(app)
        .get('/api/practices/1/technologies/1')
        .set(getAuthorizationHeaders())
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          res.body[0].should.have.property('id');
          res.body[0].should.have.property('name');
          res.body[0].should.have.property('description');
          res.body[0].should.have.property('practice_id');
          done();
        });
    });
  });

  describe('*NEW GET api/users', () => {
    it('it should return 200 and res should be an array(2)', done => {
      chai.request(app)
        .get('/api/users')
        .set(getAuthorizationHeaders())
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2);
          res.body[0].should.have.property('email');
          res.body[0].should.have.property('firstName');
          res.body[0].should.have.property('lastName');
          done();
        });
    });
  });

  describe('*NEW GET api/bookings', () => {
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

  describe('*NEW GET api/rooms', () => {
    it('it should return 200 and res should be an array(4)', done => {
      chai.request(app)
        .get('/api/rooms')
        .set(getAuthorizationHeaders())
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(4);
          res.body[0].should.have.property('id');
          res.body[0].should.have.property('number');
          res.body[0].should.have.property('description');
          done();
        });
    });
  });

});
