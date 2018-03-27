var topics = ["dog", "cat","dinosaur", "unicorn", "hedgehog", "lion", "tiger", "bear", "monkey", "goat", "turtle", "shark", "dolphin"];
var userInput = "";

var createButtons = function(){
    for (i = 0; i < topics.length; i++){
        $('#buttonDiv').append(
            "<button class = 'btn btn-dark m-1'>" + topics[i] + "</button>"
        );
    };
};

$( document ).ready(function() {
    console.log( "ready!" );
    
    createButtons();

});
 /*
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        userInput + "&api_key=wlD16JyZKmFHTkFbwCyx2SRxbMKnEXNJ";
    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;
          // Looping over every result item
          for (var i = 0; i < results.length; i++) {
            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");
              // Storing the result item's rating
              var rating = results[i].rating;
              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);
              // Creating an image tag
              var personImage = $("<img>");
              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", results[i].images.fixed_height.url);
              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(personImage);
              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-appear-here").prepend(gifDiv);
            }
          }
        });
*/
