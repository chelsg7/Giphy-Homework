var topics = ["dog", "cat","dinosaur", "unicorn", "hedgehog", "lion", "tiger", "bear", "monkey", "goat", "turtle", "dolphin"];
var userInput = "";
var buttons = "";
var customInput = "";
var url = "https://api.giphy.com/v1/gifs/search"
var search = "";
var buttonDiv = $('#buttonDiv');
var imageDiv = $('#imageDiv');
var buttonCount = 0;

var createButton = function(){
    for(i = 0; i< topics.length; i++){
        $('#buttonDiv').append("<button class='btn btn-outline-success btn-lg m-1 buttonTopic' id = "+ buttonCount + "> " + "<i class='fas fa-times-circle'></i> " + topics[i] + "</button>");
        buttonCount++;
        var allTopics = topics[i];
        // console.log(allTopics);
    };
};

$( document ).ready(function() {
    console.log( "ready!" );
    createButton();



$('.buttonTopic').on("click", this, function(event){
    console.log("inside")
    var userChoice = event.target.id;
    console.log(userChoice);
    var userInput = topics[userChoice];
    console.log(userInput);
    
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userInput +"&limit=30" + "&api_key=wlD16JyZKmFHTkFbwCyx2SRxbMKnEXNJ";
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

    for (var i = 0; i < 10; i++) {
        // Only taking action if the photo has an appropriate rating
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            console.log(userInput);
            var rating = results[i].rating;
        //  console.log(rating);
            var stillImageChoice = results[i].images.fixed_height_still.url
            var imageChoice = results[i].images.fixed_height.url;
            var imagePut = $("<img src = " +  " ' "+ stillImageChoice + " ' " +  "data-state = 'still' data-still = " + " ' " +  stillImageChoice +" ' " + "data-animate = " +  " ' "+ imageChoice + " ' " + ">" + "<h2> Rating : " + rating + "</h2>");
            var imageHolder = $("<div class = " + " 'text-center  " + userInput + " ' "+  ">" + "</div>");
        //  var imageHeader = $("<h1>" + userInput + "</h1>")
        //  $(imageHolder).append(imageHeader);
            $(imageHolder).append(imagePut);
            $('#imageDiv').prepend(imageHolder);


        }// this is technically end of rating
    } // end of for statement with results & rating inside
}) // end of .then
}); // end button click

    
    
$("#userSearch").click(function(event){
    event.preventDefault();
        // Link to what user puts in search box
        var search = $("#searchTerm").val();
        console.log(search);
        var userChoice = search;

        

        if ((topics.indexOf(userChoice) === -1)){
            topics.push(userChoice);
            console.log(topics);
            $('#buttonDiv').append("<button class='btn btn-outline-dark btn-lg m-1 buttonTopicUser' id = " + buttonCount + ">" + "<i class='fas fa-times-circle'></i> " + userChoice + "</button>");
            buttonCount++;
        } else {
            alert("there's already a button for that!")
        }; // end if else statement

        $('.buttonTopicUser').on("click", this, function(event){
            console.log("inside")
            var userInput = event.target.id;
            // console.log(userInput); //number
            //console.log(userChoice); //name


            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userChoice +"&limit=30" + "&api_key=wlD16JyZKmFHTkFbwCyx2SRxbMKnEXNJ";
            // Performing our AJAX GET request
            $.ajax({
                url: queryURL,
                method: "GET"
            })
            // After the data comes back from the API
            .then(function(response) {
                // Storing an array of results in the results variable
                var results = response.data;


                // I would like to push each indivudual result to an array based on rating. If the array for all ages is not greater than 10, I want to remove the button and not append the images. If the array for all ages is greater than 10, I want to append the images with the rating like normal
                
                var adult = [];
                var allAges = [];
                for (var i = 0; i < results.length; i++) {
                    //console.log(userChoice);
                    var rating = results[i].rating;
                    console.log(rating);
                    if (rating === "g" || rating === "pg"){
                        allAges.push(results[i]);
                       // console.log(allAges.length);
                    } else if (rating === "r" || rating === "pg-13"){
                        adult.push(results[i]);
                        //console.log(adult.length);
                    } // end of first if statement
                }
                // var results = response.data;
                // var rating = results[i].rating;

                if(allAges.length < 10){
                    console.log('BAD!');
                    console.log(userInput); //number
                    console.log(userChoice); //name
                    $(event.target).remove();
                } else if (allAges.length > 10){
                    for (var i = 0; i < 10; i++) {
                        var result = allAges[i];
                        //console.log(userChoice);
                        var rating = result.rating;
                        console.log(rating);
                        // Only taking action if the photo has an appropriate rating
                        var stillImageChoice = results[i].images.fixed_height_still.url
                        var imageChoice = results[i].images.fixed_height.url;
                        var imagePut = $("<img src = " +  " ' "+ stillImageChoice + " ' " +  "data-state = 'still' data-still = " + " ' " +  stillImageChoice +" ' " + "data-animate = " +  " ' "+ imageChoice + " ' " + ">" + "<h2> Rating : " + rating + "</h2>");
                        var imageHolder = $("<div class = " + " 'text-center  " + userInput + " ' "+  ">" + "</div>");
                        $(imageHolder).append(imagePut);
                        $('#imageDiv').prepend(imageHolder);
                    }// this is technically end of rating IF STATEMENT
                }
            }) // end of .then
        }); // end of array button click
    }); // end user search button click

    $("#imageDiv").on("click", "img", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        console.log("state = " + state);
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === 'still') {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", " animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", " still");
        }
    });

}); // end doc ready