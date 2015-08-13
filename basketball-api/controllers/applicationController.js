'use strict';

var ApplicationController = function(response, uri){
  this.response = response;
  this.params = this.parseURI(uri);
};

ApplicationController.prototype.render = function(data, options){
  var status = 200;

  if (options) {
    var status = options.status || 200;
  }

  this.response.writeHead(status);
  this.response.end(JSON.stringify(data));
}

ApplicationController.prototype.parseURI = function(uri){
  var uri = uri || {pathname: '/dummy'};
  var parsedURI = uri.pathname.split("/");
  var params = {};
  for ( var i = 0; i < parsedURI.length; i++ ) {
    if (parsedURI[i] === 'users') {
      parsedURI[i + 1] ? params.userId = parsedURI[i + 1] : undefined;
    }
    if (parsedURI[i] === 'teams') {
      parsedURI[i + 1] ? params.teamName = parsedURI[i + 1] : undefined;
    }
    if (parsedURI[i] === 'players') {
      parsedURI[i + 1] ? params.jerseyNumber = parsedURI[i + 1] : undefined;
    }
  }
  if (uri.query) {
    for (var key in uri.query) {
      params[key] = uri.query[key];
    }
  }
  return params;
}

ApplicationController.prototype.gatherRequest = function(request, controllerAction){
  var postDataString = "";
  request.setEncoding('utf8');

  request.on('data', function(dataChunk){
    postDataString += dataChunk;
  });

  request.on('end', function(){
    var parsedData = JSON.parse(postDataString)
    controllerAction(parsedData);
  });
}

ApplicationController.prototype.head = function(options) {
  var status = 204;

  if (options) {
    var status = options.status;
  }

  this.response.writeHead(status);
  this.response.end();
}

ApplicationController.prototype.renderError = function(error, options){
  var status = 400;

  if (options) {
    var status = options.status;
  }

  this.response.writeHead(400);
  this.response.end(JSON.stringify({"error": "You done goofed!"}));
}

module.exports = ApplicationController;
