'use strict';

module.exports = function(app) {

  // GZIP
  if ( app.config.gzip === true ) app.use( require('koa-gzip')() );

  // ENABLE CORS
  if ( app.config.cors === true ) app.use(require('koa-cors')());

};
