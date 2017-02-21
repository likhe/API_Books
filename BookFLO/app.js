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
    $scope.books;
    $scope.results = [];



    button.onclick = function() {
        urlmaker();
    }


    function urlmaker() {
        let key = "&key=AIzaSyCsQR7F04zJVfUL4trC4XFh7tEwLwjt4DY" // google api key for monitoring
        let jsonurl = "https://www.googleapis.com/books/v1/volumes?q="; // url base
        let args = ""; // arguments in case we want a more specific search
        let newarray = [];
        let formatedstring = "";

        inputvalue = document.getElementById("search").value;
        console.log("inputvalue = ", inputvalue);

        newarray = inputvalue.split(" ");
        console.log("newarray :", newarray);

        formatedstring = newarray.join('%20'); //join all index values in a string and put a space char between them
        console.log("formatedstring :", formatedstring);

        jsonurl += formatedstring;
        console.log("json url write by the function :", jsonurl); // url done

        getjson(jsonurl); //sending the formatted url to the getjson function

    };


    function getjson(jsonurl) {
        console.log("getjson");
        $http({
            method: 'GET',
            url: jsonurl
        }).then(function successCallback(response, data, status) {
            books = response.data.items;
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
            console.log("smallThumbnail = ", books[0].volumeInfo.imageLinks.smallThumbnail);

            validitycheck();
        }, function errorCallback(response) {
            console.log("error can't get the JSON file from the server", response);
            document.getElementById("result").innerHTML = "Erreur lors de l'appel du json";
            return false;
        });
    };


    function validitycheck() {
        console.log("validity check started");
        for (var i = 0; i < books.length; i++) {

          let smallThumbnail = books[i].volumeInfo.imageLinks.smallThumbnail,
          title = books[i].volumeInfo.title,
          author = books[i].volumeInfo.authors,
          isbn = books[i].volumeInfo.industryIdentifiers[0],
          publisher = books[i].volumeInfo.publisher,
          publisherDate = books[i].volumeInfo.publishedDate;


            if (smallThumbnail == undefined) {
                books[i].volumeInfo.imageLinks.smallThumbnail = "N/C";
            }
            if (title == undefined) {
                books[i].volumeInfo.title = "N/C";
            }
            if (author == undefined) {
                books[i].volumeInfo.authors = "N/C";
            }
            if (isbn == undefined) {
                books[i].volumeInfo.industryIdentifiers[0].identifier = "N/C";
            }
            if (publisher == undefined) {
                books[i].volumeInfo.publisher = "N/C";
            }
            if (publisherDate == undefined) {
                books[i].volumeInfo.publishedDate = "N/C";
            } else {
                console.log("check done");
            }
        }
        creatinglist();
    }




    function creatinglist() {
        $scope.results = []; // array reset

        console.log("making an array with info we needs");
        for (var i = 0; i < books.length; i++) {


            $scope.results.push({
                smallThumbnail: books[i].volumeInfo.imageLinks.smallThumbnail,
                title: books[i].volumeInfo.title,
                author: books[i].volumeInfo.authors[0],
                isbn: books[i].volumeInfo.industryIdentifiers[0].identifier,
                publisher: books[i].volumeInfo.publisher,
                publisherDate: books[i].volumeInfo.publishedDate
            })


            console.log("results :", $scope.results, i);
        }
        /*    drawtheresult(); not needed for now maybe in a future implementation  */
    };


    /*

        function drawtheresult() {
            console.log("drawing the table with results"); // should call the ng-include

        };*/

}]);
