'use strict';

// we import our ownership model
var Ownership = require('../models/ownership');

var Team = require('../models/team');

//we import our application controller constructor here
var ApplicationController = require('./applicationController');

var OwnershipsController = function(response, uri){
  ApplicationController.apply(this, arguments);
};

OwnershipsController.prototype = new ApplicationController();

OwnershipsController.prototype.setOwnership = function(action){
  var self = this;
  Team.find({name: self.params['teamName']}, function(err, team){
    Ownership.findOne({userid: self.params['id'], teamId: team._id}).then(function(ownership){
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
    Team.findOne({name: postData['teamName']}, function(err, team){
      console.log(team);
      Ownership.create({userId: postData['userId'], teamId: team._id.toString()}).then(function(ownership){
        self.render(ownership, {status: 201});
      });
    });
  });
}

module.exports = OwnershipsController;


