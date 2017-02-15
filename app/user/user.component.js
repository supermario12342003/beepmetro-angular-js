/*
* @Author: Mengwei Choong
* @Date:   2017-02-14 22:57:19
* @Last Modified by:   Mengwei Choong
* @Last Modified time: 2017-02-15 09:09:02
*/

'use strict';
angular.
  module('user').
  component('login', {
    templateUrl: 'user/login.template.html',
    controller: ["Authentication", "$location", function LoginController(Authentication, $location) {
    	var self = this;

    	self.user = {'remember':true};
		
		self.login = function () {
			self.user.errors = {};
			Authentication.login(self.user.email, self.user.password, self.user.remember)
			.then(function (data) {
				$location.path("/");
			}, function (data) {
				self.user.errors.general = "invalid username/password";
				$scope.loginForm.$setPristine();
			});
		};
    }]
  });

angular.
  module('user').
  component('register', {
    templateUrl: 'user/register.template.html',
    controller: ["Authentication", "$location", function RegisterController(Authentication, $location) {
    	var self = this;
		self.user = {};

		self.register = function () {
			self.user.errors = {};
			Authentication.register(self.user.email, self.user.password).
			success(function(data) {
				$location.path("/");
			}).
			error(function (data) {
				self.user.errors = data;
				$scope.registerForm.$setPristine();
			});
		};
    }]
  });