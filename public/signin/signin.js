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
      information.currentUser = $scope.username;
      $scope.username = "";
      $scope.password = "";
      $window.location = "/#/";
    }, function errorCallback(res){
      console.log('FAILURE');
      $scope.msg = "Invalid Username or Password";
    });
  }

  $scope.showStuff = function() {
    console.log('CURRENT USER', information.currentUser);
    if(information.currentUser.length > 0) {
      return true;
    } else {
      return false;
    }
  }
});
