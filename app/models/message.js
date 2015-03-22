'use strict';

module.exports = function ( app ) {

  const fs = require('fs'),
        base = require('path').resolve(__dirname, '../../'),
        config = require( base + '/app/models/config')(app),
        User = require( base + '/app/models/user.js')(app),
        moment = require('moment'),
        gravatar = require('gravatar'),
        Puid =require('puid'),
        Waterline = require('waterline');


  return {

    init : function( ) {

      // CREATE A NEW COLLECTION
      return Waterline.Collection.extend({

        identity: 'message',
        connection: 'compose',

        // ACTUAL SCHEMA IS DEFINED HERE
        attributes: {
          msg_id : 'string',
          message: 'text',
          room_id: 'string',
          user: 'json'
        }

      });

    },

    recent : function ( cb ) {

      var self = this;

      app.models.message.find()
        .exec(function (err, data) {
          if (err) {
            return err;
          } else {
            return cb(data);
          }
      });

    },

    findOne : function ( message_id, cb ) {

      var self = this;

      app.models.message.findOne()
        .where({ message_id: message_id })
        .exec(function (err, data) {
          if (err) {
            return err;
          } else {
            return cb(data);
          }
      });

    },


    create : function ( data, cb ) {

      console.log('save message to db: ');

      var self = this,
          puid = new Puid();

      data.msg_id  = puid.generate();

      console.log(data);

      app.models.message.create(data)
        .exec(function(err, data) {
          if (err) {
            return err;
          } else {
            return cb(data);
          }
      });

    },


    query : function ( query, cb ) {

      var self = this;

      app.models.message.find()
        .where( query )
        .exec(function (err, data) {
          if (err) {
            return err;
          } else {
            return cb(data);
          }
      });

    },

    update : function ( query, data, cb ) {

      var self = this;

      app.models.message.update(query, data, function(err, model) {
        if (err) {
          return err;
        } else {
          return cb(data);
        }
      });

    }

  };


};
