angular.module('bakpak.signin', [])

.controller('signinCtrl', function($scope, $http, $window, information) {

  $scope.signin = function(){
    $http({
      method: 'POST',
      url:'/signin',
      data: {username: $scope.username,
             password: $scope.password}
    }).success(function(data){
      console.log(data);
      $scope.username = "";
      $scope.password = "";
      if (data === 'OK') {
        $window.location = "/#/";
      }
      // $window.location = "/#/";
    });
  }
});

