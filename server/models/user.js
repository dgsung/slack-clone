module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: "The username needs to be only letters and numbers"
        },
        len: [2, 25]
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email"
        }
      }
    },
    password: {
      type: DataTypes.STRING
    }
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
