$(document).ready(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCZ7voTiPZYCwVVCrQ3T7MaNyOeVX9BmPg",
    authDomain: "bcproject1-7cde6.firebaseapp.com",
    databaseURL: "https://bcproject1-7cde6.firebaseio.com",
    projectId: "bcproject1-7cde6",
    storageBucket: "bcproject1-7cde6.appspot.com",
    messagingSenderId: "499448492993"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var userScore = {
    name: "",
    score: "",
    date: "",
    email: "",
    verify: ""
  }
  // focuses the cursor on the Verify input first
  $("#verify").focus();

  // adds the score and name info to the firebase
  $("#scoreboardForm").on("submit",function() {
    // Prevent the page from refreshing
    event.preventDefault();

    // Get inputs
    userScore.score = $("#score-add").val().trim();
    userScore.name = $("#name-add").val().trim();
    userScore.date = $("#date-add").val().trim();
    userScore.email = $("#email-add").val().trim();
    userScore.verify = $("#verify").val();

    // VALIDATION
    if (userScore.score === "" || userScore.name === "" || userScore.date === "" || userScore.email === "" || userScore.verify !== "83tsU") {
      swal({text: "Please complete all of the fields correctly!",icon: "error"});
    } else {
      swal("Good job!", "Your score has been submited!", "success");
      database.ref().push(userScore
      );
    }

    // Resets form
    $('#scoreboardForm :input').val('');

  });

  // adds the row to the high score
  database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    userScore.name = childSnapshot.val().name;
    userScore.score = childSnapshot.val().score;
    userScore.date = childSnapshot.val().date;
    userScore.email = childSnapshot.val().email;
    userScore.verify = childSnapshot.val().verify;

    // sample line used to create markup
    // var markup = "<tr><td><input type='checkbox' name='record'></td><td>" + name + "</td><td>" + email + "</td></tr>";
    var markup =
      "<tr> <td class='table', id='name'>" +
      userScore.name +
      "</td > <td class='score'>" +
      userScore.score +
      "</td><td class='date' >" +
      userScore.date +
      "</td></tr>";
    $("table tbody").append(markup);

  });

});


