'use strict';

/**
   * @module 404 error not found
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - response object
   * @desc Handles not found errors
   */
module.exports = (req,res,next) => {
  let error = { error: 'Resource Not Found' };
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};