/*
* @Author: Mengwei Choong
* @Date:   2017-02-15 16:25:24
* @Last Modified by:   Mengwei Choong
* @Last Modified time: 2017-02-15 16:34:05
*/
const apiHost = "https://django-rest-beep.herokuapp.com";
//const apiHost = "http://127.0.0.1:8000";

(function () {
	angular
	.module('user')
	.factory('Authentication', Authentication)

	Authentication.$inject = ['$cookies', '$http', '$rootScope', ];

	/**
	* @namespace Authentication
	* @returns {Factory}
	*/
	function Authentication($cookies, $http, $rootScope) {
	    /**
	    * @name Authentication
	    * @desc The Factory to be returned
	    */

	    var Authentication = {
	      isAuthenticated: isAuthenticated,
	      login: login,
	      logout: logout,
	      register: register,
	      authenticate: authenticate,
	      me: me,
	      refresh: refresh,
	    };
	    return Authentication;

	    ////////////////////
		function authenticate(token, remember) {
			$rootScope.isAuthenticated = true;
			$http.defaults.headers.common.Authorization = 'Token ' + token
			if (remember) {
				var now = new Date();
				var exp = new Date(now.getFullYear()+2, now.getMonth(), now.getDate());
				$cookies.put("auth_token", token, {expires:exp});
			}
			else {
				$cookies.put("auth_token", token);
			}
			Authentication.me().success(function (data) {
				$rootScope.$broadcast('authenticated', data.id);
			});
		}

		function refresh() {
			if (Authentication.isAuthenticated()) {
				authenticate($cookies.get('auth_token'));
			}
		}

	    /**
	    * @name register
	    * @desc Try to register a new user
	    * @param {string} username The username entered by the user
	    * @param {string} password The password entered by the user
	    * @param {string} email The email entered by the user
	    * @returns {Promise}
	    * @memberOf beepmetro.authentication.services.Authentication
	    */
	    function register(email, password) {
	    	console.log("register");
	      return $http.post(apiHost + "/api/account/register/", {
	        email: email,
	        password: password,
	      }).success(function (data) {
	      	Authentication.authenticate(data.token, true);
	      });
	    }

		/**
		* @name login
		* @desc Try to log in with email `email` and password `password`
		* @param {string} email The email entered by the user
		* @param {string} password The password entered by the user
		* @returns {Promise}
		* @memberOf beepmetro.authentication.services.Authentication
		*/
		function login(email, password, remember) {
			return $http.post(apiHost + "/api/account/login/", {
				email: email, password: password
			}).success(loginSuccessFn);

			function loginSuccessFn(data) {
				Authentication.authenticate(data.token, remember);
			}
		}

		/**
		* @name isAuthenticated
		* @desc Check if the current user is authenticated
		* @returns {boolean} True is user is authenticated, else false.
		* @memberOf beepmetro.authentication.services.Authentication
		*/
		function isAuthenticated() {
			if ($cookies.get("auth_token")) {
				return true;
			}
			else {	
				return false;
			}
		}

		function me() {
			if (Authentication.isAuthenticated()) {
				return $http.get(apiHost + "/api/account/me/")
				.success(function (data) {
					console.log(data);
					$rootScope.me = data;
				})
				.error(function (data) {
					Authentication.logout();
				});
			}
			return null;
		}

		/**
		* @name logout
		* @desc Try to log the user out
		* @returns {Promise}
		* @memberOf beepmetro.authentication.services.Authentication
		*/
		function logout() {
			$rootScope.isAuthenticated = false;
			$rootScope.me = null;
			$http.defaults.headers.common.Authorization = ""
			$cookies.remove('auth_token');
			$rootScope.$broadcast("unauthenticated");
		}
	}
})();