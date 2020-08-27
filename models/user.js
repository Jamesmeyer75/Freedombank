"use strict";
var sequelize = require("./index");
var Account = require("./account");
var bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.beforeCreate((user) => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(this.password, password);
  };

  User.associate = (models) => {
    User.hasOne(models.Account, {
      as: "userAccount",
      foreignKey: "userId"
    })
  }

  return User;
}