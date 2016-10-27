angular.module('exploreModule', [])
.controller('exploreCtrl', function($scope, $http, information){
  console.log('explore ctrl working');
  setTimeout(function(){
    $scope.weather = information.weather;
    $scope.arts = information.arts;
    $scope.images = information.images;
    $scope.promos = information.promos;
    $scope.flights = information.flights;
    $scope.translate = information.translate;
    $scope.selectedCountry;
    $scope.countries = information.countries; 
    console.log($scope.weather);
  }, 10000);
})
