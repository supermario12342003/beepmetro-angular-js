angular.
  module('beepMetroApp').
  config(['$locationProvider', '$routeProvider', '$httpProvider',
    function config($locationProvider, $routeProvider, $httpProvider) {

      $locationProvider.hashPrefix('!');

      $routeProvider.
      	when('/', {
        	template: '<search></search>',
        }).
      	when('/login', {
          template: '<login></login>',
        }).
        when('/logout', {
        	template: 'Login out',
          controller: ["Authentication", "$location", function LogoutController(Authentication, $location){
          	Authentication.logout();
          	$location.path('/');
		      }],
        }).
        when('/register', {
          template: '<register></register>',
        }).
        otherwise('/');

			//$httpProvider.interceptors.push("NavitiaInjector");
    }
  ]);