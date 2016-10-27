angular.module('bakpak.signup', [])

.controller('signupCtrl', function($scope, $http, $window) {

  $scope.signup = function(){
    $http({
      method: 'POST',
      url:'/signup',
      data: {username: $scope.username,
             password: $scope.password}
    }).then(function(data){
      console.log(data);
      if (data.data === 'data') {
        alert('USERNAME ALREADY EXISTS. PLEASE SIGN IN OR PICK ANOTHER USERNAME.');
        $scope.username = "";
        $scope.password = "";
      }
      else {
        $scope.username = "";
        $scope.password = "";
        $window.location = '/#/signin';
      }
    });
  }
})