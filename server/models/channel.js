module.exports = (sequelize, DataTypes) => {
  var Channel = sequelize.define("channel", {
    name: DataTypes.STRING,
    public: DataTypes.BOOLEAN
  });

  Channel.associate = function(models) {
    Channel.belongsTo(models.team, {
      foreignKey: "teamId"
    });
    Channel.belongsToMany(models.user, {
      through: "member",
      foreignKey: "channelId"
    });
  };

  return Channel;
};
