//loading the 'login' angularJS module
var blogList = angular.module('blogList', []);
//defining the login controller
blogList.controller('blogList', function($scope, $http) {



$scope.callme = function() {
    $http.get("/getEmail").success(function(response) {
        if (response.status == 200) {
            //alert(response.username);
            $scope.email = response.username;
            //$scope.email = response.data.email;
        }
    }).success(function(){
    alert("E haalo "+$scope.email );
    $http({
        method: "GET",
        url: '/blogList',
        params: {
            "owner": $scope.email
        }
    }).success(function (data) {
        //checking the response data for statusCode
        if (data.status == 400) {
            alert("Sorry");
        }

        else {

            alert(JSON.stringify(data.data));
            $scope.blogs = data.data;

        }
    }).error(function (error) {

        alert("Error !");
    });
});
}
});
