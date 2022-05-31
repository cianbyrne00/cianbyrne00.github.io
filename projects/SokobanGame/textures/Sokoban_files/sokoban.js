
var posX = 0;
var posY = 0;

var c = document.getElementById("mycanvas");
var ctx = c.getContext('2d');

var titleScreen = new Image();

titleScreen.onload = function() {
    ctx.drawImage(titleScreen, 30,20, 435, 300); }
    titleScreen.src = 'textures/sokobancover.png';

var posX = 0;
var posY = 0;
function mapSelect(level){
if (level === 1){
var mapArray = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,2,1,1,1,3,1,1,1,1,4,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]
}
else if (level === 2){
    var mapArray = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,1,1,1,0,0,0,0,1],
    [1,0,0,0,4,2,3,1,1,0,0,0,0,1],
    [1,0,0,0,0,0,1,3,4,0,0,0,0,1],
    [1,0,0,0,4,0,0,3,1,0,0,0,0,1],
    [1,0,0,0,1,0,1,4,1,0,0,0,0,1],
    [1,0,0,0,3,1,3,3,3,4,0,0,0,1],
    [1,0,0,0,1,1,1,1,4,1,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1]
    ]
}
else if (level === 3){
    var mapArray = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,4,4,1,1,0,1,1,1,1,1,0,0,0],
    [0,4,4,1,1,0,1,3,1,1,3,1,1,0],
    [0,4,4,1,1,0,3,0,0,0,0,1,1,0],
    [0,4,4,1,1,1,1,2,1,0,0,1,1,0],
    [0,4,4,0,0,0,1,0,1,1,3,1,0,0],
    [0,0,0,0,0,0,1,0,0,3,1,3,1,0],
    [1,1,0,1,3,1,1,3,1,3,1,3,1,0],
    [1,1,0,1,1,1,1,0,1,1,1,1,1,0],
    [1,1,0,0,0,0,0,0,0,0,0,0,0,0],
    ]
}
return mapArray;
}
function printMap(){
var mapArray = mapSelect(level);
ctx.clearRect(0, 0, c.width, c.height);
var wall = new Image();
var grass = new Image();
var box = new Image();
var player = new Image();

wall.src = 'textures/cobblestone.png';
grass.src = 'textures/grass.png';
box.src = 'textures/box.jpeg';
player.src = 'textures/player.png';

player.className = 'player';

grass.onload = function loadMap(){

for (var i=0; i< mapArray.length; i++){
    for(var j=0; j< mapArray[i].length; j++){
        if (mapArray[i][j] == 0){
            ctx.drawImage(wall, posX, posY, 32, 32);
        }
        if (mapArray[i][j] == 1){
            ctx.drawImage(grass, posX, posY, 32, 32);
        }
        if (mapArray[i][j] == 2){
            ctx.drawImage(grass, posX, posY, 32, 32);
            ctx.drawImage(player, posX, posY, 32, 32);
        }
        if (mapArray[i][j] == 3){
            ctx.drawImage(box, posX, posY, 32, 32);
        }
        if (mapArray[i][j] == 4){
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
        posX += 32;
    }
    posX = 0;
    posY += 32;
}
}
function findPlayerCords() {
    const y = mapArray.findIndex((row) => row.includes(2))
    const x = mapArray[y].indexOf(2)
  
    return {
        x,
        y,
        above: mapArray[y - 1][x],
        below: mapArray[y + 1][x],
        sideLeft: mapArray[y][x - 1],
        sideRight: mapArray[y][x + 1],
    }
  }
  printMap();
var playerCords = findPlayerCords();
/*playerCords.x = playerCords.x * 32;
playerCords.y = playerCords.y * 32;
console.log(playerCords.sideLeft);
console.log(playerCords.y);

function keys(e){
    if (e.keyCode==87 && playerCords.above !== 0){ 
    findPlayerCords();
    playerCords.y = (playerCords.y - 32 );
    ctx.drawImage(player, playerCords.x, playerCords.y, 32, 32);
    }
    if (e.keyCode==65 && playerCords.sideLeft !== 0){
    playerCords.x = (playerCords.x - 32 );
    ctx.drawImage(player, playerCords.x, playerCords.y, 32, 32);
    }
    if (e.keyCode==83 && playerCords.below !== 0){
    playerCords.y = playerCords.y + 32 ;
    ctx.drawImage(player, playerCords.x, playerCords.y, 32, 32);
    }
    if (e.keyCode==68 && playerCords.sideRight !== 0){
    playerCords.x = (playerCords.x + 32 );
    ctx.drawImage(player, playerCords.x, playerCords.y, 32, 32);
   }
}
document.onkeydown = keys;
*/
}





