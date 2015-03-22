'use strict';

module.exports = function ( app, gabba ) {

  const socket = gabba.socket,
        io = gabba.io,
        log = gabba.log,
        namespace = gabba.namespace;


  return {

    init : function () {


      this.join(); // JOIN A ROOM

    },

    join : function() {

      const Room = this;

      socket.on('room:join', function(data) {


        let user_id = data.user_id,
            room_id = data.room_id;


        // JOIN ROOM(S)
        socket.join(namespace + ':' + room_id);
        socket.join(namespace + ':' + room_id + ':' + user_id);

        Room.welcome( namespace + ':' + room_id + ':' + user_id, data );
        Room.broadcast( namespace + ':' + room_id, data );

      });

    },


    welcome : function( room, data ) {

      io.to( room ).emit('room:welcome', data);

    },

    broadcast : function( room, data ) {

      io.to( room ).emit('room_id:broadcast', {
        user_id : data.user_id,
        room_id : data.room_id,
        message : 'Welcome to the ' + data.room_id + ' channel!'
      });

    }


  };

};
