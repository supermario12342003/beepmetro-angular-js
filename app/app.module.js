/*
* @Author: Mengwei Choong
* @Date:   2017-02-12 15:24:40
* @Last Modified by:   Mengwei Choong
* @Last Modified time: 2017-02-15 16:34:23
*/
angular
.module('beepMetroApp', [
  'ngRoute',
  'ngAnimate',
  'ui.bootstrap',
  'search',
  'core',
  'user',
])
.run(['Authentication', function (Authentication) {
	Authentication.refresh();
}]);
