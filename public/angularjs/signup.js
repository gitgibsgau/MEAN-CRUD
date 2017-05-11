//loading the 'login' angularJS module
var Signup = angular.module('Signup', []);
//defining the login controller
Signup.controller('Signup', function($scope, $http) {

	$scope.invalid_login = true;
	$scope.unexpected_error = true;
	$scope.submit = function() {
		$http({
			method : "POST",
			url : '/signUpUser',
			data : {
				"username" : $scope.username,
				"password" : $scope.password
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.status == 400) {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
			}
			else
				//Making a get call to the '/redirectToHomepage' API
				window.location.assign("/signedUser"); 
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
		});
	};
})
