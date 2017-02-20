var myApp = angular.module('bookflo', []).config(function($sceDelegateProvider) {
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

myApp.controller('Controller', ['$scope', '$http', "$q", function($scope, $http, $q, $state) {
    console.log("salut");
    let button = document.getElementById("button");
    let inputvalue = document.getElementById("search").value;

    button.onclick = function() {
        urlmaker();


    }


    function urlmaker() {
        let jsonurl = "https://www.googleapis.com/books/v1/volumes?q=";

        inputvalue = document.getElementById("search").value;
        console.log("inputvalue = ", inputvalue);
        let newarray = [];
        let formatedstring = "";

        newarray = inputvalue.split(" ");
        console.log("newarray :", newarray);

        formatedstring = newarray.join('%20');
        console.log("formatedstring :", formatedstring);

        jsonurl += formatedstring;
        console.log("json url write by the function :", jsonurl);

        getjson(jsonurl);

    };


    function getjson(jsonurl) {



        console.log("getjson");
        $http({
            method: 'GET',
            url: jsonurl
        }).then(function successCallback(response, data, status) {
            let books = response.data.items;
            console.log("response = ", response);
            console.log("data = ", response.data);
            console.log("books = ", books);
            console.log("books 0 = ", response.data.items[0]);
            console.log("books 0 volume info = ", response.data.items[0].volumeInfo);
            console.log("title = ", books[0].volumeInfo.title);
            console.log("auteurs = ", books[0].volumeInfo.authors[0]);
            console.log("ISBN = ", books[0].volumeInfo.industryIdentifiers[0].identifier);
            console.log("editeur = ", books[0].volumeInfo.publisher);
            console.log("Date = ", books[0].volumeInfo.publishedDate);




            creatinglist();
        }, function errorCallback(response) {
            console.log("error can't get the JSON file from the server", response);
            document.getElementById("result").innerHTML = "Erreur lors de l'appel du json";
            return false;
        });
    };

    function creatinglist() {
        console.log("making an array with info we needs");
        let list = [];






    };




    function drawtheresult() {
        console.log("drawing the table with results");





    };






}]);



var myApp = angular.module('bookflo', []);
app.controller('customersCtrl', function($scope, $http) {
    $http.get("customers.php").then(function (response) {
        $scope.names = response.data.records;
    });
});















/*

  app.views.redraw = function() {
  const people = app.models.people.get();
  const tbody = document.querySelector("tbody");
  const trContainer = document.createDocumentFragment();

  // Remove tbody contents
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
  // Add new contents from people
  for (let i = 0; i < people.length; i++) {
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${people[i].surname}</td><td>${people[i].firstname}</td><td>${people[i].age}</td><td>${people[i].height}</td>`;
    trContainer.appendChild(tr);
  }
  tbody.appendChild(trContainer);
};
*/
