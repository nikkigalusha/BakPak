angular.module('bakpak.signin', [])

.controller('signinCtrl', function($scope, $http, $window, information) {

  $scope.signin = function(){
    $http({
      method: 'POST',
      url:'/signin',
      data: {username: $scope.username,
             password: $scope.password}
    }).then(function successCallback(res){
      console.log(res);
      $scope.username = "";
      $scope.password = "";
      $window.location = "/#/";
    }, function errorCallback(res){
      console.log('FAILURE');
      $scope.msg = "Invalid Username or Password";
    });
  }
});
