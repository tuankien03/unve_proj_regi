const Owner = require("../model/owner-model");
const Address = require("../model/address-model");
const { Op, Sequelize } = require("sequelize");

class OwnerController {
  getAll = () => {
    return async (req, res, next) => {
      if (req.userData.isAdmin) {
        const where = {};
        const { name, phoneNum, dob } = req.query;
        if (name) where.name = { [Sequelize.Op.like]: `%${name}%` };
        if (phoneNum) where.phoneNum = { [Sequelize.Op.eq]: phoneNum };
        if (dob) where.dob = { [Sequelize.Op.eq]: dob };

        const page = req.query.page ? parseInt(req.query.page) : 1;
        const per_page = req.query.per_page ? parseInt(req.query.per_page) : 3;

        const { count, rows } = await Owner.findAndCountAll({
          where,
          offset: (page - 1) * page,
          limit: per_page,
        });
        res.status(200).json({
          success: true,
          data: rows,
          total: count,
        });
      } else if (!req.userData.isAdmin && req.userData.RegCenterId) {
        const where = {};
        const { name, phoneNum, dob } = req.query;
        if (name) where.name = { [Sequelize.Op.like]: `%${name}%` };
        if (phoneNum) where.phoneNum = { [Sequelize.Op.eq]: phoneNum };
        if (dob) where.dob = { [Sequelize.Op.eq]: dob };

        const page = req.query.page ? parseInt(req.query.page) : 1;
        const per_page = req.query.per_page ? parseInt(req.query.per_page) : 3;

        const { count, rows } = await Owner.findAndCountAll({
          where,
          offset: (page - 1) * page,
          limit: per_page,
        });
        res.status(200).json({
          success: true,
          data: rows,
          total: count,
        });
      } else {
        return res.status(401).json({ msg: "You do not have permission" });
      }
    };
  };

  create = () => {
    return async (req, res, next) => {
      try {
        const owner = await Owner.create({
          id: req.body.id,
          name: req.body.name,
          phoneNum: req.body.phoneNum,
          dob: req.body.dob,
        });
        await Address.create({
          thanhPho: req.body.address.thanhPho,
          quan: req.body.address.quan,
          phuong: req.body.address.phuong,
          chiTiet: req.body.address.chiTiet,
          OwnerId: owner.id,
        });
        const address = await owner.getAddress();
        // owner.address = address;
        res.status(201).json({
          success: true,
          owner: owner,
          address,
        });
      } catch (err) {
        res.status(422).json(err.errors);
      }
    };
  };

  findById = () => {
    return (req, res, next) => {
      res.status(200).json({
        success: true,
      });
    };
  };

  update = () => {
    return (req, res, next) => {
      res.status(200).json({
        success: true,
      });
    };
  };

  delete = () => {
    return (req, res, next) => {
      res.status(200).json({
        success: true,
      });
    };
  };
}

module.exports = new OwnerController();
