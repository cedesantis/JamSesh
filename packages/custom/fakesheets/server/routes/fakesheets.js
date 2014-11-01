'use strict';

// The Package is past automatically as first parameter
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
