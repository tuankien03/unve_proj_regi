const Reg = require("../model/registration-model");
const Owner = require("../model/owner-model");
const Address = require("../model/address-model");
const Car = require("../model/car-model");
const { Op, Sequelize } = require("sequelize");
const { addDays, subDays } = require("date-fns");
const RegCenter = require("../model/regCenter-model");

class RegistrationController {
  getAll = () => {
    return async (req, res, next) => {
      if (req.userData.isAdmin || req.userData.RegCenterId) {
        const where = {};
        const { sDate, eDate } = req.query;
        if (req.userData.RegCenterId)
          where.RegCenterId = req.userData.RegCenterId;

        if (sDate && eDate) {
          where.ngayHetHan = {
            [Sequelize.Op.between]: [Date.parse(sDate), Date.parse(eDate)],
          };
        }

        const page = req.query.page ? parseInt(req.query.page) : 1;
        const size = req.query.size ? parseInt(req.query.size) : 3;

        const { count, rows } = await Reg.findAndCountAll({
          where,
          offset: (page - 1) * size,
          limit: size,
          distinct: true,
          include: [Car, Owner, RegCenter],
        });

        res.status(200).json({
          success: true,
          data: rows,
          total: count,
        });
      }
    };
  };

  getRecord = () => {
    return async (req, res, next) => {
      if (req.userData.isAdmin || req.userData.RegCenterId) {
        const where = {};
        const { sDate, eDate, type } = req.query;
        if (req.userData.RegCenterId)
          where.RegCenterId = req.userData.RegCenterId;

        const page = req.query.page ? parseInt(req.query.page) : null;
        const size = req.query.size ? parseInt(req.query.size) : null;
        if (sDate && eDate && type === "hetHan") {
          where.ngayHetHan = {
            [Sequelize.Op.between]: [Date.parse(sDate), Date.parse(eDate)],
          };
        }
        if (sDate && eDate && type === "dangKy") {
          where.createdAt = {
            [Sequelize.Op.between]: [Date.parse(sDate), Date.parse(eDate)],
          };
        }
        const { count, rows } = await Reg.findAndCountAll({
          where,
          offset: (page - 1) * size,
          limit: size,
        });

        res.status(200).json({
          success: true,
          data: rows,
          total: count,
        });
      }
    };
  };

  create = () => {
    return async (req, res, next) => {
      if (req.userData.isAdmin || req.userData.RegCenterId) {
        try {
          const [owner, ownerCreated] = await Owner.findOrCreate({
            where: { id: req.body.owner.id },
            defaults: {
              id: req.body.owner.id,
              name: req.body.owner.name,
              phoneNum: req.body.owner.phoneNum,
              dob: req.body.owner.dob,
            },
          });
          await Address.findOrCreate({
            where: { OwnerId: req.body.owner.id },
            defaults: {
              thanhPho: req.body.address.thanhPho,
              quan: req.body.address.quan,
              phuong: req.body.address.phuong,
              chiTiet: req.body.address.chiTiet,
            },
          });

          let car = await Car.findOne({
            where: { bienSo: req.body.car.bienSo },
          });
          if (!car) {
            car = await Car.create({
              ngayCapXe: req.body.car.ngayCapXe,
              hangXe: req.body.car.hangXe,
              tenXe: req.body.car.tenXe,
              soKhung: req.body.car.soKhung,
              soMay: req.body.car.soMay,
              mucDich: req.body.car.mucDich,
              OwnerId: req.body.owner.id,
              bienSo: req.body.car.bienSo,
              ngayCapXe: req.body.car.ngayCapXe,
            });
          }

          const reg = await Reg.create({
            OwnerId: req.body.owner.id,
            CarBienSo: req.body.car.bienSo,
            ngayHetHan: req.body.ngayHetHan,
            RegCenterId: req.userData.RegCenterId
              ? req.userData.RegCenterId
              : null,
          });
          const address = await owner.getAddress();
          res.status(201).json({
            success: true,
            owner: owner,
            address,
            car,
            reg,
          });
        } catch (err) {
          res.status(422).json(err.errors);
        }
      }
    };
  };

  findById = () => {
    return async (req, res, next) => {
      if (req.userData.isAdmin || req.userData.RegCenterId) {
      }
    };
  };

  update = () => {
    return (req, res, next) => {
      res.status(200).json({
        success: true,
      });
    };
  };
}

module.exports = new RegistrationController();
