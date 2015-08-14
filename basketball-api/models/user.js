
module.exports = function(sequelize, Datatypes){
  var User = sequelize.define('User', {
    id: {
      type: Datatypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    firstName: {
      type: Datatypes.STRING,
      allowNull: false
    },
    lastName: {
      type: Datatypes.STRING,
      allowNull: false
    },
    email: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true,
      validates: {
        isEmail: true
      }
    }
  }, {
    classMethods: {
      associate: function(models){
        User.hasMany(models.Ownership)
      }
    }
  });

  return User;
};
