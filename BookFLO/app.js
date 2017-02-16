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

myApp.controller('ExampleController', ['$scope', '$http', "$q", function($scope, $http, $q) {
    console.log("salut");

    $http({
        method: 'GET',
        url: 'https://www.googleapis.com/books/v1/volumes/s1gVAAAAYAAJ'
    }).then(function successCallback(response, data, status) {
        console.log("response = ", response);
        console.log("data = ", data);
    }, function errorCallback(response) {
        //add by ben
        console.log("response errorCallback = ", response);
        console.log("error can't get the JSON file from the server");
        document.getElementById("test").innerHTML = "Erreur lors de l'appel du json"
    });

}]);
