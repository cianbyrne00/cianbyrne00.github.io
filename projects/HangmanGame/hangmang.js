//random word generator.
function arrGenerator (){
        var wordsArr = ["Antrim", "Armagh", "Carlow", "Cavan", "Clare","Cork", "Derry", "Donegal", "Down", "Dublin","Fermanagh", "Galway", "Kerry", "Kildare","Kilkenny", "Laois", "Leitrim", "Limerick","Longford", "Louth", "Mayo", "Meath","Monaghan", "Offaly", "Roscommon", "Sligo","Tipperary", "Tyrone", "Waterford", "Westmeath","Wexford", "Wicklow"]
        var j = Math.floor(Math.random() * 32);
        secretWordArr = wordsArr[j];
        return secretWordArr;
}
// function that prints the hangman images as the mistakes increase. 
function hangMan(){
  if (mistakes == 1){
    $(image).attr("src", "images/image01.png");
    $(image).appendTo( $("#hangman"))
  }
  else if (mistakes == 2){
    $(image).attr("src", "images/image02.png");
    $(image).appendTo( $("#hangman"))
  }
  else if (mistakes == 3){
    $(image).attr("src", "images/image03.png");
    $(image).appendTo( $("#hangman"))
  }
  else if (mistakes == 4){
    $(image).attr("src", "images/image04.png");
    $(image).appendTo( $("#hangman"))
  }
  else if (mistakes == 5){
    $(image).attr("src", "images/image05.png");
    $(image).appendTo( $("#hangman"))
  }
  else if (mistakes == 6){
    $(image).attr("src", "images/image06.png");
    $(image).appendTo( $("#hangman"))
  }
}
/* function that verifies firstly if the imput was correect or not using boolean operators, 
   while also ending the game by removing the buttons once the answer has been reached or the
   max mistakes has been reached.
*/
function guessCheck(buttons){
  var r=false;
  for(var j=0; j<word.length; j++){
  if(buttons.value == word[j] | buttons.value.toLowerCase() == word[j]){
      r=true;
  }
  }
  if(r==false){
    mistakes++;
    buttons.disabled = true;
    hangMan();
    document.getElementById("mistakes").innerHTML = mistakes;
  }
  //loss
  if (mistakes === maxWrong){
    document.getElementById("buttons").innerHTML = "You lost! The answer was '" + word.toString(",") + "', ";
    var a = document.createElement('a');
    var linkText = document.createTextNode("try again?");
    a.appendChild(linkText);
    a.className = 'refresh';
    a.title = "refresh";
    a.href = "index.html";
    $(a).appendTo( $("#buttons"))
    var lossSound = document.createElement('audio');
    $(lossSound).attr("src", "sounds/loss.mp3");
    lossSound.play();

  }
  if(r=true){
  for (var j=0; j<word.length; j++){
  if (buttons.value == word[j]){
    document.getElementById('container' + j).innerHTML = word[j];
    word[j].classname = 'correct'
    
    r=true;
    buttons.disabled = true;
    guessed.push(buttons.value);
  }
  if (buttons.value.toLowerCase() == word[j]){
    document.getElementById('container' + j).innerHTML = word[j];
    r=true
    buttons.disabled = true;
    guessed.push(buttons.value);
  } 
    //win
  if (guessed.length === word.length){
    document.getElementById("buttons").innerHTML = "You Win! ";
    var a = document.createElement('a'); 
    var linkText = document.createTextNode("Play again?");
    a.appendChild(linkText);
    a.className = 'refresh';
    a.title = "refresh";
    a.href = "index.html";
    $(a).appendTo( $("#buttons"))
    var winSound = document.createElement('audio');
    $(winSound).attr("src", "sounds/win.mp3");
    winSound.play();
      break;
  }
}
}
}
/*function that creates the empty text boxes based on the length of 
 the random word, which are then overwritten if the answer is correct */
function createP(){
  for (var i=0; i<word.length; i++){
    var p = document.createElement('p');
    p.id = 'container' + i ;
    p.innerHTML = '_';
    p.className = 'letter';
    $(p).appendTo( $("#answer"));
}
}
// Create image elements //
var win = document.createElement("img");
var image = document.createElement("img");
image.className = 'imageMan';
//initial image placed before any input
$(image).attr("src", "images/image00.png");
$(image).appendTo( $("#hangman"))
// variables used to run program
var maxWrong = 6;
var mistakes = 0;
var guessed = [];
var word = arrGenerator();
createP();
document.getElementById("mistakes").innerHTML = mistakes;
document.getElementById("maxWrong").innerHTML = maxWrong;








