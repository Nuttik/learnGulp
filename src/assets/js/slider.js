let Slider = function(gallery){
    this.gallery = document.querySelector(".gallery");
    this.itemList = document.querySelector(".gallery__items-list");
    this.itemWeidth = document.querySelector("img").offsetWidth;
    this.buttonLeft = this.gallery.querySelector(".gallery__button_prev");
    this.buttonRigth = this.gallery.querySelector(".gallery__button_next");    
    let ctx = this;
    this.itemList.classList.toggle("animation-right"); 

    this.clickOnButtons = function(event){

      if(event.target == ctx.buttonLeft || event.target == ctx.buttonRigth){
        if(!event.target.classList.contains("current")){          
          ctx.buttonLeft.classList.toggle("current");
          ctx.buttonRigth.classList.toggle("current");
        }
      } 
      if(event.target == ctx.buttonLeft){ 
        ctx.itemList.classList.toggle("animation-left");
        ctx.itemList.classList.toggle("animation-right"); 
      }
      else if(event.target == ctx.buttonRigth){   
        ctx.itemList.classList.toggle("animation-right"); 
        ctx.itemList.classList.toggle("animation-left"); 
      }
    };

    this.jump = function(event){
      console.log("Закончилась");
      if(ctx.itemList.classList.contains("animation-right")){ 
        console.log("Конец"); 
        ctx.itemList.classList.toggle("animation-right");    
      }
      if(ctx.itemList.classList.contains("animation-left")){
        console.log("Начало");
        ctx.itemList.style.transition = "none";
        ctx.translation =  -(ctx.itemList.offsetWidth -(ctx.itemWeidth*3 + 30*3)*2);
        ctx.itemList.style.transform = "translateX(" + ctx.translation + "px)";
      }
    };


}

let speakerSlider = new Slider();

speakerSlider.gallery.addEventListener("click",  speakerSlider.clickOnButtons);
speakerSlider.itemList.addEventListener("transitionend", speakerSlider.jump);