$(document).ready(function() {
    function getRandomQuote() {
        return $.ajax({
            url: "https://quoteslate.vercel.app/api/quotes/random", // Using QuoteSlate API
            method: "GET",
            dataType: "json"
        });
    }

    function displayQuote() {
        getRandomQuote().done(function(data) {
            $('#text span, #author, #start-quote').fadeOut(500, function() {
                // Accessing the quote and author from the QuoteSlate API response
                $('#text span').text(data.quote);
                $('#author').text(data.author);

                $('#text span, #author, #start-quote').fadeIn(500);
            });

            // Update social media buttons
            console.log(`${data.quote}`);
            updateTweetButton(data.quote, data.author);
            updateTumblrButton(data.quote, data.author);
        }).fail(function() {
            $('#text span, #author, #start-quote').fadeOut(500, function() {
                $('#text span').text("An error occurred. Please try again.");
                $('#author').text("");
                $('#start-quote').text('"');
                $('#text span, #author, #start-quote').fadeIn(500);
            });
        });
    }

    function updateTweetButton(quote, author) {
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`;
        $('#tweet-quote').attr('href', tweetUrl);
    }

    function updateTumblrButton(quote, author) {
        const tumblrUrl = `https://www.tumblr.com/share/link?url=${encodeURIComponent(`"${quote}" - ${author}`)}`;
        $('#tumblr-quote').attr('href', tumblrUrl);
    }

    $('#new-quote').click(function() {
        displayQuote();
    });

    $(document).keypress(function(event) {
        if (event.which === 13) {
            displayQuote();
        }
    });

    // Load the first quote when the page is ready
    displayQuote();
});
