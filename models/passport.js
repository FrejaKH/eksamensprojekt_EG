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
          "SELECT * FROM brugere WHERE email = ?",
          [username],
          function (err, rows) {
            if (err) return done(err);
            if (rows.length) {
              return done(
                null,
                false,
                req.flash("signupMessage", "Denne bruger er allerede taget")
              );
            } else {
              // If there is no user with that username, create the user

              // if (req.body.cvr != undefined) {
              //   const newUserMysql = {
              //     username: username,
              //     password: bcrypt.hashSync(password, 10),
              //     email: req.body.email,
              //     telefon: req.body.telefon,
              //     adresse: req.body.adresse,
              //     _by: req.body._by,
              //     postnummer: req.body.postnummer,
              //     rolle: 'erhverv',
              //     cvr: req.body.cvr,
              //   };
              // }
              
                let newUserMysql = {
                  username: username,
                  password: bcrypt.hashSync(password, 10),
                  email: req.body.email,
                  telefon: req.body.telefon,
                  adresse: req.body.adresse,
                  _by: req.body._by,
                  postnummer: req.body.postnummer,
                  rolle: 'privat',
                  cvr: req.body.cvr,
                };

                //See if there is something in CVR and it is 8 numbers long
                if(newUserMysql.cvr.length == 8) {
                  console.log(`CVR = ${newUserMysql.cvr}`);
                  newUserMysql.rolle = 'erhverv';
                                    
                  const insertQuery = 
                  `start TRANSACTION;

                  INSERT INTO brugere ( navn, password, email, telefonnummer, adresse, _by, postnummer, rolle ) VALUES
                  (?,?,?,?,?,?,?,?);
                  
                  INSERT INTO brugere_erhverv (kundenummer, kontonummer, cvr) 
                  VALUES ((SELECT kundenummer FROM brugere WHERE email = ?), '123456789', ?);
                  
                  commit;`

                  pool.query(
                    insertQuery,
                    [
                      newUserMysql.username,
                      newUserMysql.password,
                      newUserMysql.email,
                      newUserMysql.telefon,
                      newUserMysql.adresse,
                      newUserMysql._by,
                      newUserMysql.postnummer,
                      newUserMysql.rolle,
                      newUserMysql.email,
                      newUserMysql.cvr,
                    ],
                    function (err, rows) {
                      // newUserMysql.id = rows.insertId;
                      console.log("NEWUSERMYSQL: " + newUserMysql);
                      return done(null, newUserMysql);
                    }
                  );

                }
                else {
                  const insertQuery =
                "INSERT INTO brugere ( navn, password, email, telefonnummer, adresse, _by, postnummer, rolle ) values (?,?,?,?,?,?,?,?)";
              
              
                  pool.query(
                  insertQuery,
                  [
                    newUserMysql.username,
                    newUserMysql.password,
                    newUserMysql.email,
                    newUserMysql.telefon,
                    newUserMysql.adresse,
                    newUserMysql._by,
                    newUserMysql.postnummer,
                    newUserMysql.rolle,
                  ],
                  function (err, rows) {
                    // newUserMysql.id = rows.insertId;
                    return done(null, newUserMysql);
                  }
                );
              }
              
              
              
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
          "SELECT * FROM brugere WHERE email = ?",
          [username],
          function (err, rows) {
            if (err) return done(err);
            if (!rows.length) {
              return done(
                null,
                false,
                req.flash("loginMessage", "Denne bruger eksisterer ikke")
              );
            }
            // If the user is found but the password is wrong
            if (!bcrypt.compareSync(password, rows[0].password))
              return done(
                null,
                false,
                req.flash("loginMessage", "Forkert kodeord")
              );
            // Return successful user
            return done(null, rows[0]);
          }
        );
      }
    )
  );
};
