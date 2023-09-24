//array empleados
class Empleado {
    constructor(nombre, apellido, telefono, base, funcion) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.base = base;
        this.funcion = funcion;
    }
}


let listado = [
    new Empleado('Juan', 'Perez', 123456789, 'Base1', 'operador'),
    new Empleado('Natalia', 'Gomez', 123456780, 'Base2', 'operador'),
    new Empleado('Monica', 'Hermes', 123456781, 'Base1', 'operador'),
    new Empleado('Julio', 'Paez', 123456789, 'Base2', 'maquinista'),
    new Empleado('Ricardo', 'Ruben', 123456789, 'Base3', 'operador'),
    new Empleado('Omar', 'Lopez', 123456789, 'Base4', 'maquinista'),
    new Empleado('Cesar', 'Po', 123456789, 'Base1', 'maquinista'),
    new Empleado('Julia', 'Naner', 123456789, 'Base2', 'operador'),
    new Empleado('Rafael', 'Cruz', 123456789, 'Base3', 'gerente'),
    new Empleado('Yanina', 'Gregori', 123456789, 'Base4', 'gerente'),
];


let servicios = [
    "Servicio1",
    "Servicio2",
    "Servicio3",
    "Servicio4",
    "Servicio5",
    "Servicio6",
    "Servicio7",
    "Servicio8",
    "Servicio9",
    "Servicio10",
]


//FUNCION PARA LA Creaciion de HTML  ---------------------------------------------------------------------------------------
function crearFilaHTML(empleado, index) {
    const fila = document.createElement("tr");
        // Asignar un atributo data-index
        fila.setAttribute("data-index", index);
        // Agregar una clase a la fila
        fila.classList.add("fila-empleado");

    const campos = ['nombre', 'apellido', 'telefono', 'base', 'funcion'];

    campos.forEach((campo) => {
        const celda = document.createElement("td");
        celda.textContent = empleado[campo];

        fila.appendChild(celda);
    });

    const presentismoCelda = document.createElement("td");

    const presenteCheckbox = document.createElement("input");
    presenteCheckbox.type = "checkbox";
    presenteCheckbox.name = `presente-${index}`; 
    presenteCheckbox.id = `presente-${index}`;
    presenteCheckbox.value = "Presente";

    const ausenteCheckbox = document.createElement("input");
    ausenteCheckbox.type = "checkbox";
    ausenteCheckbox.name = `ausente-${index}`;
    ausenteCheckbox.id = `ausente-${index}`;  
    ausenteCheckbox.value = "Ausente";

    presentismoCelda.appendChild(presenteCheckbox);
    presentismoCelda.appendChild(ausenteCheckbox);
    fila.appendChild(presentismoCelda);

    const servicioCelda = document.createElement("td");
    const servicioDropdown = document.createElement("select");
    servicioDropdown.name = `servicio-${index}`;
    servicioDropdown.id = `servicio-${index}`;

    servicios.forEach((opcion) => {
        const opcionElement = document.createElement("option");
        opcionElement.value = opcion;
        opcionElement.textContent = opcion;
        servicioDropdown.appendChild(opcionElement);
    });

    servicioCelda.appendChild(servicioDropdown);
    fila.appendChild(servicioCelda);

    const observacionesCelda = document.createElement("td");
    const observacionesInput = document.createElement("input");
    observacionesInput.type = "text";
    observacionesInput.name = "observaciones";
    observacionesInput.placeholder = "Escriba aquí observaciones";

    observacionesCelda.appendChild(observacionesInput);
    fila.appendChild(observacionesCelda);

    return fila;
}


  // FUNCION CARGAR EMPLEADOS 
function cargarEmpleados() {
    const tablaBody = document.getElementById("tablaBody");
    listado.forEach((empleado, index) => {
        const fila = crearFilaHTML(empleado, index);
        fila.classList.add("fila-empleado");

        tablaBody.appendChild(fila);
    });
}


// Agrega un evento "DOMContentLoaded" para llamar a cargarEmpleados cuando la página se cargue
document.addEventListener("DOMContentLoaded", cargarEmpleados);
const informacionGuardadaElement = document.getElementById("informacionGuardada");





//CONST NUEVO ARRAY
const nuevoArray = [];

//FUNCION GUARDARINFO pushea info estatica y dinamica en un nuevo array
function guardarInfo() {
    const filas = document.querySelectorAll(".fila-empleado"); // Obtiene todas las filas

//añadir una clase E identificacion cada fila 
    filas.forEach((fila, index) => {
        const presenteCheckbox = fila.querySelector(`input[name="presente-${index}"]`);
        const ausenteCheckbox = fila.querySelector(`input[name="ausente-${index}"]`);
        const servicioDropdown = fila.querySelector(`select[name="servicio-${index}"]`); // Cambiado a `select` en lugar de `input`
        const observacionesInput = fila.querySelector('input[name="observaciones"]');
        
        const empleadoInfo = {
            Nombre: fila.querySelector('td:nth-child(1)').textContent,
            Apellido: fila.querySelector('td:nth-child(2)').textContent,
            Teléfono: fila.querySelector('td:nth-child(3)').textContent,
            Base: fila.querySelector('td:nth-child(4)').textContent,
            Función: fila.querySelector('td:nth-child(5)').textContent,
            Presentismo: presenteCheckbox.checked ? "Presente" : (ausenteCheckbox.checked ? "Ausente" : ""),
            Servicio: servicioDropdown.value,
            Observaciones: observacionesInput.value
        };

        nuevoArray.push(empleadoInfo);
        
        generarReporte(nuevoArray); 
    });
}




//FUNCION CARGAR / GENERAR REPORTE
function generarReporte () {
    const ul = document.createElement("ul");

    nuevoArray.forEach((info) => {
        const li = document.createElement("li");
        li.textContent = `Nombre: ${info.Nombre}, Apellido: ${info.Apellido}, Teléfono: ${info.Teléfono}, Base: ${info.Base}, Función: ${info.Función}, Presentismo: ${info.Presentismo}, Servicio: ${info.Servicio}, Observaciones: ${info.Observaciones}`;
        
        ul.appendChild(li);
    });
    // Limpia
    informacionGuardadaElement.innerHTML = "";

    informacionGuardadaElement.appendChild(ul);
}




// PROMESA
// ELEMENTO DOM I 0 MOSTRAR CARGA 
const loadingDiv = document.querySelectorAll(".loading")[0];

const pedirArrayEmpleados = (arr) => {
    loadingDiv.innerHTML = '<p class="pcargando">Cargando...</p>'; // Muestra el mensaje de carga
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (arr) {
                resolve(arr);
            } else {
                reject("Error");
            }
        }, 1500);
    });
};

let arraypedida = [];



//BOTON CARGAR
const cargarButton = document.getElementById("cargarButton");

cargarButton.addEventListener("click", () => {
    pedirArrayEmpleados(nuevoArray)
        .then((res) => {
            arraypedida = res;

            guardarInfo(arraypedida);
        })
        .catch((err) => {
            console.log(err);
        });
});





//FUNCION AGREGAR EMPLEADO
function agregarEmpleado() {
    const nuevoEmpleado = new Empleado(
        prompt("Ingrese nombre:"),
        prompt("Ingrese apellido:"),
        prompt("Ingrese teléfono:"),
        prompt("Ingrese base:"),
        prompt("Ingrese función:")
    );

    // Validacion
    if (
        nuevoEmpleado.nombre === null ||
        nuevoEmpleado.apellido === null ||
        nuevoEmpleado.telefono === null ||
        nuevoEmpleado.base === null ||
        nuevoEmpleado.funcion === null
    ) {
        return; 
    }

    listado.push(nuevoEmpleado);

    const tablaBody = document.getElementById("tablaBody");
    const index = listado.length - 1; // índice del nuevo empleado en el array
    const nuevaFila = crearFilaHTML(nuevoEmpleado, index);
    nuevaFila.classList.add("fila-empleado");

    
    tablaBody.appendChild(nuevaFila);

    actualizarTablaEmpleados();
    seleccionarfila();
}


//AGREGAR BUTTON 
const agregarButton = document.getElementById("agregarempleado__button")

agregarButton.addEventListener('click', agregarEmpleado);





// FUNCION SELECCIONAR FILAS
let elementoSeleccionado = null;

function seleccionarfila() {
    const filas = document.querySelectorAll(".fila-empleado");

    filas.forEach((fila, index) => {
        fila.addEventListener('click', function() {
            // Si ya hay una fila seleccionada, quitar la clase 'seleccionado'
            if (elementoSeleccionado !== null && elementoSeleccionado !== index) {
                filas[elementoSeleccionado].classList.remove('seleccionado');
            }
            
            // Marcar la fila actual como seleccionada
            elementoSeleccionado = index;
            fila.classList.add('seleccionado');
            
        });
    });
}




//FUNCION ACTUALIZAR TABLA
function actualizarTablaEmpleados() {
    const tablaBody = document.getElementById("tablaBody");


    tablaBody.innerHTML = "";


    listado.forEach((empleado, index) => {
        const fila = crearFilaHTML(empleado, index);
        fila.classList.add("fila-empleado");

        tablaBody.appendChild(fila);
    });
}

document.addEventListener("DOMContentLoaded", seleccionarfila);





//FUNCION BUSCAR EMPLEADO
function buscarEmpleado() {
    const buscarEmpleadoInput = document.getElementById("buscarEmpleadoInput");
    const tablaBody = document.getElementById("tablaBody");

    // Valor del cuadro de búsqueda
    const valorBuscado = buscarEmpleadoInput.value.toLowerCase();

    // Limpia la tabla
    tablaBody.innerHTML = "";

    // Filtra empleados que coincidan con el valor buscado
    const empleadosFiltrados = listado.filter((empleado) => {
        return (
            empleado.nombre.toLowerCase().includes(valorBuscado) ||
            empleado.apellido.toLowerCase().includes(valorBuscado) ||
            empleado.telefono.toString().includes(valorBuscado) ||
            empleado.base.toLowerCase().includes(valorBuscado) ||
            empleado.funcion.toLowerCase().includes(valorBuscado)
        );
    });

    // Si se encontraron empleados, agregar las filas correspondientes
    if (empleadosFiltrados.length > 0) {
        empleadosFiltrados.forEach((empleado) => {
            const fila = crearFilaHTML(empleado, listado.indexOf(empleado));
            tablaBody.appendChild(fila);
        });
    } else {
        // Si no se encontraron empleados, mostrar mensaje "No se encontraron resultados"
        const filaMensaje = document.createElement("tr");
        const celdaMensaje = document.createElement("td");
        celdaMensaje.colSpan = 8;
        celdaMensaje.textContent = "No se encontraron resultados";
        filaMensaje.appendChild(celdaMensaje);
        tablaBody.appendChild(filaMensaje);
    }
}

//BOTON BUSCAR
const buscarEmpleadoInput = document.getElementById("buscarEmpleadoInput");

buscarEmpleadoInput.addEventListener("input", buscarEmpleado);





 // FUNCION ELIMINAR FILA SELECCIONADA
function eliminarFilaSeleccionada() {
    if (elementoSeleccionado !== null) {
        const tablaBody = document.getElementById("tablaBody");
        const filaAEliminar = tablaBody.querySelector(`[data-index="${elementoSeleccionado}"]`);

        if (filaAEliminar) {
            const confirmarEliminar = confirm("¿Estás seguro de que quieres eliminar este empleado?");
            
            if (confirmarEliminar) {
                // Eliminar el empleado del array
                listado.splice(elementoSeleccionado, 1);
                
                // Actualizar la tabla volviendo a cargar los empleados
                tablaBody.removeChild(filaAEliminar);
                
                // Desmarcar la fila seleccionada
                elementoSeleccionado = null;
            }
        }
    }
}

//BOTON ELIMINAR
const eliminarEmpleadoButton = document.getElementById("eliminarEmpleadoButton");
eliminarEmpleadoButton.addEventListener("click", eliminarFilaSeleccionada);




// FUNCION MOSTRAR EMPLEADO SELECCIONADO
function mostrarEmpleado() {
    if (elementoSeleccionado !== null) {
        const empleadoSeleccionado = listado[elementoSeleccionado];
        const mostrarEmpleadoContainer = document.getElementById("mostrarEmpleadoContainer");

        const tarjetaEmpleadoHTML = `
            <div class="tarjeta-empleado">
                <h4>Info empleado</h4>
                <p>Nombre: ${empleadoSeleccionado.nombre}</p>
                <p>Apellido: ${empleadoSeleccionado.apellido}</p>
                <p>Teléfono: ${empleadoSeleccionado.telefono}</p>
                <p>Base: ${empleadoSeleccionado.base}</p>
                <p>Función: ${empleadoSeleccionado.funcion}</p>
            </div>
            <div><br>
            </div>
        `;

        mostrarEmpleadoContainer.innerHTML = tarjetaEmpleadoHTML;
    }
}

// BOTON MOSTRAR
const mostrarButton = document.getElementById("mostrarButton");
mostrarButton.addEventListener("click", mostrarEmpleado);



//FUNCION MODIFICAR EMPLEADO
function modificarEmpleado() {
    if (elementoSeleccionado !== null) {
        const empleadoSeleccionado = listado[elementoSeleccionado];
        const empleadoModificado = {};

        // campos y prompts
        const campos = ['nombre', 'apellido', 'telefono', 'base', 'funcion'];

        campos.forEach((campo) => {
            const valorActual = empleadoSeleccionado[campo];
            const valorModificado = prompt(`Ingrese el nuevo valor para ${campo}:`, valorActual);
            if (valorModificado === null) {
                return;
            }

            // Almacenar el valor modificado 
            empleadoModificado[campo] = valorModificado;
        });

        // Actualizar los datos del empleado con los valores modificados
        Object.assign(empleadoSeleccionado, empleadoModificado);

        // Actualizar la fila correspondiente en la tabla
        const filaSeleccionada = document.querySelector(`.fila-empleado[data-index="${elementoSeleccionado}"]`);
        
        campos.forEach((campo, index) => {
            filaSeleccionada.children[index].textContent = empleadoSeleccionado[campo];
        });
    }
}

// BOTON MODIFICAR
const modificarButton = document.getElementById("modificarButton");
modificarButton.addEventListener("click", modificarEmpleado);



//FUNCION GUARDAR EN LOCAL STORGAE
function guardarEnLocalStorage() {
    // Convierte array a JSON
    const nuevoArrayJSON = JSON.stringify(nuevoArray);

    // Guarda JSON con nombre
    localStorage.setItem('nuevoArray', nuevoArrayJSON);

    // Notificar al usuario
    Swal.fire({
        html: '<h2 class="titalert">La información se ha guardado en el LocalStorage.</h2>'
    });
}

const guardarLocalStorageButton = document.getElementById('guardarLocalStorage');

guardarLocalStorageButton.addEventListener('click', guardarEnLocalStorage);


// Aplicar las filas de empleados cuando se cargue la página
document.addEventListener("DOMContentLoaded", seleccionarfila);


//FETCH LOCAL FALLIDO ERROR SEGURIDAD DE NAVEGADOR CORS
fetch('./data/data.json')
.then(response => response.json())
.then(datos=>{
    console.log(datos);
});

//FETCH PRUEBA
const listapi = document.querySelector("#listadoapi");
const fetchButton = document.querySelector("#fetchButton");


fetchButton.addEventListener("click", () => {
    console.log(fetch('https://jsonplaceholder.typicode.com/todos/1'));
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((datos) => {
        listapi.innerHTML = ''; 
        for (const post of datos) {
            console.log(post);
            const li = document.createElement("li");
            li.className = "liapi";
            li.innerHTML = `<h2>${post.title}</h2>
                            <p>${post.body}</p>`;
            listapi.appendChild(li);
        }
    });
});




