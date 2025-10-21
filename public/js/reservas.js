let mostrarTabla = false;

document.getElementById("reservas").addEventListener('click', function (e){

    mostrarTabla = !mostrarTabla;

    if(mostrarTabla == true){
        cargarTablaReservas();
    } else {
        document.getElementById("tablareservas").style.display = 'none';
    }
});

function cargarTablaReservas(){

    const usuario = sessionStorage.getItem("usuario");
    const password = sessionStorage.getItem("password");

    fetch('/menu/tablaReservas', {
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            'usuario': usuario,
            'password': password
        }
    }).then(response => response.json()).then(data => {
        mostrarReservasUsuario(usuario, data.datos);
    }).catch(error => console.error('Error: ', error));

};

function mostrarReservasUsuario(usuario, filas){

    const tablaReservas = document.getElementById("tablaReservas");

    let html = document.getElementById('tablaReservas');

    const formatoFecha = new Intl.DateTimeFormat('es-ES', {
        timeZone: 'Europe/Madrid',
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        //hour: '2-digit',
        //minute: '2-digit',
        //second: '2-digit',
        hour12: false
    });

    if(filas.length != 0){

        html = "<table id='tablareservas' class='table table-striped'><thead><tr>";

        html += "<th>Cliente</th><th>Habitacion</th><th>Fecha de Entrada</th><th>Fecha de Salida</th></tr></thead><tbody>";

        console.log(filas);

        for(let i=0; i < filas.length; i++){
            
            const fila = filas[i];

            let fechaEntrada = formatoFecha.format(new Date(fila.fecha_entrada));

            //fechaEntrada = fechaEntrada.replace(',', '');

            let fechaSalida = formatoFecha.format(new Date(fila.fecha_salida));

            //fechaSalida = fechaSalida.replace(',', '');

            html += `<tr><td>${fila.idcliente}</td><td>${fila.idhabitacion}</td><td>${fechaEntrada}</td><td>${fechaSalida}</td></tr>`;

        }

        html += "</tbody></table>";

        tablaReservas.innerHTML = html;

    } else {
        
        html = `El usuario ${usuario} no ha realizado ninguna reserva.`;

        tablaReservas.innerHTML = html;

    }

};