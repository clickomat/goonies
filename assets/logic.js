
$(document).ready(function () {
alert("ur good");
    // 6 character
    // Huklk, ironman, captain america, hawkeye, thor, black widdow

    // http://www.omdbapi.com/?s=thor&year=2008&apikey=f367c400

    // API/AJAX Test sections  

    //OMDB Key = f367c400
    //Marvel API Key = ded1811505155fd04255b903b7f0378a

    var characterName = "hulk"; // will be set during the onclick event to whatever the items data-name attr is 
    var marvelQueryURL = "";
    var OMDBQueryURL = "http://www.omdbapi.com/?s=" + characterName + "&year=2008&apikey=f367c400";

    $(".char").on("click", "img", function () {

        characterName = $(this).data("name")
        console.log(characterName);
        
        $.ajax({
            url: marvelQueryURL,
            method: 'GET'
        }).then(function (response) {
            console.log(response);

        });

        $.ajax({
            url: OMDBQueryURL,
            method: 'GET'
        }).then(function (response) {
            console.log(response);

        });

    })




    // For 6 main page buttons, when clicked on will input a data value with the character name to input

    // For input box, will input the value into the query




});
