const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../connect-db");

const Address = sequelize.define("Address", {
  thanhPho: {
    type: DataTypes.CHAR,
  },
  quan: {
    type: DataTypes.CHAR,
  },
  phuong: {
    type: DataTypes.CHAR,
  },
  chiTiet: {
    type: DataTypes.CHAR,
  },
});

module.exports = Address;
