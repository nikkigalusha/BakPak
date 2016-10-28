angular.module('homeModule', [])

.controller('homeCtrl', function ($scope, $http, information, $window) {
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
	  var imagesApi = function(){
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
	  weatherApi();
	  imagesApi();
	  setTimeout( function(){
	  	$window.location = '/#/explore';
	  }, 3000)
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