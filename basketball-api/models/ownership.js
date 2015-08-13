// we import our sequelize connection here
var database = require('./index');

// we import our user model here
var User = require('./user');

// we import our sequelize module here
var Sequelize = require('sequelize');

var Ownership = database.define('ownership', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  teamId: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

User.hasMany(Ownership);
Ownership.belongsTo(User);

Ownership.sync();

module.exports = Ownership;
