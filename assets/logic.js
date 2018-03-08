
$(document).ready(function () {

    // INFORMATION FOR SITE 
    // 6 character
    // Huklk, ironman, captain america, hawkeye, thor, black widdow

    // http://www.omdbapi.com/?s=thor&year=2008&apikey=f367c400

    // API/AJAX Test sections  

    //OMDB Key = f367c400
    //Marvel API Key = ded1811505155fd04255b903b7f0378a

    // Sorting function/Algorithm
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

    // these two variables will be set during the onclick event to whatever the items data-name attr is
    var characterName = "";  
    var marvelCharacterName = "";
    var imdbID = "";
    



    $(".char").on("click", function () {  // when adding in "img" or "image" after "click" in the on method breaks the function
        
        characterName = $(this).attr("data-name");
        console.log(characterName);
        
        var OMDBQueryURL = "http://www.omdbapi.com/?s=" + characterName + "&year=2008&apikey=f367c400";
         console.log(OMDBQueryURL);

        //AJAX Call
        $.ajax({
            url: OMDBQueryURL,
            method: 'GET'
        }).then(function (response) {

            console.log(response);
        
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
            console.log("bubble sorted" ,yearIntArr);
        // ====================

        // ==== looks to find most recent movie's IMDB ID ========
            for (var x = 0; x < response.Search.length; x++) {
            var convertedYear = parseInt(response.Search[x].Year);
            // console.log('converted year', convertedYear);
            ///
            var yearAtEnd = yearIntArr[yearIntArr.length - 1]
            // console.log('CONVERTED YEAR TYPEOF', typeof(convertedYear));
            // console.log('year at end of array TYPEOF', typeof(yearAtEnd));
            ///
            console.log(response.Search[x].Year)
            console.log(convertedYear, "==", yearIntArr[yearIntArr.length-1])
            if (convertedYear == yearIntArr[yearIntArr.length-1]) {
                
                imdbID = response.Search[x].imdbID;
                console.log("imbd", imdbID);
                // console.log(response.Search[x].imdbID);
            } else {
                console.log("error");  
            }
            // var stringYear = response.Search[x].Year;
            // console.log('converted year', stringYear);
            // recentStringYear = toString(yearIntArr[yearIntArr - 1]);
            // console.log('converted recent year', JSON.stringify(recentStringYear));
            
            
            // if (stringYear == recentStringYear) {
            //     console.log(response.Search[x].imdbID);
            //     imdbID = response.Search[x].imdbID;
            // } else {
            //     console.log("error");  
            // }
            
        }


////


          var imdbIDQueryURL = "http://www.omdbapi.com/?i="+imdbID+"&plot=full&apikey=f367c400";
            // var imdbIDQueryURL = "http://www.omdbapi.com/?i=" + imdbID + "&plot=full&apikey=f367c400";
            // console.log(imdbIDQueryURL);


            $.ajax({
                url: imdbIDQueryURL,
                method: 'GET'
            }).then(function (response2) {
                console.log(imdbID);

                console.log(imdbIDQueryURL);
                console.log(response2);
            });

            console.log(marvelCharacterName);
            var marvelQueryURL = "https://clickomat.github.io/goonies/:443/v1/public/characters?nameStartsWith=hulk&apikey=ded1811505155fd04255b903b7f0378a";

        $.ajax({
            url: marvelQueryURL,
            method: 'GET'
        }).then(function (response) {
            console.log(response);

        });
    // });


////
        });
        
          // ====================
            
        // var imdbIDQueryURL = "http://www.omdbapi.com/?i=tt1483025&plot=full&apikey=f367c400";
        //     // var imdbIDQueryURL = "http://www.omdbapi.com/?i=" + imdbID + "&plot=full&apikey=f367c400";
        //     // console.log(imdbIDQueryURL);
            

        //     $.ajax({
        //         url: imdbIDQueryURL,
        //         method: 'GET'
        //     }).then(function (response2) {
        //         console.log(imdbID);
                
        //         console.log(imdbIDQueryURL);
        //         console.log(response2);
        //     });

          // === uses the imdb ====

          // Run seperate ajax call instead using the omdb URL with the imdbID to search 
          // use the 
          //imdb query url should look like this
          
          // Use the JSON object to present plot, rating, title, actors, etc...
          // -- the syntax for these would be -> response.Title , response.Year , response.Rated ....
          // working URL for example : http://www.omdbapi.com/?i=tt0800080&plot=full&apikey=f367c400

        // ====================

        // ===== DOM Manipulation =====
            // $("#ratings").text(response.Rated);
        // ====================
        
    

    // $(".char").on("click", function () {
    //     marvelCharacterName = $(this).attr("data-name");
    //     console.log(marvelCharacterName);
    //     var marvelQueryURL = "";

    //     $.ajax({
    //         url: marvelQueryURL,
    //         method: 'GET'
    //     }).then(function (response) {
    //         console.log(response);

    //     });
    // });

});
});
