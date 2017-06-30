angular.module('openweather-app', ['ionic'])

.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      controller: 'HomeCtrl',
      templateUrl: 'views/home.html'
    })
    .state('weather', {
      url: '/weather',
      controller: 'WeatherCtrl',
      templateUrl: 'views/weather.html'
    })
	.state('UV', {
      url: '/UV',
      controller: 'UVCtrl',
      templateUrl: 'views/UV.html'
    })
	.state('pollution', {
      url: '/pollution',
      controller: 'PollutionCtrl',
      templateUrl: 'views/pollution.html'
    })
  
  $urlRouterProvider.otherwise('/home');

})

.controller('HomeCtrl', function($scope) {
    $scope.forcastDisabled = true
	$scope.menu = [
		{
			"href": "weather",
			"icon": "ios7-partlysunny",
			"title": "Current Weather"
		}, {
			"href": "UV",
			"icon": "ios7-sunny-outline",
			"title": "UV Index"
		}, {
			"href": "pollution",
			"icon": "ios7-cloudy-outline",
			"title": "Pollution Index"
		}
	];
	$scope.title = "OpenWeather API App";
	$scope.sub = "Display current weather via the openweather API";
})

.controller('WeatherCtrl', function ($scope, $http, $ionicLoading) {
  var directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

  $scope.getIconUrl = function(iconId) {
      return 'http://openweathermap.org/img/w/' + iconId + '.png';
  };

  $ionicLoading.show();

  var loc = {"city": "melbourne","ccode": "AU"};
  var API = "2276eae9e8ab503863a8d70a559a8d4e"

  $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + loc.city + ',' + loc.ccode + '&units=imperial&appid=' + API).success(function (weather) {
    $scope.weather = weather;
    $ionicLoading.hide();
  }).error(function (err) {
    $ionicLoading.show({
      template: 'Could not load weather. Please try again later.',
      duration: 3000
    });
  });

  $scope.getDirection = function (degree) {
    if (degree > 338) {
      degree = 360 - degree;
    }
    var index = Math.floor((degree + 22) / 45);
    return directions[index];
  };
})

.controller('UVCtrl', function ($scope, $http, $ionicLoading) {

  $ionicLoading.show();

  var loc = {lat: -37.81, lon: 144.96};
  var local = {"city": "melbourne","ccode": "AU"};
  var API = "2276eae9e8ab503863a8d70a559a8d4e"

    $http.get('http://api.openweathermap.org/data/2.5/uvi?appid=' + API + '&lat=' + loc.lat + '&lon=' + loc.lon).success(function (items) {
	$scope.area = local.city +', '+ local.ccode;	
    $scope.items = items;
    $ionicLoading.hide();
  }).error(function (err) {
    $ionicLoading.show({
      template: 'Could not load UV index. Please try again later.',
      duration: 3000
    });
  });
})

.controller('PollutionCtrl', function ($scope, $http, $ionicLoading) {

  $ionicLoading.show();

  var loc = {lat: -37.81, lon: 144.96};
  var local = {"city": "melbourne","ccode": "AU"};
  var API = "2276eae9e8ab503863a8d70a559a8d4e"

    $http.get('http://api.openweathermap.org/pollution/v1/co/0.0,10.0/current.json?appid=' + API + '&lat=' + loc.lat + '&lon=' + loc.lon).success(function (items) {
	$scope.area = local.city +', '+ local.ccode;	
    $scope.items = items;
    $ionicLoading.hide();
  }).error(function (err) {
    $ionicLoading.show({
      template: 'Could not load UV index. Please try again later.',
      duration: 3000
    });
  });
  
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });
})
