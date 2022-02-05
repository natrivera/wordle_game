var wordapi = "https://github.com/natrivera/wordle_game/blob/main/words.csv";
var worder = "java";
var wrong = [];
var array = [];
var arr2 = [];
var count = 0;
var words;



function getWord() {
   // get today's date
   var today = new Date();

   // get the word of the day
   words = $.csv.toArrays(wordapi);
   console.log(words);

}

function newGame() {

}



$("document").ready(function() {
  getWord();
});


function clear() {
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
  var pid = $(this).attr("id").toUpperCase();
  submit(pid);
}); //end of submit


function submit(p) {
  if (count < 7) {
    check(p);
  }
}

function check(d) {
  if (d.length > 1) {
    $("#guess").val("");
  } else if (/^[a-zA-Z]/.test(d)) {
    if (worder.indexOf(d) !== -1) {
      $("#guess").val("");
      array.push(d);
      $("#filler").html("");
      for (var g = 0; g < array.length; g++) {
        for (var j = 0; j < worder.length; j++) {
          var c = worder.substring(j, j + 1);
          if (c === array[g]) {
            if (/[A-Z]/.test(arr2[j]) === false) {
	      $("#" + d).css("background-color" , "#87CEEB");
              arr2[j] = d;
            }
          } else {
            if (/[A-Z]/.test(arr2[j]) === false) {
              arr2[j] = "_";
            }
          }
        }
      }
      var str = arr2.join("");
      $("#filler").html(str);
    } else {
      if (wrong.indexOf(d) !== -1) {
	$("#" + d).css("background-color" , "transparent");
        setTimeout(function() {
          $("#" + d).css("background" , "red");
        }, 400)
      } else {
        wrong.push(d);
        count++;
        $("#" + d).css("background-color", "red");
        $("#pics").html(
          "<img class='img-responsive' src='http://natrivera.com/hangman/img/" +
            (count - 1) +
            ".png'></img>"
        );
        if (count === 7) {
          $("#message").html("Out of Guesses<br>Word: <em>" + worder + "</em>");
        }
      }
    }
  } else {
    $("#guess").val("");
  }
  var temp = $("#filler").html();
  if(worder === temp) {
      $("#message").html("Winner!!!<br>Word: <em>" + worder + "</em>");
      $("#filler").css("background-color" , "rgba(255,255,0,.1)");
      count = 9;
     }
} //end of check

function fill(v) {
  var length = v.length;
  $("#filler").html("");
  for (var i = 0; i < length; i++) {
    $("#filler").append("_");

  }
} //end of fill

function RandomWord() {

  $.getJSON(wordapi, function(word) {
    var num = word.words.length;
    var random = Math.floor(Math.random() * num);
    worder = word.words[random].toUpperCase();
    console.log(worder);
  }); //end of getJSON
} //end of random word

document.addEventListener('keydown', function(event) {
  var x = event.which || event.keyCode;
  var letter = String.fromCharCode(x);
  submit(letter);
  if(x == 13) {
    newGame();
  }
}, true);
