var query = {
	weather: 'http://api.openweathermap.org/data/2.5/weather?q=',
	restaurants: 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants%7bakery+in+',
	landmarks: 'https://geocoder.cit.api.here.com/6.2/search.json?app_id=',
	promos: 'http://api.sqoot.com/v2/deals?api_key=',
	events: 'http://api.eventful.com/rest/events/search?app_key=',
	translate: 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=',
	hotels: 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=hotels+in+',

}

module.exports = query;
