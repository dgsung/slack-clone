module.exports = (sequelize, DataTypes) => {
    var Channel = sequelize.define('Channel', {
      name: DataTypes.STRING,
      public: DataTypes.BOOLEAN
    });
  
    Channel.associate = function(models) {
      Channel.belongsTo(models.Team, {
          foreignKey: 'teamId'
      });
    };
  
    return Channel;
  };