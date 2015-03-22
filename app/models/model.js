'use strict';

module.exports = function (app) {

  const fs = require('fs'),
        base = require('path').resolve(__dirname, '../../'),
        config = require( base + '/app/models/config')(app),
        mongo = require('sails-mongo'),
        Waterline = require('waterline');

  var orm = new Waterline();

  var User = Waterline.Collection.extend({

    identity: 'user',
    connection: 'compose',

    attributes: {
      first_name: 'string',
      last_name: 'string'
    }

  });

  orm.loadCollection(User);


  return {

    connect : function( cb ) {

      var self = this;

      // connect to db
      orm.initialize(config, function(err, models) {

        if (err) {
          console.log(err);
        } else {
          cb(models.collections);
        }

      });

    },

    find : function ( user_id ) {

      var self = this;

      self.connect(function(model) {
        model.user.find()
          .where({ user_id: user_id })
          .exec(function(err, users) {
            if (err) {
              console.log(err);
            } else {
              console.log(users);
            }
        });
      });


    }

  };


};
