const Account = require("../model/account-model");
const RegCenter = require("../model/regCenter-model");
const Address = require("../model/address-model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");

class AccountController {
  signup = () => {
    return async (req, res, next) => {
      if (!req.userData.isAdmin) {
        return res.status(401).json({ msg: "You do not have permission" });
      }

      try {
        const regCenter = await RegCenter.create({
          name: req.body.center.name,
        });

        const address = await Address.create({
          thanhPho: req.body.address.thanhPho,
          quan: req.body.address.quan,
          phuong: req.body.address.phuong,
          chiTiet: req.body.address.chiTiet,
          RegCenterId: regCenter.id,
        });

        const user = await Account.create({
          userName: req.body.userName,
          password: req.body.password,
          RegCenterId: regCenter.id,
        });

        res.status(200).json({
          success: true,
          user: user,
          regCenter,
          address,
        });
      } catch (err) {
        res.status(422).json(err.errors);
      }
    };
  };

  login = () => {
    return async (req, res, next) => {
      const msg = "Something is wrong with your username or password.";
      const errors = [
        { path: "password", message: msg },
        { path: "username", msg: msg },
      ];
      const resp = { success: false, errors: errors };
      const user = await Account.findOne({
        where: { userName: req.body.userName },
      });
      const password = req.body.password;
      if (user) {
        const passed = await bcrypt.compare(password, user.password);
        if (passed) {
          const signVals = user.toJSON();
          delete signVals.password;
          const token = jwt.sign(signVals, process.env.JWT_KEY, {
            expiresIn: "30d",
          });
          resp.success = true;
          resp.errors = [];
          resp.token = token;
          res.cookie("token", token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
          });
        }
      }
      res.status(200).json(resp);
    };
  };

  update = () => {
    return async (req, res, next) => {
      if (!(req.userData.isAdmin || req.userData.id == req.params.id)) {
        return res.status(401).json({ msg: "You do not have permission" });
      }
      const resp = { success: false, user: null };
      const userId = req.params.id;
      const user = await Account.findByPk(userId);
      if (user) {
        user.userName = req.body.userName;
        if (req.body.password) {
          user.updatePassword = true;
          user.password = req.body.password;
        }
        await user.save();
        await user.reload();
        resp.success = true;
        resp.user = user;
      }
      res.status(200).json(resp);
    };
  };

  loggedInUser = () => {
    return async (req, res, next) => {
      const resp = { success: false, user: null, msg: "User not found" };
      try {
        const user = await Account.findByPk(req.userData.id);
        const data = user.toJSON();
        delete data.password;
        resp.success = true;
        resp.user = data;
        resp.msg = "User is logged in";
        res.status(200).json(resp);
      } catch (err) {
        res.status(422).json(resp);
      }
    };
  };

  delete = () => {
    return async (req, res, next) => {
      if (!req.userData.isAdmin) {
        return res.status(401).json({ msg: "You do not have permission" });
      }
      const userId = req.params.id;
      const user = await Account.findByPk(userId);
      const resp = { success: false, msg: "User not found" };
      if (user) {
        await user.destroy();
        resp.msg = "Account deleted";
        resp.success = true;
      }
      if (resp.success) {
        res.status(200).json(resp);
      } else {
        res.status(401).json(resp);
      }
    };
  };

  logout = () => {
    return (req, res, next) => {
      res.clearCookie("token");
      res.status(200).json({ success: "success" });
    };
  };

  getAll = () => {
    return async (req, res, next) => {
      if (!req.userData.isAdmin) {
        console.log(req.userData);
        return res.status(401).json({ msg: "You do not have permission" });
      }
      const { count, rows } = await Account.findAndCountAll();
      res.status(200).json({
        success: true,
        data: rows,
        total: count,
      });
    };
  };
}

module.exports = new AccountController();
