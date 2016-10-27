angualr.module('translateModuel', [])

.controller('translateCtrl', function ($scope, information) {
   $.getJSON('language.json').then(function (data) {
    console.log('this is the data from getJOSN',data);
    $scope.countries = data; 
  });
})