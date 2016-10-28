angular.module('bakpak.signin', [])

.controller('signinCtrl', function($scope, $http, $window, information) {

  $scope.signin = function(){
    $http({
      method: 'POST',
      url:'/signin',
      data: {username: $scope.username,
             password: $scope.password}
    }).then(function(data){
      console.log(data);
      console.log('Before Saving Current USer', information.currentUser);
      information.currentUser = $scope.username;
      $scope.username = "";
      $scope.password = "";
      console.log('Saved Current User ', information.currentUser);
      $window.location = "/#/";
    });
  }
});

