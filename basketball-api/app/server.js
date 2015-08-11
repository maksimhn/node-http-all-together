'use strict';

// we import our node modules here
var http = require('http'),
    url = require('url'),
    queryString = require('querystring'),
    port = 5000;

// we import our mongoose model here
var Team = require('../models/team');

// we import our sequelize model here
var User = require('../models/user');
var Ownership = require('../models/ownership');

// we create our http server instance
var server = http.createServer(function(request, response){
  // we use the url module to parse the request url into host, pathname and search attributes
  var parsedURL = url.parse(request.url, true);

  if (parsedURL.pathname === "/teams" && request.method === "GET") {

    Team.find({}, function(err, teams){

      if (err) {
        response.writeHead(400);
        response.end(JSON.stringify({"error": "You done goofed!"}));
      }

      response.writeHead(200);
      response.end(JSON.stringify(teams));
    });
  } else if (parsedURL.pathname.match(/(\/teams\/)\w+/) && request.method === "GET") {
    // we get the name from the url
    var name = parsedURL.pathname.split("/")[2];

    // we make a case insensitive query
    Team.find({name: {$regex : new RegExp(name, "i")} }, function(err, team){

      if (err) {
        response.writeHead(400);
        response.end(JSON.stringify({"error": "You done goofed!"}));
      }

      response.writeHead(200);
      response.end(JSON.stringify(team));
    });
  } else if (parsedURL.pathname === "/teams" && request.method === "POST") {

    var postDataString = ""
    request.setEncoding('utf8');

    request.on('data', function(dataChunk){
      postDataString += dataChunk;
    });

    request.on('end', function(){
      //Do something to the data.
      var postData = JSON.parse(postDataString);
      var team = new Team();
      team.name = postData.name;
      team.city = postData.city;

      team.save(function(error, team){
        if (error) {
          response.writeHead(400);
          response.end(JSON.stringify({"error": "You done goofed!"}));
        }

        response.writeHead(201);
        response.end(JSON.stringify(team));
      });

    });
  } else if (parsedURL.pathname.match(/(\/teams\/)\w+/) && request.method === "POST") {

    var name = parsedURL.pathname.split("/")[2];

    var postDataString = ""
    request.setEncoding('utf8'); // Read as text.

    request.on('data', function(dataChunk){
      postDataString += dataChunk;
    });

    request.on('end', function(){
      Team.findOne({name: {$regex : new RegExp(name, "i")} }, function(error, team) {
        if (error) {
          response.writeHead(400);
          response.end(JSON.stringify({"error": "You done goofed!"}));
        }

        var postData = JSON.parse(postDataString);
        var player = {};
        player.name = postData.name;
        player.position = postData.position;
        player.jerseyNumber = postData.jerseyNumber;

        team.players.push(player);

        team.save(function(err, team) {
          if (err) {
            response.writeHead(400);
            response.end(JSON.stringify({"error": "You done goofed!"}));
          }

          response.writeHead(201);
          response.end(JSON.stringify(team));
        });
      });
    });

  } else if (parsedURL.pathname.match(/(\/teams\/)\w+/) && request.method === "DELETE") {

    var name = parsedURL.pathname.split("/")[2];

    // we make a case insensitive query
    Team.findOneAndRemove({name: {$regex : new RegExp(name, "i")} }, function(err, team){
      team.remove();
      if (err) {
        response.writeHead(400);
        response.end(JSON.stringify({"error": "You done goofed!"}));
      }

      response.writeHead(204);
      response.end(JSON.stringify({"message": "team has been destroyed"}));
    });

  } else if (parsedURL.pathname === "/users" && request.method === "GET") {
    User.findAll({}).then(function(users){
      console.log('yay');
      response.writeHead(200);
      response.end(JSON.stringify(users));
    }, function(error){
      console.log(error);
      response.writeHead(400);
      response.end(JSON.stringify({"error": "You done goofed!"}));
    });
  } else if (parsedURL.pathname === "/users" && request.method === "POST"){

    var postDataString = ""
    request.setEncoding('utf8');

    request.on('data', function(dataChunk){
      postDataString += dataChunk;
    });

    request.on('end', function(){
      var postData = JSON.parse(postDataString);
      var user = {};
      user.firstName = postData.firstName;
      user.lastName = postData.lastName;
      user.email = postData.email;

      User.create(user).then(function(user){
        response.writeHead(201);
        response.end(JSON.stringify(user));
      });

    });

  } else if (parsedURL.pathname.match(/(\/users\/)\d+(\/teams)/) && request.method === "POST"){

    var id = parsedURL.pathname.split("/")[2];
    var postDataString = "";
    request.setEncoding('utf8');

    request.on('data', function(dataChunk){
      postDataString += dataChunk;
    });

    request.on('end', function(){
      var postData = JSON.parse(postDataString);
      var team = {};
      team.name = postData.name;
      team.city = postData.city;

      Team.create(team, function(err, team){

        if (err) {
          response.writeHead(400);
          response.end(JSON.stringify({"error": "You done goofed!"}));
        }

        var ownership = {
          userId: id,
          teamId: team._id.toString()
        };

        Ownership.create(ownership).then(function(ownership){
          response.writeHead(201);
          response.end(JSON.stringify(ownership));
        }, function(err){
          console.log(err);
          response.writeHead(400);
          response.end(JSON.stringify({"error": "You done goofed!"}));
        });
      });
    });

  } else if (parsedURL.pathname.match(/(\/users\/)\d+(\/teams)/) && request.method === "GET"){

    var id = parsedURL.pathname.split("/")[2];

    Ownership.findAll({
      where: {
        userId: id
      }
    }).then(function(ids){
      var ids = ids.map(function(element){
        return element.teamId;
      });
      Team.find({
        _id: {
          $in: ids
        }
      }, function(err, teams){

        if (err) {
          response.writeHead(400);
          response.end(JSON.stringify(err));
        }

        response.writeHead(200);
        response.end(JSON.stringify(teams));
      });
    });


  } else {
    response.writeHead(404);
    response.end(JSON.stringify({"error": "You done goofed!"}));
  }

});


// we tell our server to listen in on port 5000
server.listen(port, function(){
  console.log('We are a go!!!!!!');
});



