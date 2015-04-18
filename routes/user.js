var Joi = require('joi');
var Bcrypt = require('bcrypt');

exports.register = function(server, options, next) { //create and export this user.js plugin
  server.route([
    {
      method: 'GET',
      path: '/users',
      handler: function(request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;
        db.collections('users').find().toArray(function(err,users) {
          if (err) {
            return reply('Internal Mongodb error', err);
          }
          reply (users);
        });
      }
    }
  ]);
  next();
};

exports.register.attributes = {
  name: 'users-route',
  version: '0.0.1'
};