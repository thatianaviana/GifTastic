# GifTastic

A dynamic web page that populates with gifs from the people's daily reactions. Click on a button or if you don't see your current feeling, use the input to submit your desired reaction and watch the gifs populate.

Tasks:

- Generate a set of buttons based on an array of related strings
- Allow user to create new button based on text input
- Generate a set of gif images based on which button is being clicked
- Initialize gif's as stills but allow for animation once clicked

Code Explanation:

- Buttons are dynamically generated using jQuery, an array, and a for-loop
- Once button is clicked, it'll send out an AJAX call using the appropriate query to Giphy 
- Giphy's API will then send our app 10 gifs with each reaction clicked (and added)
- HTML and CSS were used to style and give the page its basic structure