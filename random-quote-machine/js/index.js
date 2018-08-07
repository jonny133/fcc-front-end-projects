var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}(); 

var quotes = [
["Carry out a random act of kindness, with no expectation of reward, safe in the knowledge that one day someone might do the same for you.", "Princess Diana"],
['If you\'re going through hell, keep going.', 'Winston Churchill'],
['I\'m a random guy. I shake a hand and make a friend. I don\'t do egotistical things.', 'Vanilla Ice'],
["One of the penalties of refusing to participate in politics is that you end up being governed by your inferiors.", "Plato"],
['I\'m not the smartest fellow in the world, but I can sure pick smart colleagues.', 'Franklin D. Roosevelt']];


var getNewQuote = function getNewQuote() {var _quotes$Math$floor = _slicedToArray(
  quotes[Math.floor(Math.random() * quotes.length)], 2),qt = _quotes$Math$floor[0],athr = _quotes$Math$floor[1];
  $('#text').text(qt);
  $('#author #athr').text(athr);

  $('a#tweet-quote').attr('href', "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + qt + ' - ' + athr);
};

$(document).ready(function () {
  getNewQuote();
});

$('#new-quote').on('click', getNewQuote);