module.exports = (sequelize, DataTypes) => {
    var Message = sequelize.define('Message', {
      text: DataTypes.STRING,
    });
  
    Message.associate = function(models) {
      Message.belongsTo(models.Channel, {
          foreignKey: 'channelId'
      });
      Message.belongsTo(models.User, {
        foreignKey: 'userId'
    });
    };
  
    return Message;
  };