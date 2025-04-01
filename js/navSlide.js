

function getHeithSlide(){
    return slide.offsetHeight;
 }
 
 function getHeithNav(){
     return nav.offsetHeight;
}

function nextSlide(){
    //todo if total slides
    current_slide++;
    window.scrollTo(0, getHeithNav() + getHeithSlide()*current_slide);
    apresentationMode();
}

function backSlide(){
    if(current_slide >= 0)
        current_slide--;
    window.scrollTo(0, getHeithNav() + getHeithSlide()*current_slide);
    apresentationMode()
}

function apresentationMode(){
    mycanv.style.display = "block";
}