angular.module('bakpak.signup', [])

.controller('signupCtrl', function($scope, $http, $window) {

  $scope.signup = function(){
    $http({
      method: 'POST',
      url:'/signup',
      data: {username: $scope.username,
             password: $scope.password}
    }).then(function successCallback(res){
      $scope.username = "";
      $scope.password = "";
      $window.location = "/#/signin";
    }, function errorCallback(res){
      $scope.msg = 'Username already exists';
    });
  }
})
