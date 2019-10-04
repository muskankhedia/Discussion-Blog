/* eslint-disable no-undef */
var app = angular.module('commenting-app', ['ngRoute']);

var global = {
	url:'http://0.0.0.0:5000',
	refresh:true,
};

app.config(function($routeProvider) {
	$routeProvider
		.when('/',{
			templateUrl:'./html_components/comments.html',
			controller:'commentController',
			title:'Commenting App',
		});
});

app.controller('commentController', function($scope, $http) {
	console.warn('initiated project');
	console.log($scope.newComment);
	$scope.name = '';
	$scope.newComment = '';
	$scope.addComment = function() {
		console.log('clicked');
		console.log($scope.name);
		console.log($scope.newComment);
		let data = 'name='+$scope.name+'&comment='+$scope.newComment;
		$http(
			{
				url: global.url+'/addComment',
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded' 
				},
				data: data
			}
		)
			.then( resp => {
				res = resp.data;
				console.log(res);
			});
	};
	$scope.getAllComments = function() {
		$http(
			{
				url: global.url+'/getComments',
				method: 'GET',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded' 
				}
			}
		)
			.then( resp => {
				$scope.res = resp.data;
			});
	};
    


});