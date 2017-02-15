/*
* @Author: Mengwei Choong
* @Date:   2017-02-12 19:23:17
* @Last Modified by:   Mengwei Choong
* @Last Modified time: 2017-02-15 16:41:38
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

      self.loading = false;

    	self.refresh = function refresh(favourite) {
        self.loading = true;
      	Navitia.schedule(favourite.first_stop.id)
  			.then(function(response){
          self.loading = false;
          favourite.schedule = [];
  				favourite.schedule = response.data.stop_schedules[0].date_times.slice(0, 5);
  			});
      };
    }]
  };
});