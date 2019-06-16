'use strict';

process.env.STORAGE = 'mongo';
require('dotenv').config();
const SECRET = 'aosfaskfjaslfjka';
// need to mock jwt to pass travis because something is being used we don't have control over - string

const jwt = require('jsonwebtoken');

const server = require('../../../src/app.js').server;
const supergoose = require('../../supergoose.js');

const mockRequest = supergoose.server(server);

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
      let id;
      
      it('can create one', () => {
        return mockRequest.post('/signup')
          .send(users[userType])
          .then(results => {
            var token = jwt.verify(results.text, SECRET || 'changeit');
            id = token.id;
            expect(token.id).toBeDefined();
            expect(token.role).toBeDefined();
          });
      });

      it('can signin with basic', () => {
        return mockRequest.get('/signin')
          .auth(users[userType].username, users[userType].password)
          .then(results => {
            var token = jwt.verify(results.text, SECRET || 'changeit');
            expect(token.id).toEqual(id);
            expect(token.role).toBeDefined();
          });
      });

    });
    
  });
  
});