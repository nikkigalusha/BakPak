var app = angular.module('bakpak', [
  'bakpakFactory',
  'homeModule',
  'exploreModule',
  'ngRoute'])

app.config(function ($routeProvider) {
  console.log('this runs right away');
  $routeProvider
    .when('/', {
      templateUrl: './home/home.html',
      controller: 'homeCtrl'
    })
    .when('/explore', {
      templateUrl: './explore/explore.html',
      controller:  'exploreCtrl'
    })
<<<<<<< c420f2f23e238d95580c1697d39f8709d4475a88
    .when('/reserve', {
      templateUrl: './public/reserve.html'
    })
    .when('/signup', {
      templateUrl: './public/signin.html',
    })
=======
>>>>>>> refactor client
    .otherwise({
      redirectTo: '/',
    })
})
