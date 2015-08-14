'use strict';

var ApplicationController = function(response, uri){
  if (response) { this.response = this.grantHTTPAccess(response); }
  if (uri) { this.params = this.parseURI(uri); }
};

//responds to http request with given resource
ApplicationController.prototype.render = function(data, options){
  var status = 200;

  if (options) {
    var status = options.status || 200;
  }

  this.response.writeHead(status);
  this.response.end(JSON.stringify(data));
}

//parses the request uri into params
ApplicationController.prototype.parseURI = function(uri){
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

// chunks the incoming request data and runs a controller action when finished
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
// adds CORS headers to our response object
ApplicationController.prototype.grantHTTPAccess = function(response){
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE');
  response.setHeader('Access-Control-Request-Method', '*');
  return response;
}

// replies to http request with a head and no body
ApplicationController.prototype.head = function(options) {
  var status = 204;

  if (options) {
    var status = options.status;
  }

  this.response.writeHead(status);
  this.response.end();
}

//gives appropriate pre-flight response for options http verb requests
ApplicationController.prototype.handleOptions = function(){
  this.response.writeHead(200, {'Content-Type' : 'text/plain'});
  this.response.end("Pre-flight");
}

//responds to http request with an error code
ApplicationController.prototype.renderError = function(error, options){
  var status = 400;

  if (options) {
    var status = options.status;
  }

  this.response.writeHead(400);
  this.response.end(JSON.stringify({"error": "You done goofed!"}));
}
//responds to http request with an error code
ApplicationController.prototype.render404 = function(){
  this.response.writeHead(404);
  this.response.end(JSON.stringify({"error": "You done goofed!"}));
}



module.exports = ApplicationController;
