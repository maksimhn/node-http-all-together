'use strict';

// we import our node modules here
var http = require('http'),
    url = require('url'),
    port = 8888;

// we import our controllers here
var ApplicationController = require('../controllers/applicationController');
var TeamsController = require('../controllers/teamsController');
var PlayersController = require('../controllers/playersController');
var UsersController = require('../controllers/usersController');
var OwnershipsController = require('../controllers/ownershipsController');

var db = require('../models/index');
// we create our http server instance
var server = http.createServer(function(request, response){
  // we parse the url ....
  var uri = url.parse(request.url, true);
  // and pass it through our router
  switch (uri.pathname) {
    case "/teams":
      var teamsController = new TeamsController(response, uri);
      switch (request.method) {
        case "GET":
          uri.query.id ? teamsController.findByUserID() : teamsController.freeTeams();
          break;
        case "POST":
          teamsController.create(response);
          break;
        default:
          teamsController.render404();
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
        case "OPTIONS":
          teamsController.handleOptions();
          break;
        default:
          teamsController.render404();
          break;
      }
      break;
    case uri.pathname.match(/(\/teams\/)\w+(\/players)/) ? uri.pathname.match(/(\/teams\/)\w+(\/players)/)[0] : null:
      var playersController = new PlayersController(response, uri);
      switch (request.method) {
        case "POST":
          playersController.create(request);
          break;
        case "OPTIONS":
          playersController.handleOptions();
          break;
        default:
          playersController.render404();
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
          usersController.create(request);
          break;
        default:
          usersController.render404();
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
        case "OPTIONS":
          usersController.handleOptions();
          break;
        default:
          usersController.render404();
          break;
      }
      break;
    case uri.pathname.match(/(\/teams\/)\w+(\/players\/)\d+/) ? uri.pathname.match(/(\/teams\/)\w+(\/players\/)\d+/)[0] : null:
      var playersController = new PlayersController(response, uri);
      switch (request.method) {
        case "DELETE":
          playersController.destroy();
          break;
        case "OPTIONS":
          playersController.handleOptions();
          break;
        default:
          playersController.render404();
          break;
      }
      break;
    case uri.pathname.match(/(\/users\/)\d+(\/teams\/)\w+(\/ownerships)/) ? uri.pathname.match(/(\/users\/)\d+(\/teams\/)\w+(\/ownerships)/)[0] : null:
      var ownershipsController = new OwnershipsController(response, uri);
      switch (request.method) {
        case "DELETE":
          ownershipsController.destroy();
          break;
        case "OPTIONS":
          ownershipsController.handleOptions();
          break;
        default:
          ownershipsController.render404();
          break;
      }
      break;
    case '/ownerships':
      var ownershipsController = new OwnershipsController(response, uri);
      switch (request.method) {
        case "POST":
          ownershipsController.create(request);
          break;
        case "OPTIONS":
          ownershipsController.handleOptions();
          break;
        default:
          ownershipsController.render404();
          break;
      }
      break;
    default:
      var applicationController = new ApplicationController(response, uri);
      applicationController.render404();
      break;
  }

});

// we tell our server to listen in on port 5000
server.listen(port, function(){
  console.log('We are a go!!!!!!');
});
