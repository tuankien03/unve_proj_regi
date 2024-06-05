const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../connect-db");

const Car = sequelize.define("Car", {
  bienSo: {
    type: DataTypes.CHAR,
    primaryKey: true,
    unique: true,
  },

  hangXe: {
    type: DataTypes.CHAR,
    defaultValue: "0",
    allowNull: false,
  },

  tenXe: {
    defaultValue: "0",
    type: DataTypes.CHAR,
    allowNull: false,
  },

  soKhung: {
    type: DataTypes.CHAR,
    defaultValue: "0",
    allowNull: false,
  },

  ngayCapXe: {
    type: DataTypes.DATE,
    defaultValue: "2023-01-01",
    allowNull: false,
  },

  soMay: {
    type: DataTypes.CHAR,
    defaultValue: "0",
    allowNull: false,
  },

  mucDich: {
    type: DataTypes.TEXT,
    defaultValue: "0",
  },
});

module.exports = Car;
