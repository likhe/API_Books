function handleResponse(response) {
for (var i = 0; i < response.items.length; i++) {
  var item = response.items[i];
  // in production code, item.text should have the HTML entities escaped.
  document.getElementById("content").innerHTML += "<br>" + item.volumeInfo.title;
}
}
