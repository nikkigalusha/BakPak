angular.module('translateModule', [])

.controller('translateCtrl', function ($scope, information) {
   $.getJSON('language.json').then(function (data) {
    console.log('this is the data from getJOSN',data);
    $scope.countries = data; 
  });
	$scope.weatherApi = function(){
		$http({
		  method: 'POST',
		  url: '/weather',
		  data: {city: $scope.city}
		})
		.then(function(data){
		  information.weather = data.data;
		  information.weather.main.temp = Math.round(information.weather.main.temp * (9 / 5) - 459.67) + '˚F';
		  console.log(information.weather, information.weather.main.temp);
	  })
  }
		
})