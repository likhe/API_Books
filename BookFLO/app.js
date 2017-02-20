'use strict';

var app = angular.module('routing', []);


app.controller('ExampleController', function($scope, $http) {
  $http.defaults.headers.put = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
        };
        $http.defaults.useXDomain = true;
        
    $http.get("https://www.goodreads.com/book/review_counts.json?isbns=0441172717%2C0141439602&key=vWpLK9nsq7was0ZRwN5MxQ").then(function(response) {
        $scope.book = response.data;
        console.log($scope.book);
    });
});
