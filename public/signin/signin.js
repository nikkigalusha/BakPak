angular.module('bakpak.signin', [])

.controller('signinCtrl', function($scope, $http, $window) {

  $scope.signin = function(){
    $http({
      method: 'POST',
      url:'/signin',
      data: {username: $scope.username,
             password: $scope.password}
    }).then(function(data){
      console.log(data);
      $scope.username = "";
      $scope.password = "";
      $window.location = "/#/";
    });
  }
});

