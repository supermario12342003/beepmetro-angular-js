/*
* @Author: Mengwei Choong
* @Date:   2017-02-12 19:23:17
* @Last Modified by:   Mengwei Choong
* @Last Modified time: 2017-02-15 13:10:21
*/

'use strict';

angular.module('search')
.directive('journey', function() {
	return {
 		restrict: 'E',
    scope: {
      "favourites": '=',
      "beeps": "=",
      "journeys": "=",
    },
  	templateUrl: '/search/journey.template.html',
    controller: ['$scope', '$uibModal', 'Favourite', function JourneyController($scope, $uibModal, Favourite) {

      var self = $scope;

      self.addBeep = function(journey) {
        return $uibModal.open({
          size: "sm",
          templateUrl: "/search/search.add-beep.html",
          controller: ["$scope", "$uibModalInstance", function addBeepController($scope, $uibModalInstance) {

            $scope.journey = $scope.$resolve.journey;
            $scope.msteps = [];
            for (var i = 1; i < 60; i++) {
              $scope.msteps.push(i);
            }
            
            $scope.walking_time = 5;

            $scope.confirmAddBeep = function() {
              $uibModalInstance.close({$value: {
                  "journey":$scope.journey,
                  "walking_time": $scope.walking_time,
                }
              });
            }

            $scope.dismiss = function() {
              $uibModalInstance.dismiss();
            }
          }],
          resolve: {
            journey: function () {
              return journey;
            }
          } 
        }).result.then(function(data) {
          self.beeps.push({
            "first_stop": JSON.parse(JSON.stringify(data.$value.journey.info.first_stop)),
            "display_informations": JSON.parse(JSON.stringify(data.$value.journey.info.display_informations)),
            "walking_time": data.$value.walking_time,
          });
          console.log(self.beeps);
        });
      };

      self.addFavourite = function(journey) {
        return $uibModal.open({
          size: "sm",
          templateUrl: "/search/search.add-favourite.html",
          controller: ["$scope", "$uibModalInstance", function addFavouriteController($scope, $uibModalInstance) {

            $scope.journey = $scope.$resolve.journey;
            $scope.confirmAddFavourite = function() {
              $uibModalInstance.close({$value: $scope.journey});
            }

            $scope.dismiss = function() {
              $uibModalInstance.dismiss();
            }
          }],
          resolve: {
            journey: function () {
              return journey;
            }
          } 
        }).result.then(function(data) {
        	var fav = {
            "first_stop": JSON.parse(JSON.stringify(data.$value.info.first_stop)),
            "display_informations": JSON.parse(JSON.stringify(data.$value.info.display_informations)),
          };

          self.favourites.push(fav);
          Favourite.addFavourite(fav);
        });
      };
  	}]
  }
});
