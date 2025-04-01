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
});





var video = document.querySelector("#video");
var mycanv = document.querySelector("#mycanv");
conxt = mycanv.getContext("2d");
startVideo();
window.requestAnimationFrame(loopDraw);

function loopDraw(){
    conxt.drawImage(video, 0, 0, 200, 200);
    window.requestAnimationFrame(loopDraw)
}
function startVideo(){
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (err0r) {
                console.log("Something went wrong!");
                console.log(err0r); 
            });
        }
}