/*
* @Author: Mengwei Choong
* @Date:   2017-02-12 19:23:17
* @Last Modified by:   Mengwei Choong
* @Last Modified time: 2017-02-15 12:44:08
*/

'use strict';

angular.module('search')
.directive('favouriteTab', function() {
  return {
    restrict: 'E',
    scope: {
      "favourites": '='
    },
    templateUrl: 'search/favourite-tab.template.html',
    controller: ["$scope", "Navitia", function ($scope, Navitia) {
  	  var self = $scope;

    	self.refresh = function refresh(favourite) {
    		favourite.schedule = [];
      	Navitia.schedule(favourite.first_stop.id)
  			.then(function(response){
  				favourite.schedule = response.data.stop_schedules[0].date_times.slice(0, 5);
  			});
      };
    }]
  };
});