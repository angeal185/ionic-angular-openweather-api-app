angular.module('openweather-app', [ 'ionic' ]).config(($stateProvider, $urlRouterProvider) ->
  $stateProvider.state('home',
    url: '/home'
    controller: 'HomeCtrl'
    templateUrl: 'views/home.html').state('weather',
    url: '/weather'
    controller: 'WeatherCtrl'
    templateUrl: 'views/weather.html').state('UV',
    url: '/UV'
    controller: 'UVCtrl'
    templateUrl: 'views/UV.html').state 'pollution',
    url: '/pollution'
    controller: 'PollutionCtrl'
    templateUrl: 'views/pollution.html'
  $urlRouterProvider.otherwise '/home'
  return
).controller('HomeCtrl', ($scope) ->
  $scope.forcastDisabled = true
  $scope.menu = [
    {
      'href': 'weather'
      'icon': 'ios7-partlysunny'
      'title': 'Current Weather'
    }
    {
      'href': 'UV'
      'icon': 'ios7-sunny-outline'
      'title': 'UV Index'
    }
    {
      'href': 'pollution'
      'icon': 'ios7-cloudy-outline'
      'title': 'Pollution Index'
    }
  ]
  $scope.title = 'OpenWeather API App'
  $scope.sub = 'Display current weather via the openweather API'
  return
).controller('WeatherCtrl', ($scope, $http, $ionicLoading) ->
  directions = [
    'N'
    'NE'
    'E'
    'SE'
    'S'
    'SW'
    'W'
    'NW'
  ]

  $scope.getIconUrl = (iconId) ->
    'http://openweathermap.org/img/w/' + iconId + '.png'

  $ionicLoading.show()
  loc = 
    'city': 'melbourne'
    'ccode': 'AU'
  API = '2276eae9e8ab503863a8d70a559a8d4e'
  $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + loc.city + ',' + loc.ccode + '&units=imperial&appid=' + API).success((weather) ->
    $scope.weather = weather
    $ionicLoading.hide()
    return
  ).error (err) ->
    $ionicLoading.show
      template: 'Could not load weather. Please try again later.'
      duration: 3000
    return

  $scope.getDirection = (degree) ->
    if degree > 338
      degree = 360 - degree
    index = Math.floor((degree + 22) / 45)
    directions[index]

  return
).controller('UVCtrl', ($scope, $http, $ionicLoading) ->
  $ionicLoading.show()
  loc = 
    lat: -37.81
    lon: 144.96
  local = 
    'city': 'melbourne'
    'ccode': 'AU'
  API = '2276eae9e8ab503863a8d70a559a8d4e'
  $http.get('http://api.openweathermap.org/data/2.5/uvi?appid=' + API + '&lat=' + loc.lat + '&lon=' + loc.lon).success((items) ->
    $scope.area = local.city + ', ' + local.ccode
    $scope.items = items
    $ionicLoading.hide()
    return
  ).error (err) ->
    $ionicLoading.show
      template: 'Could not load UV index. Please try again later.'
      duration: 3000
    return
  return
).controller('PollutionCtrl', ($scope, $http, $ionicLoading) ->
  $ionicLoading.show()
  loc = 
    lat: -37.81
    lon: 144.96
  local = 
    'city': 'melbourne'
    'ccode': 'AU'
  API = '2276eae9e8ab503863a8d70a559a8d4e'
  $http.get('http://api.openweathermap.org/pollution/v1/co/0.0,10.0/current.json?appid=' + API + '&lat=' + loc.lat + '&lon=' + loc.lon).success((items) ->
    $scope.area = local.city + ', ' + local.ccode
    $scope.items = items
    $ionicLoading.hide()
    return
  ).error (err) ->
    $ionicLoading.show
      template: 'Could not load UV index. Please try again later.'
      duration: 3000
    return
  return
).run ($ionicPlatform) ->
  $ionicPlatform.ready ->
    if window.cordova and window.cordova.plugins.Keyboard
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar true
    if window.StatusBar
      StatusBar.styleDefault()
    return
  return