'use strict';

// we import our mongoose model here
var Team = require('../models/team');

//we import our application controller constructor here
var ApplicationController = require('./applicationController');

var PlayersController = function(response, uri){
  var appCtrl = new ApplicationController(response);

  var _setTeam = function(action){
    var name = appCtrl.parseURI(uri);
    Team.findOne({name: {$regex : new RegExp(name, "i")} }, function(error, team) {
      if (error) { appCtrl.renderError(error); }
      action(team);
    });
  }

  this.create = function(player){
    _setTeam(function(team){
      team.players.push(player);
      team.save(function(err, team) {
        if (err) { appCtrl.renderError(err); }
        appCtrl.render(team, {status: 201});
      });
    })
  }


};

module.exports = PlayersController
