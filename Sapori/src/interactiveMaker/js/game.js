////////////////////////////////////////////////////////////
// GAME
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING CUSTOMIZATION START
 * 
 */
var landingBurgerBuildSpeed = 300; //animation speed for burger at landing page 
var ingredientMaxHeightMain = 320; //maximum of burger height for landing

var totalScore = 10; //total score per order
var updateScoreTextSpeed = 1000; //score text update speed

var totalTimePerIngredient = 6; //total time for 1 ingredient, eg 4 ingredients * 3 = 12 SEC
var totalTimePerIngredientDecrease = .5; //number to decrease each round for difficulty

var ingredientDropSpeed = 500; //ingredient drop speed
var ingredientDropDistance = 100; //ingredient drop distance
var ingredientMaxHeight = 530; //maximum of burger height for game
var ingredientScaleDecrease = .05; //number scale to decrease to fit maximum height
var ingredientDuplicate = true; //duplicate ingredients

var orderListStartNum = 3; //number of ingredient to start for order
var orderListSpaceY = 30; //order list text spacing
var orderListMarkY = -8; //order list mark spacing

//ingredients array list
//height就是单纯的高度，y指的是相对中心前后的偏移，正的是向前偏移，负的是向后偏移
var ingredients_arr = [{name:'Avocado', image:'ingredients/avocado.png', thumb:'ingredients/avocado.png', y:5, height:45},
 						{name:'Bbq sauce', image:'ingredients/bbq_sauce.png', thumb:'ingredients/bbq_sauce.png', y:10, height:25},
						{name:'Brie', image:'ingredients/brie.png', thumb:'ingredients/brie.png', y:15, height:10},
						{name:'Tomato', image:'ingredients/tomato.png', thumb:'ingredients/tomato.png', y:20, height:10},
						{name:'Jalapenos', image:'ingredients/jalapenos.png', thumb:'ingredients/jalapenos.png', y:0, height:20},
						{name:'Lettuce', image:'ingredients/Lettuce.png', thumb:'ingredients/Lettuce.png', y:-5, height:15},
						{name:'Mushrooms', image:'ingredients/mushrooms.png', thumb:'ingredients/mushrooms.png', y:-10, height:10},
						{name:'Sausage', image:'ingredients/sausage.png', thumb:'ingredients/sausage.png', y:-15, height:20},
						{name:'Onions', image:'ingredients/onions.png', thumb:'ingredients/onions.png', y:-20, height:10},
						{name:'Peppers', image:'ingredients/peppers.png', thumb:'ingredients/peppers.png', y:0, height:30},
						{name:'Buffalo mozzarella', image:'ingredients/buffalo mozzarella.png', thumb:'ingredients/buffalo mozzarella.png', y:5, height:30},
						{name:'Chipotle sauce', image:'ingredients/chipotle_sauce.png', thumb:'ingredients/chipotle_sauce.png', y:10, height:30},
						{name:'Chroizo', image:'ingredients/chroizo.png', thumb:'ingredients/chroizo.png', y:15, height:30},
						{name:'Coleslaw', image:'ingredients/coleslaw.png', thumb:'ingredients/coleslaw.png', y:20, height:30},
						{name:'Corn', image:'ingredients/corn.png', thumb:'ingredients/corn.png', y:0, height:30},
						{name:'Ham', image:'ingredients/ham.png', thumb:'ingredients/ham.png', y:-5, height:30},
						{name:'Mayo', image:'ingredients/mayo.png', thumb:'ingredients/mayo.png', y:-10, height:30},
						{name:'Mixed Leaf', image:'ingredients/Mixed Leaf.png', thumb:'ingredients/Mixed Leaf.png', y:-15, height:30},
						{name:'Turkey', image:'ingredients/turkey.png', thumb:'ingredients/turkey.png', y:-20, height:30},
						{name:'Sourdough top or bottom', image:'ingredients/sourdough top or bottom.png', thumb:'ingredients/sourdough top or bottom.png', y:0, height:30},
						{name:'Shredded carrow', image:'ingredients/shredded carrow.png', thumb:'ingredients/shredded carrow.png', y:0, height:30},

					
					
					];

var bunBottomHeight = 50; //bottom burger bun height 
var bunTopHeight = 10; //top burger bun height

// var playBackgroundMusic = true; //play background music
// var playTimerSound = true; //play timer sound

var exitMessage = 'Are you sure you want\nto quit the game'; //quit game message

//Social share, [SCORE] will replace with game score
var shareEnable = true; //toggle share
var shareTitle = 'I bet you can not beat [SCORE] - my highs core on Burger Maker';//social share score title
var shareMessage = '[SCORE] is mine new high score on Burger Maker! Try it now!'; //social share score message

//var enableMuteButton = true; //enable sound mute button

/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */
 
var playerData = {currentScore:0, newScore:0, bestScore:0, time:0};
var gamePaused = true;

/*!
 * 
 * GAME BUTTONS - This is the function that runs to setup button event
 * 
 */
function buildGameButton(){
	//定义鼠标放在该按钮上的样子为手掌
	btnPlay.cursor = "pointer";
	btnPlay.addEventListener("click", function(evt) {
		// playSound('soundChalk');
		goPage('game');
	});
	
	btnServe.cursor = "pointer";
	btnServe.addEventListener("click", function(evt) {
		if(serveEnable){
			// playSound('soundChalk');
			// playSound('soundCashier');
			// increaseScore();
			// createOrder();
			goPage('result');
		}
	});
	
	btnFinish.cursor = "pointer";
	btnFinish.addEventListener("click", function(evt) {
		addBurgerBun(true, gameBurgerContainer);
	});



	buttonReplay.cursor = "pointer";
	buttonReplay.addEventListener("click", function(evt) {
		// playSound('soundChalk');
		ingredient_list.length = 0;
		ingredientListNum.length = 0;
		goPage('game');
	});
	
	for(n=0;n<ingredients_arr.length;n++){
		$.icons[n].clicknum = n;
		$.icons[n].cursor = "pointer";
		$.icons[n].addEventListener("click", function(evt) {
			//checkSelectIngredient(evt.target.clicknum);

			addSelectIngredient(evt.target.clicknum);
		});
	}
	
	btnFacebook.cursor = "pointer";
	btnFacebook.addEventListener("click", function(evt) {
		share('facebook');
	});
	btnTwitter.cursor = "pointer";
	btnTwitter.addEventListener("click", function(evt) {
		share('twitter');
	});
	btnWhatsapp.cursor = "pointer";
	btnWhatsapp.addEventListener("click", function(evt) {
		share('whatsapp');
	});
	
	btnMuteOff.cursor = "pointer";
	btnMuteOff.addEventListener("mousedown", function(evt) {
		// toggleMuteButton(true);
	});
	btnMuteOn.cursor = "pointer";
	btnMuteOn.addEventListener("mousedown", function(evt) {
		// toggleMuteButton(false);
	});
	
	//confirm
	buttonConfirm.cursor = "pointer";
	buttonConfirm.addEventListener("click", function(evt) {
		// playSound('soundClick');
		toggleConfirm(false);
		stopGame(true);
		goPage('main');
	});
	
	buttonCancel.cursor = "pointer";
	buttonCancel.addEventListener("click", function(evt) {
		// playSound('soundClick');
		toggleConfirm(false);
	});
	
	//options
	buttonSoundOff.cursor = "pointer";
	buttonSoundOff.addEventListener("click", function(evt) {
		toggleGameMute(true);
	});
	
	buttonSoundOn.cursor = "pointer";
	buttonSoundOn.addEventListener("click", function(evt) {
		toggleGameMute(false);
	});
	
	buttonFullscreen.cursor = "pointer";
	buttonFullscreen.addEventListener("click", function(evt) {
		toggleFullScreen();
	});
	
	buttonSettings.cursor = "pointer";
	buttonSettings.addEventListener("click", function(evt) {
		toggleOption();
	});
	
	buttonExit.cursor = "pointer";
	buttonExit.addEventListener("click", function(evt) {
		toggleConfirm(true);
		toggleOption();
	});
}

/*!
 * 
 * DISPLAY PAGES - This is the function that runs to display pages
 * 
 */
var curPage=''
function goPage(page){
	curPage=page;
	
	mainContainer.visible=false;
	gameContainer.visible=false;
	resultContainer.visible=false;
	
	stopAnimateButton(btnPlay);
	stopAnimateButton(buttonReplay);
	// stopSoundLoop('musicMain');
	// stopSoundLoop('musicGame');
	
	var targetContainer = ''
	switch(page){
		case 'main':
			// if(playBackgroundMusic){
			// 	playSoundLoop('musicMain');
			// }
			targetContainer = mainContainer;
			
			buildMainBurger();
			startAnimateButton(btnPlay);
		break;
		
		case 'game':
			// if(playBackgroundMusic){
			// 	playSoundLoop('musicGame');
			// }
			targetContainer = gameContainer;
			burgerReset(gameBurgerContainer, true);
			toggleServeButton(true);
			//startGame();
			//注释掉之后就完全不会开始游戏了，可以自己写自己想要的函数了
		break;
		
		case 'result':
			// if(playBackgroundMusic){
			// 	playSoundLoop('musicMain');
			// }
			targetContainer = resultContainer;
			// stopGame();
			txtOrder.text = "Your order is:\n";
			for(var i = 0; i <ingredient_list.length;i++){
				txtOrder.text+=ingredient_list[i];
				txtOrder.text+="\n";
			}

			for(var i =0;i<ingredientListNum.length;i++){
				console.log(ingredientListNum[i]);
			}

			burgerReset(resultBurgerContainer, true);

			buildResultBurger();
			// txtOrder.text+=burgerHolder[ingredientCount];
			// for(var i=0;i<3;i++){
			// 	txtOrder.text+="\ntest"
			// }



			// if(playerData.newScore > playerData.bestScore){
			// 	playerData.bestScore = playerData.newScore;
			// }
			// txtResultScore.text = Math.round(playerData.newScore);
			// txtResultTopScore.text = Math.round(playerData.bestScore);
			startAnimateButton(buttonReplay);
			// saveGame(playerData.bestScore);
		break;
	}
	
	targetContainer.alpha=0;
	targetContainer.visible=true;
	$(targetContainer)
	.clearQueue()
	.stop(true,true)
	.animate({ alpha:1 }, 500);
	
	resizeCanvas();
}


/*!
 * 
 * START GAME - This is the function that runs to start play game
 * 
 */
 function startGame(){
	 layoutGameInstruction.visible=true;
	 playerData.currentScore = 0;
	 playerData.newScore = 0;
	 playerData.time = totalTimePerIngredient;
	 
	 
	 resetOrder();
	 updateScore(false);
	 toggleServeButton(false);
	 gamePaused = false;
	 
	 setTimeout(function() {
		createOrder();
	 }, 500);
}

 /*!
 * 
 * STOP GAME - This is the function that runs to stop play game
 * 
 */
function stopGame(){
	gamePaused = true;
	toggleGameTimer(false);
	
	if ( typeof displayB == 'function' ) { 
		displayB();
	}
}

/*!
 *
 * SAVE GAME - This is the function that runs to save game
 *
 */
function saveGame(score){
    /*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}

/*!
 * 
 * START ANIMATE BUTTON - This is the function that runs to play blinking animation
 * 也就是按钮的闪烁动画
 * 
 */
function startAnimateButton(obj){
	//alpha代表该按钮的透明度
	//0是完全透明,1是完全不透明
	obj.alpha=.2;
	$(obj)
	.animate({ alpha:1}, 500)
	.animate({ alpha:.2}, 500, function(){
		startAnimateButton(obj);
	});
}

/*!
 * 
 * STOP ANIMATE BUTTON - This is the function that runs to stop blinking animation
 * 
 */
function stopAnimateButton(obj){
	obj.alpha=0;
	$(obj)
	.clearQueue()
	.stop(true,true);
}


/*!
 * 
 * BURGER INGREDIENT - This is the function that runs to add and reset burger ingredient
 * 
 */
$.burgerHolder = {};
$.resultsBurgerHolder = {};

var ingredientListNum = new Array();
var ingredient_list = new Array();
var ingredientCount = 0;
var ingredientY = 0;
var ingredientScale = 1;

function burgerReset(target, con){
	ingredientCount = 0;
	ingredientY = 0;
	ingredientScale = 1;
	target.scaleX = target.scaleY = ingredientScale;
	target.removeAllChildren();
	
	if(con)
		addBurgerBun(false, target);
}

function addBurgerIngredient(num, target){
	//console.log(ingredientCount);
	if(curPage=='game'){
		ingredientListNum.push(num);
		ingredient_list.push(ingredients_arr[num].name);
		console.log("add "+ingredient_list[num]+" to the ingredient list\n");
		console.log("the number is "+ingredientListNum[num]);
	}
	

	$.burgerHolder[ingredientCount] = $.ingredients[num].clone();
	$.burgerHolder[ingredientCount].x = 0;
	$.burgerHolder[ingredientCount].y = ingredientY+(ingredients_arr[num].y);
	
	animateIngredient($.burgerHolder[ingredientCount]);
	ingredientY -= ingredients_arr[num].height;
	
	if(randomBoolean()){
		$.burgerHolder[ingredientCount].scaleX *= -1;
	}
	
	target.addChild($.burgerHolder[ingredientCount]);
	ingredientCount++;
	
	var maxHeight = target == mainBurgerContainer ? ingredientMaxHeightMain : ingredientMaxHeight;
	for(n=1;n<10;n++){
		if(target.getBounds().height * ingredientScale > maxHeight){
			ingredientScale -=ingredientScaleDecrease;
		}else{
			n=10;	
		}
	}
	
	target.scaleX = target.scaleY = ingredientScale;
}

function addResultBurgerIngredient(num, target){
	//console.log(ingredientCount);
	$.resultsBurgerHolder[ingredientCount] = $.ingredients[num].clone();
	$.resultsBurgerHolder[ingredientCount].x = 0;
	$.resultsBurgerHolder[ingredientCount].y = ingredientY+(ingredients_arr[num].y);
	
	animateIngredient($.resultsBurgerHolder[ingredientCount]);
	ingredientY -= ingredients_arr[num].height;
	
	if(randomBoolean()){
		$.resultsBurgerHolder[ingredientCount].scaleX *= -1;
	}
	
	target.addChild($.resultsBurgerHolder[ingredientCount]);
	ingredientCount++;
	
	var maxHeight = target == mainBurgerContainer ? ingredientMaxHeightMain : ingredientMaxHeight;
	for(n=1;n<10;n++){
		if(target.getBounds().height * ingredientScale > maxHeight){
			ingredientScale -=ingredientScaleDecrease;
		}else{
			n=10;	
		}
	}
	
	target.scaleX = target.scaleY = ingredientScale;
}



var curResultNum = 0;
function buildResultBurger(){
	burgerReset(resultBurgerContainer, true);
	loopResultBurger();
}

function loopResultBurger(){
	if(curResultNum < ingredientListNum.length){
		setTimeout(function() {
			if(curPage=='result'){
				addResultBurgerIngredient(ingredientListNum[curResultNum], resultBurgerContainer);
				curResultNum++;
				loopResultBurger();
			}
		}, landingBurgerBuildSpeed);

	}else{
		setTimeout(function() {
			if(curPage=='result'){
				addResultsBurgerBun(true, resultBurgerContainer);
				curResultNum++;
			}
		}, landingBurgerBuildSpeed);
	}
}







/*!
 * 
 * BURGER BUN - This is the function that runs to add burger bun
 * 
 */
function addBurgerBun(con, target){
	if(!con){
		$.burgerHolder[ingredientCount] = bunBottom.clone();
		$.burgerHolder[ingredientCount].x = 0;
		$.burgerHolder[ingredientCount].y = ingredientY;
		animateIngredient($.burgerHolder[ingredientCount]);
		
		target.addChild($.burgerHolder[ingredientCount]);
		ingredientY = -(bunBottomHeight);
		ingredientCount++;
	}else{
		$.burgerHolder[ingredientCount] = bunTop.clone();
		$.burgerHolder[ingredientCount].x = 0;
		$.burgerHolder[ingredientCount].y = ingredientY + bunTopHeight;
		animateIngredient($.burgerHolder[ingredientCount]);
		
		target.addChild($.burgerHolder[ingredientCount]);
	}
}

/*!
 * 
 * BURGER BUN - This is the function that runs to add burger bun
 * 
 */
function addResultsBurgerBun(con, target){
	if(!con){
		$.resultsBurgerHolder[ingredientCount] = bunBottom.clone();
		$.resultsBurgerHolder[ingredientCount].x = 0;
		$.resultsBurgerHolder[ingredientCount].y = ingredientY;
		animateIngredient($.resultsBurgerHolder[ingredientCount]);
		
		target.addChild($.resultsBurgerHolder[ingredientCount]);
		ingredientY = -(bunBottomHeight);
		ingredientCount++;
	}else{
		$.resultsBurgerHolder[ingredientCount] = bunTop.clone();
		$.resultsBurgerHolder[ingredientCount].x = 0;
		$.resultsBurgerHolder[ingredientCount].y = ingredientY + bunTopHeight;
		animateIngredient($.resultsBurgerHolder[ingredientCount]);
		
		target.addChild($.resultsBurgerHolder[ingredientCount]);
	}
}


/*!
 * 
 * INGREDIENT DROP ANIMATION - This is the function that runs to animate ingredient
 * 
 */
function animateIngredient(obj){
	var startY = obj.y;
	obj.y -= ingredientDropDistance;
	
	$(obj)
	.clearQueue()
	.stop(true,false)
	.animate({ y:startY}, {
	  duration: ingredientDropSpeed,
	  easing: "easeOutBounce"
	});	
	
	var randomFoodNum = Math.round(Math.random()*2)+1;
	// playSound('soundFoodDrop'+randomFoodNum, false);
}


/*!
 * 
 * ORDER LIST - This is the function that runs to create new order list
 * 
 */
var orderMaxNum = 0;
var orderNum = 1;
var orderY = 0;
var orderRandom_arr = [];
var orderList_arr = [];
var orderListNum = 0;

function resetOrder(){
	orderNum = 1;
	orderMaxNum = orderListStartNum;
	gameOrderContainer.removeAllChildren();
	txtGameOrder.text = 'ORDER '+orderNum;
}

function createOrder(){
	// playSound('soundReceipt');
	toggleServeButton(false);
	burgerReset(gameBurgerContainer, true);
	
	gameOrderContainer.removeAllChildren();
	txtGameOrder.text = 'ORDER '+orderNum;
	
	orderRandom_arr = [];
	orderList_arr = [];
	for(n=1;n<ingredients_arr.length;n++){
		orderRandom_arr.push(ingredients_arr[n].name);
	}
	
	//duplicate
	if(orderMaxNum > (ingredients_arr.length/2) && ingredientDuplicate){
		for(n=0;n<ingredients_arr.length;n++){
			orderRandom_arr.push(ingredients_arr[n].name);
		}
	}
	
	shuffle(orderRandom_arr);
	for(n=0;n<orderRandom_arr.length;n++){
		if(n<orderMaxNum){
			orderList_arr.push(orderRandom_arr[n]);
		}
	}
	
	orderList_arr.push(ingredients_arr[0].name);
	randomShuffle(orderList_arr);
	
	var countNo = orderList_arr.length;
	orderY=0;
	for(n=0;n<orderList_arr.length;n++){
		$.marks[n] = orderMark.clone();
		centerReg($.marks[n]);
		$.marks[n].x = 0;
		$.marks[n].y = orderY + orderListMarkY;
		$.marks[n].visible = false;
		
		$.orders[n]=new createjs.Text();
		$.orders[n].font = "30px frenchpressregular";
		$.orders[n].color = "#ffffff";
		$.orders[n].text = countNo+'. '+orderList_arr[n];
		$.orders[n].textAlign = "center";
		$.orders[n].textBaseline='alphabetic';
		$.orders[n].y=orderY;
		orderY+=orderListSpaceY;
		countNo--;
		
		gameOrderContainer.addChild($.orders[n], $.marks[n]);
	}
	orderListNum = orderList_arr.length-1;
	orderNum++;
	
	updateOrderIndicator();
	startAnimateOrderIndicator();
	
	toggleGameTimer(true, playerData.time*(orderMaxNum+1));
	increaseLevel();
}

function randomShuffle(arr){
	shuffle(arr);
	var checkObj = 0;
	var randomComplete = true;
	for(n=0;n<arr.length;n++){
		if(checkObj != arr[n]){
			checkObj = arr[n];
		}else{
			randomComplete=false;
			n=arr.length-1;
		}
	}
	if(!randomComplete){
		randomShuffle(arr)
	}
}

/*!
 * 
 * INGREDIENT SELECT CHECK - This is the function that runs to check ingredient select
 * 
 */

/*
function checkSelectIngredient(num){
	layoutGameInstruction.visible=false;
	if(ingredients_arr[num].name == orderList_arr[orderListNum]){
		addBurgerIngredient(num, gameBurgerContainer);
		$.marks[orderListNum].visible = true;
		orderListNum--;
		updateOrderIndicator();
	}
	if(orderListNum==-1){
		//add bun when last ingredient, ready to show serve button
		setTimeout(function() {
			
		}, 500);
		orderListNum--;
	}
}
*/

/*!
 * 
 * Add Selected Ingredient to List
 * 
 */

function addSelectIngredient(num){
	layoutGameInstruction.visible=false;
	addBurgerIngredient(num, gameBurgerContainer);
	// addBurgerBun(true, gameBurgerContainer);
	// toggleServeButton(true);
}


/*!
 * 
 * LEVEL INCREASE - This is the function that runs to increase difficulty
 * 
 */
function increaseLevel(){
	orderMaxNum++;
	if(orderMaxNum > ingredients_arr.length-1){
		playerData.time -= totalTimePerIngredientDecrease;
	}
	orderMaxNum = orderMaxNum > (ingredients_arr.length-1) ? (ingredients_arr.length-1) : orderMaxNum;
}

/*!
 * 
 * ORDER INDICATOR UPDATE - This is the function that runs to update order indicator
 * 
 */
function updateOrderIndicator(){
	if(orderListNum>=0){
		orderIndicator.visible=true;
		orderIndicator.x = Math.round(canvasW/100 * 81);
		orderIndicator.y = gameOrderContainer.y + $.marks[orderListNum].y;
	}else{
		orderIndicator.visible=false;
	}
}


/*!
 * 
 * ORDER INDICATOR ANIMATION - This is the function that runs to animate order indicator
 * 
 */
function startAnimateOrderIndicator(){
	$(orderIndicator)
	.animate({ x:Math.round(canvasW/100 * 82)}, 300)
	.animate({ x:Math.round(canvasW/100 * 81)}, 300, function(){
		startAnimateOrderIndicator();
	});	
}

/*!
 * 
 * TOGGLE SERVE BUTTON - This is the function that runs to toggle serve button
 * 
 */
var serveEnable = false;
function toggleServeButton(con){
	$(btnServe)
	.clearQueue()
	.stop(true,false);
	
	if(con){
		serveEnable = true;
		btnServe.cursor = "pointer";
		startAnimateButton(btnServe);
	}else{
		serveEnable = false;
		btnServe.cursor = "default";
		btnServe.alpha = .3;
	}
}


/*!
 * 
 * SCORE - This is the function that runs to add and update score
 * 
 */
function increaseScore(){
	playerData.newScore += totalScore;
	updateScore(true);
}

function updateScore(con){
	if(con){
		$(playerData).animate({currentScore: playerData.newScore},{
			duration: updateScoreTextSpeed,
			step: function( newScore ){
				txtGameScore.text = Math.round(playerData.currentScore);
			}
		});
	}else{
		txtGameScore.text = playerData.newScore = playerData.currentScore;
	}
}


/*!
 * 
 * MAIN PAGE BURGER ANIMATION - This is the function that runs to build burger animation
 * 
 */
var mainRandom_arr = [];
var mainList_arr = [];
var curMainNum = 0;
var maxMainNum = 7;

function buildMainBurger(){
	burgerReset(mainBurgerContainer, true);
	
	mainRandom_arr = [];
	for(n=1;n<ingredients_arr.length;n++){
		mainRandom_arr.push(ingredients_arr[n].name);
	}
	shuffle(mainRandom_arr);
	
	maxMainNum = ingredients_arr.length-2;
	for(n=0;n<mainRandom_arr.length;n++){
		if(n<maxMainNum){
			mainList_arr.push(mainRandom_arr[n]);
		}
	}
	mainList_arr.push(ingredients_arr[0].name);
	shuffle(mainList_arr);
	
	curMainNum = 0;
	loopMainBurger();
}

function loopMainBurger(){
	if(curMainNum < mainList_arr.length){
		setTimeout(function() {
			if(curPage=='main'){
				addBurgerIngredient(getIndexOfIngredients(mainList_arr[curMainNum]), mainBurgerContainer);
				curMainNum++;
				loopMainBurger();
			}
		}, landingBurgerBuildSpeed);
	}else{
		setTimeout(function() {
			if(curPage=='main'){
				addBurgerBun(true, mainBurgerContainer);
				curMainNum++;
			}
		}, landingBurgerBuildSpeed);
	}
}

/*!
 * 
 * INDEX OF INGREDIENT - This is the function that runs to get index of ingredient
 * 
 */
function getIndexOfIngredients(ingredient){
	for(n=0;n<ingredients_arr.length;n++){
		if(ingredients_arr[n].name == ingredient){
			return n;	
		}
	}
}

/*!
 * 
 * GAME TIMER - This is the function that runs for game timer
 * 
 */
var gameTimerInterval;
var gameTimerSoundInterval;
var gameTimerCount = 0;
var gameTimerMax = 0;

var timerSoundNum = 0;
var timerSoundMax = 10;

function toggleGameTimer(con, time){
	if(con){
		timerSoundNum = 0;
		gameTimerCount = gameTimerMax = time;
		txtGameTime.text=millisecondsToTime(gameTimerCount*1000);
		
		clearInterval(gameTimerInterval);
		gameTimerInterval = setInterval(function(){
			if(!gamePaused){
				if(gameTimerCount <= 0){
					toggleGameTimer(false);
					// playSound('soundRing');
					goPage('result');
				}else{
					gameTimerCount-=1;
					txtGameTime.text=millisecondsToTime(gameTimerCount*1000);
				}
			}
		}, 1000);
		
		clearInterval(gameTimerSoundInterval);
		// if(playTimerSound){
		// 	gameTimerSoundInterval = setInterval(function(){
		// 		if(!gamePaused){
		// 			if(timerSoundNum > 0){
		// 				timerSoundNum--;
		// 			}else{
		// 				if(gameTimerCount > 21){
		// 					timerSoundNum = 9;
		// 				}else if(gameTimerCount > 11){
		// 					timerSoundNum = 8;
		// 				}else if(gameTimerCount > 6){
		// 					timerSoundNum = 6;
		// 				}else{
		// 					timerSoundNum = 4;	
		// 				}
		// 				// updateTimerSound();
		// 			}
		// 		}
		// 	}, 100);
		// }
	}else{
		clearInterval(gameTimerInterval);
		clearInterval(gameTimerSoundInterval);
	}
}

// function updateTimerSound(){
// 	// playSound('soundClock');
// }


/*!
 * 
 * MILLISECONDS CONVERT - This is the function that runs to convert milliseconds to time
 * 
 */
function millisecondsToTime(milli) {
      var milliseconds = milli % 1000;
      var seconds = Math.floor((milli / 1000) % 60);
      var minutes = Math.floor((milli / (60 * 1000)) % 60);
	  
	  if(seconds<10){
		seconds = '0'+seconds;  
	  }
	  
	  if(minutes<10){
		minutes = '0'+minutes;  
	  }
	  return seconds+' SEC';
}

/*!
 * 
 * CONFIRM - This is the function that runs to toggle confirm
 * 
 */
function toggleConfirm(con){
	confirmContainer.visible = con;
	gamePaused = con;
}

/*!
 * 
 * OPTIONS - This is the function that runs to toggle options
 * 
 */

function toggleOption(){
	if(optionsContainer.visible){
		optionsContainer.visible = false;
	}else{
		optionsContainer.visible = true;
	}
}

/*!
 * 
 * OPTIONS - This is the function that runs to mute and fullscreen
 * 
 */
function toggleGameMute(con){
	buttonSoundOff.visible = false;
	buttonSoundOn.visible = false;
	// toggleMute(con);
	if(con){
		buttonSoundOn.visible = true;
	}else{
		buttonSoundOff.visible = true;	
	}
}

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}


/*!
 * 
 * SHARE - This is the function that runs to open share url
 * 
 */
function share(action){
	
	var loc = location.href
	loc = loc.substring(0, loc.lastIndexOf("/") + 1);
	var title = shareTitle.replace("[SCORE]", playerData.newScore);
	var text = shareTitle.replace("[SCORE]", playerData.newScore);
	var shareurl = '';
	
	if( action == 'twitter' ) {
		shareurl = 'https://twitter.com/intent/tweet?url='+loc+'&text='+text;
	}else if( action == 'facebook' ){
		shareurl ='https://business.facebook.com/SaporiDiPizzaDeli/'
		// shareurl = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(loc+'share.php?desc='+text+'&title='+title+'&url='+loc+'&thumb='+loc+'share.jpg&width=590&height=300');
	}else if( action == 'google' ){
		shareurl = 'https://plus.google.com/share?url='+loc;
	}else if( action == 'whatsapp' ){
		shareurl = "whatsapp://send?text=" + encodeURIComponent(text) + " - " + encodeURIComponent(loc);
	}
	
	window.open(shareurl);
}

/*!
 * 
 * MUTE BUTTON - This is the function that runs to toggle mute button
 * 
 */
function toggleMuteButton(con){
	if(con){
		btnMuteOn.visible=true;
		btnMuteOff.visible=false;
	}else{
		btnMuteOn.visible=false;
		btnMuteOff.visible=true;
	}
	
	// toggleMute(con);
}