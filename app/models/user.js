'use strict';

module.exports = function ( app ) {

  const fs = require('fs'),
        base = require('path').resolve(__dirname, '../../'),
        config = require( base + '/app/models/config')(app),
        gravatar = require('gravatar'),
        Waterline = require('waterline');


  return {

    init : function( ) {

      // CREATE A NEW COLLECTION
      return Waterline.Collection.extend({

        identity: 'user',
        connection: 'compose',

        // ACTUAL SCHEMA IS DEFINED HERE
        attributes: {
          user_id: 'string',
          email: 'string',
          room_id: 'string',
          name: 'string',
          avatar : 'string',
          session_id: 'string',
          logged_in: 'boolean',
        }

      });

    },

    list : function ( cb ) {

      var self = this;

      app.models.user.find()
        .exec(function (err, data) {
          if (err) {
            return err;
          } else {
            return cb(data);
          }
      });

    },

    findOne : function ( user_id, cb ) {

      var self = this;

      user_id = user_id.split(' ').join('').toLowerCase();

      app.models.user.findOne()
        .where({ user_id: user_id })
        .exec(function (err, data) {
          if (err) {
            return err;
          } else {
            return cb(data);
          }
      });

    },


    create : function ( data, cb ) {

      console.log(data);

      var self = this;

      data.user_id = data.user_id.split(' ').join('').toLowerCase();

      data.avatar = gravatar.url(data.email, {
        'size': 200,
        'default': 'http://yakk.herokuapp.com/img/avatars/users/default.png'
      });

      app.models.user.create(data)
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

      app.models.user.find()
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

      console.log('update user with data: ');
      console.log(data);

      var self = this;

      app.models.user.update(query, data, function(err, model) {
        if (err) {
          return err;
        } else {
          return cb(data);
        }
      });

    }

  };


};
