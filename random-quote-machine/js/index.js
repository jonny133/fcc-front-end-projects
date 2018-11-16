
var quotes = [
["Carry out a random act of kindness, with no expectation of reward, safe in the knowledge that one day someone might do the same for you.", "Princess Diana"],
['If you\'re going through hell, keep going.', 'Winston Churchill'],
['I\'m a random guy. I shake a hand and make a friend. I don\'t do egotistical things.', 'Vanilla Ice'],
["One of the penalties of refusing to participate in politics is that you end up being governed by your inferiors.", "Plato"],
['I\'m not the smartest fellow in the world, but I can sure pick smart colleagues.', 'Franklin D. Roosevelt']];

// var getNewQuote = () => {
//   let [qt, athr] = quotes[Math.floor(Math.random()*quotes.length)];
//   $('#text').text(qt);
//   $('#author #athr').text(athr);

//   $('a#tweet-quote').attr('href', "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="+qt+' - '+athr);
// };

var getNewQuote = function getNewQuote() {
  // $.getJSON('https://api.chucknorris.io/jokes/random?category=dev').done(
  //   (data) = >{
  //   $('#text').text(data.value);
  //   $('#athr').text(data.url);
  //   console.log(data);
  // });
  $.get('https://talaikis.com/api/quotes/random/', function (data) {console.log(data);
    $('#text').html(data.quote);$('#athr').text(data.author);});
};


$(document).ready(function () {
  getNewQuote();
});

$('#new-quote').on('click', getNewQuote);