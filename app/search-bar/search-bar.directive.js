/*
* @Author: Mengwei Choong
* @Date:   2017-02-12 19:23:17
* @Last Modified by:   Mengwei Choong
* @Last Modified time: 2017-02-13 20:21:42
*/

'use strict';

angular.module('searchBar')
.directive('searchBar', function() {
  return {
    restrict: 'E',
    scope: {
      where: '='
    },
    templateUrl: 'search-bar/search-bar.template.html',
    controller: ['$scope', 'Navitia', function SearchBarController($scope, Navitia) {

      var self = $scope;
      self.query = "";

      self.search = function search(val) {
        return Navitia.search(val)
				.then(function(response){
					console.log(response);
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