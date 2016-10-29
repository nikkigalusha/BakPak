angular.module('bakpak.signout', [])
.controller('signoutCtrl', function($http, information){
  $http({
    method: 'GET',
    url: '/signout'
  }).then((res) => {
    information.currentUser = "";
  });
});
