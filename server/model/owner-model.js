const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../connect-db");

const Owner = sequelize.define("Owner", {
  id: {
    type: DataTypes.CHAR,
    primaryKey: true,
  },
  name: {
    type: DataTypes.CHAR,
  },
  phoneNum: {
    type: DataTypes.CHAR,
  },
  dob: {
    type: DataTypes.DATE,
  },
});

module.exports = Owner;
