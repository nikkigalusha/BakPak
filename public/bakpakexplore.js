angular.module('bakpak.explore', [])

.controller('exploreController', function($scope, $http){
	$scope.city = "";
	$scope.results = [];
	$scope.weather;
	$scope.arts;
	$scope.images;
	$scope.promos;
	$scope.flights;
	$scope.translate;
	$scope.selectedCountry;
	$scope.countries = [
  { name: 'Afghanistan', code: 'ps' },
  { name: 'land Islands', code: 'sv' },
  { name: 'Albania', code: 'sq' },
  { name: 'Algeria', code: 'ar' },
  { name: 'American Samoa', code: 'en' },
  { name: 'Andorra', code: 'ca' },
  { name: 'Angola', code: 'pt' },
  { name: 'Anguilla', code: 'en' },
  { name: 'Antarctica', code: '' },
  { name: 'Antigua and Barbuda', code: 'en' },
  { name: 'Argentina', code: 'es' },
  { name: 'Armenia', code: 'hy' },
  { name: 'Aruba', code: 'nl' },
  { name: 'Australia', code: 'en' },
  { name: 'Austria', code: 'de' },
  { name: 'Azerbaijan', code: 'az' },
  { name: 'Bahamas', code: 'en' },
  { name: 'Bahrain', code: 'ar' },
  { name: 'Bangladesh', code: 'bn' },
  { name: 'Barbados', code: 'en' },
  { name: 'Belarus', code: 'be' },
  { name: 'Belgium', code: 'nl' },
  { name: 'Belize', code: 'en' },
  { name: 'Benin', code: 'fr' },
  { name: 'Bermuda', code: 'en' },
  { name: 'Bhutan', code: 'dz' },
  { name: 'Bolivia', code: 'es' },
  { name: 'Bosnia and Herzegovina', code: 'bs' },
  { name: 'Botswana', code: 'en' },
  { name: 'Bouvet Island', code: '' },
  { name: 'Brazil', code: 'pt' },
  { name: 'British Indian Ocean Territory', code: 'en' },
  { name: 'Brunei Darussalam', code: 'ms' },
  { name: 'Bulgaria', code: 'bg' },
  { name: 'Burkina Faso', code: 'fr' },
  { name: 'Burundi', code: 'fr' },
  { name: 'Cambodia', code: 'km' },
  { name: 'Cameroon', code: 'en' },
  { name: 'Canada', code: 'en' },
  { name: 'Cape Verde', code: 'pt' },
  { name: 'Cayman Islands', code: 'en' },
  { name: 'Central African Republic', code: 'fr' },
  { name: 'Chad', code: 'fr' },
  { name: 'Chile', code: 'es' },
  { name: 'China', code: 'zh' },
  { name: 'Christmas Island', code: 'en' },
  { name: 'Cocos (Keeling) Islands', code: 'en' },
  { name: 'Colombia', code: 'es' },
  { name: 'Comoros', code: 'ar' },
  { name: 'Congo', code: 'fr' },
  { name: 'Congo, The Democratic Republic of the', code: 'fr' },
  { name: 'Cook Islands', code: 'en' },
  { name: 'Costa Rica', code: 'es' },
  { name: 'Cote D\'Ivoire', code: 'fr' },
  { name: 'Croatia', code: 'hr' },
  { name: 'Cuba', code: 'es' },
  { name: 'Cyprus', code: 'el' },
  { name: 'Czech Republic', code: 'cs' },
  { name: 'Denmark', code: 'da' },
  { name: 'Djibouti', code: 'fr' },
  { name: 'Dominica', code: 'en' },
  { name: 'Dominican Republic', code: 'es' },
  { name: 'Ecuador', code: 'es' },
  { name: 'Egypt', code: 'ar' },
  { name: 'El Salvador', code: 'es' },
  { name: 'Equatorial Guinea', code: 'es' },
  { name: 'Eritrea', code: 'ti' },
  { name: 'Estonia', code: 'et' },
  { name: 'Ethiopia', code: 'am' },
  { name: 'Falkland Islands (Malvinas)', code: 'en' },
  { name: 'Faroe Islands', code: 'fo' },
  { name: 'Fiji', code: 'en' },
  { name: 'Finland', code: 'fi' },
  { name: 'France', code: 'fr' },
  { name: 'French Guiana', code: 'fr' },
  { name: 'French Polynesia', code: 'fr' },
  { name: 'French Southern Territories', code: 'fr' },
  { name: 'Gabon', code: 'fr' },
  { name: 'Gambia', code: 'en' },
  { name: 'Georgia', code: 'ka' },
  { name: 'Germany', code: 'de' },
  { name: 'Ghana', code: 'en' },
  { name: 'Gibraltar', code: 'en' },
  { name: 'Greece', code: 'el' },
  { name: 'Greenland', code: 'kl' },
  { name: 'Grenada', code: 'en' },
  { name: 'Guadeloupe', code: 'fr' },
  { name: 'Guam', code: 'en' },
  { name: 'Guatemala', code: 'es' },
  { name: 'Guernsey', code: 'en' },
  { name: 'Guinea', code: 'fr' },
  { name: 'Guinea-Bissau', code: 'pt' },
  { name: 'Guyana', code: 'en' },
  { name: 'Haiti', code: 'fr' },
  { name: 'Heard Island and Mcdonald Islands', code: 'en' },
  { name: 'Holy See (Vatican City State)', code: 'it' },
  { name: 'Honduras', code: 'es' },
  { name: 'Hong Kong', code: 'zh' },
  { name: 'Hungary', code: 'hu' },
  { name: 'Iceland', code: 'is' },
  { name: 'India', code: 'hj' },
  { name: 'Indonesia', code: 'id' },
  { name: 'Iran, Islamic Republic Of', code: 'fa' },
  { name: 'Iraq', code: 'ar' },
  { name: 'Ireland', code: 'ga' },
  { name: 'Isle of Man', code: 'en' },
  { name: 'Israel', code: 'he' },
  { name: 'Italy', code: 'it' },
  { name: 'Jamaica', code: 'en' },
  { name: 'Japan', code: 'ja' },
  { name: 'Jersey', code: 'en' },
  { name: 'Jordan', code: 'ar' },
  { name: 'Kazakhstan', code: 'kk' },
  { name: 'Kenya', code: 'en' },
  { name: 'Kiribati', code: 'en' },
  { name: 'Korea, Democratic People\'s Republic of', code: 'ko' },
  { name: 'Korea, Republic of', code: 'ko' },
  { name: 'Kuwait', code: 'ar' },
  { name: 'Kyrgyzstan', code: 'ky' },
  { name: 'Lao People\'S Democratic Republic', code: 'lo' },
  { name: 'Latvia', code: 'lv' },
  { name: 'Lebanon', code: 'ar' },
  { name: 'Lesotho', code: 'en' },
  { name: 'Liberia', code: 'en' },
  { name: 'Libyan Arab Jamahiriya', code: 'ar' },
  { name: 'Liechtenstein', code: 'de' },
  { name: 'Lithuania', code: 'lt' },
  { name: 'Luxembourg', code: 'fr' },
  { name: 'Macao', code: 'zh' },
  { name: 'Macedonia, The Former Yugoslav Republic of',
    code: 'mk' },
  { name: 'Madagascar', code: 'fr' },
  { name: 'Malawi', code: 'en' },
  { name: 'Malaysia', code: 'en' },
  { name: 'Maldives', code: 'dv' },
  { name: 'Mali', code: 'fr' },
  { name: 'Malta', code: 'mt' },
  { name: 'Marshall Islands', code: 'en' },
  { name: 'Martinique', code: 'fr' },
  { name: 'Mauritania', code: 'ar' },
  { name: 'Mauritius', code: 'en' },
  { name: 'Mayotte', code: 'fr' },
  { name: 'Mexico', code: 'es' },
  { name: 'Micronesia, Federated States of', code: 'en' },
  { name: 'Moldova, Republic of', code: 'ro' },
  { name: 'Monaco', code: 'fr' },
  { name: 'Mongolia', code: 'mn' },
  { name: 'Montenegro', code: 'sr' },
  { name: 'Montserrat', code: 'en' },
  { name: 'Morocco', code: 'ar' },
  { name: 'Mozambique', code: 'pt' },
  { name: 'Myanmar', code: 'my' },
  { name: 'Namibia', code: 'en' },
  { name: 'Nauru', code: 'en' },
  { name: 'Nepal', code: 'ne' },
  { name: 'Netherlands', code: 'nl' },
  { name: 'New Caledonia', code: 'fr' },
  { name: 'New Zealand', code: 'en' },
  { name: 'Nicaragua', code: 'es' },
  { name: 'Niger', code: 'fr' },
  { name: 'Nigeria', code: 'en' },
  { name: 'Niue', code: 'en' },
  { name: 'Norfolk Island', code: 'en' },
  { name: 'Northern Mariana Islands', code: 'en' },
  { name: 'Norway', code: 'no' },
  { name: 'Oman', code: 'ar' },
  { name: 'Pakistan', code: 'ur' },
  { name: 'Palau', code: 'en' },
  { name: 'Palestinian Territory, Occupied', code: 'ar' },
  { name: 'Panama', code: 'es' },
  { name: 'Papua New Guinea', code: 'en' },
  { name: 'Paraguay', code: 'es' },
  { name: 'Peru', code: 'es' },
  { name: 'Philippines', code: 'en' },
  { name: 'Pitcairn', code: 'en' },
  { name: 'Poland', code: 'pl' },
  { name: 'Portugal', code: 'pt' },
  { name: 'Puerto Rico', code: 'es' },
  { name: 'Qatar', code: 'ar' },
  { name: 'Reunion', code: 'fr' },
  { name: 'Romania', code: 'ro' },
  { name: 'Russian Federation', code: 'ru' },
  { name: 'RWANDA', code: 'fr' },
  { name: 'Saint Helena', code: 'en' },
  { name: 'Saint Kitts and Nevis', code: 'en' },
  { name: 'Saint Lucia', code: 'en' },
  { name: 'Saint Pierre and Miquelon', code: 'fr' },
  { name: 'Saint Vincent and the Grenadines', code: 'en' },
  { name: 'Samoa', code: 'sm' },
  { name: 'San Marino', code: 'it' },
  { name: 'Sao Tome and Principe', code: 'pt' },
  { name: 'Saudi Arabia', code: 'ar' },
  { name: 'Senegal', code: 'fr' },
  { name: 'Serbia', code: 'sr' },
  { name: 'Seychelles', code: 'fr' },
  { name: 'Sierra Leone', code: 'en' },
  { name: 'Singapore', code: 'ms' },
  { name: 'Slovakia', code: 'sk' },
  { name: 'Slovenia', code: 'sl' },
  { name: 'Solomon Islands', code: 'en' },
  { name: 'Somalia', code: 'ar' },
  { name: 'South Africa', code: 'af' },
  { name: 'South Georgia and the South Sandwich Islands',
    code: 'en' },
  { name: 'Spain', code: 'es' },
  { name: 'Sri Lanka', code: 'si' },
  { name: 'Sudan', code: 'ar' },
  { name: 'Suriname', code: 'nl' },
  { name: 'Svalbard and Jan Mayen', code: 'no' },
  { name: 'Swaziland', code: 'en' },
  { name: 'Sweden', code: 'sv' },
  { name: 'Switzerland', code: 'de' },
  { name: 'Syrian Arab Republic', code: 'ar' },
  { name: 'Taiwan, Province of China', code: 'zh' },
  { name: 'Tajikistan', code: 'ru' },
  { name: 'Tanzania, United Republic of', code: 'sw' },
  { name: 'Thailand', code: 'th' },
  { name: 'Timor-Leste', code: 'pt' },
  { name: 'Togo', code: 'fr' },
  { name: 'Tokelau', code: 'en' },
  { name: 'Tonga', code: 'en' },
  { name: 'Trinidad and Tobago', code: 'en' },
  { name: 'Tunisia', code: 'ar' },
  { name: 'Turkey', code: 'tr' },
  { name: 'Turkmenistan', code: 'ru' },
  { name: 'Turks and Caicos Islands', code: 'en' },
  { name: 'Tuvalu', code: 'en' },
  { name: 'Uganda', code: 'sw' },
  { name: 'Ukraine', code: 'uk' },
  { name: 'United Arab Emirates', code: 'ar' },
  { name: 'United Kingdom', code: 'en' },
  { name: 'United States', code: 'en' },
  { name: 'United States Minor Outlying Islands', code: 'en' },
  { name: 'Uruguay', code: 'es' },
  { name: 'Uzbekistan', code: 'uz' },
  { name: 'Vanuatu', code: 'fr' },
  { name: 'Venezuela', code: 'es' },
  { name: 'Viet Nam', code: 'vi' },
  { name: 'Virgin Islands, British', code: 'en' },
  { name: 'Virgin Islands, U.S.', code: 'en' },
  { name: 'Wallis and Futuna', code: 'fr' },
  { name: 'Western Sahara', code: 'es' },
  { name: 'Yemen', code: 'ar' },
  { name: 'Zambia', code: 'en' },
  { name: 'Zimbabwe', code: 'sn' }
  ];

	$scope.hotelsApi = function(){
		$http({
		  method: 'POST',
		  url: '/hotels',
		  data: {city: $scope.city}
		})
		.then(function(data){
		  $scope.hotels = data.data.results;
		})
	}

	$scope.restaurantsApi = function(){
		$http({
		  method: 'POST',
		  url: '/restaurants',
		  data: {city: $scope.city}
		})
		.then(function(data){
			debugger;
		  $scope.results = data.data.results;
		})
	}
	$scope.weatherApi = function(){
		$http({
		  method: 'POST',
		  url: '/weather',
		  data: {city: $scope.city}
		})
		.then(function(data){
		  $scope.weather = data.data;
		  $scope.weather.main.temp = Math.round($scope.weather.main.temp * (9 / 5) - 459.67) + '˚F';

		})
	}
	$scope.artsApi = function(){
		$http({
		  method: 'POST',
		  url: '/arts',
		  data: {city: $scope.city}
		})
		.then(function(data){
		  $scope.arts = data.data.results;

		   console.log('here', data.data.results);
		})
	}
	$scope.promosApi = function(){
		$http({
		  method: 'POST',
		  url: '/promos',
		  data: {city: $scope.city}
		})
		.then(function(data){
		  $scope.promos = data.data.deals;


		})
	}
	$scope.eventsApi = function(){
		$http({
		  method: 'POST',
		  url: '/events',
		  data: {city: $scope.city}
		})
		.then(function(data){
		  $scope.events = data.data.search.events[0].event;
		})
	}

	$scope.imagesApi = function(){
		$http({
		  method: 'POST',
		  url: '/images',
		  data: {city: $scope.city}
		})
		.then(function(data){
		  console.log('images', data.data.value)
		  $scope.images = data.data.value;
		})
	}

	$scope.flightsApi = function(){
		$http({
			method: 'POST',
			url: '/flights',
			data:{origin: $scope.origin, destination: $scope.destination, date: $scope.date}
		})
		.then(function(data){
			$scope.flights = data.data.trips.tripOption;
			// console.log("line 79", data.data.trips.tripOption[0].slice[0].segment[0]);
		})
	};

	$scope.translateApi = function(){
		console.log('client', $scope.translate);
		$http({
		  method: 'POST',
		  url: '/translate',
		  data: {inputText: $scope.translate, country: $scope.selectedCountry}
		})
		.then(function(data){
		  $scope.translate = data.data.text[0];
		})
	}

  $scope.saveLocation = function(){
    console.log('location ', $scope.city);
    $http({
      method: 'POST',
      url: '/location',
      data: {city: $scope.city}
    }).then(function(data){
      console.log(data);
    });
  }

  $scope.signup = function(){
    $http({
      method: 'POST',
      url:'/signup',
      data: {username: $scope.username,
             password: $scope.password}
    }).then(function(data){
      console.log(data);
    });
  }
})
