const express = require("express");
const router = express.Router();
const OwnersController = require("../controller/owners-controller");
const auth = require("../middleware/check-auth");

router.get("/", auth, OwnersController.getAll());

router.post("/", OwnersController.create());

router.get("/:id", OwnersController.findById());

router.patch("/:id", OwnersController.update());

router.delete("/:id", OwnersController.delete());

module.exports = router;
