/*
* @Author: Mengwei Choong
* @Date:   2017-02-15 12:54:35
* @Last Modified by:   Mengwei Choong
* @Last Modified time: 2017-02-15 16:44:52
*/
angular.
	module("core.navitia")
	.factory('NavitiaInjector', [function() {  
    return {
        request: function(config) {
          	config.headers["Authorization"] = "my-token-here:)";
            return config;
        }
    };
}]);