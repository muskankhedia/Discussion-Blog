var app = angular.module('commenting-app', ['ngRoute']);

var global = {
    url:'http://0.0.0.0:5000',
    refresh:true,
}

app.config(function($routeProvider,$locationProvider) {
    $routeProvider
    .when('/',{
        templateUrl:'./html_components/comments.html',
        controller:'commentController',
        title:'Commenting App',
    })
})

app.controller('commentController', function($scope,$location,$rootScope,$http) {
    console.warn('initiated project')
})