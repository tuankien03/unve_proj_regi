const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../connect-db");

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const Registration = sequelize.define("Registration", {
  ngayHetHan: {
    type: DataTypes.DATE,
    defaultValue: addDays(Date.now(), 365),
  },
});

module.exports = Registration;
