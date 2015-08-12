'use strict';

// we import our mongoose model here
var Team = require('../models/team');

// we import our Application Controller here
var ApplicationController = require('./applicationController');

var TeamsController = function(response, uri){
  var appCtrl = new ApplicationController(response);

  var _setTeam = function(action){
    var name = appCtrl.parseURI(uri);
    Team.findOne({name: {$regex : new RegExp(name, "i")} }, function(error, team) {
      if (error) { appCtrl.renderError(error); }
      action(team);
    });
  }

  this.index = function(){
    Team.find({}, function(err, teams){
      if (err) { renderError(err) }
      appCtrl.render(teams);
    });
  },

  this.show = function(){
    _setTeam(function(team){
      appCtrl.render(team);
    });
  },

  this.create = function(team){
    Team.create(team, function(error, team){
      if (error) { appCtrl.renderError(error); }
      appCtrl.render(team);
    });
  },

  this.destroy = function(uri){
    _setTeam(function(team){
      team.remove(function(err, team){
        if (err) { appCtrl.renderError(err) };
        appCtrl.head()
      });
    });
  }

};

module.exports = TeamsController;

