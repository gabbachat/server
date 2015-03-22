'use strict';

module.exports = function ( app ) {

  const mongo = require('sails-mongo');

  return {

    adapters : {
      'default': mongo,
      'mongo': mongo,
    },

    // Define an adapter to use
    connections: {
      compose : {
        adapter: app.config.db.adapter,
        host: app.config.db.host, // defaults to `localhost` if omitted
        port: app.config.db.port, // defaults to 27017 if omitted
        user: app.config.db.user, // or omit if not relevant
        password: app.config.db.password, // or omit if not relevant
        database: app.config.db.database // or omit if not relevant
      },
    },
  };

};
