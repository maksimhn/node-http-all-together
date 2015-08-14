'use strict';

// we import our mongoose model here
var models = require('../models/index');

// we import our Application Controller here
var ApplicationController = require('./applicationController');

var TeamsController = function(response, uri){
  ApplicationController.apply(this, arguments);
};

TeamsController.prototype = new ApplicationController();

TeamsController.prototype.setTeam = function(action){
  models.Team.findOne({name: {$regex : new RegExp(this.params['teamName'], "i")} }, function(error, team) {
    if (error) {
      self.renderError(error);
    } else {
      action(team);
    }
  });
}

TeamsController.prototype.index = function(){
  var self = this;
  models.Team.find({}, function(err, teams){
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
    models.Team.create(team, function(error, team){
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
  models.Ownership.findAll({where: {UserId: self.params['id']} }).then(function(ownerships){
    var ids = ownerships.map(function(ownership){
      return ownership.teamId;
    });
    models.Team.find({'_id': { $in: ids }}, function(err, teams){
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
  models.Ownership.findAll({where: {} }).then(function(ownerships){
    if (ownerships){
      var ids = ownerships.map(function(ownership){
        return ownership.teamId;
      });
    } else {
      ids = [];
    }
    models.Team.find({'_id': { $nin: ids}}, function(err, teams){
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
