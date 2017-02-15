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