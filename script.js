
function getResults() {

    // Movie API call
    var movie = $("#movie-input").val().trim();
    var omdbAPIkey = "&apikey=trilogy";   // new API key?
    var movieURL = "https://www.omdbapi.com/?t=" + movie + omdbAPIkey;

    // Add return if movie does not exist

    localStorage.setItem("movie", movie);

    $.ajax({
        url: movieURL,
        method: "GET"
    }).then(function (response) {
        // Pull movie title and append to DOM
        $("#movie-title").text(response.Title);
        $("#movie-year").text("(" + response.Year + ")");

        // Pull movie poster img and append to DOM
        $("#movie-pick").attr("src", response.Poster);

        // Pull movie genre - turn into array
        var genre = response.Genre;
        var genreArray = genre.split(', ');

        function getBookResults() {
            // Clear previous results
            $("#book-items").empty();

            // Select random genre from array and add as search subject in URL
            var searchValue = genreArray[Math.floor(Math.random() * genreArray.length)];
            var bookURL = "https://www.googleapis.com/books/v1/volumes?q=subject:" + searchValue + "&orderBy=newest&startIndex=0&printType=books&projection=full&langRestrict=en";

            $.ajax({
                url: bookURL,
                method: "GET"
            }).then(function (response) {

                var bookList = response.Items;

                for (var i = 0; i < 6; i++) {

                    // var randomBook = bookList[Math.floor(Math.random() * response.length)];
                    // console.log(randomBook);

                    var bookResult = $("<li>");
                    var bookAuthor = $("<li>");
                    var thumbnail = $("<img>");

                    bookResult.text(response.items[i].volumeInfo.title);
                    bookResult.attr("class", "heading is-size-5");
                    bookAuthor.text("Author: " + response.items[i].volumeInfo.authors);
                    thumbnail.attr("src", response.items[i].volumeInfo.imageLinks.thumbnail);

                    $("#book-items").append(bookResult, bookAuthor, thumbnail);
                };
            });
        };
        getBookResults();
    });
};

// Search on-click event
$("#movie-search").click(function (event) {
    event.preventDefault();
    getResults();
});