module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  });

  User.associate = function(models) {
    User.belongsToMany(models.team, {
      through: "member",
      foreignKey: "userId"
    });
    User.belongsToMany(models.channel, {
      through: "channel_member",
      foreignKey: "userId"
    });
  };

  return User;
};
