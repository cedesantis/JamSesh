'use strict';

angular.module('mean.fakesheets').config(['$stateProvider',
   function($stateProvider) {
    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    // states for my app
    $stateProvider
    .state('fakesheets example page', {
      url: '/fakesheets/example',
      templateUrl: 'fakesheets/views/index.html'
    })
      .state('all fakesheets', {
        url: '/fakesheets',
        templateUrl: 'fakesheets/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create fakesheet', {
        url: '/fakesheets/create',
        templateUrl: 'fakesheets/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit fakesheet', {
        url: '/fakesheets/:fakesheetId/edit',
        templateUrl: 'fakesheetId/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('fakesheet by id', {
        url: '/fakesheets/:fakesheetId',
        templateUrl: 'fakesheets/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);

