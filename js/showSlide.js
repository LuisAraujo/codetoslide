/* SHOWING SLIDES */
function showSlide(content_slides, extension){
    interfaceLoadfile.style.display = "none";
    btnPrintSlide.classList.remove("hidden");
    var language = "language-"+extension;
    var html = '<div id="slide-0" class="slide cover"><div class="flex lg:flex-1"><a href="#" class="-m-1.5 p-1.5"><span class="sr-only">Code to Slide</span><img class="h-10 w-auto opacity-70" src="images/logo.png" alt=""></a></div>';
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
            html+= '<div class="container code"><pre><code class="'+language+'">'+element[1].code+'</code></pre></div>';
            html+= '<div class="file"> <i class="fa fa-file"></i> '+element[0]+'</div>';
        }

        if((element[1].table != undefined) && (element[1].table.trim()!= "")){
            if( (element[1].cols != undefined) && (element[1].cols.trim() != undefined))
                html+= renderingTable(element[1].table, element[1].cols);
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


function renderingTable(tablejson, cols){
    cols = parseInt(cols);
    auto = "auto ".repeat(cols) + "!important";
    table = '<div class="container-table" style="grid-template-columns: '+auto+'">';
    
    arratable = tablejson.split("|");

    for( i = 0; i < arratable.length; i++){
        divclass = "";
        
        if(i < cols)
            divclass = "head";
        
        table+= "<div class='"+divclass+"'>" +  arratable[i];

        table+="</div>";
        
    }
    
    
    return table+"</div>";
}