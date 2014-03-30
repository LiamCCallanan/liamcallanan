
window.onload = load;

function load() {
   var div = document.getElementsByClassName('seek');
   var play = document.getElementsByClassName('play');
   var audio = document.getElementsByTagName('audio');
   
   $(".seek").on("click" , function(e) {
      //div.innerHTML = e.offsetX / (parseFloat(div.style.width) + 2*parseFloat(div.style.border)) * audio.duration;
      //debugger;
      var audioElt = document.getElementById(this.id.split("_")[0]);
     	audioElt.currentTime =  e.offsetX / (parseFloat($(this).css('border-left')) + parseFloat($(this).css('border-right'))) * audioElt.duration;
   });
   
   $(".play").on("click" , function(e){
      var audioElt = document.getElementById(this.id.split("_")[0]);
     	if($(this).css('background-position') == '100% 50%'){
  		audioElt.play();
  		$(this).css('background-position','left');
     	}
     	else{
     		audioElt.pause();
     		$(this).css('background-position','right');
     	}
   });
  

  $(".reload").on("click" , function(e){

      var audioElt = document.getElementById(this.id.split("_")[0]);
      var play = document.getElementById(audioElt.id + "_play");
      audioElt.currentTime = 0;
      audioElt.pause();
      $(play).css('background-position','right');

  });


  $("audio").on("timeupdate" , function(e){


    var seek = document.getElementById(this.id + "_seek");
    var leftBorder = Math.round(470*this.currentTime/this.duration);
      $(seek).css('border-left', leftBorder + 'px solid #EA2160');
      $(seek).css('border-right', 470-leftBorder + 'px solid #333333');

    if(parseFloat($(seek).css('border-left')) == 470){

        console.log('hi');
        var play = document.getElementById(this.id + "_play");
        $(play).css('background-position','right');

    }

  });


  //function(e){
  	      //console.log(parseFloat($(this).css('border-right')));

   	   //$(this).css('border-left', 470*audioElt.currentTime/audioElt.duration + 'px solid #EA2160');
  		//$(this).css('border-right', 470 - 470*audioElt.currentTime/audioElt.duration + 'px solid #333333');
  //}
}
