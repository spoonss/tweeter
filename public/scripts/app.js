 $(document).ready(function(){
 
// Fake data taken from tweets.json
// const data = [
//     {
//       "user": {
//         "name": "Newton",
//         "avatars": {
//           "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//           "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//           "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//         },
//         "handle": "@SirIsaac"
//       },
//       "content": {
//         "text": "If I have seen further it is by standing on the shoulders of giants"
//       },
//       "created_at": 1461116232227
//     },
//     {
//       "user": {
//         "name": "Descartes",
//         "avatars": {
//           "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//           "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//           "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//         },
//         "handle": "@rd" },
//       "content": {
//         "text": "Je pense , donc je suis"
//       },
//       "created_at": 1461113959088
//     },
//     {
//       "user": {
//         "name": "Johann von Goethe",
//         "avatars": {
//           "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//           "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//           "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//         },
//         "handle": "@johann49"
//       },
//       "content": {
//         "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//       },
//       "created_at": 1461113796368
//     }
//   ];
  
    $("#compose").click(function(){
    $("#new-tweet-container").slideToggle();
    $('textarea').focus();
        });


  function loadTweets(){
    $.ajax('/tweets/', { method: 'GET' })
    .then(function (tweets) {
      renderTweets(tweets);
     })
  }

  function renderTweets(tweets) {
        for(let tweet of tweets){
            var $tweet = createTweetElement(tweet);
            $('#tweets-container').prepend($tweet);
        }
  }
//   Test / driver code (temporary)
//  to see what it looks like
//  to add it to the page so we can make sure it's got all the right elements, classes, etc.


  function createTweetElement(tweet) {
    let $tweet = $('<article>').addClass('tweeted');
    let $header = $('<header>');
    let $avatarSmall = $('<img>').addClass('logo').attr("src", tweet.user.avatars.small);
    let $name = $('<span>').addClass('name').text(tweet.user.name);
    let $handle = $('<span>').addClass('handle').text(tweet.user.handle);
    let $content = $('<p>').addClass('text').text(tweet.content.text);
    let $footer = $('<footer>').addClass('tweet-footer');
    let $createdAt = $('<span>').addClass('createdAt').text(tweet.created_at);
    let $imgHeart =
    
    $header.append($avatarSmall);
    $header.append($name);
    $header.append($handle);
    $tweet.append($header);
    $tweet.append($content);
    $footer.append($createdAt);
    $tweet.append($footer);
    
    return $tweet;
  }



  $('#tweets-form').on('submit', function(e) {
    e.preventDefault();
    
        if($("#tweets-form textarea").val() === ""){
            alert("Tweet cannot be emptied!");
        } else if ($("#tweets-form textarea").val().length > 140){
            alert("Tweet cannot be more than 140 characters");}
            else {
                let formData = $('form textarea').serialize();
                $.ajax('/tweets/', {
                 method: 'POST',
                data: formData
                }).then(function(tweet) {
                    $('textarea').val('');
                return $.ajax('/tweets/');
                }).then(loadTweets());
            }   
  })
});



