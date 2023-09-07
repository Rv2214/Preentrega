//array empleados
let listado = [
    { nombre: 'Empleado1', apellido: 'Apellido1', telefono:123456789, base: 'Base1', funcion: 'agente' },
    { nombre: 'Empleado2', apellido: 'Apellido2', telefono:123456789, base: 'Base2', funcion: 'agente' },
    { nombre: 'Empleado3', apellido: 'Apellido3', telefono:123456789, base: 'Base1', funcion: 'agente' },
    { nombre: 'Empleado4', apellido: 'Apellido4', telefono:123456789, base: 'Base2', funcion: 'agente' },
    { nombre: 'Empleado5', apellido: 'Apellido5', telefono:123456789, base: 'Base1', funcion: 'agente' },
    { nombre: 'Empleado6', apellido: 'Apellido6', telefono:123456789, base: 'Base2', funcion: 'agente' },
    { nombre: 'Empleado7', apellido: 'Apellido7', telefono:123456789, base: 'Base1', funcion: 'agente' },
    { nombre: 'Empleado8', apellido: 'Apellido8', telefono:123456789, base: 'Base2', funcion: 'agente' },
    { nombre: 'Empleado9', apellido: 'Apellido9', telefono:123456789, base: 'Base1', funcion: 'agente' },
    { nombre: 'Empleado10', apellido: 'Apellido10', telefono:123456789, base: 'Base2', funcion: 'agente' },
];

//array servicios
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


const tablaBody = document.getElementById("tablaBody");
//tabla
listado.forEach((empleado) => {
    const fila = document.createElement("tr");

//nombre
    const nombreCelda = document.createElement("td");
    nombreCelda.textContent = empleado.nombre;
//apellido
    const apellidoCelda = document.createElement("td");
    apellidoCelda.textContent = empleado.apellido;
//telefono
    const telefonoCelda = document.createElement("td");
    telefonoCelda.textContent = empleado.telefono;
//base
    const baseCelda = document.createElement("td");
    baseCelda.textContent = empleado.base;
//funcion
    const funcionCelda = document.createElement("td");
    funcionCelda.textContent = empleado.funcion;
//presentismo
    const presentismoCelda = document.createElement("td");

    const presenteCheckbox = document.createElement("input");
    presenteCheckbox.type = "checkbox";
    presenteCheckbox.name = "presente";
    presenteCheckbox.value = "Presente";

    const ausenteCheckbox = document.createElement("input");
    ausenteCheckbox.type = "checkbox";
    ausenteCheckbox.name = "ausente";
    ausenteCheckbox.value = "Ausente";

    presentismoCelda.appendChild(presenteCheckbox);
    presentismoCelda.appendChild(ausenteCheckbox);
//servicios
    let servicioCelda = document.createElement("td");
    let servicioDropdown = document.createElement("select");

    servicios.forEach((opcion) => {
    const opcionElement = document.createElement("option");
    opcionElement.value = opcion;
    opcionElement.textContent = opcion;
    servicioDropdown.appendChild(opcionElement);
    });

    servicioCelda.appendChild(servicioDropdown);

//Observaciones
    const observacionesCelda = document.createElement("td");
    const observacionesInput = document.createElement("input");
    observacionesInput.type = "text";
    observacionesInput.name = "observaciones";
    observacionesInput.placeholder = "Escriba aquí observaciones";

    observacionesCelda.appendChild(observacionesInput);

    fila.appendChild(nombreCelda);
    fila.appendChild(apellidoCelda);
    fila.appendChild(telefonoCelda);
    fila.appendChild(baseCelda);
    fila.appendChild(funcionCelda);
    fila.appendChild(presentismoCelda);
    fila.appendChild(servicioCelda);
    fila.appendChild(observacionesCelda);

    tablaBody.appendChild(fila);
});

// boton "Guardar en Local Storage" & informacion guardada
const guardarLocalStorageButton = document.getElementById("guardarLocalStorage");
const informacionGuardadaElement = document.getElementById("informacionGuardada");



//  boton "CARGAR"
cargarButton.addEventListener("click", () => {
    const filas = tablaBody.querySelectorAll("tr");
    const nuevoArray = [];

    filas.forEach((fila) => {
        const presenteCheckbox = fila.querySelector('input[name="presente"]');
        const ausenteCheckbox = fila.querySelector('input[name="ausente"]');
        const servicioDropdown = fila.querySelector("select");
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
    });

    // Limpia contenid informacionGuardada
    informacionGuardadaElement.innerHTML = "";

    // Llama a la función actualizarNuevoArray 
    actualizarNuevoArray(nuevoArray);

    // Guardar en el Local Storage
    localStorage.setItem("informacionGuardada", JSON.stringify(nuevoArray));
});

// Mostrar informacionGuardada EN MI NUEVO ARRAY
function actualizarNuevoArray(nuevoArray) {
    const ul = document.createElement("ul");
    nuevoArray.forEach((info, index) => {
        const li = document.createElement("li");
        li.textContent = `Nombre: ${info.Nombre}, Apellido: ${info.Apellido}, Teléfono: ${info.Teléfono}, Base: ${info.Base}, Función: ${info.Función}, Presentismo: ${info.Presentismo}, Servicio: ${info.Servicio}, Observaciones: ${info.Observaciones}`;

        const borrarButton = document.createElement("button");
        borrarButton.textContent = "Borrar";
        //índice correspondiente al botón
        borrarButton.setAttribute("data-index", index);
        borrarButton.addEventListener('click', (event) => {
            // índice del botón haciendo atributo data-index
            const buttonIndex = event.target.getAttribute("data-index");
            nuevoArray.splice(buttonIndex, 1);
            // Limpia y vuelve a mostrar informacionGuardada
            informacionGuardadaElement.innerHTML = "";
            actualizarNuevoArray(nuevoArray);
            localStorage.setItem("informacionGuardada", JSON.stringify(nuevoArray));
        });

        ul.appendChild(li);
        li.appendChild(borrarButton);
    });

    // Guardar en el Local Storage
    localStorage.setItem("informacionGuardada", JSON.stringify(nuevoArray));

    informacionGuardadaElement.appendChild(ul);
}



//BOTON BUSCAR

// Cuadro de búsqueda
const buscarEmpleadoInput = document.getElementById("buscarEmpleadoInput");

// Evento "input" al cuadro de búsqueda para detectar cambios mientras se escribe
buscarEmpleadoInput.addEventListener("input", () => {
    // Valor del cuadro de búsqueda
    const valorBuscado = buscarEmpleadoInput.value.toLowerCase();

    // comprueba si el valor buscado existe en el array
    const empleadoEncontrado = listado.some((empleado) => {
    return (
        empleado.nombre.toLowerCase().includes(valorBuscado) ||
        empleado.apellido.toLowerCase().includes(valorBuscado) ||
        empleado.telefono.toString().includes(valorBuscado) ||
        empleado.base.toLowerCase().includes(valorBuscado) ||
        empleado.funcion.toLowerCase().includes(valorBuscado)
        );
    });

    // Limpia la tabla
    tablaBody.innerHTML = "";

    // comprueba si se encuentra el empleado dentro del array
    if (empleadoEncontrado) {
        const empleadosFiltrados = listado.filter((empleado) => {
        return (
            empleado.nombre.toLowerCase().includes(valorBuscado) ||
            empleado.apellido.toLowerCase().includes(valorBuscado) ||
            empleado.telefono.toString().includes(valorBuscado) ||
            empleado.base.toLowerCase().includes(valorBuscado) ||
            empleado.funcion.toLowerCase().includes(valorBuscado)
            );
        });
        // Agrega las filas correspondientes a los empleados filtrados
        empleadosFiltrados.forEach((empleado) => {
            const fila = document.createElement("tr");
            
            // contenido generado 
            fila.innerHTML = `
                <td>${empleado.nombre}</td>
                <td>${empleado.apellido}</td>
                <td>${empleado.telefono}</td>
                <td>${empleado.base}</td>
                <td>${empleado.funcion}</td>
                <td>
                    <input type="checkbox" name="presente" value="Presente">
                    <input type="checkbox" name="ausente" value="Ausente">
                </td>
                <td>
                    <select>
                    ${servicios.map((opcion) => `<option value="${opcion}">${opcion}</option>`).join("")}
                </select>
                </td>
                <td>
                <input type="text" name="observaciones" value="${empleado.Observaciones || ""}">
                </td>
            `;
        
            tablaBody.appendChild(fila);
        });
    }else {
      // Si no se encontraron empleados, muestra mensaje "No se encontraron resultados"
        const filaMensaje = document.createElement("tr");
        const celdaMensaje = document.createElement("td");
        celdaMensaje.colSpan = 8; // Colspan para ocupar todas las columnas
        celdaMensaje.textContent = "No se encontraron resultados";
        filaMensaje.appendChild(celdaMensaje);
        tablaBody.appendChild(filaMensaje);
    }
});


//BOTON AGREGAR EMPLEADO

const agregarEmpleadoButton = document.getElementById("agregarempleado__button");

agregarEmpleadoButton.addEventListener("click", () =>{
    const nuevoEmpleado = {
        nombre: prompt("Ingrese el nombre del nuevo empleado:"),
        apellido: prompt("Ingrese el apellido del nuevo empleado:"),
        telefono: prompt("Ingrese el teléfono del nuevo empleado:"),
        base: prompt("Ingrese la base del nuevo empleado:"),
        funcion: prompt("Ingrese la función del nuevo empleado:"),
    }

    //cancela la funcion 
    if (nuevoEmpleado.nombre === null || nuevoEmpleado.apellido === null || nuevoEmpleado.telefono === null || nuevoEmpleado.base === null || nuevoEmpleado.funcion === null) {
        return; // Cancela la función si se presionó "Cancelar" en cualquier prompt
    }

    listado.push(nuevoEmpleado);

    const fila = document.createElement("tr");
    //fila.setAttribute("data-index", listado.length - 1); // El nuevo índice será la longitud actual del array - 1
    fila.innerHTML = `
                <td>${nuevoEmpleado.nombre}</td>
                <td>${nuevoEmpleado.apellido}</td>
                <td>${nuevoEmpleado.telefono}</td>
                <td>${nuevoEmpleado.base}</td>
                <td>${nuevoEmpleado.funcion}</td>
                <td>
                    <input type="checkbox" name="presente" value="Presente">
                    <input type="checkbox" name="ausente" value="Ausente">
                </td>
                <td>
                    <select>
                    ${servicios.map((opcion) => `<option value="${opcion}">${opcion}</option>`).join("")}
                </select>
                </td>
                <td>
                <input type="text" name="observaciones" value="${nuevoEmpleado.Observaciones || ""}">
                </td>
            `;

    tablaBody.appendChild(fila);
})


//BORRAR FUNCION


let elementoSeleccionado = null; // Variable global para guardar el índice del empleado seleccionado

// Obtén una referencia a todos los botones de eliminación
const botonesEliminar = document.getElementById("eliminarEmpleado");

// Agrega un evento de clic al botón de eliminación
botonesEliminar.addEventListener("click", () => {
  if (elementoSeleccionado !== null) {
    // Pregunta al usuario si está seguro de querer eliminar al empleado
    const confirmacion = confirm("¿Estás seguro de querer eliminar este empleado?");

    // Si el usuario confirma la eliminación, procede a eliminar al empleado
    if (confirmacion) {
      // Elimina al empleado del array listado utilizando el índice guardado en elementoSeleccionado
      listado.splice(elementoSeleccionado, 1);

      // Elimina la fila correspondiente de la tabla en el DOM utilizando el índice
      const filaAEliminar = document.querySelector(`tr[data-index="${elementoSeleccionado}"]`);
      filaAEliminar.remove();

      // Limpia la selección
      elementoSeleccionado = null;

      // Puedes mostrar un mensaje de éxito o realizar otras acciones aquí
      alert("Empleado eliminado correctamente.");
    }
  } else {
    alert("Selecciona un empleado antes de eliminarlo.");
  }
});

// Obtén una referencia a todas las filas de la tabla
const filas = document.querySelectorAll("tr");

// Agrega un evento de clic a cada fila
filas.forEach((fila, index) => {
  fila.addEventListener("click", () => {
    // Llama a la función seleccionarElemento con el índice de la fila
    seleccionarElemento(index);
  });
});

// Función para seleccionar un empleado por su índice
function seleccionarElemento(index) {
  elementoSeleccionado = index;
}


//FUNCION LIMPIAR TABLE

const limpiarTablaButton = document.getElementById("limpiarTabla");

limpiarTablaButton.addEventListener("click", () => {
  // Limpia la tabla eliminando todas las filas
  tablaBody.innerHTML = "";
  
});