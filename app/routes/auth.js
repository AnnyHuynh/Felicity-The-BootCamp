var authController = require('../controllers/authcontroller.js');

module.exports = function(app, passport, models) {
  app.get('/', authController.home);

  app.get('/index', authController.index);

  app.get('/dashboard', isLoggedIn, authController.dashboard);

  app.get('/logout', authController.logout);

  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/dashboard',
      failureRedirect: '/'
    })
  );

  app.post(
    '/signin',
    passport.authenticate('local-signin', {
      successRedirect: '/dashboard',
      failureRedirect: '/'
    })
  );

  app.post('/save', function(req, res) {
    var User = models.user;
    User.update(
      {
        preferredlocation: req.body.location,
        preferredtopic: req.body.topic,
        preferredday: req.body.weekday,
        preferredtime: req.body.time
      },
      {
        where: { id: req.body.userid }
      }
    ).then(function() {
      User.findAll({
        where: {
          id: req.body.userid
        },
        attributes: { exclude: ['password'] },
        include: [models.group]
      });
      res.redirect('dashboard');
    });
  });

  app.post('/groups', function(req, res) {
    var Group = models.group;
    Group.findAll({
      where: {
        $or: [
          { grouplocation: [req.user.preferredlocation] },
          { grouptopic: [req.user.preferredtopic] }
        ]
      }
    }).then(function(group) {
      var usergrpObject = {
        user: req.user,
        group: group
      };
      res.render('dashboard', usergrpObject);
    });
  });

  //If user not logged in then redirect to signin page
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect('/');
  }

  app.get('*', authController.notfound);
};
