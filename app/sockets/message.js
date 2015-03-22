'use strict';

module.exports = function ( app, gabba ) {

  const base = require('path').resolve(__dirname, '../../'),
        colors = require('colors'),
        socket = gabba.socket,
        io = gabba.io,
        log = gabba.log,
        md = require('markdown-it')({linkify:true, breaks: true}),
        emoji = require('markdown-it-emoji'),
        video = require('markdown-it-video'),
        Model = require( base + '/app/models/message.js')(app),
        User = require( base + '/app/models/user.js')(app),
        namespace = gabba.namespace;
        md.use(emoji);
        md.use(video);
        md.use(require('markdown-it-hashtag'));


    // set where hashtags should go
    md.renderer.rules.hashtag_open  = function(tokens, idx) {
      var tagName = tokens[idx].content.toLowerCase();
      return '<a href="/group/' + tagName + '" class="tag">';
    };


  return {

    init : function () {
      this.send();
      this.fetchAll();
    },


    fetchAll : function ( ) {

      var Message = this;

      socket.on('message:fetchAll', function(data) {

        var room_id = data.room_id,
            user_id = data.user_id;


        Model.query({
          room_id : room_id
        }, function(msg_data) {

          Message.broadcastAll(user_id, room_id, msg_data);
        });

      });

    },

    // BROADCAST MESSAGE TO ROOM
    send : function() {

      var Message = this;

      socket.on('message:send', function(data) {

        console.log('message:send');

        // IF IMAGE LINK
        if ( app.config.addons.images.web && data.message.search(/(https?:\/\/.*\.(?:png|jpg|gif))/i) >= 0) {

          var arr = data.message.split(/(https?:\/\/.*\.(?:png|jpg|gif))/i);

          data.message = arr[0] + '[![' + arr[1] +'](' + arr[1] + ')' + arr[2] + '](' + arr[1] + ')';

          data.message = data.message.split('\n').join('');

        }

        // IF YOUTUBE
        if ( data.message.search('youtube.com') >= 0 || data.message.search('youtu.be') >= 0) {
          console.log('youtube link');
        }

        // send a giphy
        if ( data.message.search('/giphy') === 0 ) {

          var term = data.message.split('/giphy ');

          require( 'giphy' )( 'dc6zaTOxFJmzC' ).search( { q : term[1]}, function( err, result ) {

            var img = result.data.length;

            var num = Math.floor(Math.random() * (img-1 - 0 + 1)) + 0;

            var gif;

            if (result.data[num]) {
              gif = result.data[num].images.original.url;
            } else if (result.data[0]) {
              gif = result.data[0].images.original.url;
            } else {
              data.message = '##### failed to load giphy :(';
            }


            data.message = '/giphy ' + term[1] + '\n';
            data.message = data.message +'[![' + gif + '](' + gif + ')](' + result.data[num].url + ')';


            User.findOne( data.user_id, function( user ) {

              Message.save({
                user : user,
                message : md.render(data.message),
                room_id : data.room_id
              }, function(msg_data) {
                msg_data.message = msg_data.message;
                io.to( namespace + ':' + data.room_id ).emit( data.room_id + ':broadcast', msg_data);
              });

            });

          });

        } else {


          User.findOne( data.user_id, function( user ) {

            Message.save({
              user : user,
              message : md.render(data.message),
              room_id : data.room_id
            }, function(msg_data) {
              msg_data.message = msg_data.message;
              io.to( namespace + ':' + data.room_id ).emit( data.room_id + ':broadcast', msg_data);
            });

          });


        }

      });

    },

    broadcastAll : function ( user_id, room_id, data ) {

      console.log('broadcastAll');
      console.log(namespace + ':' + room_id);
      // console.log(room_id + ':fetchAll', data);
      io.to( namespace + ':' + room_id + ':' + user_id ).emit( room_id + ':fetchAll', data);
      // console.log(data);


    },

    save : function( data, cb ) {

      Model.create( data, cb );

    },


  };

};
