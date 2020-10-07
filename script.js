

var movie = $("#movie-input").val().trim();
function getResults() {

    // Movie API call
    var movie = $("#movie-input").val().trim();
    var omdbAPIkey = "&apikey=trilogy";   // new API key?
    var movieURL = "https://www.omdbapi.com/?t=" + movie + omdbAPIkey;

    // Add return if movie does not exist


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
        
        var pick =$("<h2>").text("Your pick:");
        var readPicks= $("<p>").addClass("is-size-4").text("Reading Suggestions:");
        

        // card.append(tileChild,tileParent);
        
        $("#book-results").prepend(readPicks)
        $("#movie-result").prepend(pick)



        function getBookResults() {
            // Clear previous results
            $("#book-items").empty();

            // Select random genre from array and add as search subject in URL
            var searchValue = genreArray[Math.floor(Math.random() * genreArray.length)];
            var bookURL = "https://www.googleapis.com/books/v1/volumes?q=subject:" + searchValue + "&orderBy=newest&startIndex=0&maxResults=40&printType=books&projection=full&langRestrict=en";

            $.ajax({
                url: bookURL,
                method: "GET"
            }).then(function (response) {

                console.log(response.items);

                var allTitles = [];
                var allAuthors = [];
                var allThumbnails = [];
                // Creating an array to hold all the titles

                // Starting a for loop that will go through every item in the APIs list
                for (var i = 0; i < response.items.length; i++) {
                    // Creating a variable that will hold the item's title
                    var responseTitles = response.items[i].volumeInfo.title;
                    var responseAuthors = response.items[i].volumeInfo.authors;
                    var responseThumbnails = response.items[i].volumeInfo.imageLinks.thumbnail;

                    // Pushing each title into the allTitles array
                    allTitles.push(responseTitles);
                    allAuthors.push(responseAuthors);
                    allThumbnails.push(responseThumbnails);
                }

                for (var i = 0; i < 6; i++) {

                    var randomNumber = Math.floor((Math.random() * 40) + 1);
                    // Grabbing a title from the allTitles array with the index of a random number.
                    var Titles = allTitles[randomNumber];
                    var Authors = allAuthors[randomNumber];
                    var Thumbnails = allThumbnails[randomNumber];

                    console.log(Titles);
                    console.log(Authors);
                    console.log(Thumbnails);


                    var bookResult = $("<li>");
                    var bookAuthor = $("<li>");
                    var thumbnail = $("<img>");

                    bookResult.text(Titles);
                    bookResult.attr("class", "heading is-size-5");
                    bookAuthor.text("Author: " + Authors);
                    thumbnail.attr("src", Thumbnails);

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
    if ($(this).hasClass('clicked')) { 
        return true;
    } else {
        $(this).addClass('clicked').trigger('click');
        getResults();
    }
    

});

