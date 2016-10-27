angular.module('dealsModule', [])

.controller('dealsCtrl', function($scope, $http, information) {
  var dealsApi = function(){
		$http.post('/promos', {city: information.city})
		.then(function(data){
			console.log(data);
			$scope.promos = data.data.deals;
		  information.promos = data.data.deals;
		})
	}
	dealsApi();
})
