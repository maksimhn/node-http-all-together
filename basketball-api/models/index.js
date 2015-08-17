'use strict';

//connection model generator function to the databases
var Sequelize = require('sequelize');

//creating a new db
var sequelize = new Sequelize('basketballapp', 'dds', 'abc123', {
  host: "localhost",
  port: 5432,
  dialect: 'postgres'
});

//connect to mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basketballapp');

//create empty model object
var models = {};

// create all the models
models.User = sequelize.import('./user');
models.Ownership = sequelize.import('./ownership');
models.Team = require('./team')(mongoose, models);

// if our model has associate method, we use it to link models together
Object.keys(models).forEach(function(modelName) {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

//sync everything with dependecies, let SQL know about the schema (impose psql model schemas on DB)
sequelize.sync();

//and finally export out models
module.exports = models;
