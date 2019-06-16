'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('./users-model.js');
const auth = require('./middleware.js');

/**
 * POST to /signup route to signup a user
 * @route POST /{model}/
 * @consumes application/json application/xml
 * @returns {Object} 500 - Server error
 * @returns {Object} 200 - { count: 2, results: [{}, {}]}
 */
authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then( (user) => {
      req.token = user.generateToken();
      req.user = user;
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(req.token);
    }).catch(next);
});

/**
 * GET to /signin to sign a user in
 * @route GET /{model}/
 * @consumes application/json application/xml
 * @returns {Object} 500 - Server error
 * @returns {Object} 200 - { count: 2, results: [{}, {}]}
 */
authRouter.get('/signin', auth, (req, res) => {
  console.log('TOKEN');
  console.log(req.token);
  res.cookie('auth', req.token);
  res.send(req.token);
});

module.exports = authRouter;
