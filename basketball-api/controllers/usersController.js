'use strict';

// we import our mongoose model here
var User = require('../models/user');

//we import our application controller here
var ApplicationController = require('./ApplicationController');

var UsersController = function(response, uri){
  var appCtrl = new ApplicationController(response);

  var _setUser = function(action){
    var id = appCtrl.parseURI(uri);
    console.log('get');
    User.findById(id).then(function(user){
      action(user);
    })
  }

  this.index = function(){
    User.find({}).then(function(users){
      appCtrl.render(users);
    })
  }

  this.show = function(){
    _setUser(function(user){
      appCtrl.render(user);
    });
  }

  this.destroy = function(){
    _setUser(function(user){
      user.destroy().then(function(){
        appCtrl.head();
      });
    })
  }

  this.create = function(user){
    User.create(user).then(function(user){
      appCtrl.render(user);
    });
  }

}

module.exports = UsersController;
