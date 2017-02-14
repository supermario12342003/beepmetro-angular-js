/*
* @Author: Mengwei Choong
* @Date:   2017-02-12 19:23:17
* @Last Modified by:   Mengwei Choong
* @Last Modified time: 2017-02-14 16:52:38
*/

'use strict';

angular.module('search')
.directive('transportIcon', function() {
  return {
    restrict: 'E',
    scope: {
      "display_informations": '=info'
    },
    templateUrl: 'search/transport-icon.template.html',
  };
});