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

        // destroy hook: when user goes, all the belongings go as well
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
