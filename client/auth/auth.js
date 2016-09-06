angular.module('greenfield.auth', [])

.controller('AuthController', ['$scope', function($scope) {
  $scope.user = {};
  $scope.signin = function(){
    console.log($scope.user);
  };
  $scope.signup = function () {
    console.log($scope.user.password)
    console.log($scope.user);
  };
}]);
