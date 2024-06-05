const express = require("express");
const router = express.Router();
const AddressController = require("../controller/address-controller");

router.get("/", AddressController.getAll());

router.post("/", AddressController.create());

router.get("/:id", AddressController.findById());

router.patch("/:id", AddressController.update());

router.delete("/:id", AddressController.delete());

module.exports = router;
