const { query, body, validationResult } = require("express-validator");

const regQueryValid = () => {
  return [
    query("page").isInt({ max: 100000, min: 0 }).optional(),
    query("size").isInt({ max: 100000, min: 0 }).optional(),
    query("sDate").isDate().optional(),
    query("eDate").isDate().optional(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  regQueryValid,
  validate,
};
