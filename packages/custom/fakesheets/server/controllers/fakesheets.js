'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  FakeSheet = mongoose.model('FakeSheet'),
  _ = require('lodash');


/**
 * Find article by id
 */
exports.fakesheet = function(req, res, next, id) {
  Fakesheet.load(id, function(err, fakesheet) {
    if (err) return next(err);
    if (!fakesheet) return next(new Error('Failed to load fakesheet ' + id));
    req.fakesheet = fakesheet;
    next();
  });
};

/**
 * Create an article
 */
exports.create = function(req, res) {
  var fakesheet = new FakeSheet(req.body);
  fakesheet.user = req.user;

  fakesheet.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the article'
      });
    }
    res.json(fakesheet);

  });
};

/**
 * Update an fakesheet
 */
exports.update = function(req, res) {
  var fakesheet = req.fakesheet;

  fakesheet = _.extend(fakesheet, req.body);

  fakesheet.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the fakesheet'
      });
    }
    res.json(fakesheet);

  });
};

/**
 * Delete an fakesheet
 */
exports.destroy = function(req, res) {
  var article = req.article;

  fakesheet.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the fakesheet'
      });
    }
    res.json(fakesheet);

  });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
  res.json(req.fakesheet);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
  Fakesheet.find().sort('-created').populate('user', 'name username').exec(function(err, fakesheets) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the fakesheets'
      });
    }
    res.json(fakesheets);

  });
};
