var Joi = require('joi');
var Bcrypt = require('bcrypt');

exports.register = function(server, options, next) { //create and export this user.js plugin
  server.route([
    {
      method: 'GET',
      path: '/users',
      handler: function(request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db; // in index, plugins hapi-mongdb is in a hash. How does calling 'hapi-mongodb' in an array here tells the program to retrieve the right plugin? 
        db.collection('users').find().toArray(function(err, users) { //why does collection has a parameter? WDoes it meant go find all values attached to the "users" key? Or is "users" the name of the collection? 
        // is toArray() here used as a javascript or Mongodb method?
          if (err) {
            return reply('Internal Mongodb error', err);
          }
          reply(users);//why do we not use return here?
        });
      }
    },
    {
      method: 'POST',
      path: '/users',
      config: { //what is config and what is the purpose of config here? What is the advantage of using config here over handler?
        handler: function(request, reply) {
          var db = request.server.plugins['hapi-mongodb'].db;
          var user = {
            username: request.payload.user.username,
            email: request.payload.user.email,
            password: request.payload.user.password
          };
          db.collection('users').insert(user, function(err, doc) {
            if (err) {
              return reply('Internal Mongodb error', err)
            }
            reply(doc); //Is doc a parameter? What is it referencing to? What is the purpose of inserting doc here? 
          });
        }
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'users-route',
  version: '0.0.1'
};