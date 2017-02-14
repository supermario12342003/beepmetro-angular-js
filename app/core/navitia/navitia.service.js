const token = "6c6d93d9-7953-4f5a-a087-2c0dc2efef3b";

angular.
  module('core.navitia').
  factory('Navitia', ['$http',
    function($http) {

      function getDateTime() {
          var now     = new Date(); 
          var year    = now.getFullYear();
          var month   = now.getMonth()+1; 
          var day     = now.getDate();
          var hour    = now.getHours();
          var minute  = now.getMinutes();
          var second  = now.getSeconds(); 
          if(month.toString().length == 1) {
              var month = '0'+month;
          }
          if(day.toString().length == 1) {
              var day = '0'+day;
          }   
          if(hour.toString().length == 1) {
              var hour = '0'+hour;
          }
          if(minute.toString().length == 1) {
              var minute = '0'+minute;
          }
          if(second.toString().length == 1) {
              var second = '0'+second;
          }   
          var dateTime = year+month+day+'T'+hour+minute;   
           return dateTime;
      }

      return {
        search: function search(query) {
          var url = "https://api.navitia.io/v1/coverage/fr-idf/pt_objects?q=" + query;
          return $http.get(url);
        },

        journeyById: function journeyById(originId, destinationId) {
          var url = "https://api.navitia.io/v1/journeys?from="
            + originId + "&to=" + destinationId + "&datetime=" + getDateTime();
            console.log(url);
          return $http.get(url);
        },

        schedule: function (stopId) {
          var url = "https://api.navitia.io/v1/coverage/fr-idf/stop_points/"
            + stopId + "/stop_schedules?from_datetime=" + getDateTime();
            console.log(url);
          return $http.get(url);
        },

        lineInfo: function lineInfo(lineId) {

        }
      };
    }
  ]);