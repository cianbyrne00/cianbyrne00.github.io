////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 后续默认分辨率为1024*768
 * 
 */
function initGameCanvas(w,h){
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas");
	createjs.Touch.enable(stage);

	//enable mouseover event, and the frequency is 20
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", tick);	
}

var canvasContainer, mainContainer, mainBurgerContainer, gameContainer, gameBurgerContainer, gameOrderContainer, resultContainer;
var bg,bg_game, layoutGame, layoutGameInstruction, layoutLanding, layoutResult, btnPlay, buttonReplay, btnServe, txtGameTime, txtGameScore, txtGameOrder, bunTop, bunBottom, orderMark, orderIndicator, txtResultScore, txtResultTopScore, btnFacebook, btnTwitter, btnWhatsapp, btnMuteOn, btnMuteOff, btnMainMuteOn, btnMainMuteOff;
var txtFinish, btnFinish,txtSandwichMaker,txtSandwich,txtMaker,txtOrder;
var resultBurgerContainer;
$.frames={};
$.icons={};
$.ingredients={};
$.orders={};
$.marks={};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	//创建对应的cotainer


	canvasContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	
	resultContainer = new createjs.Container();
	confirmContainer = new createjs.Container();
	optionsContainer = new createjs.Container();
	
	mainBurgerContainer = new createjs.Container();
	resultBurgerContainer = new createjs.Container();
	gameBurgerContainer = new createjs.Container();
	gameOrderContainer = new createjs.Container();
	

	bg = new createjs.Bitmap(loader.getResult('background'));

	bg_game = new createjs.Bitmap(loader.getResult('background_game'));
	layoutLanding = new createjs.Bitmap(loader.getResult('layoutLanding'));
	layoutGame = new createjs.Bitmap(loader.getResult('layoutGame'));
	layoutGameInstruction = new createjs.Bitmap(loader.getResult('layoutInstruction'));
	layoutResult = new createjs.Bitmap(loader.getResult('layoutResult'));
	
	btnPlay = new createjs.Bitmap(loader.getResult('btnPlay'));
	buttonReplay = new createjs.Bitmap(loader.getResult('btnPlayagain'));
	btnServe = new createjs.Bitmap(loader.getResult('btnServe'));
	btnFinish = new createjs.Bitmap(loader.getResult('btnFinish'));

	centerReg(btnPlay);
	centerReg(buttonReplay);
	centerReg(btnServe);
	centerReg(btnFinish);

	createHitarea(btnPlay);
	createHitarea(buttonReplay);
	createHitarea(btnServe);
	createHitarea(btnFinish);

	//更改这里的数值可以调整各个按钮的位置
	btnPlay.x = canvasW/2;
	btnPlay.y = canvasH/100*90;
	buttonReplay.x = canvasW/2;
	buttonReplay.y = canvasH/100*88;
	btnServe.x = canvasW/100 * 53;
	btnServe.y = canvasH/100*92;

	btnFinish.x = canvasW/100 * 88;
	btnFinish.y = (canvasH/100*75);

	// console.log("x is "+btnPlay.x + " y is "+btnPlay.y);
	bunTop = new createjs.Bitmap(loader.getResult('bunTop'));
	bunTop.scaleX=0.5;
	bunBottom = new createjs.Bitmap(loader.getResult('bunBottom'));
	bunBottom.scaleX=0.5;
	orderMark = new createjs.Bitmap(loader.getResult('orderMark'));
	orderIndicator = new createjs.Bitmap(loader.getResult('orderIndicator'));
	centerReg(bunTop);
	centerReg(bunBottom);
	centerReg(orderMark);
	centerReg(orderIndicator);

	bunTop.regY = bunTop.image.naturalHeight;
	
	bunBottom.regY = bunBottom.image.naturalHeight;
	

	// bunTop.x = bunTop.image.naturalWidth;
	// bunTop.y = bunTop.image.naturalHeight;
	//这里是把上半部分的汉堡给隐藏起来了
	bunTop.x = 0-bunTop.image.naturalWidth;
	bunTop.y = 0-bunTop.image.naturalHeight;
	// console.log("x is "+bunTop.x + " y is "+bunTop.y);
	bunBottom.x = 0-bunBottom.image.naturalWidth;
	bunBottom.y = 0-bunBottom.image.naturalHeight;
	orderMark.x = 0-orderMark.image.naturalWidth;
	orderMark.y = 0-orderMark.image.naturalHeight;
	gameContainer.addChild(bunTop, bunBottom, orderMark, orderIndicator);
	
	var iconStartX = canvasW/100 * 9;
	var iconX = iconStartX;
	var iconY = canvasH/100 * 88;
	var iconSpaceX = 96;
	var iconSpaceY = 100;
	var curCol = 1;
	
	
	for(n=0;n<ingredients_arr.length;n++){
		$.frames[n]=new createjs.Bitmap(loader.getResult('iconFrame'));
		$.frames[n].scaleX=0.75;
		$.frames[n].scaleY=0.75;
		$.icons[n]=new createjs.Bitmap(loader.getResult('icon'+ingredients_arr[n].name));
		$.ingredients[n]=new createjs.Bitmap(loader.getResult(ingredients_arr[n].name));
		
		centerReg($.frames[n]);
		centerReg($.icons[n]);
		if(n==0){
			$.ingredients[n].scaleX=0.5;
			$.ingredients[n].scaleY=0.5;
			$.icons[n].scaleX=0.14;
			$.icons[n].scaleY=0.21;
		}
		if(n==1){
			$.ingredients[n].scaleX=0.5;
			$.ingredients[n].scaleY=0.5;
			$.icons[n].scaleX=0.18;
			$.icons[n].scaleY=0.25;
		}
		if(n==2){
			$.ingredients[n].scaleX=0.5;
			$.ingredients[n].scaleY=0.5;
			$.icons[n].scaleX=0.14;
			$.icons[n].scaleY=0.25;
		}
		if(n==3){
			$.ingredients[n].scaleX=0.5;
			$.ingredients[n].scaleY=0.5;
			$.icons[n].scaleX=0.13;
			$.icons[n].scaleY=0.25;			
		}
		if(n==4){
			$.ingredients[n].scaleX=0.5;
			$.ingredients[n].scaleY=0.5;
			$.icons[n].scaleX=0.15;
			$.icons[n].scaleY=0.25;
		}
		if(n==5){
			$.ingredients[n].scaleX=0.5;
			$.ingredients[n].scaleY=0.5;
			$.icons[n].scaleX=0.15;
			$.icons[n].scaleY=0.25;
		}
		if(n==6){
			$.ingredients[n].scaleX=0.5;
			$.ingredients[n].scaleY=0.5;
			$.icons[n].scaleX=0.18;
			$.icons[n].scaleY=0.25;
		}
		if(n==7){
			$.ingredients[n].scaleX=0.5;
			$.ingredients[n].scaleY=0.5;
			$.icons[n].scaleX=0.16;
			$.icons[n].scaleY=0.25;
		}
		if(n==8){
			$.ingredients[n].scaleX=0.5;
			$.ingredients[n].scaleY=0.5;
			$.icons[n].scaleX=0.15;
			$.icons[n].scaleY=0.25;
		}
		if(n==9){
			$.ingredients[n].scaleX=0.4;
			$.ingredients[n].scaleY=0.5;
			$.icons[n].scaleX=0.12;
			$.icons[n].scaleY=0.2;			
		}
		if(n==10){
			$.ingredients[n].scaleX=0.4;
			$.ingredients[n].scaleY=0.5;
			$.icons[n].scaleX=0.12;
			$.icons[n].scaleY=0.2;			
		}
		if(n==11){
			$.ingredients[n].scaleX=0.4;
			$.ingredients[n].scaleY=0.5;
			$.icons[n].scaleX=0.12;
			$.icons[n].scaleY=0.2;			
		}
		if(n==12){
			$.ingredients[n].scaleX=0.4;
			$.ingredients[n].scaleY=0.5;
			$.icons[n].scaleX=0.12;
			$.icons[n].scaleY=0.2;			
		}
		if(n==13){
			$.ingredients[n].scaleX=0.4;
			$.ingredients[n].scaleY=0.5;
			$.icons[n].scaleX=0.12;
			$.icons[n].scaleY=0.2;			
		}
		if(n==14){
			$.ingredients[n].scaleX=0.4;
			$.ingredients[n].scaleY=0.5;
			$.icons[n].scaleX=0.12;
			$.icons[n].scaleY=0.2;			
		}
		if(n==15){
			$.ingredients[n].scaleX=0.4;
			$.ingredients[n].scaleY=0.5;
			$.icons[n].scaleX=0.12;
			$.icons[n].scaleY=0.2;			
		}
		if(n==16){
			$.ingredients[n].scaleX=0.4;
			$.ingredients[n].scaleY=0.5;
			$.icons[n].scaleX=0.12;
			$.icons[n].scaleY=0.2;			
		}
		if(n==17){
			$.ingredients[n].scaleX=0.4;
			$.ingredients[n].scaleY=0.5;
			$.icons[n].scaleX=0.12;
			$.icons[n].scaleY=0.2;			
		}
		if(n==18){
			$.ingredients[n].scaleX=0.4;
			$.ingredients[n].scaleY=0.5;
			$.icons[n].scaleX=0.12;
			$.icons[n].scaleY=0.2;			
		}
		if(n==19){
			$.ingredients[n].scaleX=0.4;
			$.ingredients[n].scaleY=0.5;
			$.icons[n].scaleX=0.12;
			$.icons[n].scaleY=0.2;			
		}
		if(n==20){
			$.ingredients[n].scaleX=0.4;
			$.ingredients[n].scaleY=0.5;
			$.icons[n].scaleX=0.12;
			$.icons[n].scaleY=0.2;			
		}
		
		createHitarea($.icons[n]);
		centerReg($.ingredients[n]);

		$.ingredients[n].regY = $.ingredients[n].image.naturalHeight;
		
		$.frames[n].x = iconX;
		$.frames[n].y = iconY;
		iconX += iconSpaceX;
		curCol++;

		if(curCol > 3){
			curCol = 1;
			iconX = iconStartX;
			iconY -= iconSpaceY;
		}
		$.icons[n].x = $.frames[n].x;
		$.icons[n].y = $.frames[n].y;
		gameContainer.addChild($.frames[n], $.icons[n], $.ingredients[n]);
		
		$.ingredients[n].x = 0-$.ingredients[n].image.naturalWidth;
		$.ingredients[n].y = 0-$.ingredients[n].image.naturalHeight;
	}
	
	txtGameTime = new createjs.Text();
	txtGameTime.font = "40px YesevaOne";
	txtGameTime.color = "#ffffff";
	txtGameTime.text = '0 SEC';
	txtGameTime.textAlign = "center";
	txtGameTime.textBaseline='alphabetic';
	
	txtFinish = new createjs.Text();
	txtFinish.font = "40px YesevaOne";
	txtFinish.color = "#ffffff";
	txtFinish.text = '0 SEC';
	txtFinish.textAlign = "center";
	txtFinish.textBaseline='alphabetic';

	txtSandwich = new createjs.Text();
	txtSandwich.font = "100px YesevaOne";
	txtSandwich.color = "#fffcf6";
	txtSandwich.text = 'Sandwich';
	txtSandwich.textAlign = "center";
	txtSandwich.textBaseline='alphabetic';

	txtMaker = new createjs.Text();
	txtMaker.font = "80px YesevaOne";
	txtMaker.color = "#fffcf6";
	txtMaker.text = 'Maker';
	txtMaker.textAlign = "center";
	txtMaker.textBaseline='alphabetic';

	txtGameScore = new createjs.Text();
	txtGameScore.font = "60px YesevaOne";
	txtGameScore.color = "#ffffff";
	txtGameScore.text = '0';
	txtGameScore.textAlign = "center";
	txtGameScore.textBaseline='alphabetic';
	
	txtGameOrder = new createjs.Text();
	txtGameOrder.font = "30px YesevaOne";
	txtGameOrder.color = "#000000";
	txtGameOrder.text = 'ORDER 1';
	txtGameOrder.textAlign = "center";
	txtGameOrder.textBaseline='alphabetic';
	
	txtGameTime.x = txtGameScore.x = txtGameOrder.x = canvasW/100 * 88;
	txtGameScore.y = (canvasH/100*16);
	txtGameTime.y = (canvasH/100*34);
	txtGameOrder.y = (canvasH/100*50);

	txtSandwich.x = canvasW/2;
	txtSandwich.y = canvasH/100 * 30;

	txtMaker.x = canvasW/2;
	txtMaker.y = canvasH/100 * 45;

	txtFinish.x = canvasW/100 * 88;
	txtFinish.y = (canvasH/100*65);

	txtFinish.text = "Finish";

	txtOrder = new createjs.Text();
	txtOrder.font = "20px YesevaOne";
	txtOrder.color = "#ffffff";
	txtOrder.textAlign = "center";
	txtOrder.textBaseline='alphabetic';

	txtOrder.x = canvasW/100*9;
	txtOrder.y = canvasH/100 * 10;

	txtResultScore = new createjs.Text();
	txtResultScore.font = "140px YesevaOne";
	txtResultScore.color = "#ffffff";
	txtResultScore.text = '1000';
	txtResultScore.textAlign = "center";
	txtResultScore.textBaseline='alphabetic';

	txtResultTopScore = new createjs.Text();
	txtResultTopScore.font = "70px YesevaOne";
	txtResultTopScore.color = "#ffffff";
	txtResultTopScore.text = '1000';
	txtResultTopScore.textAlign = "left";
	txtResultTopScore.textBaseline='alphabetic';
	
	btnFacebook = new createjs.Bitmap(loader.getResult('btnFacebook'));
	btnTwitter = new createjs.Bitmap(loader.getResult('btnTwitter'));
	btnWhatsapp = new createjs.Bitmap(loader.getResult('btnWhatsapp'));
	centerReg(btnFacebook);
	createHitarea(btnFacebook);
	centerReg(btnTwitter);
	createHitarea(btnTwitter);
	centerReg(btnWhatsapp);
	createHitarea(btnWhatsapp);
	
	btnFacebook.x = btnTwitter.x = btnWhatsapp.x = canvasW/100 * 80;
	btnFacebook.y = canvasH/100 * 62.5;
	btnTwitter.y = canvasH/100 * 70;
	btnWhatsapp.y = canvasH/100 * 77.5;
	
	txtResultScore.x = canvasW/2;
	txtResultScore.y = canvasH/100 * 42;
	
	txtResultTopScore.x = canvasW/100 * 55;
	txtResultTopScore.y = canvasH/100 * 62.5;
	
	mainBurgerContainer.x = canvasW/2;
	mainBurgerContainer.y = canvasH/100 * 85;
	
	resultBurgerContainer.x = canvasW/2;
	resultBurgerContainer.y = canvasH/100 * 85;


	gameOrderContainer.x = canvasW/100 * 88;
	gameOrderContainer.y = (canvasH/100*55);
	
	gameBurgerContainer.x = canvasW/100 * 53;
	gameBurgerContainer.y = canvasH/100 * 88;
	
	btnMuteOn = new createjs.Bitmap(loader.getResult('btnMuteOn'));
	btnMuteOff = new createjs.Bitmap(loader.getResult('btnMuteOff'));
	centerReg(btnMuteOn);
	createHitarea(btnMuteOn);
	centerReg(btnMuteOff);
	createHitarea(btnMuteOff);
	btnMuteOff.x = btnMuteOn.x = canvasW/100 * 88;
	btnMuteOff.y = btnMuteOn.y = canvasH/100 * 94;
	btnMuteOn.visible=false;
	
	//option
	buttonFullscreen = new createjs.Bitmap(loader.getResult('buttonFullscreen'));
	centerReg(buttonFullscreen);
	buttonSoundOn = new createjs.Bitmap(loader.getResult('buttonSoundOn'));
	centerReg(buttonSoundOn);
	buttonSoundOff = new createjs.Bitmap(loader.getResult('buttonSoundOff'));
	centerReg(buttonSoundOff);
	buttonSoundOn.visible = false;
	buttonExit = new createjs.Bitmap(loader.getResult('buttonExit'));
	centerReg(buttonExit);
	buttonSettings = new createjs.Bitmap(loader.getResult('buttonSettings'));
	centerReg(buttonSettings);
	
	createHitarea(buttonFullscreen);
	createHitarea(buttonSoundOn);
	createHitarea(buttonSoundOff);
	createHitarea(buttonExit);
	createHitarea(buttonSettings);
	optionsContainer.addChild(buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonExit);
	// optionsContainer.addChild(buttonFullscreen, buttonExit);
	optionsContainer.visible = false;
	
	//exit
	itemExit = new createjs.Bitmap(loader.getResult('itemExit'));
	centerReg(itemExit);
	itemExit.x = canvasW/2;
	itemExit.y = canvasH/2;
	
	buttonConfirm = new createjs.Bitmap(loader.getResult('buttonConfirm'));
	centerReg(buttonConfirm);
	buttonConfirm.x = canvasW/100* 37;
	buttonConfirm.y = canvasH/100 * 63;
	
	buttonCancel = new createjs.Bitmap(loader.getResult('buttonCancel'));
	centerReg(buttonCancel);
	buttonCancel.x = canvasW/100 * 63;
	buttonCancel.y = canvasH/100 * 63;
	
	confirmMessageTxt = new createjs.Text();
	confirmMessageTxt.font = "40px Poppins-SemiBold";
	confirmMessageTxt.color = "#fff";
	confirmMessageTxt.textAlign = "center";
	confirmMessageTxt.textBaseline='alphabetic';
	confirmMessageTxt.text = exitMessage;
	confirmMessageTxt.x = canvasW/2;
	confirmMessageTxt.y = canvasH/100 *44;
	
	confirmContainer.addChild(itemExit, buttonConfirm, buttonCancel, confirmMessageTxt);
	confirmContainer.visible = false;
	//mainContainer.addChild( layoutLanding,mainBurgerContainer, btnPlay);
	mainContainer.addChild(bg,txtSandwich,txtMaker, mainBurgerContainer, btnPlay);
	// gameContainer.addChild(layoutGame, layoutGameInstruction, txtGameTime, txtGameScore, txtGameOrder, gameOrderContainer, gameBurgerContainer, btnServe);
	gameContainer.addChild(gameOrderContainer, gameBurgerContainer,btnServe,btnFinish);
	//resultContainer.addChild(layoutResult, txtResultScore, txtResultTopScore, buttonReplay);
	resultContainer.addChild( txtOrder,resultBurgerContainer,buttonReplay);
	if(shareEnable){
		resultContainer.addChild(btnFacebook);
		//resultContainer.addChild(btnFacebook, btnTwitter, btnWhatsapp);
	}
	canvasContainer.addChild( bg_game,mainContainer, gameContainer, resultContainer, confirmContainer, optionsContainer, buttonSettings);
	//canvasContainer.addChild(bg, mainContainer, gameContainer, resultContainer, confirmContainer, optionsContainer, buttonSettings);
	/*if(enableMuteButton){
		canvasContainer.addChild(btnMuteOn, btnMuteOff);
	}*/
	stage.addChild(canvasContainer);
	
	resizeCanvas();
}


/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas(){
 	if(canvasContainer!=undefined){
		buttonSettings.x = (canvasW - offset.x) - 60;
		buttonSettings.y = offset.y + 45;
		
		var distanceNum = 55;
		if(curPage != 'game'){
			buttonExit.visible = false;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+(distanceNum);
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*2);
		}else{
			buttonExit.visible = true;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+(distanceNum);
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*2);
			
			buttonExit.x = buttonSettings.x;
			buttonExit.y = buttonSettings.y+(distanceNum*3);
		}
	}
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */


function centerReg(obj){
	//regX和regY分别指代该位图的x偏移量和y偏移量(左偏移量和上偏移量)
	//也即 registration point
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));	
}