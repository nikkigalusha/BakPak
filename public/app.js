var app = angular.module('bakpak', [
  'ngRoute',
  'bakpak.explore'])

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: './public/home.html'
    })
    .when('/explore', {
      templateUrl: './public/explore.html'
    })
    .when('/reserve', {
      templateUrl: './public/reserve.html'
    })
    .when('/signup', {
      templateUrl: './public/signin.html'
    })
    .otherwise({
      redirectTo: '/',
    })
})
