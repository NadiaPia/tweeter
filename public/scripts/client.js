/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweetData) {
  return $(`<article class="tweet">
    <header class="tweet-header">
      <div>
        <img class="emoji" src=${tweetData.user.avatars} alt="avatar"></img>
        <p>${tweetData.user.name}</p>
      </div>            
      <p>${tweetData.user.handle}</p>
    </header>

    <body class="tweet-body">
      <form class="post-tweet" action="/tweets" method="POST">              
        <textarea name="text" id="article-tweet-text">${tweetData.content.text}</textarea>              
      </form>   

    </body>

    <footer class="tweet-footer">
      <p>${timeago.format(tweetData.created_at)}</p>
      <div class="aricle-icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>

      </div>

    </footer>

  </article>`);
  
};
const renderTweets = function(data) {
  for (let tweetData of data) {
    const $tweet = createTweetElement(tweetData);
    $('#tweets-container').prepend($tweet);
  }

};

$(document).ready(function() {
 
  //Send POST request to the server 

  const $form = $(".post-tweet");

  $form.on("submit", function(event) {
    event.preventDefault();
    const $textarea = $("#tweet-text");
    let tweet_length = $textarea.val().length;
    const tweet = $(this).serialize()
    if (tweet_length > 140) {
      alert("Your tweet is more then 140 symbols");
      return;
    }

    if (tweet_length === 0) {
      alert("Your tweet is empty");
      return;
    }
    
    $.ajax("/tweets", { method: 'POST', data: tweet })
      .then(res => {
        console.log(tweet);
        $("#tweet-text").val("")        
        $.ajax("/tweets", {method: "GET"})
    
    .then(res => {
      renderTweets([res.pop()])
    })
        
      })    
    
  })

  const loadTweets = function() {
    $.ajax("/tweets", {method: "GET"})
    
    .then(res => {
      console.log(res)
      renderTweets(res)
    })
    
  }


  
  console.log(loadTweets())
  
});



