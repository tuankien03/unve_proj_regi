const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../connect-db");
const RegCenter = require("./regCenter-model");
const Owner = require("./owner-model");

const Register_At = sequelize.define("Register_At", {
  RegCenterId: {
    type: DataTypes.INTEGER,
    references: {
      model: RegCenter,
      key: "id",
    },
  },
  OwnerId: {
    type: DataTypes.INTEGER,
    references: {
      model: Owner,
      key: "id",
    },
  },
});

module.exports = Register_At;
