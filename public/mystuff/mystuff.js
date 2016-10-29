angular.module('bakpak.mystuff', [])

.controller('mystuffCtrl', function($http){
  $http({
    method: 'POST',
    url: '/mystuff',
    data: { data: 'data'}
  }).then(function(data){
    console.log(data);
  });
});
