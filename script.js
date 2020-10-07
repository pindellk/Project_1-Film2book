function getResults() {

    // Movie API call
    var movie = $("#movie-input").val().trim();
    var omdbAPIkey = "&apikey=trilogy";
    var movieURL = "https://www.omdbapi.com/?t=" + movie + omdbAPIkey;

    $.ajax({
        url: movieURL,
        method: "GET"
    }).then(function (response) {

        // Pull movie title and append to DOM
        $("#movie-title").text(response.Title);
        $("#movie-year").text("(" + response.Year + ")");

        // Pull movie poster img and append to DOM
        $("#movie-pick").attr("src", response.Poster);

        // Pull movie genre and turn into array
        var genre = response.Genre;
        var genreArray = genre.split(', ');

        var readPicks = $("<h2>").text("Reading Suggestions:");
        $("#book-results").prepend(readPicks)
       
        function getBookResults() {
            // Clear previous results
            $("#book-results").empty();

            // Select random genre from array and add as search subject in URL
            var searchValue = genreArray[Math.floor(Math.random() * genreArray.length)];
            var bookURL = "https://www.googleapis.com/books/v1/volumes?q=subject:" + searchValue + "&orderBy=newest&startIndex=0&maxResults=40&printType=books&projection=full&langRestrict=en";

            $.ajax({
                url: bookURL,
                method: "GET"
            }).then(function (response) {

                console.log(response.items);

                // Create empty arrays for API data
                var allTitles = [];
                var allAuthors = [];
                var allThumbnails = [];

                // Start a for loop that will go through every item in the APIs list
                for (var i = 0; i < response.items.length; i++) {

                    // Create variables that will hold API data
                    var responseTitles = response.items[i].volumeInfo.title;
                    var responseAuthors = response.items[i].volumeInfo.authors;
                    var responseThumbnails = response.items[i].volumeInfo.imageLinks.thumbnail;

                    // Push variables into each array
                    allTitles.push(responseTitles);
                    allAuthors.push(responseAuthors);
                    allThumbnails.push(responseThumbnails);
                }

                for (var i = 0; i < 6; i++) {
                    // Create random items
                    var randomNumber = Math.floor((Math.random() * 40) + 1);

                    // Grab items from array with the index of a random number
                    var Titles = allTitles[randomNumber];
                    var Authors = allAuthors[randomNumber];
                    var Thumbnails = allThumbnails[randomNumber];

                    var bookResult = $("<li>");
                    var bookAuthor = $("<li>");
                    var thumbnail = $("<img>");

                    bookResult.text(Titles);
                    bookResult.attr("class", "heading is-size-5");
                    bookAuthor.text("Author: " + Authors);
                    thumbnail.attr("src", Thumbnails);

                    $("#book-results").append(bookResult, bookAuthor, thumbnail);

                };
            });
        };
        getBookResults();
    });
};

// Search on-click event
$("#movie-search").click(function (event) {
    event.preventDefault();
    // if ($(this).hasClass('clicked')) { 
    //     return true;
    // } else {
    //     $(this).addClass('clicked').trigger('click');
        getResults();
    // }
    

});

