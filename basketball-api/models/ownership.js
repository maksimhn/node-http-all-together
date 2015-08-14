module.exports = function(sequelize, Datatypes){
  var Ownership = sequelize.define('Ownership', {
    id: {
      type: Datatypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    teamId: {
      type: Datatypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models){
        Ownership.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
  }
});

  return Ownership;
};
