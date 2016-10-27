angular.module('homeModule', [])

.controller('homeCtrl', function ($scope, $http, information) {
  $scope.initialize = function () {
		var weatherApi = function(){
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
		
		
	  var translateApi = function(){
	    console.log('client', information.translate);
	    $http({
	      method: 'POST',
	      url: '/translate',
	      data: {inputText: information.translate, country: information.selectedCountry}
	    })
	    .then(function(data){
	      information.translate = data.data.text[0];
	    })
	  }
	  translateApi();
	  weatherApi();
	  promosApi();
	  eventsApi();
	 //  artsApi();
		// var artsApi = function(){
		// 	$http({
		// 	  method: 'POST',
		// 	  url: '/arts',
		// 	  data: {city: $scope.city}
		// 	})
		// 	.then(function(data){
		// 	  information.arts = data.data.results;
		// 	  console.log('here', data.data.results);
		// 	})
		// }
  }
	$scope.imagesApi = function(){
		information.city = $scope.city;
		$http({
		  method: 'POST',
      url: '/images',
      data: {city: $scope.city}
    })
    .then(function(data){
      console.log('images', data.data.value);
      information.images = data.data.value;
      document.body.style['background-image'] = `url(${data.data.value[0].contentUrl})`;
    })
  }

 //  $scope.flightsApi = function(){
 //    $http({
 //      method: 'POST',
 //      url: '/flights',
 //      data:{origin: information.origin, destination: information.destination, date: information.date}
 //    })
 //    .then(function(data){
 //      information.flights = data.data.trips.tripOption;
 //      // console.log("line 79", data.data.trips.tripOption[0].slice[0].segment[0]);
 //    })
 //  };


 //  $scope.saveLocation = function(){
 //    console.log('location ', $scope.city);
 //    $http({
 //      method: 'POST',
 //      url: '/location',
 //      data: {city: $scope.city}
 //    }).then(function(data){
 //      console.log(data);
 //    });
 //  }
	// $scope.hotelsApi = function(){
	// 	$http({
	// 	  method: 'POST',
	// 	  url: '/hotels',
	// 	  data: {city: $scope.city}
	// 	})
	// 	.then(function(data){
	// 	  information.hotels = data.data.results;
	// 	})
	// }
})