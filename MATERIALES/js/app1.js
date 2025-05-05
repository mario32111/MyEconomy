// MENU RESPONSIVE
var  btnMenuOpen = document.getElementById("btnMenuOpen"), //id de los elementos en html 
     btnMenuClose = document.getElementById("btnMenuClose"),
     menuResponsive = document.getElementById("menuBar"),
     enlaces = document.getElementById("enlaces");


     // Click abrir
     btnMenuOpen.addEventListener("click", function () {
          menuResponsive.classList.add("active"); 
     }); //classList.add para activar el desplazamiento

     // Click cerrar
     btnMenuClose.addEventListener("click", function () { 
          menuResponsive.classList.remove("active");
     }); // classList.remove para desactivar el desplazamiento

     // Cerrar menu con elementos de enlace
     enlaces.addEventListener("click", function () {
          menuResponsive.style.transitionDelay = "1.0s";
          menuResponsive.classList.remove("active");
     });

//SLIDER DE PRODUCTOS
var  contenedor = document.querySelector('.slider'),
     btnIzquierdo = document.getElementById("btn-izquierda"),
     btnDerecho = document.getElementById("btn-derecha");

     //EVENTO PARA BOTON DERECHO
     btnDerecho.addEventListener("click", function() {
          contenedor.scrollLeft += contenedor.offsetWidth;

     });

     //EVENTO PARA BOTON izquierdo
     btnIzquierdo.addEventListener("click", function() {
          contenedor.scrollLeft -= contenedor.offsetWidth;

     });


//VALIDACION DE FORMULARIO
var formulario = document.getElementById("formulario");

     function validar(e){
          var inputNombre = document.getElementById("nombre"),
              inputEmail = document.getElementById("email"),
              inputComents = document.getElementById("comentarios"),

              /* NO AGREGAR HASTA QUE SE PROGRAMEN LAS ALERTAS EN CSS PRIMERO */
              alertSuccess = document.getElementById("alertSuccess"),
              alertError = document.getElementById("alertError");

          if (inputNombre.value ==0 || inputEmail.value ==0 ||inputComents.value ==0){
               e.preventDefault();

               /* NO AGREGAR HASTA QUE SE PROGRAMEN LAS ALERTAS EN CSS PRIMERO */
               alertError.classList.remove("hide");
               alertError.classList.add("show");
               setTimeout(function(){
                    alertError.classList.remove("show");
                    alertError.classList.add("hide");
               }, 2000);

          }else{
               e.preventDefault();

               alertSuccess.classList.remove("hide");
               alertSuccess.classList.add("show");

               setTimeout(function(){
                    alertSuccess.classList.remove("show");
                    alertSuccess.classList.add("hide");
               }, 2000);
               inputNombre.value = "";
               inputEmail.value = "";
               inputComents.value = "";
          }
     }

formulario.addEventListener("submit", validar);



//BOTON EXTRA: SCROLL TOP
var btnTop = document.getElementById("btn-top");

//detectar scroll en la pagina web
window.addEventListener("scroll", function(){
     var scroll = document.documentElement.scrollTop,
         fullSize = document.documentElement.offsetHeight,
         sizeVP =   document.documentElement.clientHeight;

     if(scroll > 150){
          btnTop.classList.add("show");
     }else{
          btnTop.classList.remove("show");
     }

     //MODIFICAR ELEMENTO CUANDO LLEGUE A FINAL DE PAGINA
     if(fullSize == (scroll + sizeVP)){
          btnTop.classList.add("scrollFinal");
     }else{
          btnTop.classList.remove("scrollFinal");
     }
});

//detectamos evento click en el boton
btnTop.addEventListener("click", function(){
     window.scrollTo(0,0);
});

