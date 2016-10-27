angular.module('bakpakFactory', [])

.service('information', function (){
  $.getJSON('language.json').then(function (data) {
    console.log('this is the data from getJOSN',data);
    this.countries = data; 
  });
  this.results = [];
  this.weather;
  this.arts;
  this.images;
  this.promos;
  this.flights;
  this.translate;
  this.selectedCountry;
})