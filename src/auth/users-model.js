'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String},
  role: {type: String, required:true, default:'user', enum:['admin','editor','user'] },
});

users.pre('save', function(next) {
  bcrypt.hash(this.password,10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch( error => {throw error;} );
});

/**
   * @module authenticateBasic(auth)
   * @param {object} auth - authorization object with user credentials
   * @desc Handles basic authentication
   */
users.statics.authenticateBasic = function(auth) {
  // validation
  // is the auth object actually an object?
  // does it have username as a string?
  // does it have password as a string?
  let query = {username:auth.username};
  return this.findOne(query)
    .then(user => user && user.comparePassword(auth.password))
    .catch(console.error);
};

/**
   * @module comparePassword(password)
   * @param {object} password - Given password
   * @desc Compares the password to see if it is valid or not
   */
// Compare a plain text password against the hashed one we have saved
users.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null);
};

/**
   * @module generateToken()
   * @desc Creates tokenData object, creates the token with jwt.sign using tokenData object and the users SECRET
   */
// Generate a JWT from the user id and a secret
users.methods.generateToken = function() {
  let tokenData = {
    id:this._id,
    role: this.role,
  };
  return jwt.sign(tokenData, process.env.SECRET);
};

module.exports = mongoose.model('users', users);
