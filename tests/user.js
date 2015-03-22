/*jshint -W030 */

'use strict';

var app = {};

require('../config/_settings')(app);
require('../config/environment/development')(app);

let should = require('should'),
    expect = require('chai').expect,
    namespace = 'gabba',
    socket = require('socket.io-client')(app.address);


describe('Gabba Server',function(){

  it('Should allow user to login', function( done ){

    socket.emit('user:login', { email : 'jesse@jesseweed.com', user_id : 'Jesse Weed', room_id : 'main' });

    socket.on('user:connected', function(data){

      console.log('object length: ');
      console.log(data);

      (data).should.be.an.object;

      // ENSURE EXPECTED DATA IS RETURNED
      (data.avatar).should.be.a.string;
      (data.createdAt).should.be.a.string;
      (data.email).should.be.a.string;
      (data.logged_in).should.be.a.boolean;
      (data.name).should.be.a.string;
      (data.room_id).should.be.a.string;
      (data.session_id).should.not.exist;
      (data.updatedAt).should.be.a.string;
      (data.user_id).should.be.a.string;
      (data.id).should.be.a.string;

      done();

    });

  });


  // CLIENT
  // Socket.emit('user:login', { email : email, user_id : user, room_id : room_id });
  // Socket.on('user:connected', function( data ) {


  // SERVER
  // socket.on('user:login', function(data)
  // io.to('gabba:' + user_id).emit('user:connected', data);


});
