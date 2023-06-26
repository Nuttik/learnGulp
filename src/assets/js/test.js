let Slider = function(gallery){
    this.gallery = document.querySelector(".gallery");
    this.container = document.querySelector(".speakers__container");
    this.wrapper = document.querySelector(".gallery__wrapper");
    this.itemList = document.querySelector(".gallery__items-list");
    this.items = document.querySelectorAll(".gallery__item");
    this.itemSize = this.items[0].offsetWidth;
    this.buttonLeft = this.gallery.querySelector(".gallery__button_prev");
    this.buttonRigth = this.gallery.querySelector(".gallery__button_next");
    this.currentDirection = "right";
    this.countImg = 3;
    
    this.positionGallery = function(){
      let imgWidth = +getComputedStyle(this.gallery.querySelector(".gallery__item")).width.slice(0,-2); 
      let sliderWidht = imgWidth * this.countImg + (+getComputedStyle(this.gallery.querySelector(".gallery__item")).marginRight.slice(0,-2) * (this.countImg-1));
      this.gallery.style.width = sliderWidht + "px";
      if(screen.width > 980){
        this.gallery.style.marginLeft = -(sliderWidht - this.container.clientWidth/1.8) + "px";
      }
    };

    let ctx = this;

    this.clickOnButtons = function(event){
      if(event.target == ctx.buttonLeft || event.target == ctx.buttonRigth){
        if(!event.target.classList.contains("current")){          
          ctx.buttonLeft.classList.toggle("current");
          ctx.buttonRigth.classList.toggle("current");
        }
      } 
      if(event.target == ctx.buttonLeft){
        ctx.currentDirection = "left";
        console.log(ctx.currentDirection);
      }
      else if(event.target == ctx.buttonRigth){
        ctx.currentDirection = "right";
        console.log(ctx.currentDirection);
      }
      ctx.sliderRotation();
    };
    
    this.sliderRotation = function(){
      let left = +getComputedStyle(ctx.itemList).marginLeft.slice(0,-2);
      if(ctx.currentDirection == "left"){
        if(left<0){
          ctx.itemList.style.marginLeft = left + ctx.itemSize + 40 + "px";
        }          
      }       
      if(ctx.currentDirection == "right"){
        if(-left < ctx.itemList.offsetWidth - ctx.wrapper.offsetWidth){
          ctx.itemList.style.marginLeft = left - ctx.itemSize - 40 + "px";
        }
      }
      
      console.log(ctx.itemList.offsetWidth - ctx.wrapper.offsetWidth)
    }

  }
  let speakerSlider = new Slider();

  speakerSlider.positionGallery();

  speakerSlider.gallery.addEventListener("click",  speakerSlider.clickOnButtons);