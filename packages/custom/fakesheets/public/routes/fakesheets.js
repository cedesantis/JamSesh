'use strict';

angular.module('mean.fakesheets').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('fakesheets example page', {
      url: '/fakesheets/example',
      templateUrl: 'fakesheets/views/index.html'
    });
  }
]);
