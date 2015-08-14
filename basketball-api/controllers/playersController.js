'use strict';

// we import our mongoose model here
var models = require('../models/index');

//we import our application controller constructor here
var ApplicationController = require('./applicationController');

var PlayersController = function(response, uri){
  ApplicationController.apply(this, arguments);
};

PlayersController.prototype = new ApplicationController();

PlayersController.prototype.setTeam = function(action){
  models.findOne({name: {$regex : new RegExp(this.params['teamName'], "i")} }, function(error, team) {
    if (error) {
      self.renderError(error);
    } else {
      action(team);
    }
  });
}

PlayersController.prototype.create = function(request){
  var self = this;
  self.gatherRequest(request, function(player){
    self.setTeam(function(team){
      team.players.push(player);
      team.save(function(err, team) {
        if (err) {
          self.renderError(err);
        } else {
          self.render(team, {status: 201});
        }
      });
    });
  });
}

PlayersController.prototype.destroy = function(){
  var self = this;
  self.setTeam(function(team){
    team.update({ $pull: {'players': {'jerseyNumber': self.params['jerseyNumber'] }}}, function(err){
      if (err) {
        self.renderError()
      } else {
        self.head();
      }
    });
  });
}



module.exports = PlayersController;
