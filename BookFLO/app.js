var myApp = angular.module('routing', []);
myApp.controller('ExampleController', ['$scope', '$http', "$q", function($scope, $http, $q) {
    console.log("salut");

    $http({
        method: 'JSONP',
        url: 'https://www.goodreads.com/book/review_counts.json?isbns=0441172717%2C0141439602&key=vWpLK9nsq7was0ZRwN5MxQ'
    }).then(function successCallback(response, data, status) {
        console.log(data);
    }, function errorCallback(response) {
        //add by ben
        console.log(response);
        console.log("error can't get the JSON file from the server");
        document.getElementById("test").innerHTML = "Erreur lors de l'appel du json"
    });
}]);
