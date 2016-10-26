var countries = jQuery.getJSON('translate.json');
angular.module('bakpak.explore', [])
.controller('exploreController', function($scope, $http){
	$scope.city = "";
	$scope.results = [];
	$scope.weather;
	$scope.arts;
	$scope.images;
	$scope.promos;
	$scope.flights;
	$scope.translate;
	$scope.selectedCountry;
	$scope.countries = countries; 

	$scope.hotelsApi = function(){
		$http({
		  method: 'POST',
		  url: '/hotels',
		  data: {city: $scope.city}
		})
		.then(function(data){
		  $scope.hotels = data.data.results;
		})
	}

	$scope.restaurantsApi = function(){
		$http({
		  method: 'POST',
		  url: '/restaurants',
		  data: {city: $scope.city}
		})
		.then(function(data){
			debugger;
		  $scope.results = data.data.results;
		})
	}
	$scope.weatherApi = function(){
		$http({
		  method: 'POST',
		  url: '/weather',
		  data: {city: $scope.city}
		})
		.then(function(data){
		  $scope.weather = data.data;
		  $scope.weather.main.temp = Math.round($scope.weather.main.temp * (9 / 5) - 459.67) + '˚F';

		})
	}
	$scope.artsApi = function(){
		$http({
		  method: 'POST',
		  url: '/arts',
		  data: {city: $scope.city}
		})
		.then(function(data){
		  $scope.arts = data.data.results;

		   console.log('here', data.data.results);
		})
	}
	$scope.promosApi = function(){
		$http({
		  method: 'POST',
		  url: '/promos',
		  data: {city: $scope.city}
		})
		.then(function(data){
		  $scope.promos = data.data.deals;


		})
	}
	$scope.eventsApi = function(){
		$http({
		  method: 'POST',
		  url: '/events',
		  data: {city: $scope.city}
		})
		.then(function(data){
		  $scope.events = data.data.search.events[0].event;
		})
	}

	$scope.imagesApi = function(){
		$http({
		  method: 'POST',
      url: '/images',
      data: {city: $scope.city}
    })
    .then(function(data){
      console.log('images', data.data.value);
      $scope.images = data.data.value;
      document.body.style['background-image'] = `url(${data.data.value[0].contentUrl})`;
    })
    
  }

  $scope.flightsApi = function(){
    $http({
      method: 'POST',
      url: '/flights',
      data:{origin: $scope.origin, destination: $scope.destination, date: $scope.date}
    })
    .then(function(data){
      $scope.flights = data.data.trips.tripOption;
      // console.log("line 79", data.data.trips.tripOption[0].slice[0].segment[0]);
    })
  };

  $scope.translateApi = function(){
    console.log('client', $scope.translate);
    $http({
      method: 'POST',
      url: '/translate',
      data: {inputText: $scope.translate, country: $scope.selectedCountry}
    })
    .then(function(data){
      $scope.translate = data.data.text[0];
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

  $scope.setBackground = function () {
    console.log('Set background runnning');
  }
})
