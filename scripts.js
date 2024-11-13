
myFiles = [];
arrSlides = [];
btnCreateSlide = document.getElementById("btn-create-slide");
btnCreateSlide.addEventListener("click", function() {
    console.log(myFiles);
    readFile(myFiles[0])
});

codeslide= document.getElementById("codeslide");
interfaceLoadfile = document.getElementById("interface-loadfile");

function readFile(file){
    console.log(file);
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

    showSlide (content_slides);
}

function showSlide(content_slides){
    console.log(content_slides);
    interfaceLoadfile.style.display = "none";

    var html = '<div class="slide cover"><div class="flex lg:flex-1"><a href="#" class="-m-1.5 p-1.5"><span class="sr-only">Code to Slide</span><img class="h-10 w-auto" src="logo.png" alt=""></a></div>';
   
    var institute = document.getElementById("nameinstitute").value;
    var course =document.getElementById("namecourse").value;
    var author =document.getElementById("nameauthor").value;
    var title = document.getElementById("maintitle").value;

    html += '<div class="institute">Instituto Federal da Bahia</div>';
    html += '<div class="maintitle">Aula sobre Pardões de Projeto</div>';
    html += '<div class="author">Luis Gustavo Araujo</div>';
    html += '<div class="course">Licenciatura em Computação</div></div>';
    codeslide.innerHTML = html;
    
    content_slides.forEach(function(element, index) {
        html = '<div class="slide"><div class="number-page">'+(index+1)+'</div>';    
        html += '<div class="title">'+element[1].title+'</div>';
        html += '<div class="description">'+element[1].description+'</div>';
        html += '<div class="container">';
        html+= '<pre><code class="language-py">'+element[1].code+'</code></pre>';
        html+= '</div><div class="file">'+content_slides[0][0]+'</div></div>';

        codeslide.innerHTML =  codeslide.innerHTML+html;
    });

   hljs.highlightAll();
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

