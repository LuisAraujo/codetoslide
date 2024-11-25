//list of files
myFiles = [];
//list of slides in json
var current_slide = -1;
var content_slides = [];

/* INTERFACE ELEMENTS */
var codeslide = document.getElementById("codeslide");
var interfaceLoadfile = document.getElementById("interface-loadfile");
var slide = null;
var nav = document.getElementById("nav");
var overground = document.getElementById("overground");
var textOver = document.getElementById("text-over");

//buttons
var btnPrint = document.getElementById("btn-print-slide");
var btnBackPrint  = document.getElementById("btn-back-print"); 
var btnBackSlide = document.getElementById("btn-back-slide");
var btnNextSlide = document.getElementById("btn-next-slide");
var btnSaveColor = document.getElementById("btn-save-color");
var navsetting = document.getElementById("navsetting");
var btnOpenNav = document.getElementById("btn-open-nav");
var btnCreateSlide = document.getElementById("btn-create-slide");
var modalcode = document.getElementById("modal-code");
var btnRemoveBG = document.getElementById("btn-remove-bg");
var btnPrintSlide = document.getElementById("btn-print-slide");

//color setting
var colorTitle = "#000000";
var colorBg = "#ffffff";
var colorBgDesc = "#aaeeff";
var colorBgFile =  "#55aa55";
var colorFont = "#000000";
var colorFontFile = "#000000";

//input color settings
inpcolortitile = document.getElementById("inp-colortitle");
inpcolorbg = document.getElementById("inp-colorbg");
inpcolorbgdesc = document.getElementById("inp-colorbgdesc");
inpcolorbgfile = document.getElementById("inp-colorbgfile");
inpcolorfont = document.getElementById("inp-colorfont");
inpcolorfontfile = document.getElementById("inp-colorfontfile");

var page = -1;

getSettings();

/* BUTTONS EVENTS*/
btnCreateSlide.addEventListener("click", function() {
    console.log(myFiles);
    var page = -1;
    myFiles.forEach(function(file) {
        readFile(file);
    });
});

btnBackSlide.addEventListener("click", function() {
    backSlide();
});
btnNextSlide.addEventListener("click", function() {
    nextSlide();
});

btnPrint.addEventListener("click", function() {
    printSlide();
    showOvergound();
});

btnBackPrint.addEventListener("click", function() {
    hideOvergound();
    resizeSildes();
});

btnSaveColor.addEventListener("click", function() {
    navsetting.style.display = "none";
    saveColor();
    applyColors();
    saveSettings();
});

btnOpenNav.addEventListener("click", function() {
    navsetting.style.display="block";
});

modalcode.addEventListener("dblclick", function(e){
    hideCodeModal();
});

btnRemoveBG.addEventListener("click", function() {
    removeImageBg();
})    

 /* READ FILE */
function readFile(file){

    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
       parseText(file.name, evt.target.result);
    }
    reader.onerror = function (evt) {
        console.log( "error reading file");
    }
}


function btnRemoveBG(){

}

function dataFileDnD() {
    return {
        files: [],
        fileDragging: null,
        fileDropping: null,
        humanFileSize(size) {
            const i = Math.floor(Math.log(size) / Math.log(1024));
            return (
                (size / Math.pow(1024, i)).toFixed(2) * 1 +
                " " +
                ["B", "kB", "MB", "GB", "TB"][i]
            );
        },
        remove(index) {
            let files = [...this.files];
            files.splice(index, 1);
            myFiles.splice(index, 1);

            this.files = createFileList(files);
            console.log(this.files)
        },
        drop(e) {
            let removed, add;
            let files = [...this.files];

            removed = files.splice(this.fileDragging, 1);
            files.splice(this.fileDropping, 0, ...removed);
            myFiles.splice(this.fileDropping, 0, ...removed);

            this.files = createFileList(files);
            this.fileDropping = null;
            this.fileDragging = null;
        },
        dragenter(e) {
            let targetElem = e.target.closest("[draggable]");

            this.fileDropping = targetElem.getAttribute("data-index");
        },
        dragstart(e) {
            this.fileDragging = e.target
                .closest("[draggable]")
                .getAttribute("data-index");
            e.dataTransfer.effectAllowed = "move";
        },
        loadFile(file) {
            console.log(file)
            const preview = document.querySelectorAll(".preview");
            const blobUrl = URL.createObjectURL(file);

            preview.forEach(elem => {
                elem.onload = () => {
                    URL.revokeObjectURL(elem.src); // free memory
                };
            });

            return blobUrl;
        },
        addFiles(e) {
            console.log(e.target.files)
            files_val = []
            for(let i = 0; i  < e.target.files.length; i++){
                console.log(e.target.files[i].type)
                if( (e.target.files[i].name.includes('.txt') || e.target.files[i].name.includes('.py') || e.target.files[i].name.includes('.java') || e.target.files[i].name.includes('.js') ) ){
                files_val.push(e.target.files[i]);
                myFiles.push(e.target.files[i])
                }
            }

        if(files_val.length != 0){
            const files = createFileList([...this.files], [...files_val]);
            this.files = files;
            console.log(this.files[0].text())
        }
        }
    };
}

/* parse text form file code */
function parseText(namefile, text){
    var arr = text.split('\n');
    var mode = "";
    arr.forEach(element => {
        isLine = false;
        if((namefile.split(".")[1] == "py") || (namefile.split(".")[1] == "txt")){
            if((element[0] == "#") && (element[1] == "#")) 
                isLine = true;
        }else{
            console.log(element);
            if((element[0] == "/") && (element[1] == "/") && (element[2] == "#") && (element[3] == "#")){ 
                element = element.substring(2);
                isLine = true;
            }
        }
           
        if(isLine) {
            console.log(element.substring(2));
            line = JSON.parse(element.substring(2));
            if( parseInt(line.number) >= 0){
                mode = "accept";
            }else{
                mode = "ignore";
            }

            if(mode == "accept"){
                page++;
                line.code = "";
                content_slides.push([namefile, line]);
            }

        }else{
            if(mode == "accept"){
                content_slides[page][1].code += element+"\n";
            }
        }
    });

    content_slides.sort(function(a,b){
        if(parseInt(a[1].number) < parseInt(b[1].number)){
            return -1;
        }else{
            return 1;
        }
    });

    showSlide (content_slides);
}

/* SHOWING SLIDES */
function showSlide(content_slides){
    interfaceLoadfile.style.display = "none";
    btnPrintSlide.classList.remove("hidden");

    var html = '<div id="slide-0" class="slide cover"><div class="flex lg:flex-1"><a href="#" class="-m-1.5 p-1.5"><span class="sr-only">Code to Slide</span><img class="h-10 w-auto opacity-70" src="screens/logo.png" alt=""></a></div>';
    var institute = document.getElementById("nameinstitute").value;
    var course =document.getElementById("namecourse").value;
    var author =document.getElementById("nameauthor").value;
    var title = document.getElementById("maintitle").value;
    document.title = title;

    html += '<div class="institute">'+institute+'</div>';
    html += '<div class="maintitle">'+title+'</div>';
    html += '<div class="author">'+author+'</div>';
    html += '<div class="course">'+course+'</div></div>';
    codeslide.innerHTML = html;

    content_slides.forEach(function(element, index) {
        html = '<div id="slide-'+(index+1)+'"  class="slide"><div class="number-page">'+(index+1)+'</div>';    
        html += '<div class="title">'+element[1].title+'</div>';
        if((element[1].description != undefined) && (element[1].description.trim()!= ""))
            html += '<div class="description">'+element[1].description+'</div>';

        if((element[1].code != undefined) && (element[1].code.trim()!= "")){
            //TODO: verificar language-py class
            html+= '<div class="container code"><pre><code class="language-py">'+element[1].code+'</code></pre></div>';
            html+= '<div class="file"> <i class="fa fa-file"></i> '+element[0]+'</div>';
        }


        if ((element[1].image != undefined) && (element[1].image.trim())!= "")
            html += '<img class="image" src="'+element[1].image+'" />';

        html+= '</div>';
        codeslide.innerHTML =  codeslide.innerHTML+html;
    });

    slide = document.getElementById("slide-0");
    hljs.highlightAll();
    btnBackSlide.style.display = "block";
    btnNextSlide.style.display = "block";
    var code = document.getElementsByClassName("code");
    code.forEach(function(elem){
        elem.addEventListener("dblclick", showCodeModal);
    });
    loadImageBG(function(e){
        document.getElementById("slide-0").style.backgroundImage = "url("+e+")";
    });
    applyColors();
}


function showCodeModal(e){
    console.log(e);
    modalcode.style.display = "block";
    modalcode.innerHTML = "<pre>"+e.target.innerHTML+"</pre>";
    
}

function hideCodeModal(e){
    console.log("out",e)
   modalcode.style.display = "none";
}

/* CONTROLING SLIDE */


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
   
}

function backSlide(){
    if(current_slide >= 0)
        current_slide--;
    window.scrollTo(0, getHeithNav() + getHeithSlide()*current_slide);
}

/* PRINT SLIDE */
function resizeSildes(){
    var slides = document.getElementsByClassName("slide");
    slides.forEach(function(slide){
        slide.style.height = "calc(100% - 2px)";
        slide.style.width = "calc(100% - 2px)";
    })
}

function printSlide(){
    var slides = document.getElementsByClassName("slide");
   
    slides.forEach(function(slide){
        slide.style.height = 794 + "px";
        slide.style.width = 1114 + "px";
    });

    slides[0].style.height = 792 + "px";
    slides[0].style.width = 1114 + "px";
 
    //window.print();
    var element = document.getElementById('codeslide');
    var opt = {
        margin:       0,
        filename:     document.title+'.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 1 },
        jsPDF:        { unit: 'in', format: 'A4', orientation: 'landscape' },
        pdfCallback: resizeSildes
    };
        // New Promise-based usage:
        html2pdf().set(opt).from(element).save();

      // html2pdf(element);
}


function showOvergound(){
    overground.style.display = "block";
    textOver.style.display = "block";
}

function hideOvergound(){
    overground.style.display = "none";
    textOver.style.display = "none";
}

/* SETTING */
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


const imageInput = document.getElementById('imageInput');
const previewDiv = document.getElementById('preview');
const saveButton = document.getElementById('saveButton');

// Carregar imagem do localStorage ao iniciar
window.onload = function() {
    loadImageBG(showPreview);
}

function loadImageBG(callback){
    const savedImage = localStorage.getItem('savedImage');
  //if (savedImage) {
    callback(savedImage);
 // }

}
// Mostrar preview da imagem carregada
imageInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      showPreview(e.target.result);
      saveImageBg() ;
    }
    reader.readAsDataURL(file);
  }
});

// Mostrar a imagem na div de preview
function showPreview(src) {
  previewDiv.innerHTML = `<img src="${src}" class="object-cover w-full h-full">`;
}

// Salvar a imagem no localStorage
function saveImageBg() {
  const imgElement = previewDiv.querySelector('img');
  if (imgElement) {
    localStorage.setItem('savedImage', imgElement.src);
  } 
};


// Salvar a imagem no localStorage
function removeImageBg() {
    localStorage.removeItem('savedImage');
    loadImageBG(showPreview);
};