const RegCenter = require("../model/regCenter-model");

class RegCenterController {
  getAll = () => {
    return async (req, res, next) => {
      const { count, rows } = await RegCenter.findAndCountAll();
      res.status(200).json({
        success: true,
        data: rows,
        total: count,
      });
    };
  };

  create = () => {
    return async (req, res, next) => {
      try {
        const regCenter = await RegCenter.create({
          name: req.body.name,
        });
        res.status(201).json({
          success: true,
          RegCenter: regCenter,
        });
      } catch (err) {
        res.status(422).json(err.errors);
      }
    };
  };

  findById = () => {
    return async (req, res, next) => {
      const centerId = req.params.id;
      const center = await RegCenter.findOne({
        where: { id: centerId },
      });
      const resp = { success: false, Regcenter: null };
      if (center) {
        resp.success = true;
        resp.Regcenter = center;
      }
      res.status(200).json(resp);
    };
  };

  update = () => {
    return async (req, res, next) => {
      const centerId = req.params.id;
      const resp = { success: false, msg: "RegCenter not found" };
      const regCenter = await RegCenter.findOne({
        where: { id: centerId },
      });
      if (regCenter) {
        const vals = { name: req.body.name };
        await RegCenter.update(vals, { where: { id: centerId } });
        await regCenter.reload();
        resp.success = true;
        resp.msg = "RegCenter updated";
        resp.regCenter = regCenter;
      }
      res.status(200).json(resp);
    };
  };

  delete = () => {
    return async (req, res, next) => {
      const centerId = req.params.id;
      const resp = { success: false, msg: "RegCenter not found" };
      const regCenter = await RegCenter.findOne({
        where: { id: centerId },
      });
      if (regCenter) {
        await RegCenter.destroy({ where: { id: centerId } });
        resp.success = true;
        resp.msg = "RegCenter deleted";
      }
      res.status(200).json(resp);
    };
  };
}

module.exports = new RegCenterController();
