angular.module('bakpak.mystuff', [])

.controller('mystuffCtrl', function($scope, $http){
  $scope.data = {};

  $http({
    method: 'POST',
    url: '/mystuff',
    data: { data: 'data'}
  }).then(function(data){
    $scope.data = data.data;
    console.log($scope.data);
  });
});
