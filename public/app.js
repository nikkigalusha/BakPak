var app = angular.module('bakpak', [
  'bakpakFactory',
  'homeModule',
  'exploreModule',
  'ngRoute'])

app.config(function ($routeProvider) {
  console.log('this runs right away');
  $routeProvider
    .when('/', {
      templateUrl: './public/home/home.html',
      controller: 'homeCtrl'
    })
    .when('/explore', {
      templateUrl: './public/explore/explore.html',
      controller:  'exploreCtrl'
    })
    .when('/reserve', {
      templateUrl: './public/reserve.html'
    })
    .when('/signup', {
      templateUrl: './public/signin.html',
    })
    .otherwise({
      redirectTo: '/',
    })
})
