'use strict';

// we import our mongoose model here
var models = require('../models/index');

//we import our application controller here
var ApplicationController = require('./applicationController');

var UsersController = function(response, uri){
  ApplicationController.apply(this, arguments);
};

UsersController.prototype = new ApplicationController();

UsersController.prototype.setUser = function(action){
  models.User.findById(this.params['userId']).then(function(user){
    action(user);
  }, function(err){
    self.renderError(err);
  });
}

UsersController.prototype.index = function(){
  var self = this;
  models.User.findAll({}).then(function(users){
    self.render(users);
  }, function(err){
    self.renderError(err);
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
    }, function(err){
      self.renderError(err);
    });
  })
}

UsersController.prototype.create = function(request){
  var self = this;
  self.gatherRequest(request, function(user){
    models.User.create(user).then(function(user){
      self.render(user);
    }, function(err){
      self.renderError(err);
    });
  });
}

module.exports = UsersController;
