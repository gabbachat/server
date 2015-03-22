/*jshint -W030 */

'use strict';

var app = {};

require('../config/_settings')(app);
require('../config/environment/development')(app);

let should = require('should'),
    expect = require('chai').expect,
    socket = require('socket.io-client')(app.address);


describe('Gabba Server',function(){

  it('Should connect succesfully', function( done ){

    socket.on('connected', function(data){

      (data.connected).should.be.true; // function should return connected true
      (data.id).should.be.a.string; // function should return connection id
      done(); // all done!

    });

  });


});
