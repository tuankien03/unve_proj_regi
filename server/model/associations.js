const { Sequelize } = require("sequelize");
const sequelize = require("../connect-db");
const Account = require("./account-model");
const Car = require("./car-model");
const Address = require("./address-model");
const RegCenter = require("./regCenter-model");
const Registration = require("./registration-model");
const Owner = require("./owner-model");
const Register_At = require("./owner_regAt_regCente");

const setAssociations = () => {
  RegCenter.hasOne(Address);
  Address.belongsTo(RegCenter);

  Car.hasMany(Registration);
  Registration.belongsTo(Car);

  Owner.hasMany(Car, {
    foreignKey: { allowNull: false },
  });
  Car.belongsTo(Owner);

  Owner.hasMany(Registration);
  Registration.belongsTo(Owner);

  Owner.hasOne(Address);
  Address.belongsTo(Owner);

  RegCenter.hasMany(Registration);
  Registration.belongsTo(RegCenter);

  Owner.belongsToMany(RegCenter, { through: Register_At });
  RegCenter.belongsToMany(Owner, { through: Register_At });

  RegCenter.hasOne(Account, {
    foreignKey: { unique: true },
  });
  Account.belongsTo(RegCenter);

  sequelize
    // .sync({ force: true })
    .sync()
    .then(() => {
      Account.findOrCreate({
        where: {
          userName: "admin",
        },
        defaults: {
          password: "admin",
          isAdmin: "true",
        },
      });
    })
    .catch((err) => console.log(err));

};

module.exports = setAssociations;
