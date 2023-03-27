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
var darkgray = '#3a3a3c';
var black = '#212121';
var share = false;
var words_link = 'https://raw.githubusercontent.com/dwyl/english-words/master/words.txt';
var five_words;

fetch(words_link)
  .then(function(response) {
    response.text().then(function(text) {
      const all_words = text.split("\n");
      five_words = all_words.filter((element) => {return element.length == 5;});
      //console.log(five_words);
    });
  });



function getWord() {
   // get today's date
   var today = new Date();

   dailywords.forEach((item, i) => {
     if(checktoday(item.date)) {
       actualword = item.word.toUpperCase();
     }
   });
}

function checktoday(someDate) {
  var today = new Date();
  var someDate = new Date(someDate);
  return someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear();
}


$("document").ready(function() {
  getWord();
});


function clear_unused() {
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
        $('#share').html('Share');
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
    } else {//word not in word list
      $('#share').html('Word not in list!!!');
      setTimeout(function() {
        $('#share').html('');
    }, 2000);
    }

  } else {
    //word not in list -- not a valid entry
  }
}// end of enterguess

//function to check if the guess in a valid word
function checkwordinlist(g) {
  //console.log(all_words);
  tempnum = 0;
  five_words.forEach((item, i) => {
    if(g == item.toUpperCase()) {
      //actualword = item.word.toUpperCase();
      //return true;
      tempnum++;
    }
  });

  return tempnum>0;
}

//function that removes text from blocks for sharing
$("#share").click(function() {
  if (won != '' & !share) {
    $('.guesspiece').css('font-size' , '0em');
    share = true;
  } else {
    $('.guesspiece').css('font-size' , '2em');
    share = false;
  }
}); //end of remove text


//function to color tiles of a guess
function colortiles(b1,b2,b3,b4,b5,b) {
  var colors = [];
  if (b1=='') {//winner all green
    //color all the blocks green
    $('#' + guess + 1).css("background-color" , darkgreen);
    $('#' + guess + 2).css("background-color" , darkgreen);
    $('#' + guess + 3).css("background-color" , darkgreen);
    $('#' + guess + 4).css("background-color" , darkgreen);
    $('#' + guess + 5).css("background-color" , darkgreen);

    //remove the color from the keyboard
    $('.piece').css("background-color" , '#818384');
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
        tempcolor = darkgray;
      }
      colors.push(tempcolor);
      position++;
    });
    $('#' + guess + 1).css("background-color" , colors[0]);
    $('#' + guess + 2).css("background-color" , colors[1]);
    $('#' + guess + 3).css("background-color" , colors[2]);
    $('#' + guess + 4).css("background-color" , colors[3]);
    $('#' + guess + 5).css("background-color" , colors[4]);

    $('#' + b1).css("background-color" , colors[0]);
    $('#' + b2).css("background-color" , colors[1]);
    $('#' + b3).css("background-color" , colors[2]);
    $('#' + b4).css("background-color" , colors[3]);
    $('#' + b5).css("background-color" , colors[4]);
  }
}



function readTextFile(file){
    // read text from URL location
    var request = new XMLHttpRequest();
    request.open('GET', file, true);
    
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                return request.responseText;
            }
        }
    }
    
    request.send(null);
}
