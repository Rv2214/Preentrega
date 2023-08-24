let listado = [
    { nombre: 'Empleado1', apellido: 'Apellido1', base: 'Base1' },
    { nombre: 'Empleado2', apellido: 'Apellido2', base: 'Base2' },
    { nombre: 'Empleado3', apellido: 'Apellido3', base: 'Base1' },
    { nombre: 'Empleado4', apellido: 'Apellido4', base: 'Base2' },
    { nombre: 'Empleado5', apellido: 'Apellido5', base: 'Base1' },
    { nombre: 'Empleado6', apellido: 'Apellido6', base: 'Base2' },
    { nombre: 'Empleado7', apellido: 'Apellido7', base: 'Base1' },
    { nombre: 'Empleado8', apellido: 'Apellido8', base: 'Base2' },
    { nombre: 'Empleado9', apellido: 'Apellido9', base: 'Base1' },
    { nombre: 'Empleado10', apellido: 'Apellido10', base: 'Base2' },
];

// Función para asignar agente
function asignarAgente() {
    for (let i = 0; i < listado.length; i++) {
        let fecha = new Date().toLocaleDateString();
        let asistencia = prompt(`¿Está presente el empleado ${listado[i].nombre}? (Responda "si" o "no")`).toLowerCase();
        let puntoAsignado = asistencia === 'no' ? 'AUSENTE' : prompt('Ingrese el punto asignado:');

        listado[i].fecha = fecha;
        listado[i].asistencia = asistencia === 'si' ? 'Presente' : 'Ausente';
        listado[i].puntoAsignado = puntoAsignado;
    }

    // Actualizar lista
    actualizarLista();
}

// Funcion para agregar nuevo empleado
function agregarEmpleado() {
    let nombre = prompt('Ingrese el nombre:');
    let apellido = prompt('Ingrese el apellido:');
    let baseInput = prompt('Ingrese la base (Elija entre "Base1" o "Base2"):').toLowerCase();
    while (baseInput !== 'base1' && baseInput !== 'base2') {
        baseInput = prompt('Base inválida. Ingrese la base (Elija entre "Base1" o "Base2"):').toLowerCase();
    }

    let fecha = new Date().toLocaleDateString();

    listado.push({
        nombre: nombre,
        apellido: apellido,
        base: baseInput,
        fecha: fecha
    });

    actualizarLista();
}

//funcion calcular presentes y ausentes
function calcularPresentesAusentes() {
    let presentes = 0;
    let ausentes = 0;

    // Bucle conteo
    for (let i = 0; i < listado.length; i++) {
        if (listado[i].asistencia === 'Presente') {
            presentes++;
        } else if (listado[i].asistencia === 'Ausente') {
            ausentes++;
        }
    }
    // Mostrar el resultado
    console.log(`Cantidad de Presentes: ${presentes}`);
    console.log(`Cantidad de Ausentes: ${ausentes}`);
}


//funcion actualizar lista
function actualizarLista() {
    console.log('Lista de asistencia:');
    for (let registro of listado) {
        console.log(`${registro.nombre} ${registro.apellido} - ${registro.asistencia} - ${registro.fecha} - ${registro.puntoAsignado}`);
    }
}

//funcion para filtrar por base con dos variables dentro, que son igual al listado mas la funcion filter con el parametro base
function filtrarPorBase() {
    const empleadosBase1 = listado.filter(empleado => empleado.base.toLowerCase() === 'base1');
    const empleadosBase2 = listado.filter(empleado => empleado.base.toLowerCase() === 'base2');
    return [empleadosBase1, empleadosBase2];
}

// funcion para buscar objeto por nombre dentro del array .find 
function buscarEmpleadoPorNombre(nombreBuscado) {
    const empleadoEncontrado = listado.find(empleado => empleado.nombre.toLowerCase() === nombreBuscado.toLowerCase());

    if (empleadoEncontrado) {
        console.log(`Empleado encontrado: ${empleadoEncontrado.nombre} ${empleadoEncontrado.apellido}`);
    } else {
        console.log(`No se encontró ningún empleado con el nombre "${nombreBuscado}"`);
    }
}


// Menú de opciones
let opcion;

while (true) {
    opcion = prompt("Presione A para asignar agente, N para agregar empleado, C para calcular, F para filtrar por base, B para buscar o S para salir").toLowerCase();

    if (opcion === "a") {
        asignarAgente();
    } else if (opcion === "n") {
        agregarEmpleado();
    } else if (opcion === "c") {
        calcularPresentesAusentes();
    } else if (opcion === "f") {
        //mostrar variables empleadosbase1 y empleadosbase2, filtradas segun su base con la funcion filtrarporbase 
        const [empleadosBase1, empleadosBase2] = filtrarPorBase();
        
        console.log("Empleados con Base1:", empleadosBase1);
        console.log("Empleados con Base2:", empleadosBase2);
    } else if (opcion === "b") {
        const nombreBuscado = prompt('Ingrese el nombre del empleado a buscar:');
        buscarEmpleadoPorNombre(nombreBuscado);
    } else if (opcion === "s") {
        alert("¡Hasta luego!");
        break; 
    } else {
        alert("Opción no válida");
    }
}     

calcularPresentesAusentes();



//buscarEmpleado(arr, filtro) { }