'use strict';

// The Package is past automatically as first parameter
/*
module.exports = function(Fakesheets, app, auth, database) {

  app.get('/fakesheets/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/fakesheets/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/fakesheets/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/fakesheets/example/render', function(req, res, next) {
    Fakesheets.render('index', {
      package: 'fakesheets'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
*/



var fakesheets = require('../controllers/fakesheets');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.fakesheet.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Fakesheets, app, auth) {

  app.route('/fakesheets')
    .get(fakesheets.all)
    .post(auth.requiresLogin, fakesheets.create);
  app.route('/fakesheets/:fakesheetId')
    .get(fakesheets.show)
    .put(auth.requiresLogin, hasAuthorization, fakesheets.update)
    .delete(auth.requiresLogin, hasAuthorization, fakesheets.destroy);

  // Finish with setting up the fakesheetId param
  app.param('fakesheetId', fakesheets.article);
};

