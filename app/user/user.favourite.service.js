/*
* @Author: Mengwei Choong
* @Date:   2017-02-15 13:35:38
* @Last Modified by:   Mengwei Choong
* @Last Modified time: 2017-02-15 16:34:10
*/
(function () {
	angular
	.module('user')
	.factory('Favourite', ["$cookies", function Authentication($cookies) {

		function getFavourites() {
			try {
				var favourites = JSON.parse($cookies.get("favourites", "[]"));
			}
			catch(err) {
				var favourites = [];
			}
			return favourites;
		}
		
		return {
			getFavourites: getFavourites,
			addFavourite: function addFavourite(favourite) {
				var now = new Date();
				var exp = new Date(now.getFullYear()+2, now.getMonth(), now.getDate());

				var favourites = getFavourites();
				favourites.push(favourite);
				$cookies.put("favourites", JSON.stringify(favourites), {expires:exp});

			}
		}
	}]);
})();