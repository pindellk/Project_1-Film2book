// On-click event for movie search
// On-click event for movie search

// Function for finding movie genre

// Function for finding books based on subject

// Function for BOOK AJAX get request

// Append book results to DOM


// Search on-click event
$("#movie-search").click(function (event) {
  event.preventDefault();

  var movie = $("#movie-input").val().trim();
  var APIkey = "&apikey=trilogy";
  var queryURL = "https://www.omdbapi.com/?t=" + movie + APIkey;

  localStorage.setItem("movie", movie);

  $.ajax({
      url: queryURL,
      method: "GET"
  }).then(function (response) {
      // Pull movie title and append to DOM
      $("#movie-title").text(response.Title);
      $("#movie-year").text("(" + response.Year + ")");

      // Pull movie poster img and append to DOM
      $("#movie-pick").attr("src", response.Poster);

      // Pull movie genre
      var genre = response.Genre;

      // Console.log for testing - remove when code complete
      console.log(genre);
         
      $.ajax({
            url:"https://www.googleapis.com/books/v1/volumes?q=subject:adventure&orderBy=newest",
            method: "GET"
        }).then (function(response) {
         console.log(response)
    
         
         for (var i = 0; i < response.items.length; i++) {
          // This loop wioll go through every book on the 6-book list
          console.log(response.items[i].volumeInfo.title);
              
          var bookList=$("<li>");
          bookList.text("Title:" + response.items[i].volumeInfo.title).attr("<h3>")
        //  var bookList= $("<li>").text(response.items[i].volumeInfo.title)
          var img =$("<img>");
          img.text()
        //  bookTitle.append(bookList)
      //  var bookTitle=$("#book-title").text(response.Title)
       $("#book-items").append(bookList);
         }
        })   
       
       
  });

});

















// var book =  $(this).attr("data-name");
// var books = $();


// function displaybooks() {
//  $.ajax({
//      url:"https://www.googleapis.com/books/v1/volumes?q=search+subject:" + book + "&orderBy=newest",
//      method: "GET"
//  }).then (function(Response) {
//   console.log(Response)

// var results = 0
 
//  })   
// }
