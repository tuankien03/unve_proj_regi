const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../connect-db");

const Account = sequelize.define("Account", {
  userName: {
    type: DataTypes.CHAR,
    unique: true,
  },

  password: {
    type: DataTypes.CHAR,
  },

  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Account.beforeCreate(async (user, options) => {
  const hashed = await bcrypt.hash(user.password, 10);
  user.password = hashed;
});

Account.beforeSave(async (user, options) => {
  if (user.updatePassword) {
    const hashed = await bcrypt.hash(user.password, 10);
    user.password = hashed;
  }
});

module.exports = Account;
