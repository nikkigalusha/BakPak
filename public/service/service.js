angular.module('bakpakFactory', [])

.service('information', function (){
  this.countries; 
  this.city='';
  this.results = [];
  this.weather;
  this.arts;
  this.images;
  this.promos;
  this.events;
  this.translate;
  this.selectedCountry;

  this.currentUser = '';
})