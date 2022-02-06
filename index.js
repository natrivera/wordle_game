var wordapi = "https://github.com/natrivera/wordle_game/blob/main/words.json";
var worder = "java";
var wrong = [];
var array = [];
var arr2 = [];
var count = 1;
var guess = 1;
var words;
var won = '';
var actualword = 'BROWN';
var yellow = '#c9b458';
var darkyellow = '#b59f3b';
var green = '#6aaa64';
var darkgreen = '#538d4e';
var gray = '#86888a';
var black = '#212121';



function getWord() {
   // get today's date
   var today = new Date();
   $.getJSON(wordapi, function(word) {
     //var num = word.words.length;
     //var random = Math.floor(Math.random() * num);
     //worder = word.words[random].toUpperCase();
     words = word;
     console.log(words);
   }); //end of getJSON

   //console.log(words);

}


$("document").ready(function() {
  getWord();
});


function clear_unused() {
  count = 0;
  wrong = [];
  array = [];
  arr2 = [];
  $("#guess").val("");
  $("#word").html("");
  $("#A").css("background-color", "#004fff");
  $("#B").css("background-color", "#004fff");
  $("#C").css("background-color", "#004fff");
  $("#D").css("background-color", "#004fff");
  $("#E").css("background-color", "#004fff");
  $("#F").css("background-color", "#004fff");
  $("#G").css("background-color", "#004fff");
  $("#H").css("background-color", "#004fff");
  $("#I").css("background-color", "#004fff");
  $("#J").css("background-color", "#004fff");
  $("#K").css("background-color", "#004fff");
  $("#L").css("background-color", "#004fff");
  $("#M").css("background-color", "#004fff");
  $("#N").css("background-color", "#004fff");
  $("#O").css("background-color", "#004fff");
  $("#P").css("background-color", "#004fff");
  $("#Q").css("background-color", "#004fff");
  $("#R").css("background-color", "#004fff");
  $("#S").css("background-color", "#004fff");
  $("#T").css("background-color", "#004fff");
  $("#U").css("background-color", "#004fff");
  $("#V").css("background-color", "#004fff");
  $("#W").css("background-color", "#004fff");
  $("#X").css("background-color", "#004fff");
  $("#Y").css("background-color", "#004fff");
  $("#Z").css("background-color", "#004fff");
  $("#filler").css("background-color" , "transparent");
  $("#pics").html("<img class='img-responsive' src='/hangman/img/00.png'></img>");
  $("#play").html("New Word");
}

$(".piece").click(function() {
  var p = $(this).attr("id").toUpperCase();
  submitletter(p);
}); //end of click letter

function submitletter(p) {
  if(count<6 & guess < 7 & won == '') {
      letterid = '#' + guess + '' + count;
      $(letterid).html(p);
      count++;
  }
}// end of submitletter

$("#clear").click(function() {
  clearguess();
}); //end of click clear

function clearguess() {
  if(won=='' & count > 1) {
    temp = count-1;
    $('#' + guess+temp).html('');
    count--;
  }
}

$("#Enter").click(function() {
  enterguess();
}); //end of click Enter

function enterguess() {
  if (guess < 7 & count == 6 & won == '') {

    var l1 = $('#' + guess + 1).html();
    var l2 = $('#' + guess + 2).html();
    var l3 = $('#' + guess + 3).html();
    var l4 = $('#' + guess + 4).html();
    var l5 = $('#' + guess + 5).html();

    var guessword = l1 + l2 + l3 + l4 + l5;

    if (checkwordinlist(guessword)) {// word is in list
      //
      if (guessword == actualword) {//winner -- guess is correct
        colortiles('');
        won = 'Y';
      } else {// guess was incorrect

        if (guess < 6) {// guesses still available
          colortiles(l1,l2,l3,l4,l5,guessword);
          guess++;
          count = 1;
        } else {// out of guesses
          console.log('out of guesses');
        }
      }
    }

  } else {
    //word not in list -- not a valid entry
  }
}// end of enterguess

//function to check if the guess in a valid word
function checkwordinlist() {
  return true;
}

//function to color tiles of a guess
function colortiles(b1,b2,b3,b4,b5,b) {
  var colors = [];
  if (b1=='') {//winner all green
    $('#' + guess + 1).css("background-color" , darkgreen);
    $('#' + guess + 2).css("background-color" , darkgreen);
    $('#' + guess + 3).css("background-color" , darkgreen);
    $('#' + guess + 4).css("background-color" , darkgreen);
    $('#' + guess + 5).css("background-color" , darkgreen);
  } else {// guess was wrong color the tiles appropriately
    var position = 1;
    var actuals =  actualword.split('');
    [b1,b2,b3,b4,b5].forEach((x, i) => {
      var tempcolor;
      if (actuals.includes(x, 0)) {
        tempcolor = darkyellow;
        if(actuals[i] == x) {
          tempcolor = green;
        }
      } else {
        tempcolor = gray;
      }
      colors.push(tempcolor);
      position++;
    });
    $('#' + guess + 1).css("background-color" , colors[0]);
    $('#' + guess + 2).css("background-color" , colors[1]);
    $('#' + guess + 3).css("background-color" , colors[2]);
    $('#' + guess + 4).css("background-color" , colors[3]);
    $('#' + guess + 5).css("background-color" , colors[4]);
  }
  //console.log(colors);
}
