
myFiles = [];
arrSlides = [];
btnCreateSlide = document.getElementById("btn-create-slide");
btnCreateSlide.addEventListener("click", function() {
    console.log(myFiles);
    readFile(myFiles[0])
});
var currentSlide = -1;
var codeslide = document.getElementById("codeslide");
var interfaceLoadfile = document.getElementById("interface-loadfile");
var slide = null;//document.getElementById("slide-0");
var nav = document.getElementById("nav");
var btnPrint = document.getElementById("btn-print-slide");
var overground = document.getElementById("overground");
var textOver = document.getElementById("text-over");
var btnBackPrint  = document.getElementById("btn-back-print"); 
btnBackSlide = document.getElementById("btn-back-slide");
btnNextSlide = document.getElementById("btn-next-slide");

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


function getHeithSlide(){
   return slide.offsetHeight;
}

function getHeithNav(){
    return nav.offsetHeight;
 }

function readFile(file){
 
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
       //console.log(evt.target.result);
       parseText(file.name, evt.target.result)
    }
    reader.onerror = function (evt) {
        console.log( "error reading file");
    }
}

function parseText(namefile, text){
    var arr = text.split('\n');
    page = -1;
    current_code = "";
    content_slides = [];
    arr.forEach(element => {
        if((element[0] == "#") && (element[1] == "#")) {
            page++;
            line = JSON.parse(element.substring(2));
            line.code = "";
            content_slides.push([namefile, line]);

        }else{
            content_slides[page][1].code += element+"\n";
        }
    });

    content_slides.sort(function(a,b){
        if(a[1].number < b[1].number){
            return -1;
        }else{
            return 1;
        }
    });

    console.log(content_slides);
    showSlide (content_slides);
}

function showSlide(content_slides){
    console.log(content_slides);
    interfaceLoadfile.style.display = "none";

    var html = '<div id="slide-0" class="slide cover"><div class="flex lg:flex-1"><a href="#" class="-m-1.5 p-1.5"><span class="sr-only">Code to Slide</span><img class="h-10 w-auto" src="logo.png" alt=""></a></div>';
   
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
        html += '<div class="description">'+element[1].description+'</div>';
        html += '<div class="container">';
        html+= '<pre><code class="language-py">'+element[1].code+'</code></pre>';
        html+= '</div><div class="file"> <i class="fa fa-file"></i> '+content_slides[0][0]+'</div></div>';

        codeslide.innerHTML =  codeslide.innerHTML+html;
    });
    slide = document.getElementById("slide-0");
    hljs.highlightAll();
    btnBackSlide.style.display = "block";
    btnNextSlide.style.display = "block";
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
                if( (e.target.files[i].name.includes('.txt') || e.target.files[i].name.includes('.py') || e.target.files[i].name.includes('.java') ) ){
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


function nextSlide(){
    //todo if total slides
    currentSlide++;
    window.scrollTo(0, getHeithNav() + getHeithSlide()*currentSlide);
   
}

function backSlide(){

    if(currentSlide >= 0)
        currentSlide--;
    window.scrollTo(0, getHeithNav() + getHeithSlide()*currentSlide);
}

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
