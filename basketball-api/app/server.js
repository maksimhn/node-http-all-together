'use strict';

// we import our node modules here
var http = require('http'),
    url = require('url'),
    port = 8888;

// we import our controllers here

// we create our http server instance
var server = http.createServer(function(request, response){
  // we parse the url ....
  var uri = url.parse(request.url, true);
  // and pass it through our router

});

// we tell our server to listen in on port 5000
server.listen(port, function(){
  console.log('We are a go!!!!!!');
});
