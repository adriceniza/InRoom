window.onload = initialize;

function initialize(){

  document.querySelector("#speaker-button").addEventListener("click", toggleSound);
}



function toggleSound(event){
  
  var image360 = document.querySelector("#image-360");
  var speakerImg = document.querySelector("#speaker-img");

  var sounding = image360.getAttribute("sounding");
  
  if(sounding == "true"){
    image360.setAttribute("sounding", false);
    speakerImg.src = "img/sound-off.png";
    image360.components.sound.stopSound();
  } else {
    image360.setAttribute("sounding", true);
    speakerImg.src = "img/sound-on.png";
    image360.components.sound.playSound();
  }
}