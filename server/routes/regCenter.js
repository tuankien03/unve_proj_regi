const express = require("express");
const router = express.Router();
const RegCenterController = require("../controller/regCenter-controller");

router.get("/", RegCenterController.getAll());

router.post("/", RegCenterController.create());

router.get("/:id", RegCenterController.findById());

router.patch("/:id", RegCenterController.update());

router.delete("/:id", RegCenterController.delete());

module.exports = router;
