////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
function initPreload(){
	toggleLoader(true);
	
	checkMobileEvent();
	
	$(window).resize(function(){
		resizeGameFunc();
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[{src:'assets/brown.png', id:'background'},
			{src:'assets/background.png', id:'background_game'},
			{src:'assets/layout_game.png', id:'layoutGame'},
			{src:'assets/layout_landing.png', id:'layoutLanding'},
			{src:'assets/layout_result.png', id:'layoutResult'},
			{src:'assets/play_now.png', id:'btnPlay'},
			{src:'assets/button_playagain.png', id:'btnPlayagain'},
			{src:'assets/serve_now.png', id:'btnServe'},
			{src:'assets/icon_frame.png', id:'iconFrame'},

			{src:'assets/ingredient_baguette_top.png', id:'bunTop'},
			{src:'assets/ingredient_baguette_buttom.png', id:'bunBottom'},
			// {src:'assets/ingredient_bun_top.png', id:'bunTop'},
			// {src:'assets/ingredient_bun_bottom.png', id:'bunBottom'},

			{src:'assets/order_mark.png', id:'orderMark'},
			{src:'assets/order_arrow.png', id:'orderIndicator'},
			{src:'assets/layout_instruction.png', id:'layoutInstruction'},
			{src:'assets/button_facebook.png', id:'btnFacebook'},
			{src:'assets/button_twitter.png', id:'btnTwitter'},
			{src:'assets/button_whatsapp.png', id:'btnWhatsapp'},
			{src:'assets/button_mute_on.png', id:'btnMuteOn'},
			{src:'assets/button_mute_off.png', id:'btnMuteOff'},
			{src:'assets/finish.png', id:'btnFinish'},
			{src:'assets/button_confirm.png', id:'buttonConfirm'},
			{src:'assets/button_cancel.png', id:'buttonCancel'},
			{src:'assets/item_exit.png', id:'itemExit'},
			{src:'assets/button_fullscreen.png', id:'buttonFullscreen'},
			{src:'assets/button_sound_on.png', id:'buttonSoundOn'},
			{src:'assets/button_sound_off.png', id:'buttonSoundOff'},
			{src:'assets/button_exit.png', id:'buttonExit'},
			{src:'assets/button_settings.png', id:'buttonSettings'}
			];
			
	for(n=0;n<ingredients_arr.length;n++){
		manifest.push({src:ingredients_arr[n].image, id:ingredients_arr[n].name});
		manifest.push({src:ingredients_arr[n].thumb, id:'icon'+ingredients_arr[n].name});
	}
	
	//sound部分的loader,假如用到的话以后再补充，暂时看来完全用不到了

	// soundOn = true;		
	// if($.browser.mobile || isTablet){
	// 	if(!enableMobileSound){
	// 		soundOn=false;
	// 	}
	// }
	
	// if(soundOn){
	// 	manifest.push({src:'assets/sounds/cashier.ogg', id:'soundCashier'});
	// 	manifest.push({src:'assets/sounds/chalk.ogg', id:'soundChalk'});
	// 	manifest.push({src:'assets/sounds/clock.ogg', id:'soundClock'});
	// 	manifest.push({src:'assets/sounds/fooddrop1.ogg', id:'soundFoodDrop1'});
	// 	manifest.push({src:'assets/sounds/fooddrop2.ogg', id:'soundFoodDrop2'});
	// 	manifest.push({src:'assets/sounds/fooddrop3.ogg', id:'soundFoodDrop3'});
	// 	manifest.push({src:'assets/sounds/gameMusic.ogg', id:'musicGame'});
	// 	manifest.push({src:'assets/sounds/mainMusic.ogg', id:'musicMain'});
	// 	manifest.push({src:'assets/sounds/receipt.ogg', id:'soundReceipt'});
	// 	manifest.push({src:'assets/sounds/ring.ogg', id:'soundRing'});
		
	// 	createjs.Sound.alternateExtensions = ["mp3"];
	// 	loader.installPlugin(createjs.Sound);
	// }
	//向该元素附加事件处理程序,第一个元素为事件类型，第二个元素为事件触发后调用的函数
	loader.addEventListener("complete", handleComplete);
	loader.addEventListener("fileload", fileComplete);
	loader.addEventListener("error",handleFileError);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS FILE COMPLETE EVENT - This is the function that runs to update when file loaded complete
 * 
 */
function fileComplete(evt) {
	var item = evt.item;
	//console.log("Event Callback file loaded ", evt.item.id);
}

/*!
 * 
 * CANVAS FILE HANDLE EVENT - This is the function that runs to handle file error
 * 
 */
function handleFileError(evt) {
	console.log("error ", evt);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader').html(Math.round(loader.progress/1*100)+'%');
	//$('#mainLoader').html('哈哈哈哈哈哈老子终于会了');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 简单的来说就是那个从0-100的加载器，加载完毕之后就让toggleLoader隐身
 * 
 */
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
	}else{
		$('#mainLoader').hide();
	}
}