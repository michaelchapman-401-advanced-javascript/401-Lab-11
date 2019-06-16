'use strict';

const User = require('./users-model.js');

/**
   * @module middleware module
   * @param {object} req - request object
   * @param {object} res - response object
   * @desc contains all middleware
   */
module.exports = (req, res, next) => {

  try {

    let [authType, encodedString] = req.headers.authorization.split(/\s+/);

    // BASIC Auth  ... Authorization:Basic ZnJlZDpzYW1wbGU=

    switch(authType.toLowerCase()) {
    case 'basic':
      return _authBasic(encodedString);
    default:
      return _authError();
    }

  } catch(e) {
    return _authError();
  }

  /**
   * @module _authBasic(authString)
   * @param {object} authString - Authorization string for basic authentication
   * @desc Handles creating auth information and calls User.authenticateBasic and handles the return
   */
  function _authBasic(authString) {
    let base64Buffer = Buffer.from(authString,'base64'); // <Buffer 01 02...>
    let bufferString = base64Buffer.toString(); // john:mysecret
    let [username,password] = bufferString.split(':');  // variables username="john" and password="mysecret"
    let auth = {username,password};  // {username:"john", password:"mysecret"}

    return User.authenticateBasic(auth)
      .then( user => _authenticate(user) );
  }

  /**
   * @module _authenticate(user)
   * @param {object} user - user object containing user credentials
   * @desc Handles authenticating a user and moves onto next middleware or returns and error
   */
  function _authenticate(user) {
    if( user ) {
      req.user = user;
      req.token = user.generateToken();
      next();
    }else{
      _authError();
    }
  }

  function _authError() {
    next({status: 401, statusMessage: 'Unauthorized', message: 'Invalid User ID/Password'});
  }

};

