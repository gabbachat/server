'use strict';

const koa    = require('koa'),
      app      = koa();
      app.base = __dirname;

require('colors'); // PRETTY CONSOLE LOGGING
require('fs'); // FILE SYSTEM
require(__dirname + '/config/_settings')(app); // MAIN APP SETTINGS
process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // SET DEFAULT ENVIRONMENT

let gabba = app.gabba = require('./lib/gabba')(app); // INCLUDE POG LIB
app.log = gabba.log;
gabba.inform(app, 'start'); // START UP MESSAGE


// REQUIRED SETTINGS & CONFIG FILES
require(__dirname + '/config/environment/' + process.env.NODE_ENV)(app); // ENVIRONMENT SPECIFIC SETTINGS
require(__dirname + '/config/server')(app, gabba); // VIEW SETTINGS

app.gabba = gabba; // ADD POG OBJECT TO APP

var base = require('path').resolve(__dirname, '../../'),
    config = require( __dirname + '/app/models/config')( app ),
    Waterline = require('waterline'),
    orm = new Waterline();

    orm.loadCollection(require( __dirname + '/app/models/user.js')(app).init());
    orm.loadCollection(require( __dirname + '/app/models/message.js')(app).init());

orm.initialize(config, function(err, models) {

  app.models = models.collections;
  app.connections = models.connections;

  // START THE APP BY LISTENING ON <PORT>
  app.server = app.listen( process.env.PORT || app.config.port, function( err ) {

    if ( !err ) { // IF THERE'S NO ERRORS

      // ENABLE SOCKET.IO
      require('./app/sockets')(app);

      // TELL EVRYTHING IS GOOD TO GO
      gabba.inform(app, 'done');

    } else { // IF SOMETHING WENT WRONG!
      gabba.inform(app, 'error', err);
    }

});

});
