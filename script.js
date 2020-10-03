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
    });

});