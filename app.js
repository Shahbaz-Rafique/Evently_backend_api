var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./utils/database");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes");

var SignUpRouter = require("./routes/SignUp");
var LoginRouter = require("./routes/Login");
var GetEventsRouter = require("./routes/GetEvents");
var AddEventRouter = require("./routes/AddEvent");
var GetLocationsRouter = require("./routes/GetLocations");
var VerifyRouter = require("./routes/Verify");
var GetEventDetailRouter = require("./routes/GetEventDetail");
var GetProfileRouter = require("./routes/GetProfile");
var EditProfileRouter = require("./routes/EditProfile");
var ChangePasswordRouter = require("./routes/ChangePassword");
var GetSocialMediaRouter = require("./routes/GetSocialMedia");
var EditSocialRouter = require("./routes/EditSocial");
var AddChatRouter = require("./routes/AddChat");
var GetChatRouter = require("./routes/GetChat");
var AddMessageRouter = require("./routes/AddMessage");
var GetMessagesRouter = require("./routes/GetMessages");
const { info } = require("console");

var app = express();
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// function validateAPIKey(req, res, next) {
//   const authkey =  req.header('api-key');
//   if (authkey && crypto.createHash('sha256').update(authkey).digest('hex') == process.env.API_KEY) {
//     next();
//   } else {
//     res.status(401).json({ error: 'Unauthorized Access' });
//   }
// }
// app.use((req, res, next) => {
//   if (req.path.startsWith('/images')) {
//     return next();
//   }
//   validateAPIKey(req, res, next);
// });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("", usersRouter);
// Users
app.use("/SignUp", SignUpRouter);
app.use("/Login", LoginRouter);
app.use("/AddEvent", AddEventRouter);
app.use("/GetEvents", GetEventsRouter);
app.use("/GetLocations", GetLocationsRouter);
app.use("/Verify", VerifyRouter);
app.use("/GetEventDetail", GetEventDetailRouter);
app.use("/GetProfile", GetProfileRouter);
app.use("/EditProfile", EditProfileRouter);
app.use("/ChangePassword", ChangePasswordRouter);
app.use("/GetSocialMedia", GetSocialMediaRouter);
app.use("/EditSocial", EditSocialRouter);
app.use("/AddChat", AddChatRouter);
app.use("/GetChat", GetChatRouter);
app.use("/AddMessage", AddMessageRouter);
app.use("/GetMessages", GetMessagesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
