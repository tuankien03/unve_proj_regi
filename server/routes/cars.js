const express = require("express");
const router = express.Router();
const CarController = require("../controller/cars-controller");

router.get("/", CarController.getAll());

router.post("/", CarController.create());

router.get("/:id", CarController.findById());

router.patch("/:id", CarController.update());

router.delete("/:id", CarController.delete());

module.exports = router;
