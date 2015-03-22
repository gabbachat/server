'use strict';

var path = require('path'),
rootPath = path.normalize(__dirname + '/..');

module.exports = function (app) {

  app.name = 'gabba'; // the name of your app

  // APP DIRECTORIES
  app.dir = {
    controllers : app.base + '/app/controllers/',
    components : app.base + '/public/components/',
    css : app.base + '/public/css/',
    img : app.base + '/public/img/',
    js : app.base + '/public/js/',
    models : app.base + '/app/models/',
    public : app.base + '/public/',
    root : app.base,
    views : app.base + '/app/views/'
  };

  app.config = {

    db : {
      adapter: 'mongo', // rethink, mongo, couch, redis, mysql, postgress
      host: 'dogen.mongohq.com', // defaults to `localhost` if omitted
      port: 10024, // defaults to 27017 if omitted
      user: 'yaketyyak', // omit if not relevant
      password: 'coasters', // omit if not relevant
      database: 'yak' // or omit if not relevant
    },

    // WHERE TO STORE FILE UPLOADS
    storage : {
      adapter : false, // s3, firebase, parse, local or false to disable
      host: false, // defaults to `localhost` if omitted
      port: false, // defaults to 27017 if omitted
      user: false, // omit if not relevant
      password: false // omit if not relevant
    },

    addons : {
      gravatar : true, // allow gravatar profile images
      images : {
        giphy : true, // allow giphy with "/giphy command"
        local : true, // allow local images to up uploaded/pasted
        web : true // embed image links pasted into messages
      },
      markdown : true, // allow markdown
      video : {
        vimeo : true, // embed vimeo links pasted into messages
        youtube : true // embed youtube links pasted into messages
      }
    },

    cache : false, // whether to use caching

    cors : false, // enable CORS - https://github.com/evert0n/koa-cors

    // defines when and where errors will be reported
    errorReporting : {
      // whether to send error message to browser, or display a generic error.
      // check the node console for errors if you set this to false.
      browser: true,

      // write errors to /log/gabba.log files
      // this needs work, doesn't log much yet
      file: true
    },

    gzip : true, // whether to enable gzip compression

    logging : {
      console : true // whether to allow gabba to log messages to the node console
    },

    port : 1982, // port to run the server on

    protocol : 'http://', // options: (http|https)

    secret : 'supercalifragilisticexpialidocious', // placeholder for now, will be implemented later

  };

};
