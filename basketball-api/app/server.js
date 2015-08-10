'use strict';

// we import our node modules here
var http = require('http'),
    url = require('url'),
    queryString = require('querystring'),
    port = 5000;

// we import our model here
var Team = require('../lib/team');

// we create our http server instance
var server = http.createServer(function(request, response){

  // we use the url module to parse the request url into host, pathname and search attributes
  var parsedURL = url.parse(request.url, true);

});

server.listen(port);

