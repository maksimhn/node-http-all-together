'use strict';

// we import our mongoose model here
var Team = require('../models/team');
var Ownership = require('../models/ownership');

// we import our Application Controller here
var ApplicationController = require('./applicationController');

var TeamsController = function(response, uri){
  ApplicationController.apply(this, arguments);
};

TeamsController.prototype = new ApplicationController();

TeamsController.prototype.setTeam = function(action){
  Team.findOne({name: {$regex : new RegExp(this.params['teamName'], "i")} }, function(error, team) {
    if (error) {
      self.renderError(error);
    } else {
      action(team);
    }
  });
}

TeamsController.prototype.index = function(){
  var self = this;
  Team.find({}, function(err, teams){
    if (err) {
      self.renderError(err)
    } else {
      self.render(teams);
    }
  });
}

TeamsController.prototype.show = function(){
  var self = this;
  this.setTeam(function(team){
    self.render(team);
  });
}

TeamsController.prototype.create = function(request){
  var self = this;
  self.gatherRequest(request, function(team){
    Team.create(team, function(error, team){
      if (error) {
        self.renderError(error);
      } else {
        self.render(team);
      }
    });
  });
}

TeamsController.prototype.findByUserID = function(){
  var self = this;
  Ownership.findAll({where: {userId: self.params['id']} }).then(function(ownerships){
    var ids = ownerships.map(function(ownership){
      return ownership.teamId;
    });
    Team.find({'_id': { $in: ids }}, function(err, teams){
      if (err) {
        self.renderError();
      } else {
        self.render(teams);
      }
    });
  });
}

TeamsController.prototype.freeTeams = function(){
  var self = this;
  Ownership.findAll({where: {} }).then(function(ownerships){
    if (ownerships){
      var ids = ownerships.map(function(ownership){
        return ownership.teamId;
      });
    } else {
      ids = [];
    }
    Team.find({'_id': { $nin: ids}}, function(err, teams){
      if (err) {
        console.log(err);
        self.renderError();
      } else {
        self.render(teams);
      }
    });
  });
}


TeamsController.prototype.destroy = function(uri){
  var self = this;
  this.setTeam(function(team){
    team.remove(function(err, team){
      if (err) {
        self.renderError(err)
      } else {
        self.head()
      }
    });
  });
}

module.exports = TeamsController;

