/*
* @Author: Mengwei Choong
* @Date:   2017-02-12 19:23:17
* @Last Modified by:   Mengwei Choong
* @Last Modified time: 2017-02-15 13:19:16
*/

'use strict';

angular.module('search')
.directive('searchBar', function() {
  return {
    restrict: 'E',
    scope: {
      "where": '=',
      "placeholder": "@",
    },
    templateUrl: 'search/search-bar/search-bar.template.html',
    controller: ['$scope', 'Navitia', function SearchBarController($scope, Navitia) {

      var self = $scope;
      self.query = "";

      self.search = function search(val) {
    		return Navitia.search(val)
					.then(function(response){
						return response.data.pt_objects;
				});
      };

      self.select = function select(place) {
        self.query = place.name;
        self.where = place;
      }

    }],
  };
});