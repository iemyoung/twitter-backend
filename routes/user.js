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
            username: request.payload.users.username, //were postman "users[username]", do we put users here as well? or simply user?
            email: request.payload.users.email,
            password: request.payload.users.password
          };
          var uniqUserQuery = { $or: [{username: user.username}, {email: user.email}] }; //why user and not user? is it because the user refers back to the variable user we created and it's calling the username key of that variable? 
          db.collection('users').count(uniqUserQuery, function(err, userExist){
            if (userExist) {
              return reply('Error: Username Already Exists', err);
            }
          
            db.collection('users').insert(user, function(err, doc) {
              if (err) {
                return reply('Internal Mongodb error', err)
              }
              reply(doc); //Is doc a parameter? What is it referencing to? What is the purpose of inserting doc here? 
            });
          });
        }
      }
    }
  ]);

  next();
};

exports.register.attributes = { //when you say attributes, are you referring to the attributes of this document? Where would the following information appear? In other words, why is it even useful? Like a readme document? 
  name: 'users-route',
  version: '0.0.1'
};