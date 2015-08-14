"use strict";
// we import our mongodb module and connect to our database here
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basketballapp');

// we import our sequelize module and connect to our database here
var Sequelize = require("sequelize");
var sequelize = new Sequelize('basketballapp', 'maxblaushild', 'G00drich1', {
  host: "localhost",
  port: 5432,
  dialect: 'postgres'
});

// we glob together all of our models here
var models = {};
models.User = sequelize.import('./user');
models.Ownership = sequelize.import('./ownership');
models.Team = require('./team')(mongoose, models);

// we create our SQL associations here
Object.keys(models).forEach(function(modelName) {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

// we sync our models' schemas with our psql database
sequelize.sync();

//we export our database here
module.exports = models;
