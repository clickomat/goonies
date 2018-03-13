// Initialize Firebase
var config = {
  apiKey: "AIzaSyCZ7voTiPZYCwVVCrQ3T7MaNyOeVX9BmPg",
  authDomain: "bcproject1-7cde6.firebaseapp.com",
  databaseURL: "https://bcproject1-7cde6.firebaseio.com",
  projectId: "bcproject1-7cde6",
  storageBucket: "",
  messagingSenderId: "499448492993"
};
firebase.initializeApp(config);

var database = firebase.database();

// adds the score and name info to the firebase

$(".addScore").click(function() {
  // Prevent the page from refreshing
  event.preventDefault();

  // Get inputs
  score = $("#score-add")
    .val()
    .trim();
  name = $("#name-add")
    .val()
    .trim();
  date = $("#date-add")
    .val()
    .trim();
  email = $("#email-add")
    .val()
    .trim();
  verify = $("#verify").val();
  console.log(score);
  console.log(name);
  console.log(date);

  // Change what is saved in firebase
  database.ref().push({
    name: name,
    score: score,
    date: date,
    email: email,
    verify: verify
  });
});

// adds the row to the high score
$("#player").on("click", function() {
  var name = $("#name-add")
    .val()
    .trim();
  var score = $("#score-add")
    .val()
    .trim();
  var date = $("#date-add")
    .val()
    .trim();

  // sample line used to create markup
  // var markup = "<tr><td><input type='checkbox' name='record'></td><td>" + name + "</td><td>" + email + "</td></tr>";
  var markup =
    "<tr> <td class='table', id='name'>" +
    name +
    "</td > <td class='score'>" +
    score +
    "</td><td class='date' >" +
    date +
    "</td></tr>";
  $("table tbody").append(markup);

  if (verify === "83tsU") {
    console.log("These aren't the droids we are looknig for.");
  }
});

// thverify for humans
// if($(#verify).val()==="83tsU"){
//     alert ("yay you are not the bot i was looking out for")
// }):
