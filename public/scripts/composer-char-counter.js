$(document).ready(function() {

  const textarea = $("#tweet-text");
  textarea.on('input', function() {
    let remainder = 140 - $(this).val().length;
    const counter = $(this).parent().find(".counter") //this refers to the textarea
    counter.text(remainder);
    if (remainder < 0) {
      counter.css("color", "red")
    } else {
      counter.css("color", "black")
    }
    
});
 
});

