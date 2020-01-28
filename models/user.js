module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
      name: {
         type : DataTypes.STRING,
         unique: true
        },
      email : {
          type: DataTypes.STRING,
          unique: true
        },
      password: DataTypes.STRING
    });
  
    User.associate = function(models) {
      User.belongsToMany(models.Team, {
          through: 'member',
          foreignKey: 'userId'
      });
    };
  
    return User;
  };