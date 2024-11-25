function applyColors(){

    var title =   document.getElementsByClassName("title");
    title.forEach(function(el){
        el.style.color = colorTitle;
    });
    var slide =  document.getElementsByClassName("slide");
    slide.forEach(function(el){
        el.style.color = colorFont;
        el.style.backgroundColor = colorBg;
    });
    var description =   document.getElementsByClassName("description");
    description.forEach(function(el){
        el.style.backgroundColor = colorBgDesc;
    });
    var file =   document.getElementsByClassName("file");
    file.forEach(function(el){
        el.style.backgroundColor =  colorBgFile;
        el.style.color =  colorFontFile;
    });
}


 // Função para atualizar a prévia da cor
 function updatePreview(inputId, previewId) {
    console.log(document.getElementById(inputId).value);
    const colorInput = document.getElementById(inputId);
    const colorPreview = document.getElementById(previewId);
    colorPreview.style.backgroundColor = colorInput.value;
    
}

// Função para acionar o input de cor ao clicar na div de prévia
function triggerInput(inputId) {
    document.getElementById(inputId).click();
}

/* SAVE DATA */
function saveColor(){
    colorTitle = inpcolortitile.value;
    colorBg = inpcolorbg.value;
    colorBgDesc = inpcolorbgdesc.value;
    colorBgFile =  inpcolorbgfile.value;
    colorFont = inpcolorfont.value;
    colorFontFile = inpcolorfontfile.value;
}

/* saving settings in localstore*/
function saveSettings(){
    if (typeof(Storage) !== "undefined") {
         localStorage.setItem("colorTitle", colorTitle);
         localStorage.setItem("colorBg", colorBg);
         localStorage.setItem("colorBgDesc", colorBgDesc);
         localStorage.setItem("colorBgFile", colorBgFile);
         localStorage.setItem("colorFont", colorFont);
         localStorage.setItem("colorFontFile", colorFontFile);
      } else {
         console.log("Sorry! No Web Storage support.");
      }
}
/* getting settings saved in localstore*/
function getSettings(){

    if (typeof(Storage) !== "undefined") {
        if(localStorage.getItem("colorTitle") != null) 
            colorTitle= localStorage.getItem("colorTitle");

        if(localStorage.getItem("colorBg") != null)  
            colorBg= localStorage.getItem("colorBg");

        if(localStorage.getItem("colorBgDesc") != null)
            colorBgDesc= localStorage.getItem("colorBgDesc");

        if(localStorage.getItem("colorBgFile") != null)
            colorBgFile= localStorage.getItem("colorBgFile");
        if(localStorage.getItem("colorFont") != null)
            colorFont= localStorage.getItem("colorFont");

        if(localStorage.getItem("colorFontFile") != null)
            colorFontFile= localStorage.getItem("colorFontFile");
    }else
         console.log("Sorry! No Web Storage support.");

    //insert color 
    inpcolortitile.value = colorTitle;
    inpcolortitile.dispatchEvent(new Event('change'));
    inpcolorbg.value = colorBg;
    inpcolorbg.dispatchEvent(new Event('change'));
    inpcolorbgdesc.value = colorBgDesc;
    inpcolorbgdesc.dispatchEvent(new Event('change'));
    inpcolorbgfile.value = colorBgFile;
    inpcolorbgfile.dispatchEvent(new Event('change'));
    inpcolorfont.value = colorFont;
    inpcolorfont.dispatchEvent(new Event('change'));
    inpcolorfontfile.value = colorFontFile;
    inpcolorfontfile.dispatchEvent(new Event('change'));

}
