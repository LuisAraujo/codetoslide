# codeToSlide
Sistema para geração de slide para aula com trecho de códigos e explicações baseadas em comentários de código.

# Funcionalidades
* Importa código
* Gera slide em html
* Gera slide em PDF
* Configura estilo
   * cor de background
   * cor de fonte
   * tipo de fonte
   * tamanho da fonte
* Salva slides no localstore 
* Suporta Múltiplos arquivos 
* Zoom do código (duplo clique)
* Adiciona background no primeiro slide

EXEMPLO:

Trecho do código submetido.

```python
##{'title':'changeState', 'description'='Esta função modifica o estado do usuário (state é uma string)'}
def changeState(state):
   mystate = statde

##{'title':'Exibindo o estado', 'description'='Esta função printa o estado do usuário no console.'}
def printState()
   print('o seu estado é', mystate)
```
## Parametros

title: define o título do slide
description: define a descrição (texto em uma caixa com background)
number: define a ordem que o slide irá ser exibido (-1 exclui o trecho)
image: define a url de uma imagem no slide


## Telas:


### Criando Slide
![Criando slide](https://github.com/LuisAraujo/codeToSlide/blob/main/screens/screen_create.png?raw=true)

### PDF Exportado
![Exportando slide](https://github.com/LuisAraujo/codeToSlide/blob/main/screens/export_pdf.png?raw=true)

### Apresentação de Slide On-line
![Apresentando slide on-line](https://github.com/LuisAraujo/codeToSlide/blob/main/screens/slideonline.png?raw=true)


### Slide gerado
![Gerando slide](https://github.com/LuisAraujo/codeToSlide/blob/main/screens/slide01.png?raw=true)

![Slide 2](https://github.com/LuisAraujo/codeToSlide/blob/main/screens/slide02.png?raw=true)


### Adicionando imagem
![Adicionando imagem](https://github.com/LuisAraujo/codeToSlide/blob/main/screens/screen_image_desc.png?raw=true)

![Adicionando imagem](https://github.com/LuisAraujo/codeToSlide/blob/main/screens/screen_image.png?raw=true)


### Apenas texto
![Slide 1](https://github.com/LuisAraujo/codeToSlide/blob/main/screens/screen_text.png?raw=true)

### Configurando cor
![Configurando a cor](https://github.com/LuisAraujo/codeToSlide/blob/main/screens/select_color.png?raw=true)


### Slide com cor personalizada
![Slide com cor presonalizada](https://github.com/LuisAraujo/codeToSlide/blob/main/screens/slide_color.png?raw=true)

![Slide com cor presonalizada](https://github.com/LuisAraujo/codeToSlide/blob/main/screens/slide_color2.png?raw=true)


### Zoom no código
![Zoom no código](https://github.com/LuisAraujo/codeToSlide/blob/main/screens/zoom_code.png?raw=true)


### Slide com background
![Slide com background](https://github.com/LuisAraujo/codeToSlide/blob/main/screens/slide_bg.png?raw=true)
