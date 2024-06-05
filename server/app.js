const express = require("express");
const app = express();
const router = express.Router();
const carRoutes = require("./routes/cars");
const ownerRoutes = require("./routes/owners");
const addressRoutes = require("./routes/address");
const regCenterRoutes = require("./routes/regCenter");
const registrationRoutes = require("./routes/registration");
const accountRoutes = require("./routes/account");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const Account = require("./model/account-model");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const setAssociations = require("./model/associations")();

app.use(cookieParser());
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000", //Chan tat ca cac domain khac ngoai domain nay
    credentials: true, //Để bật cookie HTTP qua CORS
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use("/cars", carRoutes);
app.use("/owners", ownerRoutes);
app.use("/address", addressRoutes);
app.use("/regCenter", regCenterRoutes);
app.use("/registration", registrationRoutes);
app.use("/account", accountRoutes);

app.get("/cookie", (req, res) => {
  res.cookie("test", "value", {
    maxAge: 1000 * 60 * 5,
    httpOnly: true,
  });
  res.send("set cookie");
});

app.get("/cookie/get", (req, res) => {
  res.send(req.cookies);
});

//Error Handling
app.use((req, res, next) => {
  const error = new Error("Route not found.");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
