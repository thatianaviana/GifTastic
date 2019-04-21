
$(document).ready(function () {
    //Initial array of reactions
    var reactions = ["OMG", "Amused", "Facepalm", "Mind Blown", "Shame", "Laughing", "Flirting", "Dancing"];

    //  create topics array buttons already assigned by the var reactions
    function renderButtons() {
        // (this is necessary otherwise we will have repeat buttons)
        $('#buttons-view').empty();

        for (var i = 0; i < reactions.length; i++) {
            //create all buttons
            var createButtons = $('<button>');
            createButtons.addClass('reaction');
            createButtons.addClass("btn btn-info");
            createButtons.attr('data-name', reactions[i]);
            createButtons.text(reactions[i]);
            $('#buttons-view').append(createButtons);
        }
    }
    renderButtons();

    //on button click this code will bring up the gifs
    $(document).on('click', '.reaction', function () {

        //new variable will log the text data from each button
        var newReaction = $(this).attr("data-name");
        console.log(newReaction);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newReaction + "&api_key=ct6n8ZneMskSxcDUctoKcsEFoAfIhbgI&limit=10";
        console.log(queryURL);

        // Creating an AJAX call for the specific reaction button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;
            console.log(results);
            //empties the div before adding more gifs
            // $('#buttons-view').empty(); if this is on - will remove all the buttons when i click on one of them
            for (var i = 0; i < results.length; i++) {
                //var that creates an image tag
                var reactionImage = $("<img>");
                //adding attribute and setting values
                reactionImage.attr("src", results[i].images.fixed_height_still.url);
                reactionImage.attr("data-animate", results[i].images.fixed_height.url);
                reactionImage.attr("data-still", results[i].images.fixed_height_still.url);
                reactionImage.attr("data-state", "still");
                reactionImage.addClass("gif");
                //this will make the gif appear on HTML page
                $('#gifs-appear-here').prepend(reactionImage);
                reactionImage.on('click', playGif);

                // Pulling ratings for each reaction
                var ratings = results[i].rating;
                //the code below grabs the rating information from API and prepends to the HTML
                var displayRating = $('<p>').text("Rating: " + ratings);
                $('#gifs-appear-here').prepend(displayRating);
            }

        });

        //function to stop and animate gifs
        function playGif() {
            var state = $(this).attr('data-state');
            // console.log(state);
            if (state == 'still') {
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }

        }



    });
    //on submit click, this will will grab the input and push it to the reactions array of buttons
    $("#add-reaction").on("click", function (event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        event.preventDefault();

        // This code is to grab the text from the input box
        var newReactionButton = $("#gif-input").val().trim();
        // The reacting from the textbox is then added to our array
        reactions.push(newReactionButton);
        renderButtons();

    });


});



                // var animatedGif = results[i].images.fixed_height.url;
                // var stillGif = results[i].images.fixed_height_still.url;
                // var gifImage = $('<img>').attr("src", stillGif).attr('data-animate', animatedGif).attr('data-still', stillGif);
                // gifImage.attr('data-state', 'still');
                // $('#gifs-appear-here').prepend(gifImage);
                // gifImage.on('click', playGif);