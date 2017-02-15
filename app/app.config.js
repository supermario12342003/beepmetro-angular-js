/*
* @Author: Mengwei Choong
* @Date:   2017-02-15 15:22:55
* @Last Modified by:   Mengwei Choong
* @Last Modified time: 2017-02-15 16:34:15
*/
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