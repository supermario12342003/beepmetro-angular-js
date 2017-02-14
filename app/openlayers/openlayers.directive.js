/*
* @Author: Mengwei Choong
* @Date:   2017-02-12 19:23:17
* @Last Modified by:   Mengwei Choong
* @Last Modified time: 2017-02-13 23:00:45
*/

'use strict';

angular.module('openlayers')
.directive('olMap', function() {
  return {
    restrict: 'E',
    templateUrl: 'openlayers/openlayers.template.html',
    controller: ['$scope', function SearchBarController($scope) {

      var self = $scope;

    	var map = new ol.Map({
    		interactions: ol.interaction.defaults({mouseWheelZoom:false}),
        target: "map",
        control: [],
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([2.3522, 48.8566]),
          zoom: 10
        })
      });

    }],
  };
});