//loading the 'login' angularJS module
var blog = angular.module('blog', []);
//defining the login controller
blog.controller('blog', function($scope, $http) {


	$http.get("/getEmail").success(function(response) {
		if (response.status == 200) {
			//alert(response.username);
			$scope.email = response.username;
			//$scope.email = response.data.email;
		}
	});


	$scope.list = function(username){
		alert(username);
		$http({
			method : "GET",
			url : '/redirectToDashboard',
			params : {
				"username" : username
			}
		}).success(function(data){
			alert(JSON.stringify(data.status));
			if(data.status == 200){
				window.location.assign("dashboard");
			}
		})
	}

	$scope.submit = function() {
		alert("in");
		$http({
			method : "POST",
			url : '/blogs',
			data : {
				"title" : $scope.title,
				"content" : $scope.content
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 400) {
				alert("Sorry");
			}
			
			else {


				$scope.title = "";
				$scope.content = "";

				window.location.assign("homepage");
			}
		}).error(function(error) {

			alert("Error !");
		});
	};
})
