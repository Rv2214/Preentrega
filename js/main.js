let listado = [];
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
//funcion registrar asistencia
function registrarAsistencia() {
    //bucle while para repetir funcion
    while (true){ 
        let nombre = prompt('Ingrese el nombre, para salir presione 0:');
        if (nombre === '0') {
            break; // Salir del bucle si el usuario escribe "0"
        }
        let apellido = prompt('Ingrese el apellido:');
        let asistencia = prompt('¿Está presente? (Responda "si" o "no"):').toLowerCase();
        let puntoAsignado = asistencia === 'no' ? 'AUSENTE' : prompt('Ingrese el punto asignado:');
    // Fecha actual
    let fecha = new Date().toLocaleDateString();
    //listado 
    listado.push({
        nombre: nombre,
        apellido: apellido,
        asistencia: asistencia === 'si' ? 'Presente' : 'Ausente',
        fecha: fecha,
        puntoAsignado: puntoAsignado,
    });

    // Actualizar lista
    actualizarLista();
    }
}

//funcion actualizar lista
function actualizarLista() {
    console.log('Lista de asistencia:');
    for (let registro of listado) {
        console.log(`${registro.nombre} ${registro.apellido} - ${registro.asistencia} - ${registro.fecha} - ${registro.puntoAsignado}`);
    }
}

    //cartel de opciones
    let opcion;

    while (true) {
        opcion = prompt("Presione R para registrar, C para calcular o S para salir").toLowerCase();
    
        if (opcion === "r") {
            registrarAsistencia();
        } else if (opcion === "c") {
            calcularPresentesAusentes();
        } else if (opcion === "s") {
            alert("¡Hasta luego!");
            break; 
        } else {
            alert("Opción no válida");
        }
    }
    
        

calcularPresentesAusentes();
registrarAsistencia();
