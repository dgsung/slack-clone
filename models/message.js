module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define("message", {
    text: DataTypes.STRING
  });

  Message.associate = function(models) {
    Message.belongsTo(models.channel, {
      foreignKey: "channelId"
    });
    Message.belongsTo(models.user, {
      foreignKey: "userId"
    });
  };

  return Message;
};
