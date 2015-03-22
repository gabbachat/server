'use strict';

module.exports = function ( socket, io ) {

  return {
    io : io,
    log : function ( what ) {
      console.log( what );
    },
    namespace: 'gabba',
    socket : socket
  };

};
