'use strict';

// we import our mongoose model here
var User = require('../models/user');

//we import our application controller here
var ApplicationController = require('./applicationController');

var UsersController = function(response, uri){
  ApplicationController.apply(this, arguments);
};

UsersController.prototype = new ApplicationController();

UsersController.prototype.setUser = function(action){
  User.findById(this.params['userId']).then(function(user){
    action(user);
  })
}

UsersController.prototype.index = function(){
  var self = this;
  User.findAll({}).then(function(users){
    self.render(users);
  });
}

UsersController.prototype.show = function(){
  var self = this;
  this.setUser(function(user){
    self.render(user);
  });
}

UsersController.prototype.destroy = function(){
  var self = this;
  this.setUser(function(user){
    user.destroy().then(function(){
      self.head();
    });
  })
}

UsersController.prototype.create = function(request){
  var self = this;
  self.gatherRequest(request, function(user){
    User.create(user).then(function(user){
      self.render(user);
    });
  });
}

module.exports = UsersController;
