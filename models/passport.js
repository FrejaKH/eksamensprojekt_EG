// Load passport strategy - https://www.passportjs.org/packages/passport-local/
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { pool } = require("./db");

// Exporting this function to be used in app.js
module.exports = function (passport) {
  /* PASSPORT SESSION SETUP */
  // Serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  // Deserialize
  passport.deserializeUser(function (user, done) {
    done(null, user);
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
        pool.query(
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
                kundenummer: req.body.kundenummer,
                adresse: req.body.adresse,
                _by: req.body._by,
                postnummer: req.body.postnummer,
              };
              const insertQuery =
                "INSERT INTO user_table ( navn, password, email, telefonnummer, kundenummer, adresse, _by, postnummer ) values (?,?,?,?,?,?,?,?)";
              pool.query(
                insertQuery,
                [
                  newUserMysql.username,
                  newUserMysql.password,
                  newUserMysql.email,
                  newUserMysql.telefon,
                  newUserMysql.kundenummer,
                  newUserMysql.adresse,
                  newUserMysql._by,
                  newUserMysql.postnummer,
                ],
                function (err, rows) {
                  // newUserMysql.id = rows.insertId;
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
        pool.query(
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
            // Return successful user
            return done(null, rows[0]);
          }
        );
      }
    )
  );
};
