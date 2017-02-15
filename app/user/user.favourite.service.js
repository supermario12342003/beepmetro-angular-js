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