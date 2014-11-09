'use strict';
angular.module('mean.fakesheets').factory('Fakesheets', ['$resource',
  function($resource) {
    return $resource('fakesheets/:fakesheetId', {
      fakesheetId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);