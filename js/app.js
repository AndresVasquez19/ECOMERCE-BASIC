//declaramos las variables utilizando las clases del html

const carrito= document.querySelector('#carrito');
const contenedorcarrito= document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtb= document.querySelector ('#vaciar-carrito');
const listaCursos = document.querySelector ('#lista-cursos');
//se rdeclara un variabel cambiante para ir guardando en el carrito de compras los curso.
let articulosCarrito=[];


cargarEventListener();
function cargarEventListener(){
    //cuando agregas un curso presionando en "agregar al carrito"
    listaCursos.addEventListener ('click', agregarCurso);

    // eliminar cuross del carritooo
    carrito.addEventListener('click', eliminarCurso);

    //vaciar todo el carrito
    vaciarCarritoBtb.addEventListener('click', ()=>{
        articulosCarrito=[]; //se resetea el arreglo 
        limpiarHTML();
    })


}

// se recomienda tener las funciones separadas de las variables para poder entender el sintaxis en general
// funciones 

//Se crea la funcion y se le agregar el valor del bobling para poder seleccionar algo especifico
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado =e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Eliminar curso del carrito 
function eliminarCurso (e) {
    if (e.target.classList.contains('borrar-curso')){
        const cursoId=e.target.getAttribute('data-id');

        // eliminar el arreglo del articuloCarrito por el data-id
        articulosCarrito= articulosCarrito.filter( curso=> curso.id!==cursoId); // filtrer para poder sleecionar una parte especifica .

        carritoHTML(); //iterar sobre el carrtio y mostrar su html especifico
    }
}


// leer el conetenido del HTML al que le dimos click y extrae la informacion del curso

function leerDatosCurso(curso){
    console.log(curso);

    // crear un objeto con el contenido del curso actual

    const infoCurso={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector ('a').getAttribute('data-id'),
        cantidad:1

    }
    // Revisar si un elemento ya existe en el carrito 
    const existe=articulosCarrito.some ( curso=> curso.id=== infoCurso.id);
    if (existe ) {
        //Actualizamos la cantidad
        const cursos =articulosCarrito.map(curso => { //map crea un nuevo areglo 
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizado 
            } else {
                return curso; // retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //agrega elementos al arreglo de carrito 
        articulosCarrito=[...articulosCarrito, infoCurso];
    }


    console.log(articulosCarrito);
    carritoHTML(articulosCarrito);
}


// muestra de carrito de compras en el html
function carritoHTML(){

    //limpiar html para que no se muestre repetidas ocaciones los cursos
    limpiarHTML();

    //Recorre el carrito y genera el HTML  
    articulosCarrito.forEach(curso =>{
        const {imagen,titulo,precio,cantidad,id}=curso;
        const row=document.createElement('tr');
        row.innerHTML=`
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
        <a href="#" class="borrar-curso" data-id="${id}" > X </a>
        </td>
        `;
        //agregar el html del carrito ene le tbody
        contenedorcarrito.appendChild(row);
    });

}

//elimina los cursos copiados en el tbody

function limpiarHTML(){
    // se declara un ciclo while que haga la tarea de manera automatica

    while(contenedorcarrito.firstChild){
        contenedorcarrito.removeChild(contenedorcarrito.firstChild)

    }

}
