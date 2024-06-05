const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // const token = req.headers.authorization
    //   ? req.headers.authorization.split(" ")[1]
    //   : "";
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // console.log(decoded);
    req.userData = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: err });
  }
};
