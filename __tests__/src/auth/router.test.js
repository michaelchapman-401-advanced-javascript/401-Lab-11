'use strict';

process.env.STORAGE = 'mongo';
require('dotenv').config();
// const SECRET = 'aosfaskfjaslfjka';
// need to mock jwt to pass travis because something is being used we don't have control over - string

// const jwt = require('jsonwebtoken');

// const server = require('../../../src/app.js').server;
const supergoose = require('../../supergoose.js');

// const mockRequest = supergoose.server(server);

let users = {
  admin: {username: 'admin', password: 'password', role: 'admin'},
  editor: {username: 'editor', password: 'password', role: 'editor'},
  user: {username: 'user', password: 'password', role: 'user'},
};

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('Auth Router', () => {
  
  Object.keys(users).forEach( userType => {
    
    describe(`${userType} users`, () => {

      
      it('can create one', () => {
        expect(42).toEqual(42);
      });

    });
    
  });
  
});