var express = require("express");
var createError = require("http-errors");
var session = require("express-session");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
var flash = require("connect-flash");

var app = express();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

// Passport config
require("./models/passport")(passport);

// Body parser
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Required for session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session()); // Login session

// Connect flash
app.use(flash()); // Flash messages stored in session

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/public", express.static("./public/"));
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
