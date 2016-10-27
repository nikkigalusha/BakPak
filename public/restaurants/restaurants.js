angular.module('restaurantsModule', [])

.controller('restaurantsCtrl', function($scope, $http){
	$scope.yelpApi = function() {
    if ("geolocation" in navigator) {
    	console.log('geolocation invoked')
      navigator.geolocation.getCurrentPosition(function (position) {
	      $scope.lat = position.coords.latitude;
	      $scope.lon = position.coords.longitude;
	      var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en';

	      $.getJSON(GEOCODING).done(function(location) {
	      	console.log('geoloc working')
	        $scope.location = location.results[0].address_components[3].long_name;
	        var reqData = {location: $scope.location, lat: $scope.lat, long: $scope.long};
	        $http.post('/yelpRestaurants',reqData).then(function(data) {
	        	console.log('yelp working')
	          $scope.restaurants = data.data.businesses;
	          console.log('here is the restaurants ', $scope.restaurants);
	        })
	      })
      });
    } else {
      console.log("not available");
    }
  }
  $scope.yelpApi();
})