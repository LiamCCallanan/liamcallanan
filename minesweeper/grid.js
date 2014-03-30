$(function () {
	"use strict";
	var blockSize = parseInt(window.innerWidth/(33));//console.log(blockSize);
	var gridHeight = 16;
	var gridWidth = 30;
	var newGrid = Grid(gridHeight,gridWidth);
	var firstClick = true;
	var gameDone = false;
	var gameWin = false;
	var numMines = 99;
	var numFlags = numMines;
	var numSpaces = gridWidth*gridHeight;
	var mineColors = new Array(10);
		mineColors[-1] = "red";
		mineColors[0] = "black";
		mineColors[1] = "#00aeff";
		mineColors[2] = "#228B22";
		mineColors[3] = "#FFD700";
		mineColors[4] = "#B8860B";
		mineColors[5] = "#FF1493";
		mineColors[6] = "#00BFFF";
		mineColors[7] = "#5300CF";
		mineColors[8] = "#696969";

	$('div').css({
		'font-size': (blockSize/2)+'px',
		'line-height': (blockSize*1.05)+'px',
	});

	$('button').css({
		'font-size': (blockSize/2.5)+'px',
		'line-height': (blockSize)+'px',
	});

	$('#buttonContainer').css({
		'width' : blockSize*gridWidth + 'px',
		'height' : blockSize*gridHeight + 'px',
	});
	$('#Smiley').css({
		'background': 'url(./status.png)',
		'background-position': 'bottom left',
				'width' : blockSize + 'px',
		'height' : blockSize + 'px',
		'background-size': '200% 200%'
	});

	//$('body').css('zoom',(100*window.innerWidth/1280) + "%");

	//zoom = zoom.substring(zoom.length()-2);
	//console.log(zoom);
	$('#toplevel').css({
		'width' : blockSize*(gridWidth+2) + 'px',
		'height' : blockSize + 'px',
		'vertical-align' : 'top'
	});
	$('#MainBoard').css({
		'width' : blockSize*(gridWidth+1) + 'px',
		'height' : blockSize*(gridHeight+1) + 'px',
		'padding-left' : blockSize + 'px',
		'background-size': '3.125% 6.25%',
		'vertical-align' : 'top'
	});
	$('#buttonBackground').css({
		'width' : blockSize*gridWidth + 'px',
		'height' : blockSize*gridHeight + 'px',
		'vertical-align' : 'top'
	});
	$('#visual').css({
		'width' : blockSize*gridWidth + 'px',
		'height' : blockSize*gridHeight + 'px',
		'background-size': (10/3)+ '% 6.25%',
		'vertical-align' : 'top'
	});
	$('#MinesLeft').css({
		'width' : blockSize + 'px',
		'height' : blockSize + 'px',
	});
	$('#timer').css({
		'width' : blockSize + 'px',
		'height' : blockSize + 'px',
	});
	$('#minesLogo').css({
		'width' : blockSize + 'px',
		'height' : blockSize + 'px',
	});
	$('#timerLogo').css({
		'width' : blockSize + 'px',
		'height' : blockSize + 'px',
	});
	$('#smileyArea').css({
		'width' : blockSize*32 + 'px',
		'height' : blockSize + 'px',
	});
	//$('body').css('zoom','200%');

	
	function Grid(h , w){
		var buttonArray = [],
		container = $('#buttonContainer');
			for (var a = 0; a < h; a++) {
				height(a);
			}
		function height(y) {
			buttonArray[y] = [];
			for (var b = 0; b < w; b++) {
				width(y,b);
			}
		}
		function width(y,x) {
			buttonArray[y][x] = {
				'button' : $(document.createElement("button")),
				'adjMines' : 0,
				'adjFlags' : 0,
				'opened' : false,
				'flagged' : false
			}
			buttonArray[y][x].button.addClass("button");
			//$(buttonArray[y][x].button).html('&nbsp;');
			container.append(buttonArray[y][x].button);
			buttonArray[y][x].button.css({
				'border': '0px solid buttonface',
				'border-color': '#aaaaaa',
				'background-color': '#888888',
				'width' : (blockSize) + 'px',
				'height' : (blockSize) + 'px',
				'vertical-align' : 'top',
	 			'background': 'url(./square.png)',
	 			'background-size': '200% 200%',
	 			'background-position': 'top left'

			});

			function autoclick(AlocY,AlocX){
				for (var i = -1; i <= 1; i++) {
					for (var j = -1; j <= 1; j++) {
						try{
							if(!buttonArray[AlocY+i][AlocX+j].opened && !buttonArray[AlocY+i][AlocX+j].flagged){
								open((AlocY+i),(AlocX+j));
							}
						}
						catch(err){

						}
					}
				}
			}

			function setMines(SafeY, SafeX){
				var placed;
				var unSafeX;
				var unSafeY;
				for (var numM = 0; numM <numMines; numM++) {
					placed = false;
					do{

						unSafeX = Math.round(Math.random()*(w-1));
						unSafeY = Math.round(Math.random()*(h-1));

						if(((unSafeX>SafeX+1 || unSafeX<SafeX-1) || (unSafeY>SafeY+1 || unSafeY<SafeY-1)) && buttonArray[unSafeY][unSafeX].adjMines != -1){
							buttonArray[unSafeY][unSafeX].adjMines = -1;
							placed = true;
						}
					}while(!placed);
				}

			}

			function showLose(){
				gameDone = true;
				var random = Math.round(Math.random()*(3)+1);
				playSound('explode' + random + '.mp3');
				for (var gLocX = 0; gLocX < w; gLocX++) {
					for (var gLocY = 0; gLocY < h; gLocY++) {

						if(buttonArray[gLocY][gLocX].adjMines==-1 && !buttonArray[gLocY][gLocX].flagged){
							open(gLocY,gLocX);
						}
						else if(buttonArray[gLocY][gLocX].adjMines!=-1 && buttonArray[gLocY][gLocX].flagged){
							buttonArray[gLocY][gLocX].button.css({
					  			'background-position': 'bottom left'
		    				});
						}
					}
				}
			}


 			function playSound(soundfile) {

 					document.getElementById("Smiley").innerHTML=
					"<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
 			}


			function findAdjMines(){

				for (var gLocX = 0; gLocX < w; gLocX++) {
					for (var gLocY = 0; gLocY < h; gLocY++) {
						if(buttonArray[gLocY][gLocX].adjMines!=-1){
							for (var i = -1; i <= 1; i++) {
								for (var j = -1; j <= 1; j++) {
									try{
										if(buttonArray[gLocY+i][gLocX+j].adjMines==-1 && !(i==0 & j==0)){
											buttonArray[gLocY][gLocX].adjMines+=1;
										}
									}
									catch(err){

									}
								}
							}
						}

					}
				}
			}


			function findAdjFlags(gLocY,gLocX){
				buttonArray[gLocY][gLocX].adjFlags=0;
				for (var i = -1; i <= 1; i++) {
					for (var j = -1; j <= 1; j++) {
						try{
							if(buttonArray[gLocY+i][gLocX+j].flagged && !(i==0 & j==0)){
								buttonArray[gLocY][gLocX].adjFlags+=1;
							}
						}
						catch(err){

						}
					}
				}
			}


			function flag(locY,locX){
				if(!buttonArray[locY][locX].opened){
					buttonArray[locY][locX].flagged = !buttonArray[locY][locX].flagged;
					if(!buttonArray[locY][locX].flagged){
						if(numFlags<numMines){
	 						buttonArray[locY][locX].button.css({
	 							'background-position': 'top left'
	 						});
	 						numFlags+=1;
	 					}
					}
	 				else{
	 					if(numFlags>0){
	 						buttonArray[locY][locX].button.css({
	 							'background-position': 'top right'
	 						});
	 						numFlags-=1;
	 					}
						else{
							buttonArray[locY][locX].flagged = !buttonArray[locY][locX].flagged;
						}
	 				}
					$("#MinesLeft").text(numFlags);
	 			}
			}


			function open(locY,locX){
				if(firstClick){
					CreateTimer('timer', 1000)
					firstClick = false;
					setMines(locY,locX);
					findAdjMines();
				}

				if (!buttonArray[locY][locX].opened && buttonArray[locY][locX].adjMines != -1){
					numSpaces-=1;
					if(numSpaces == numMines){
						gameDone= true;
						gameWin = true;
					}
				}
				buttonArray[locY][locX].opened = true;

		  		
		  		buttonArray[locY][locX].button.css('border-color', '#000000');

		  		if(buttonArray[locY][locX].adjMines != -1){
		  			buttonArray[locY][locX].button.css({
		  			'background' : 'rgba(0,0,0,0)',
		    		'background-color': 'rgba(0,0,0,0)',
		    		'color': mineColors[buttonArray[locY][locX].adjMines],
		    		'border': '0px solid buttonface',
					'opacity': '1'
		    	});
			   		buttonArray[locY][locX].button.text(buttonArray[locY][locX].adjMines);
			   	}
			   	else{
			   		//console.log("dingus");
			   		buttonArray[locY][locX].button.css({

			  			'background-position': 'bottom right'
		    		});
			   	}

		  		if(buttonArray[locY][locX].adjMines==0){
					buttonArray[locY][locX].button.html('&nbsp');
		  			autoclick(locY,locX);
		 		}

			    if(buttonArray[locY][locX].adjMines == -1 && !gameDone){

	  				$('#Smiley').css({
						'background-position': 'top left',
					});	
					showLose();
				}

				else if(gameWin){
	  				$('#Smiley').css({
						'background-position': 'top right',
					});	
					gameWin = false;
				}


			}
			
			
			var Timer;
			var TotalSeconds;
			function CreateTimer(TimerID, Time) {
				Timer = document.getElementById(TimerID);
				TotalSeconds = Time;
				UpdateTimer()
				window.setTimeout(Tick(), 1000);
			}
			function Tick() {
				if (TotalSeconds <= 0 || gameDone) {
					return;
				}

				TotalSeconds -= 1;
				UpdateTimer()
				window.setTimeout(Tick, 1000);
			}
			function UpdateTimer() {
				Timer.innerHTML = "        " + (999 - TotalSeconds);
			}

			

		  	buttonArray[y][x].button.on("mousedown",function(){
		  		if(!gameDone){
		  				$('#Smiley').css({
							'background-position': 'bottom right',
						});
		 		}
		  	});
		  	buttonArray[y][x].button.on("click",function(){
		 		if(!gameDone && !buttonArray[y][x].flagged && !buttonArray[y][x].opened){
		 			open(y,x);
		 		}
		 		else if(!gameDone && buttonArray[y][x].opened){
		 			findAdjFlags(y,x);
					if(buttonArray[y][x].adjMines == buttonArray[y][x].adjFlags){
						autoclick(y, x);
					}
		 		}
		  	});
		  	buttonArray[y][x].button.on("mouseup",function(){
		  		if(!gameDone){
		  				$('#Smiley').css({
							'background-position': 'bottom left',
						});
		 		}
		  	});
		 	buttonArray[y][x].button.on("contextmenu",function(){
		 		if(!gameDone){
		 			flag(y,x);
		 		}
		 		return false;
		  	});


		}
	}
});