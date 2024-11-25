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