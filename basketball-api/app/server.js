'use strict';

// we import our node modules here
var http = require('http'),
    url = require('url'),
    port = 5000;

// we import our controllers here
var TeamsController = require('../controllers/teamsController');
var PlayersController = require('../controllers/playersController');
var UsersController = require('../controllers/usersController');


// we create our http server instance
var server = http.createServer(function(request, response){

  var chunkDataBeforeAction = function(controllerAction){
    var postDataString = "";
    request.setEncoding('utf8');

    request.on('data', function(dataChunk){
      postDataString += dataChunk;
    });

    request.on('end', function(){
      var parsedData = JSON.parse(postDataString)
      controllerAction(parsedData);
    });
  };

  var responseWith404 = function(){
    response.writeHead(404);
    response.end(JSON.stringify({"error": "You done goofed!"}));
  };

  // we parse the url ....
  var uri = url.parse(request.url, true);
  // and pass it through our router
  switch (uri.pathname) {
    case "/teams":
      var teamsController = new TeamsController(response, uri);
      switch (request.method) {
        case "GET":
          teamsController.index();
          break;
        case "POST":
          chunkDataBeforeAction(teamsController.create);
          break;
        default:
          responseWith404()
          break;
      }
      break;
    //
    case uri.pathname.match(/(\/teams\/)\w+/) ? uri.pathname.match(/(\/teams\/)\w+/)[0] : null:
      var teamsController = new TeamsController(response, uri);
      switch (request.method) {
        case "GET":
          teamsController.show();
          break;
        case "DELETE":
          teamsController.destroy()
          break;
        default:
          responseWith404()
          break;
      }
      break;
    case uri.pathname.match(/(\/teams\/)\w+(\/players)/) ? uri.pathname.match(/(\/teams\/)\w+(\/players)/)[0] : null:
      var playersController = new PlayersController(response, uri);
      switch (request.method) {
        case "POST":
          chunkDataBeforeAction(playersController.create);
          break;
        default:
          responseWith404()
          break;
      }
      break;
    case "/users":
      var usersController = new UsersController(response, uri);
      switch (request.method) {
        case "GET":
          usersController.index();
          break;
        case "POST":
          chunkDataBeforeAction(usersController.create);
          break;
        default:
          responseWith404()
          break;
      }
      break;
    case uri.pathname.match(/(\/users\/)\d+/) ? uri.pathname.match(/(\/users\/)\d+/)[0] : null:
      var usersController = new UsersController(response, uri);
      switch (request.method) {
        case "GET":
          usersController.show();
          break;
        case "DELETE":
          usersController.destroy();
          break;
        default:
          responseWith404()
          break;
      }
      break;
    default:
      responseWith404()
      break;
  }

});

// we tell our server to listen in on port 5000
server.listen(port, function(){
  console.log('We are a go!!!!!!');
});



