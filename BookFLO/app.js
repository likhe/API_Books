var myApp = angular.module('routing', []).config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        'https://www*.googleapis.com/**',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'http://srv*.assets.example.com/**'
    ]);

    // The blacklist overrides the whitelist so the open redirect here is blocked.
    $sceDelegateProvider.resourceUrlBlacklist([
        'http://myapp.example.com/clickThru**'
    ]);
});

myApp.controller('Controller', ['$scope', '$http', "$q", function($scope, $http, $q) {
    console.log("salut");
    let button = document.getElementById("button");
    let inputvalue = document.getElementById("search").value;
    let jsonurl = "https://www.googleapis.com/books/v1/volumes?q=harry+potter";




    button.onclick = function() {
        getjson();
    }

    function getjson() {
        console.log("getjson");
        inputvalue = document.getElementById("search").value;
        console.log("inputvalue = ", inputvalue);


        $http({
            method: 'GET',
            url: jsonurl
        }).then(function successCallback(response, data, status) {
            console.log("response = ", response);
            console.log("data = ", response.data);
            drawtheresult();
        }, function errorCallback(response) {
            console.log("error can't get the JSON file from the server", response);
            document.getElementById("test").innerHTML = "Erreur lors de l'appel du json";
            return false;
        });
    };









    function drawtheresult() {
        console.log("drawing the table with results");

    };





}]);
