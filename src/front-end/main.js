/* eslint-disable no-undef */
var app = angular.module('commenting-app', ['ngRoute']);

var url = 'http://0.0.0.0:5000';

app.config(function($routeProvider) {
	$routeProvider
		.when('/',{
			templateUrl:'./html_components/comments.html',
			controller:'commentController',
			title:'Discussion Blog',
		});
});

app.controller('commentController', function($scope, $http) {
	$scope.name = '';
	$scope.newComment = '';
	$scope.message = '';
	$scope.addComment = function() {
		$scope.message = '';
		if ($scope.name.length !== 0 && $scope.newComment.length !== 0) {
			let data = 'name='+$scope.name+'&comment='+$scope.newComment;
			$scope.name = '';
			$scope.newComment = '';
			$http(
				{
					url: url+'/addComment',
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded' 
					},
					data: data
				}
			)
				.then( resp => {
					res = resp.data;
					$scope.getAllComments();
				});
		} else {
			$scope.message = 'Please Fill the details';
		}
		
	};
	$scope.getAllComments = function() {
		$http(
			{
				url: url+'/getComments',
				method: 'GET',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded' 
				}
			}
		)
			.then( resp => {
				var res = resp.data;
				$scope.dataList = {};
				if (res === 'Empty Dataset') {
					console.warn('fill data');
				} else {
					res.sort((a, b) => {
						return b['id']-a['id'];
					});
					$scope.dataList = res;
				}
			});
	};
	$scope.upVote = function(id) {
		let data = 'id='+id;
		$http(
			{
				url: url+'/upvoteComment',
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded' 
				},
				data: data
			}
		)
			.then( resp => {
				res = resp.data;
				$scope.getAllComments();
			});
	};
	$scope.downVote = function(id) {
		let data = 'id='+id;
		$http(
			{
				url: url+'/downvoteComment',
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded' 
				},
				data: data
			}
		)
			.then( resp => {
				res = resp.data;
				$scope.getAllComments();
			});
	};
});