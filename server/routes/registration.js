const express = require("express");
const router = express.Router();
const RegistrationController = require("../controller/registration-controller");
const auth = require("../middleware/check-auth");
const { query, validationResult } = require("express-validator");
const { regQueryValid, validate } = require("../middleware/validation");

router.get(
  "/",
  regQueryValid(),
  validate,
  auth,
  RegistrationController.getAll()
);

router.get(
  "/regRecord",
  regQueryValid(),
  validate,
  auth,
  RegistrationController.getRecord()
);

router.post("/", auth, RegistrationController.create());

router.get("/:id", auth, RegistrationController.findById());

module.exports = router;
