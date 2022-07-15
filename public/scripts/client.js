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
      <p>${tweetData.created_at}</p>
      <div class="aricle-icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>

      </div>

    </footer>

  </article>`);
  
};
/*const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}*/
/*const $tweet = createTweetElement(tweetData);*/


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];


const renderTweets = function(data) {
  for (let tweetData of data) {
    const $tweet = createTweetElement(tweetData);
    $('#tweets-container').append($tweet);
  }

};

$(document).ready(function() {

  renderTweets(data);
 
});




