/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const disarm = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
        <p id="article-tweet-text">${disarm(tweetData.content.text)}</p>
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
    $("#tweets-container").prepend($tweet);
  }
};

$(document).ready(function() {
  //Send POST request to the server

  const $form = $(".post-tweet");

  $form.on("submit", function(event) {
    hideErrorMess();
    event.preventDefault();
    const $textarea = $("#tweet-text");
    let tweetLength = $textarea.val().length;
    const tweet = $(this).serialize();
    if (tweetLength > 140) {
      $(".error-message-oversize").slideDown({
        start: function() {
          $(this).css({
            display: "flex",
          });
        },
      });
      return;
    }

    if (tweetLength === 0) {
      $(".error-message-empty").slideDown({
        start: function() {
          $(this).css({
            display: "flex",
          });
        },
      });
      return;
    }

    $.ajax("/tweets", { method: "POST", data: tweet }).then((res) => {
      $("#tweet-text").val("");
      $.ajax("/tweets", { method: "GET" })
        .then((res) => {
          renderTweets([res.pop()]);
        });
    });
  });
  
  const hideErrorMess = function() {
    $(".error-message-empty").css({
      display: "none",
    });
    $(".error-message-oversize").css({
      display: "none",
    });

  };

  const loadTweets = function() {
    $.ajax("/tweets", { method: "GET" })
      .then((res) => {
        renderTweets(res);
      });
  };

  loadTweets();
});
