angular.
	module("core.navitia")
	.factory('NavitiaInjector', [function() {  
    return {
        request: function(config) {
          	config.headers["Authorization"] = "6c6d93d9-7953-4f5a-a087-2c0dc2efef3b";
            return config;
        }
    };
}]);