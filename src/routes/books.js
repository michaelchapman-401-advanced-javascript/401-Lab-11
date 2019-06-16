'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../auth/middleware.js');

/**
 * Get a single book from the database based on id
 * @route GET /{model}/{:id}
 * @consumes application/json application/xml
 * @returns {Object} 500 - Server error
 * @returns {Object} 200 - { count: 2, results: [{}, {}]}
 */
router.get('/books', auth, handleGetAll);

/**
 * Get a single book from the database based on id
 * @route GET /{model}/{:id}
 * @consumes application/json application/xml
 * @returns {Object} 500 - Server error
 * @returns {Object} 200 - { count: 2, results: [{}, {}]}
 */
router.get('/books/:id', auth, handleGetOne);

// Route Handlers
/**
   * @module handleGetAll
   * @param {object} req - request object
   * @param {object} res - response object
   * @desc server returns all books
   */
function handleGetAll(req, res, next) {
  let books = {
    count: 3,
    results: [
      { title:'Moby Dick' },
      { title:'Little Women' },
      { title: 'Eloquent Javascript' },
    ],
  };
  res.status(200).json(books);
}

/**
   * @module handleGetOne
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} id - id of requested resource
   * @desc server returns a book
   */
function handleGetOne(req, res, next) {
  let book = {
    title:'Moby Dick',
  };
  res.status(200).json(book);
}

module.exports = router;
