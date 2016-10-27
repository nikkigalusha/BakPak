var app = angular.module('bakpak', [
  'bakpakFactory',
  'homeModule',
  'exploreModule',
  'restaurantsModule',
  'dealsModule',
  'eventModule',
  'translateModule',
  'bakpak.signin',
  'bakpak.signup',
  'bakpak.signout',
  'bakpak.mystuff',
  'ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: './home/home.html',
      controller: 'homeCtrl'
    })
    .when('/explore', {
      templateUrl: './explore/explore.html',
      controller:  'exploreCtrl'
    })
    .when('/reserve', {
      templateUrl: './reserve/reserve.html'
    })
    .when('/signin', {
      templateUrl: './signin/signin.html',
      controller: 'signinCtrl'
    })
    .when('/signup', {
      templateUrl: './signup/signup.html',
      controller: 'signupCtrl'
    })
    .when('/signout', {
      templateUrl: './signout/signout.html',
      controller: 'signoutCtrl'
    })
    .when('/mystuff', {
      templateUrl: './mystuff/mystuff.html',
      controller: 'mystuffCtrl'
    })
    .when('/restaurants', {
      templateUrl: './restaurants/restaurants.html',
      controller: 'restaurantsCtrl'
    })
    .when('/deal', {
      templateUrl: './deals/deals.html',
      controller: 'dealsCtrl'
    })
    .when('/event', {
      templateUrl: './event/event.html',
      controller: 'eventCtrl'
    })
    .when('/translate', {
      templateUrl: './translate/translate.html',
      controller: 'translateCtrl'
    })
    .when('/loading', {
      templateUrl: './loading/loading.html'
    })
    .otherwise({
      redirectTo: '/',
    })
})
