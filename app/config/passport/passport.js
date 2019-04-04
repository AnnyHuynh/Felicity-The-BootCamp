var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, models) {
  var User = models.user;

  var LocalStrategy = require('passport-local').Strategy;

  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, username, password, done) {
        var generateHash = function(password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };

        User.findOne({
          where: {
            username: username
          }
        }).then(function(user) {
          if (user) {
            return done(null, false, {
              message: 'That Username is already taken'
            });
          } else {
            var userPassword = generateHash(password);

            var data = {
              username: username,
              password: userPassword,
              email: req.body.email,
              firstname: req.body.firstname,
              lastname: req.body.lastname
            };

            User.create(data).then(function(newUser, created) {
              if (!newUser) {
                return done(null, false);
              }

              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );

  //serialize
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // deserialize user
  passport.deserializeUser(function(id, done) {
    User.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [models.group]
    }).then(function(user) {
      if (user) {
        done(null, user);
      } else {
        done(user.errors, null);
      }
    });
  });

  //LOCAL SIGNIN
  passport.use(
    'local-signin',
    new LocalStrategy(
      {
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },

      function(req, username, password, done) {
        var User = models.user;

        var isValidPassword = function(userpass, password) {
          return bCrypt.compareSync(password, userpass);
        };

        User.findOne({
          where: {
            username: username
          },
          include: [models.group]
        })
          .then(function(user) {
            if (!user) {
              return done(null, false, {
                message: 'Username does not exist'
              });
            }

            if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                message: 'Incorrect password.'
              });
            }
            return done(null, user);
          })
          .catch(function(err) {
            console.log('Error:', err);

            return done(null, false, {
              message: 'Something went wrong with your Signin'
            });
          });
      }
    )
  );
};
