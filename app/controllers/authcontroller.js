var exports = (module.exports = {});
exports.home = function(req, res) {
  res.render('home');
};

exports.notfound = function(req, res) {
  res.render('404');
};

exports.index = function(req, res) {
  res.render('index');
};

exports.dashboard = function(req, res) {
  res.render('dashboard', { user: req.user, group: req.group });
};

exports.logout = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/');
  });
};
