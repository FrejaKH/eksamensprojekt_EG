// Load passport strategy - https://www.passportjs.org/packages/passport-local/
const LocalStrategy = require("passport-local").Strategy;
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const dbconfig = require("./db");

const connection = mysql.createConnection(dbconfig.passport.connection);
connection.query("USE " + dbconfig.passport.database);

// Exporting this function to be used in app.js
module.exports = function (passport) {
  /* PASSPORT SESSION SETUP */
  // Serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id_user);
  });

  // Deserialize the user
  passport.deserializeUser(function (id, done) {
    connection.query(
      "SELECT * FROM user_table WHERE id_user = ? ",
      [id],
      function (err, rows) {
        done(err, rows[0]);
      }
    );
  });

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  /* LOCAL STRATEGY SIGNUP */
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, username, password, done) {
        connection.query(
          "SELECT * FROM user_table WHERE navn = ?",
          [username],
          function (err, rows) {
            if (err) return done(err);
            if (rows.length) {
              return done(
                null,
                false,
                req.flash("signupMessage", "That username is already taken.")
              );
            } else {
              // If there is no user with that username, create the user
              const newUserMysql = {
                username: username,
                password: bcrypt.hashSync(password, 10),
                email: req.body.email,
                telefon: req.body.telefon,
              };
              const insertQuery =
                "INSERT INTO user_table ( navn, password, email, telefonnummer ) values (?,?,?,?)";
              connection.query(
                insertQuery,
                [
                  newUserMysql.username,
                  newUserMysql.password,
                  newUserMysql.email,
                  newUserMysql.telefon,
                ],
                function (err, rows) {
                  newUserMysql.id = rows.insertId;

                  return done(null, newUserMysql);
                }
              );
            }
          }
        );
      }
    )
  );

  /* LOCAL STRATEGY LOGIN */
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, username, password, done) {
        connection.query(
          "SELECT * FROM user_table WHERE navn = ?",
          [username],
          function (err, rows) {
            if (err) return done(err);
            if (!rows.length) {
              return done(
                null,
                false,
                req.flash("loginMessage", "This user does not exist.")
              );
            }
            // If the user is found but the password is wrong
            if (!bcrypt.compareSync(password, rows[0].password))
              return done(
                null,
                false,
                req.flash("loginMessage", "Wrong password.")
              );
            // All is well, return successful user
            return done(null, rows[0]);
          }
        );
      }
    )
  );
};
