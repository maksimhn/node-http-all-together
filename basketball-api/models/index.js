// we import the sequelize constructor here
var Sequelize = require('sequelize');

// we connect to the postgres database here
var database = new Sequelize('basketballapp', 'blaushmild', 'G00drich1', {
  host: "localhost",
  port: 5432,
  dialect: 'postgres'
});

module.exports = database;
