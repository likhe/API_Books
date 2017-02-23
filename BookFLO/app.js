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
    let button = document.getElementById("button");
    let inputvalue = document.getElementById("search").value;
    let maxresultsinput = document.getElementById("maxresults").selectedIndex;
    let maxresultsinputvalue = document.getElementsByTagName("option")[maxresultsinput].value
    let resultnumbers = maxresultsinputvalue;
    let args = ""; // arguments in case we want a more specific search

    var titlecheckbox = document.querySelector('input[name="titlecheckbox"]');
    let authorcheckbox = document.querySelector('input[name="authorcheckbox"]');
    let publisher = document.querySelector('input[name="publisher"]');
    let checkboxall = document.querySelector('input[name="checkboxall"]');
    let checkboxsum = 0;
    let allchecked = 0;

    titlecheckbox.addEventListener("click", checkboxlistener);
    authorcheckbox.addEventListener("click", checkboxlistener);
    publisher.addEventListener("click", checkboxlistener);
    checkboxall.addEventListener("click", checkboxlistener);

    $scope.books;
    $scope.results = [];

    function checkboxlistener() {
        checkboxsum = 0;
        if (titlecheckbox.checked == true) {
            checkboxsum++;
        }
        if (authorcheckbox.checked == true) {
            checkboxsum++;
        }
        if (publisher.checked == true) {
            checkboxsum++;
        }
        if (checkboxall.checked == true) {
            allchecked = 1;
        }
        if (checkboxsum == 3) {
            checkboxall.checked = true;
            checkboxsum = 3
        } else if (checkboxsum < 3) {
            checkboxall.checked = false
        } else if (checkboxall.checked == true) {
            checkboxsum = 3;
        }
    }


    button.onclick = function() {
        urlmaker();
    }


    function urlmaker() {
        inputvalue = document.getElementById("search").value;
        maxresultsinput = document.getElementById("maxresults").selectedIndex;
        maxresultsinputvalue = document.getElementsByTagName("option")[maxresultsinput].value
        resultnumbers = maxresultsinputvalue;
        args = "";
        if (titlecheckbox.checked == true) {
            args += "+intitle:" + inputvalue;
        }
        if (authorcheckbox.checked == true) {
            args += "+inauthor:" + inputvalue;
        }
        if (publisher.checked == true) {
            args += "+inpublisher:" + inputvalue;
        }

        let key = "&key=AIzaSyCsQR7F04zJVfUL4trC4XFh7tEwLwjt4DY" // google api key for monitoring
        let jsonurl = "https://www.googleapis.com/books/v1/volumes?q="; // url base
        let newarray = [];
        let formatedstring = "";
        let maxresult = "&maxResults=" + resultnumbers;


        newarray = inputvalue.split(" ");

        formatedstring = newarray.join('%20'); //join all index values in a string and put a space char between them

        jsonurl += formatedstring + args + maxresult + key; // url done

        getjson(jsonurl); //sending the formatted url to the getjson function

    };

    function getjson(jsonurl) {
        $http({
            method: 'GET',
            url: jsonurl
        }).then(function successCallback(response, data, status) {
            books = response.data.items;
            args = "";
            creatinglist();
        }, function errorCallback(response) {
            args = "";
            console.log("error can't get the JSON file from the server", response);
            document.getElementById("result").innerHTML = "Erreur lors de l'appel du json";
            return false;
        });
    };

    function creatinglist() {
        $scope.results = []; // array reset
        let image, titre, auteur, identifieur, editeur, date, apercu, genre;
        for (var i = 0; i < books.length; i++) {
            let errocounter = 0;

            books[i].volumeInfo.imageLinks == undefined ? (errocounter++, image = "N/C") : image = books[i].volumeInfo.imageLinks.smallThumbnail;

            books[i].volumeInfo.title == undefined ? (errocounter++, titre = "N/C") : titre = books[i].volumeInfo.title;

            books[i].volumeInfo.authors == undefined ? (errocounter++, auteur = "N/C") : auteur = books[i].volumeInfo.authors[0];

            books[i].volumeInfo.industryIdentifiers[0].identifier == undefined ? (errocounter++, identifieur = "N/C") : identifieur = books[i].volumeInfo.industryIdentifiers[0].identifier;

            books[i].volumeInfo.publisher == undefined ? (errocounter++, editeur = "N/C") : editeur = books[i].volumeInfo.publisher;

            books[i].volumeInfo.publishedDate == undefined ? (errocounter++, date = "N/C") : date = books[i].volumeInfo.publishedDate;

            books[i].volumeInfo.previewLink == undefined ? (errocounter++, apercu = "N/C") : apercu = books[i].volumeInfo.previewLink;

            books[i].volumeInfo.categories == undefined ? (errocounter++, genre = "N/C") : genre = books[i].volumeInfo.categories[0];



            $scope.results.push({
                smallThumbnail: image,
                title: titre,
                author: auteur,
                isbn: identifieur,
                publisher: editeur,
                publisherDate: date,
                previewLink: apercu,
                categories: genre
            })


        }

        document.getElementById("table").style.display = "block";
        /*    drawtheresult(); not needed for now maybe in a future implementation  */

    };


    /*

        function drawtheresult() {
            console.log("drawing the table with results"); // should call the ng-include

        };*/

}]);
