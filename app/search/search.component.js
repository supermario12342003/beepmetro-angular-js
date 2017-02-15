/*
* @Author: Mengwei Choong
* @Date:   2017-02-15 16:30:09
* @Last Modified by:   Mengwei Choong
* @Last Modified time: 2017-02-15 16:44:39
*/
angular.
  module('search').
  component('search', {
    templateUrl: 'search/search.template.html',
    controller: ['Navitia', 'Favourite', '$location', function SearchController(Navitia, Favourite, $location) {

      var self = this;
      self.origin = {};
      self.destination = {};
      self.journeys = [];
      self.favourites = Favourite.getFavourites();
      self.beeps = [];
      self.searching = false;

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

      self.search = function search() {
        self.searching = true;
        if (self.origin && self.destination) {
          Navitia.journeyById(self.origin.id, self.destination.id)
          .success(function (data) {

            self.journeys = data.journeys;
            self.fixJourneys();
            self.searching = false;
          })
          .error(function (data) {
            console.log(data);
          });
        }
      };

    }]
  });