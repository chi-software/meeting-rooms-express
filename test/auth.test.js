'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const app = require('../app.js');
const config = require('../config');

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

describe('AUTH', () => {

  describe('REGISTER', () => {

    describe('POST /api/auth/register new user', () => {
      it('it should return 200 and right email', done => {
        const user = {
          id: 1,
          email: 'admin+1@mail.com',
          password: '12345678'
        };

        chai.request(app)
          .post('/api/auth/register')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('email').eql(user.email);
            done();
          });
      });
    });

    describe('POST /api/auth/register user without email', () => {
      it('it should return 400 and message', done => {
        const user = {
          password: '12345678'
        };

        chai.request(app)
          .post('/api/auth/register')
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Bad request');
            done();
          });
      });
    });

    describe('POST /api/auth/register user without password', () => {
      it('it should return 400 and message', done => {
        const user = {
          email: 'admin+1@mail.com',
        };

        chai.request(app)
          .post('/api/auth/register')
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Bad request');
            done();
          });
      });
    });

    describe('POST /api/auth/register user who already exist', () => {
      it('it should return 409', done => {
        const user = {
          email: 'admin+1@mail.com',
          password: '12345678'
        };

        chai.request(app)
          .post('/api/auth/register')
          .send(user)
          .end((err, res) => {
            res.should.have.status(409);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('User already exist');
            done();
          });
      });

    });

  });

  describe('SING_IN', () => {

    describe('POST /api/auth/sign_in registered user', () => {
      it('it should return 200 and valid token', done => {
        const user = {
          email: 'admin@mail.com',
          password: '12345678'
        };

        chai.request(app)
          .post('/api/auth/sign_in')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('token');
            jwt.verify(res.body.token, config.get('secret'), err => {
              expect(err).to.be.a('null');
              done();
            });
          });
      });
    });

    describe('POST /api/auth/sign_in previous user', () => {
      it('it should return 200 and valid token', done => {
        const user = {
          email: 'admin+1@mail.com',
          password: '12345678'
        };

        chai.request(app)
          .post('/api/auth/sign_in')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('token');
            jwt.verify(res.body.token, config.get('secret'), err => {
              expect(err).to.be.a('null');
              done();
            });
          });
      });
    });

    describe('POST /api/auth/sign_in user with wrong email', () => {
      it('it should return 401 and right message', done => {
        const user = {
          email: 'wrong@mail.com',
          password: 'password'
        };

        chai.request(app)
          .post('/api/auth/sign_in')
          .send(user)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Authentication failed. User not found.');
            done();
          });
      });
    });

    describe('POST /api/auth/sign_in user with no email', () => {
      it('it should return 401 and right message', done => {
        const user = {
          password: 'password'
        };

        chai.request(app)
          .post('/api/auth/sign_in')
          .send(user)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Authentication failed. User not found.');
            done();
          });
      });
    });

    describe('POST /api/auth/sign_in user with wrong password', () => {
      it('it should return 409 and right message', done => {
        const user = {
          email: 'admin@mail.com',
          password: 'wrong'
        };

        chai.request(app)
          .post('/api/auth/sign_in')
          .send(user)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Authentication failed. Wrong password.');
            done();
          });
      });
    });

    describe('POST /api/auth/sign_in user with no password', () => {
      it('it should return 409 and right message', done => {
        const user = {
          email: 'admin@mail.com'
        };

        chai.request(app)
          .post('/api/auth/sign_in')
          .send(user)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Authentication failed. Wrong password.');
            done();
          });
      });
    });
  });
});
