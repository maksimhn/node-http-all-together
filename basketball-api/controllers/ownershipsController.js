'use strict';

// we import our ownership model
var models = require('../models/index');

//we import our application controller constructor here
var ApplicationController = require('./applicationController');

var OwnershipsController = function(response, uri){
  ApplicationController.apply(this, arguments);
};

OwnershipsController.prototype = new ApplicationController();

OwnershipsController.prototype.setOwnership = function(action){
  var self = this;
  models.Team.find({name: self.params['teamName']}, function(err, team){
    models.Ownership.findOne({UserId: self.params['id'], teamId: team._id}).then(function(ownership){
      action(ownership);
    });
  });
}

OwnershipsController.prototype.destroy = function(){
  var self = this;
  self.setOwnership(function(ownership){
    ownership.destroy().then(function(){
      self.head();
    });
  });
}

OwnershipsController.prototype.create = function(request){
  var self = this;
  self.gatherRequest(request, function(postData){
    models.Team.findOne({name: postData['teamName']}, function(err, team){
      console.log(team);
      models.Ownership.create({UserId: postData['userId'], teamId: team._id.toString()}).then(function(ownership){
        self.render(ownership, {status: 201});
      });
    });
  });
}

module.exports = OwnershipsController;
