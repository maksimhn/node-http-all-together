'use strict';

var ApplicationController = function(response){

  this.render = function(data, options){
    var status = 200;

    if (options) {
      var status = options.status || 200;
    }

    response.writeHead(status);
    response.end(JSON.stringify(data));
  }

  this.head = function(options) {
    var status = 204;

    if (options) {
      var status = options.status;
    }

    response.writeHead(status);
    response.end();
  }

  this.renderError = function(error, options){
    var status = 400;

    if (options) {
      var status = options.status;
    }

    response.writeHead(400);
    response.end(JSON.stringify({"error": "You done goofed!"}));
  }

  this.parseURI = function(uri){
    return uri.pathname.split("/")[2];
  }

};

module.exports = ApplicationController;
