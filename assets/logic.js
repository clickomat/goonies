
$(document).ready(function () {

        // ======== Sorting function/Algorithm ========
    function bubbleSort(arr) {
        var len = arr.length;
        for (var i = len - 1; i >= 0; i--) {
            for (var j = 1; j <= i; j++) {
                if (arr[j - 1] > arr[j]) {
                    var temp = arr[j - 1];
                    arr[j - 1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr;
    }

        // ======== Variables used for the first two API calls relating to OMDB ========
    var characterName = "";  
    var marvelCharacterName = "";
    var imdbID = "";

        // ==== When a character image is clicked on main screen ========
    $(".circle").on("click", function () {  
        
        characterName = $(this).attr("data-name");

        if (characterName === "blackWidow") {
            characterName = "avengers_infinity_war";
        }

        var OMDBQueryURL = "https://www.omdbapi.com/?s=" + characterName + "&year=2008&apikey=f367c400";
        // ====================

        // ==== OMDB API call ========
        $.ajax({
            url: OMDBQueryURL,
            method: 'GET'
        }).then(function (response) {
        
        // ===== This section sorts the movie respons years=====
            var yearArr = [];
            var yearIntArr = [];

            for (var i = 0; i < response.Search.length; i++) {
                if (response.Search[i].Type === "movie") {
                     yearArr.push(response.Search[i].Year);
                console.log(yearArr); 
                }
            }

            for (var j=0; j<yearArr.length; j++){
                var yearToNum = parseInt(yearArr[j]);
                yearIntArr.push(yearToNum);
                console.log(yearIntArr);   
            }

            bubbleSort(yearIntArr);
        // ====================

        // ==== looks to find most recent movie's IMDB ID ========
        for (var x = 0; x < response.Search.length; x++) {
            var convertedYear = parseInt(response.Search[x].Year);
            var yearAtEnd = yearIntArr[yearIntArr.length - 1]
           
            if (convertedYear == yearIntArr[yearIntArr.length-1]) {
                if (characterName === "hawkeye" || characterName === "blackWidow" || characterName === "avengers_infinity_war") {
                    imdbID = "tt4154756";
                } else {
                    imdbID = response.Search[x].imdbID;
                }
            } else {
                console.log("Error");  
            }
        }
        // ====================

        // ==== Sets Variable to the IMDB ID and runs API call using the variable ========
          var imdbIDQueryURL = "https://www.omdbapi.com/?i="+imdbID+"&plot=full&apikey=f367c400";
           
            $.ajax({
                url: imdbIDQueryURL,
                method: 'GET'
            }).then(function (response2) {
                
                $("#homePG").addClass("invisible");
                $("#charPG").removeClass("invisible");
                
                var movieTitle;
                var movieReleased;
                var movieRating;
                var moviePlot;

                if (response2.Ratings.length == 0) {
                    movieRating = "Data Unavailable";
                } else {
                    movieRating = response2.Ratings[0].Source + " - " + response2.Ratings[0].Value;
                }

                $("#currentMovieTitle").text(response2.Title);
                $("#currentMovieRelease").text(response2.Released);
                $("#currentMovieRating").text(movieRating);
                $("#currentMoviePlot").text(response2.Plot);
            });

        // ====================

        // ==== Sets Variable to for the Wikipdia API call and changes Page Title/Character Image ========
        if (characterName === "blackWidow" || characterName === "avengers_infinity_war") {
            var comicVineQueryURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=black%20widow%20comic&limit=3&namespace=0&format=json";
            $("#characterName").text("Black Widow");
            $("#characterTopImage").attr("src", "./assets/images/CartoonBlackWidow.jpg");


        }
        else if (characterName === "captain-america") {
            var wikipediaQueryURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=captain%20america%20comic&limit=3&namespace=0&format=json";
            $("#characterName").text("Captain America");
            $("#characterTopImage").attr("src", "./assets/images/CartoonCaptain.jpg");
        }
        else if (characterName === "hulk") {
            var wikipediaQueryURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=hulk%20comic&limit=3&namespace=0&format=json";
            $("#characterName").text("The Hulk");
            $("#characterTopImage").attr("src", "./assets/images/CartoonHulk.jpg");
        }
        else if (characterName === "hawkeye") {
            var wikipediaQueryURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=hawkeye%20comic&limit=3&namespace=0&format=json";
            $("#characterName").text("Hawkeye");
            $("#characterTopImage").attr("src", "./assets/images/CartoonHawkeye.jpg");
        }
        else if (characterName === "iron-man") {
            var wikipediaQueryURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=iron%20man%20comic&limit=3&namespace=0&format=json";
            $("#characterName").text("Iron Man");
            $("#characterTopImage").attr("src", "./assets/images/CartoonIronMan.jpg");
        }
        else if (characterName === "thor") {
            var wikipediaQueryURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=thor%20comic&limit=3&namespace=0&format=json";
            $("#characterName").text("Thor");
            $("#characterTopImage").attr("src", "./assets/images/CartoonThor.jpg");
        }
        // ====================

        // ==== Wikipedia API Call ========
        $.ajax({
            url: wikipediaQueryURL,
            method: 'GET',
        }).then(function (response) {
            var wikiButtons = $("<div>");
            $("#wikiAPILink").html(wikiButtons);
            for (i=0; i<3; i++) {
                if (response[1][i] !== undefined) {
                    var responseLinkTitle = response[1][i];
                    var responseLink = response[3][i];
                    $(wikiButtons).append("<a href=" + responseLink + " target='_blank' class='wiki-button-style'><button>" + responseLinkTitle + "</button></a>");
                }
            }
        });
        });
        
        // ==== Switches screen displays for main/character pages (this allows API data to not be lost) ========
        $("#backToHome").on("click", function() {
            $("#charPG").addClass("invisible");
            $("#homePG").removeClass("invisible");
        })
  

});
});
