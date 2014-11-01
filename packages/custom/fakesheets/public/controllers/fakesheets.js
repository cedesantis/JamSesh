'use strict';

angular.module('mean.fakesheets').controller('FakesheetsController', ['$scope', 'Global', 'Fakesheets',
  function($scope, Global, Fakesheets) {
    $scope.global = Global;
    $scope.package = {
      name: 'fakesheets'
    };
  }
]);
