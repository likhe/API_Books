function bookSearch() {
    let search = document.getElementById('result').value;
    document.getElementById('result').innerHTML = "";
    console.log(search);

    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
        dataType: "json",

        success: function(data) {
            console.log(data);
        },
        type: 'GET'
    });
}
document.getElementById('button').addEventListener('click', bookSearch, false);
