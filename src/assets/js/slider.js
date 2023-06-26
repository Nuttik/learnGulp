let Slider = function(gallery){
    this.gallery = document.querySelector(".gallery");
    this.itemList = document.querySelector(".gallery__items-list");
    this.buttonLeft = this.gallery.querySelector(".gallery__button_prev");
    this.buttonRigth = this.gallery.querySelector(".gallery__button_next");    
    
    let ctx = this;

    this.clickOnButtons = function(event){
      if(event.target == ctx.buttonLeft || event.target == ctx.buttonRigth){
        if(!event.target.classList.contains("current")){          
          ctx.buttonLeft.classList.toggle("current");
          ctx.buttonRigth.classList.toggle("current");
        }
      } 
      if(event.target == ctx.buttonLeft){ 
        let array = document.querySelectorAll(".gallery__item");
        ctx.itemList.append(array[0]);
      }
      else if(event.target == ctx.buttonRigth){
        let array = document.querySelectorAll(".gallery__item");
        ctx.itemList.prepend(array[array.length - 1]);
      }
    };
}

let speakerSlider = new Slider();

speakerSlider.gallery.addEventListener("click",  speakerSlider.clickOnButtons);