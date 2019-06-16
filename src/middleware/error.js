'use strict';

/**
   * @module 500 server error
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - response object
   * @desc handle all server errors
   */
module.exports = (err, req, res, next) => {
  console.error('__SERVER_ERROR__', err);
  let error = { error: err.message || err };
  res.statusCode = err.status || 500;
  res.statusMessage = err.statusMessage || 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(error) );
  res.end();
};
