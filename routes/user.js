var Joi = require('joi');
var Bcrypt = require('bcrypt');

exports.register = function(server, options, next) { //create and export this user.js plugin
  next();
};

exports.register.attributes{
  name: 'users-route',
  version: '0.0.1'
};