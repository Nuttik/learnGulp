let Slider = function(gallery){
    this.gallery = document.querySelector(".gallery");
    this.itemList = document.querySelector(".gallery__items-list");
    this.itemWeidth = document.querySelector("img").offsetWidth;
    this.buttonLeft = this.gallery.querySelector(".gallery__button_prev");
    this.buttonRigth = this.gallery.querySelector(".gallery__button_next");    

    this.translation =  -(this.itemWeidth*3 + 30*3);    
    this.itemList.style.transform = "translateX(" + this.translation + "px)"; 
    let ctx = this;

    this.clickOnButtons = function(event){
      ctx.itemList.style.transition = "inherit";

      if(event.target == ctx.buttonLeft || event.target == ctx.buttonRigth){
        if(!event.target.classList.contains("current")){          
          ctx.buttonLeft.classList.toggle("current");
          ctx.buttonRigth.classList.toggle("current");
        }
      } 
      if(event.target == ctx.buttonLeft){ 
        ctx.translation += ctx.itemWeidth+40;
        ctx.itemList.style.transform = "translateX(" + ctx.translation + "px)";    
      }
      else if(event.target == ctx.buttonRigth){        
          ctx.translation -= ctx.itemWeidth+40;
          ctx.itemList.style.transform = "translateX(" + ctx.translation + "px)";
      }
    };

    this.jump = function(event){
      if(ctx.translation <= -(ctx.itemList.offsetWidth-(ctx.itemWeidth*4 + 30*4))){ 
        ctx.itemList.style.transition = "none";
        ctx.translation =  -(ctx.itemWeidth*3 + 30*3);
        ctx.itemList.style.transform = "translateX(" + ctx.translation + "px)";
      }
      if(ctx.translation > -ctx.itemWeidth){
        console.log(ctx.itemList.offsetWidth -(ctx.itemWeidth*3 + 30*3)*2);
        ctx.itemList.style.transition = "none";
        ctx.translation =  -(ctx.itemList.offsetWidth -(ctx.itemWeidth*3 + 30*3)*2);
        ctx.itemList.style.transform = "translateX(" + ctx.translation + "px)";
      }
    };
}

let speakerSlider = new Slider();

speakerSlider.gallery.addEventListener("click",  speakerSlider.clickOnButtons);
speakerSlider.itemList.addEventListener("transitionend", speakerSlider.jump);