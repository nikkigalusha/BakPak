angular.module('eventModule', [])

.controller('eventCtrl', function($scope, $http, information) {
  var eventsApi = function(){

		$http.post('/events', {city: information.city})
		.then(function(data){
			console.log(data);
			$scope.events = data.data.search.events[0].event;
		  information.events = data.data.search.events[0].event;
		})
	}
	eventsApi();
})
