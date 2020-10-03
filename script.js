// On-click event for movie search

var queryURL = "https://www.googleapis.com/books/v1/volumes?q=search+subject:&orderBy=newest" + book ;
var book =  $(this).attr("data-name");
var books = $();


function displaybooks() {
 $.ajax({
     url:queryURL,
     method: "GET"
 }).then (function(Response) {
  console.log(Response)

var results = 0
 
 })   
}
