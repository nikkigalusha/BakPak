var app = angular.module('bakpak', [
  'ngRoute',
  'bakpak.explore'])

app.config(function ($routeProvider) {
  console.log('this runs right away');
  $routeProvider
    .when('/', {
      templateUrl: './public/home/home.html',
      controller: 'exploreController'
    })
    .when('/explore', {
      templateUrl: './public/explore.html'
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
