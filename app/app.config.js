angular.
  module('beepMetroApp').
  config(['$locationProvider', '$routeProvider', '$httpProvider',
    function config($locationProvider, $routeProvider, $httpProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        otherwise('/');

			$httpProvider.interceptors.push("NavitiaInjector");
    }
  ]);