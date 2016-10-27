angular.module('homeModule', [])

.controller('homeCtrl', function ($scope, $http, information) {
  $scope.city = "";
  $scope.initialize = function () {
		var hotelsApi = function(){
			$http({
			  method: 'POST',
			  url: '/hotels',
			  data: {city: $scope.city}
			})
			.then(function(data){
			  information.hotels = data.data.results;
			})
		}
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
		var artsApi = function(){
			$http({
			  method: 'POST',
			  url: '/arts',
			  data: {city: $scope.city}
			})
			.then(function(data){
			  information.arts = data.data.results;
			  console.log('here', data.data.results);
			})
		}
		var promosApi = function(){
			$http({
			  method: 'POST',
			  url: '/promos',
			  data: {city: $scope.city}
			})
			.then(function(data){
			  information.promos = data.data.deals;
			})
		}
		var eventsApi = function(){
			$http({
			  method: 'POST',
			  url: '/events',
			  data: {city: $scope.city}
			})
			.then(function(data){
			  information.events = data.data.search.events[0].event;
			})
		}
		var imagesApi = function(){
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
	  hotelsApi();
	  weatherApi();
	  artsApi();
	  promosApi();
	  eventsApi();
	  imagesApi();
  }

  $scope.flightsApi = function(){
    $http({
      method: 'POST',
      url: '/flights',
      data:{origin: information.origin, destination: information.destination, date: information.date}
    })
    .then(function(data){
      information.flights = data.data.trips.tripOption;
      // console.log("line 79", data.data.trips.tripOption[0].slice[0].segment[0]);
    })
  };

  $scope.translateApi = function(){
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

  $scope.saveLocation = function(){
    console.log('location ', $scope.city);
    $http({
      method: 'POST',
      url: '/location',
      data: {city: $scope.city}
    }).then(function(data){
      console.log(data);
    });
  }
})