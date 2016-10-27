angular.module('bakpak.signout', [])
.controller('signoutCtrl', function($http){
  $http({
    method: 'GET',
    url: '/signout'
  });
});
