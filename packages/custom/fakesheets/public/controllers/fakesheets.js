'use strict';

angular.module('mean.fakesheets').controller('FakesheetsController', ['$scope', 'Global', 'Fakesheets',
  function($scope, Global, Fakesheets) {
    $scope.global = Global;
    $scope.package = {
      name: 'fakesheets'
    };
      $scope.hasAuthorization = function(article) {
      if (!article || !article.user) return false;
      return $scope.global.isAdmin || article.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var fakesheet = new fakesheet    ({
          title: this.title,
          content: this.content
        });
        fakesheet.$save(function(response) {
          $location.path('fakesheets/' + response._id);
        });

        this.title = '';
        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(fakesheet) {
      if (fakesheet) {
        fakesheet.$remove(function(response) {
          for (var i in $scope.fakesheet) {
            if ($scope.fakesheet[i] === fakesheet) {
              $scope.articles.splice(i, 1);
            }
          }
          $location.path('fakesheets');
        });
      } else {
        $scope.article.$remove(function(response) {
          $location.path('fakesheets');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var article = $scope.fakesheet;
        if (!fakesheet.updated) {
          fakesheet.updated = [];
        }
        fakesheet.updated.push(new Date().getTime());

        fakesheet.$update(function() {
          $location.path('fakesheets/' + article._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Fakesheets.query(function(fakesheets) {
        $scope.articles = articles;
      });
    };

    $scope.findOne = function() {
      Fakesheets.get({
        articleId: $stateParams.fakesheedId
      }, function(fakesheet) {
        $scope.fakesheet = fakesheet;
      });
    };
  }           
                                                            
]);
