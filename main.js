var topics = ["dog", "cat","dinosaur", "unicorn", "hedgehog", "lion", "tiger", "bear", "monkey", "goat", "turtle", "dolphin"];
var userInput = "";
var buttons = "";
var customInput = "";
var url = "https://api.giphy.com/v1/gifs/search"
var search = "";
var buttonDiv = $('#buttonDiv');
var imageDiv = $('#imageDiv');
var buttonCount = 0;

// var createButton = function(){
//     for(i = 0; i< topics.length; i++){
//         $('#buttonDiv').append(
//             "<button class='btn btn-dark btn-lrg m-1' id='buttonTopic'>" + topics[i] + "</button>"
//         )
//         userInput = topics[i];
//         console.log(userInput)
//     }
// }

var createButton = function(){
    for(i = 0; i< topics.length; i++){
        $('#buttonDiv').append("<button class='btn btn-dark btn-lrg m-1 buttonTopic' id = "+ buttonCount + ">" + topics[i] + "</button>");
        buttonCount++;
        var allTopics = topics[i];
        console.log(allTopics);
    };
};

$( document ).ready(function() {
    console.log( "ready!" );
    createButton();
    
    
$("#userSearch").click(function(event){
    event.preventDefault();
        // Link to what user puts in search box
        var search = $("#searchTerm").val();
        console.log(search);
        topics.push(search);
        console.log(topics);
        var userChoice = search;
        $('#buttonDiv').append("<button class='btn btn-dark btn-lrg m-1 buttonTopic' id = " + buttonCount + ">" + userChoice + "</button>");
        buttonCount++;

        $('.buttonTopic').on("click", this, function(event){
            console.log("inside")
            var userChoice = event.target.id;
            console.log(userChoice);
            var userInput = topics[userChoice];
            console.log(userInput);
        });

    
}); // end of search


$('.buttonTopic').on("click", this, function(event){
    console.log("inside")
    var userChoice = event.target.id;
    console.log(userChoice);
    var userInput = topics[userChoice];
    console.log(userInput);
    
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userInput +"&limit=10" + "&api_key=wlD16JyZKmFHTkFbwCyx2SRxbMKnEXNJ";
    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    // After the data comes back from the API
    .then(function(response) {
    // Storing an array of results in the results variable
    var results = response.data;
    console.log(results);

    for (var i = 0; i < results.length; i++) {
        // Only taking action if the photo has an appropriate rating
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            console.log(userInput);
            var rating = results[i].rating;
        //  console.log(rating);
            var imageChoice = results[i].images.fixed_height.url;
            var imagePut = $("<h2> Rating : " + rating + "</h2>" + "<img src = " + imageChoice + ">");

            var imageHolder = $("<div class = " + " ' " + userInput + " ' "+  ">" + "</div>");
        //  var imageHeader = $("<h1>" + userInput + "</h1>")
        //  $(imageHolder).append(imageHeader);
            $(imageHolder).append(imagePut);
            $('#imageDiv').prepend(imageHolder);
        }// this is technically end of rating
    } // end of for statement with results & rating inside
}) // end of .then
}); // end button click


}); // end doc ready
