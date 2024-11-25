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
