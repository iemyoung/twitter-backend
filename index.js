var Hapi = require('hapi'); 
var server = new Hapi.Server();

server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || 3000, 
  routes: {
    // headers: ["Access-Control-Allow-Credentials"],
    // credentials: true
    cors: true
  }
});

var plugins = [ // if register and "url" are both keys why is register NOT in ""? 
  { register: require('./routes/user.js') }, //is "register" a key by convention? 
  { register: require('hapi-mongodb'),
    options: {
      "url": process.env.MONGOLAB_URI || "mongodb://127.0.0.1:27017/twitter-back-end", //last part, twitter, does it refer to the folder where the files are stored?
      "settings": {
        "db": {
          "native_parser": false // Is this saying: do you want me to build a data structure for the local database? 
        }
      }
    }
  }
];

server.register(plugins, function(err) {
  if (err) {
    throw err;
  }

  server.start(function(){
    console.log('info', 'Server running at: ' + server.info.uri); //need to memorize syntax
    // question: what is 'info'? --> like a parameter or a variable? Does it call upon the info in "server.info.uri"? what does "server.info.uri" mean? 
  });
});