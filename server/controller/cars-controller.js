const Car = require("../model/car-model");

class CarController {
  getAll = () => {
    return async (req, res, next) => {
      const { count, rows } = await Car.findAndCountAll();
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
        const car = await Car.create({
          bienSo: req.body.bienSo,
          ngayCapXe: req.body.ngayCapXe,
          hangXe: req.body.hangXe,
          tenXe: req.body.tenXe,
          soKhung: req.body.soKhung,
          soMay: req.body.soMay,
          mucDich: req.body.mucDich,
          OwnerId: req.body.ownerId,
        });
        console.log(car.toJSON());
        res.status(201).json({
          success: true,
          car: car,
        });
      } catch (err) {
        res.status(422).json({
          msg: "Not create car",
          err: err,
        });
      }
    };
  };

  findById = () => {
    return async (req, res, next) => {
      const id = req.params.id;
      const car = await Car.findOne({
        where: { bienSo: id },
      });
      const resp = { success: false, car: null };
      if (car) {
        resp.success = true;
        resp.car = car;
      }
      res.status(200).json(resp);
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
    return async (req, res, next) => {
      const id = req.params.id;
      const car = await Car.findOne({
        where: { bienSo: id },
      });
      const resp = { success: false, msg: "Car not found" };
      if (car) {
        await Car.destroy({ where: { bienSo: id } });
        resp.success = true;
        resp.msg = "Car deleted";
      }
      res.status(200).json(resp);
    };
  };
}

module.exports = new CarController();
