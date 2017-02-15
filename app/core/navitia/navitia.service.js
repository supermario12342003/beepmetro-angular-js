/*
* @Author: Mengwei Choong
* @Date:   2017-02-15 16:33:18
* @Last Modified by:   Mengwei Choong
* @Last Modified time: 2017-02-15 16:33:23
*/
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
          var url = "coverage/fr-idf/pt_objects?q=" + query;
          return $http.get(apiHost + "/api/account/navitia?url=" + encodeURIComponent(url));
        },

        journeyById: function journeyById(originId, destinationId) {
          var url = "journeys?from="
            + originId + "&to=" + destinationId + "&datetime=" + getDateTime();
          return $http.get(apiHost + "/api/account/navitia?url=" + encodeURIComponent(url));
        },

        schedule: function (stopId) {
          var url = "coverage/fr-idf/stop_points/"
            + stopId + "/stop_schedules?from_datetime=" + getDateTime();
          return $http.get(apiHost + "/api/account/navitia?url=" + encodeURIComponent(url));
        },

        lineInfo: function lineInfo(lineId) {

        }
      };
    }
  ]);