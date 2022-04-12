'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Post),
        models.User.hasMany(models.Comment),
        models.User.hasMany(models.Like);
    }
  }
  User.init(
    {
      username: { type: DataTypes.STRING, allowNull: false },

      email: { type: DataTypes.STRING, unique: true, allowNull: false },

      password: { type: DataTypes.STRING, allowNull: false },

      isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, default: false },

      picture: { type: DataTypes.STRING, allowNull: true }, //defaultValue:"image profil"

      bio: { type: DataTypes.STRING(350) },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
