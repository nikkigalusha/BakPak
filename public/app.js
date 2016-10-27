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
    .otherwise({
      redirectTo: '/',
    })
})
