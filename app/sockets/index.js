'use strict';

module.exports = function (app, session) {

  const io = require('socket.io')(app.server),
        colors = require('colors');

  console.log('sockets/index.js loaded');

  // ON CONNECTION
  io.on('connection', function (socket) {

    console.log('connected with id ' + socket.id);

    // TELL CLIENT WE'RE CONNECTED
    socket.emit('connected', {
      connected : true,
      id : socket.id
    });

    console.log('socket connected');

    var session_id = socket.id;

    // INCLUDE SOCKET MODULES
    const Socket = require( __dirname + '/config.js' )( socket, io ),
          Message = require( __dirname + '/message.js' )( app, Socket ),
          Room = require( __dirname + '/room.js' )( app, Socket ),
          User = require( __dirname + '/user.js' )( app, Socket );

    // ERROR HANDLER
    socket.on('error', function (err){

      console.log('Error:'.red);
      console.log(err.message);

      io.to('gabba').emit('error', {
        err : err.message
      });

    });

    // HANDLE DISCONNECTIONS
    socket.on('disconnect', function (socket){
      console.log('USER DISCONNECTED!');
      console.log(session_id + ' disconnected');
      User.logout(session_id);
    });

    // INITIALIZE SOCKETS
    User.init();
    Message.init();
    Room.init();

  });

};
