AFRAME.registerComponent('change-site', {
  schema: {
    img: {
      default: "", type: "string"
    },
    sound: {
      default: "", type: "string"
    },
    zone: {
      default: "", type: "string"
    }
  },

  init: function () {
    var data = this.data;
    var el = this.el;

    el.addEventListener("mouseenter", function () {

      var parentEntity = el.parentNode;
      var grandParentEntity = parentEntity.parentNode;

      var thisAPlane = parentEntity.querySelector("a-plane");
      thisAPlane.classList.remove("clickable")




      var allAPlane = grandParentEntity.querySelectorAll("a-plane");
      Object.keys(allAPlane).forEach(function (key) {
        if (allAPlane[key] != thisAPlane) {
          allAPlane[key].classList.add("clickable");
        }
      });


      var allABox = grandParentEntity.querySelectorAll("a-box");
      Object.keys(allABox).forEach(function (key) {
        allABox[key].setAttribute("visible", "false");

      });



      var parentEntityABox = parentEntity.querySelector("a-box");
      parentEntityABox.setAttribute("visible", "true");

      var allAText = grandParentEntity.querySelectorAll("a-text");
      Object.keys(allAText).forEach(function (key) {
        allAText[key].setAttribute("color", "#grey")
      });
      var aText = thisAPlane.querySelector("a-text");
      if (aText) aText.setAttribute("color", "white");

      


      var mySky = document.querySelector("#my-sky");
      mySky.setAttribute("src", data.img);

      var image360okey = document.getElementById('image-360');
      var palacetethumb = document.getElementById('palacete-thumb');

      if(image360okey.src('#santelmo')){
        palacetethumb.classList.toggle('hidden')
      }
      
    });


  






  }

});