module.exports = (sequelize, DataTypes) => {
  var Team = sequelize.define("Team", {
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  });

  Team.associate = function(models) {
    Team.belongsToMany(models.User, {
      through: "member",
      foreignKey: "teamId"
    });
    Team.belongsTo(models.User, {
      foreignKey: "owner"
    });
  };

  return Team;
};
