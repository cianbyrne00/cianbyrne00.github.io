'use strict';
//Variables used acrross the program.
var posX = 0;
var posY = 0;
var score = 0;
var maxBoxes = 0;
var moves = 0;
//onTarget boolean created to validate position of player.
var onTarget = false;
const c = document.getElementById("mycanvas");
const ctx = c.getContext("2d");
let titleScreen = new Image();
let winScreen = new Image();
winScreen.src = "textures/winScreen.png";

//Function that loads straight away and creates menue screen. 
titleScreen.onload = function () {
  ctx.drawImage(titleScreen, 0, 0, 450, 350);
};
titleScreen.src = "textures/sokobancover.png";

//Function which ends the game if final level is beaten. 
function endGame() {
  startGame = null;
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.drawImage(winScreen, 40, 0, 370, 350);
  var parent = document.getElementById("screen");
  var child1 = document.getElementById("buttons");
  var child2 = document.getElementById("controls");
  parent.removeChild(child1);
  parent.removeChild(child2);
  var btn = document.createElement("BUTTON");
  btn.innerHTML = "Start again?";
  document.body.appendChild(btn);
  btn.classList.add("button");
  btn.onclick = function () {
    window.location.href = "sokoban.html";
  };
  document.onkeydown = function (e) {
    return false;
  };
}

//Level select fiction, level variable deciding the map Array used and starting the program.
function startGame(level) {
  $('.score').css('color','#ECB365')
  moves = 0;
  score = 0;
  document.getElementById("moves").innerHTML = moves;
  document.getElementById("score").innerHTML = score;
  // '*' = wall; ' ' = floor; 'p' = player; '#' = box; '$' = target; '@' = box on target. 
  //Level 1 - Easy
  if (level === 1) {
    var mapArray = [
      ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', ' '],
      ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', ' '],
      ['*', '*', '$', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '$', '*', '*', ' '],
      ['*', '*', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', '*', '*', ' '],
      ['*', '*', ' ', ' ', ' ', '#', 'p', '#', ' ', ' ', ' ', '*', '*', ' '],
      ['*', '*', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', '*', '*', ' '],
      ['*', '*', '$', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '$', '*', '*', ' '],
      ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', ' '],
      ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ];
    onTarget = false;
    maxBoxes = 4;
    document.getElementById("level").innerHTML = level;
    document.getElementById("maxBoxes").innerHTML = maxBoxes;
    //Level 2 - Medium
  } else if (level === 2) {
    var mapArray = [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', ' '],
      [' ', '*', '*', '*', '*', '*', ' ', ' ', ' ', '*', '*', '*', '*', ' '],
      [' ', '*', '*', '*', '$', 'p', '#', ' ', ' ', '*', '*', '*', '*', ' '],
      [' ', '*', '*', '*', '*', '*', ' ', '#', '$', '*', '*', '*', '*', ' '],
      [' ', '*', '*', '*', '$', '*', '*', '#', ' ', '*', '*', '*', '*', ' '],
      [' ', '*', '*', '*', ' ', '*', ' ', '$', ' ', '*', '*', '*', '*', ' '],
      [' ', '*', '*', '*', '#', ' ', '@', '#', '#', '$', '*', '*', '*', ' '],
      [' ', '*', '*', '*', ' ', ' ', ' ', ' ', '$', ' ', '*', '*', '*', ' '],
      [' ', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', ' '],
    ];

    maxBoxes = 7;
    score = 1;
    onTarget = false;
    document.getElementById("level").innerHTML = level;
    document.getElementById("score").innerHTML = score;
    document.getElementById("maxBoxes").innerHTML = maxBoxes;
    //Level 3 - Hard
  } else if (level === 3) {
    var mapArray = [
      ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
      ['*', '$', '$', ' ', ' ', '*', ' ', ' ', ' ', ' ', ' ', '*', '*', '*'],
      ['*', '$', '$', ' ', ' ', '*', ' ', '#', ' ', ' ', '#', ' ', ' ', '*'],
      ['*', '$', '$', ' ', ' ', '*', '#', '*', '*', '*', '*', ' ', ' ', '*'],
      ['*', '$', '$', ' ', ' ', ' ', 'p', ' ', ' ', '*', '*', ' ', ' ', '*'],
      ['*', '$', '$', ' ', ' ', '*', ' ', '*', ' ', ' ', '#', ' ', '*', '*'],
      ['*', '*', '*', '*', '*', '*', ' ', '*', '*', '#', ' ', '#', ' ', '*'],
      [' ', ' ', '*', ' ', '#', ' ', ' ', '#', ' ', '#', ' ', '#', ' ', '*'],
      [' ', ' ', '*', ' ', ' ', ' ', ' ', '*', ' ', ' ', ' ', ' ', ' ', '*'],
      [' ', ' ', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
    ];
    onTarget = false;
    maxBoxes = 10;
    document.getElementById("level").innerHTML = level;
    document.getElementById("maxBoxes").innerHTML = maxBoxes;
  }
  ctx.clearRect(0, 0, c.width, c.height);
  var posX = 0;
  var posY = 0;
  let wall = new Image();
  let grass = new Image();
  let box = new Image();
  let player = new Image();
  let goal = new Image();
  wall.src = "textures/cobblestone.png";
  grass.src = "textures/grass.png";
  box.src = "textures/box.jpeg";
  player.src = "textures/player.png";
  goal.src = "textures/goal.png";
  player.className = "player";

 //function which checks if player has won and updates the score count.
  function scoreCheck() {
    document.getElementById("score").innerHTML = score;
    //if last level is beaten, finish the game.
    if (score == maxBoxes && level == 3) {
      var winSound = document.createElement("audio");
      $(winSound).attr("src", "sounds/win.mp3");
      winSound.play();
      endGame();
      return;
    }
    //if a level is beaten, load next level.
    if (score == maxBoxes) {
      var winSound = document.createElement("audio");
      $(winSound).attr("src", "sounds/win.mp3");
      winSound.play();
      startGame(level + 1); 
    }
  }
  
//function which loads the map depending on the array through a loop.
  grass.onload = function loadMap() {
    ctx.clearRect(0, 0, c.width, c.height);
    posX = 0;
    posY = 0;
    for (var i = 0; i < mapArray.length; i++) {
      for (var j = 0; j < mapArray[i].length; j++) {
        if (mapArray[i][j] == '*') {
          ctx.drawImage(wall, posX, posY, 32, 32);
        }
        if (mapArray[i][j] == ' ') {
          ctx.drawImage(grass, posX, posY, 32, 32);
        }
        if (mapArray[i][j] == 'p') {
          ctx.drawImage(grass, posX, posY, 32, 32);
          ctx.drawImage(player, posX, posY, 32, 32);
        }
        if (mapArray[i][j] == '#') {
          ctx.drawImage(box, posX, posY, 32, 32);
        }
        if (mapArray[i][j] == '$') {
          ctx.drawImage(grass, posX, posY, 32, 32);
          ctx.beginPath();
          ctx.arc(posX + 16, posY + 16, 6, 0, 2 * Math.PI, false);
          ctx.closePath();
          ctx.fillStyle = "red";
          ctx.fill();
          ctx.strokeStyle = "black";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
        if (mapArray[i][j] == '@') {
          ctx.drawImage(goal, posX, posY, 32, 32);
        }
        posX += 32;
      }
      posX = 0;
      posY += 32;
    }
    //Function which gets the players data and surrounding information for the move function.
    function findPlayerCords() {
      const y = mapArray.findIndex((row) => row.includes('p'));
      const x = mapArray[y].indexOf('p');

      return {
        x,
        y,
        above: mapArray[y - 1][x],
        below: mapArray[y + 1][x],
        sideLeft: mapArray[y][x - 1],
        sideRight: mapArray[y][x + 1],
      };
    }

    var playerCords = findPlayerCords();
    var playerCordsX = playerCords.x;
    var playerCordsY = playerCords.y;
/*function that moves the player specific to surroundings etc
mapArray[playerCordsY][playerCordsX] = original location of the player
mapArray[playerCordsY + dy][playerCordsX + dx] = new direction of the player
mapArray[playerCordsY + (2 * dy)][playerCordsX + (2 * dx)] = two spaces in front of the player's location */
    function move(dx, dy) {
      if (
        mapArray[playerCordsY + dy][playerCordsX + dx] == ' ' &&
        onTarget == false
      ) {
        mapArray[playerCordsY + dy][playerCordsX + dx] = 'p';
        mapArray[playerCordsY][playerCordsX] = ' ';
        loadMap();
      }
      else if (
        mapArray[playerCordsY + dy][playerCordsX + dx] == '#' &&
        mapArray[playerCordsY + (2 * dy)][playerCordsX + (2 * dx)] === '$' &&
        onTarget == false
      ){
        mapArray[playerCordsY][playerCordsX] = ' ';
        mapArray[playerCordsY + 2 * dy][playerCordsX + 2 * dx] = '@';
        mapArray[playerCordsY + dy][playerCordsX + dx] = 'p';
        score = score + 1;
        loadMap();
    		scoreCheck();
      }
      else if (
        mapArray[playerCordsY + dy][playerCordsX + dx] == '@' &&
        mapArray[playerCordsY + 2 * dy][playerCordsX + 2 * dx] === '$' &&
        onTarget == false
      ) {
        mapArray[playerCordsY][playerCordsX] = ' ';
        mapArray[playerCordsY + dy][playerCordsX + dx] = 'p';
        mapArray[playerCordsY + 2 * dy][playerCordsX + 2 * dx] = '@';
        onTarget = true;
        loadMap();
        //start the next level when all boxes are placed.
      }
      //BoxMovement on Grass
      else if (
        mapArray[playerCordsY + dy][playerCordsX + dx] === '#' &&
        mapArray[playerCordsY + 2 * dy][playerCordsX + 2 * dx] !== '*' &&
        mapArray[playerCordsY + 2 * dy][playerCordsX + 2 * dx] !== '#' &&
        mapArray[playerCordsY + 2 * dy][playerCordsX + 2 * dx] !== '@' &&
        onTarget == false
      ) {
        mapArray[playerCordsY][playerCordsX] = ' ';
        mapArray[playerCordsY + 2 * dy][playerCordsX + 2 * dx] = '#';
        mapArray[playerCordsY + dy][playerCordsX + dx] = 'p';
        loadMap();
      }
      //movement of player over the target
      else if (
        mapArray[playerCordsY + dy][playerCordsX + dx] === '$' &&
        onTarget == false
      ) {
        mapArray[playerCordsY][playerCordsX] = ' ';
        mapArray[playerCordsY + dy][playerCordsX + dx] = 'p';
        onTarget = true;
        loadMap();
      }
      if (
        mapArray[playerCordsY + dy][playerCordsX + dx] === '$' &&
        onTarget === true
      ) {
        mapArray[playerCordsY][playerCordsX] = '$';
        mapArray[playerCordsY + dy][playerCordsX + dx] = 'p';
        loadMap();
      }
      if (
        mapArray[playerCordsY + dy][playerCordsX + dx] === '@' &&
        mapArray[playerCordsY + 2 * dy][playerCordsX + 2 * dx] == '$' &&
        onTarget === true
      ) {
        mapArray[playerCordsY][playerCordsX] = '$';
        mapArray[playerCordsY + dy][playerCordsX + dx] = 'p';
        mapArray[playerCordsY + 2 * dy][playerCordsX + 2 * dx] = '@';
        loadMap();
      }
      if (
        mapArray[playerCordsY + dy][playerCordsX + dx] === ' ' &&
        onTarget === true
      ) {
        mapArray[playerCordsY][playerCordsX] = '$';
        mapArray[playerCordsY + dy][playerCordsX + dx] = 'p';
        onTarget = false;
        loadMap();
      }
      if (
        mapArray[playerCordsY + dy][playerCordsX + dx] === '@' &&
        mapArray[playerCordsY + 2 * dy][playerCordsX + 2 * dx] !== '*' &&
        mapArray[playerCordsY + 2 * dy][playerCordsX + 2 * dx] !== '#' &&
        mapArray[playerCordsY + 2 * dy][playerCordsX + 2 * dx] !== '@' &&
        onTarget == false
      ) {
        mapArray[playerCordsY][playerCordsX] = ' ';
        mapArray[playerCordsY + dy][playerCordsX + dx] = 'p';
        mapArray[playerCordsY + 2 * dy][playerCordsX + 2 * dx] = '#';
        onTarget = true;
        score = score - 1;
        loadMap();
	    	scoreCheck();
      }
      if (
        mapArray[playerCordsY + dy][playerCordsX + dx] === '@' &&
        mapArray[playerCordsY + 2 * dy][playerCordsX + 2 * dx] !== '*' &&
        mapArray[playerCordsY + 2 * dy][playerCordsX + 2 * dx] !== '#' &&
        mapArray[playerCordsY + 2 * dy][playerCordsX + 2 * dx] !== '@' &&
        onTarget == true
      ) {
        mapArray[playerCordsY][playerCordsX] = '$';
        mapArray[playerCordsY + dy][playerCordsX + dx] = 'p';
        mapArray[playerCordsY + 2 * dy][playerCordsX + 2 * dx] = '#';
        onTarget = true;
        score = score - 1;
        loadMap();
	    	scoreCheck();
      }
      if (
        mapArray[playerCordsY + dy][playerCordsX + dx] === '#' &&
        mapArray[playerCordsY + 2 * dy][playerCordsX + 2 * dx] !== '*' &&
        mapArray[playerCordsY + 2 * dy][playerCordsX + 2 * dx] !== '$' &&
        mapArray[playerCordsY + 2 * dy][playerCordsX + 2 * dx] !== '#' &&
        onTarget === true
      ) {
        mapArray[playerCordsY][playerCordsX] = '$';
        mapArray[playerCordsY + dy][playerCordsX + dx] = 'p';
        mapArray[playerCordsY + 2 * dy][playerCordsX + 2 * dx] = '#';
        onTarget = false;
        loadMap();
      }
    }
    //Function for user input
    function keys(e) {
      if (e.keyCode == 87 || e.keyCode == 38) {
        moves = moves + 1;
        document.getElementById("moves").innerHTML = moves;
        move(0, -1);
      }
      if (e.keyCode == 65 || e.keyCode == 37) {
        moves = moves + 1;
        document.getElementById("moves").innerHTML = moves;
        move(-1, 0);
      }
      if (e.keyCode == 83 || e.keyCode == 40) {
        moves = moves + 1;
        document.getElementById("moves").innerHTML = moves;
        move(0, 1);
      }
      if (e.keyCode == 68 || e.keyCode == 39) {
        moves = moves + 1;
        document.getElementById("moves").innerHTML = moves;
        move(+1, 0);
      }
      if (e.keyCode == 82) {
        var lossSound = document.createElement("audio");
        $(lossSound).attr("src", "sounds/loss.mp3");
        lossSound.play();
        score = 0;
        startGame(level);
      }
    }
    document.onkeydown = keys;
  };
}
