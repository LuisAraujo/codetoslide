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