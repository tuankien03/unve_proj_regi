const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../connect-db");

const RegCenter = sequelize.define("RegCenter", {
  name: {
    type: DataTypes.CHAR,
    unique: true,
  },
});

module.exports = RegCenter;
