
function getResults() {
    // Movie API call
    var movie = $("#movie-input").val().trim();
    var omdbAPIkey = "&apikey=trilogy";   // new API key?
    var movieURL = "https://www.omdbapi.com/?t=" + movie + omdbAPIkey;

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
            var searchValue = genreArray[Math.floor(Math.random() * genreArray.length)];
            var bookURL = "https://www.googleapis.com/books/v1/volumes?q=subject:" + searchValue + "&orderBy=newest&startIndex=0&printType=books&projection=full&langRestrict=en";

            $.ajax({
                url: bookURL,
                method: "GET"
            }).then(function (response) {

                for (var i = 0; i < response.items.length; i++) {
                   
                    var bookResult = $("<li>");

                    // randomBook = response[Math.floor(Math.random() * response.length)]
                    bookResult.text(response.items[i].volumeInfo.title);

                    $("#book-items").append(bookResult);

                    console.log();
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