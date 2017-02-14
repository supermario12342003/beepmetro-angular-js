angular.
  module('search').
  component('search', {
    templateUrl: 'search/search.template.html',
    controller: ['Navitia', '$uibModal', function SearchController(Navitia, $uibModal) {

      var self = this;
      self.origin = {};
      self.destination = {};
      self.journeys = {};
      self.favourites = [];
      self.beeps = [];

      Navitia.journeyById("stop_area:OIF:SA:59535", "stop_area:OIF:SA:8738641")
      .success(function (data) {
        self.journeys = data.journeys;
        self.fixJourneys();
        console.log(self.journeys[0]);
      });

      self.search = function search() {
        if (self.origin && self.destination) {
          Navitia.journeyById(self.origin.id, self.destination.id)
          .success(function (data) {

            self.journeys = data.journeys;
            self.fixJourneys();
          })
          .error(function (data) {
            console.log(data);
          });
        }
      };

      self.fixJourneys = function() {
        for (var i = 0; i < self.journeys.length; i++) {
            self.journeys[i].selected = false;

            for (var j = 0; j < self.journeys[i].sections.length; j++) {
              if (self.journeys[i].sections[j].type == "public_transport")
              {
                self.journeys[i].info = {
                  "origin": self.journeys[i].sections[0].from,
                  "departure_date_time": self.journeys[i].sections[j].departure_date_time,
                  "display_informations": self.journeys[i].sections[j].display_informations,
                  "first_stop": self.journeys[i].sections[j].from,
                  "destination": self.journeys[i].sections[self.journeys[i].sections.length - 1].to,
                }
                break;
              }
            }
        }
      };

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
      }

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
          self.favourites.push({
            "first_stop": JSON.parse(JSON.stringify(data.$value.info.first_stop)),
            "display_informations": JSON.parse(JSON.stringify(data.$value.info.display_informations)),
          });
        });
      }
    }]
  });