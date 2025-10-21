let mostrarTabla = false;

document.getElementById("pagos").addEventListener('click', function (e){

    mostrarTabla = !mostrarTabla;

    if(mostrarTabla == true){
        cargarTablaPagos();
    } else {
        document.getElementById("tablapagos").style.display = 'none';
    }
});

function cargarTablaPagos(){
    const usuario = sessionStorage.getItem('usuario');
    const password = sessionStorage.getItem('password');

    fetch('/menu/tablaPagos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'usuario': usuario,
            'password': password
        }
    }).then(response => response.json()).then(data => {
        mostrarPagosReservas(usuario, data.datos);
    }).catch(error => console.error('Error: ', error));

};

function mostrarPagosReservas(usuario, filas){

    const tablaPagos = document.getElementById('tablaPagos');
    let html = document.getElementById('tablaPagos');

    const formatoFecha = new Intl.DateTimeFormat('es-ES', {
        timeZone: 'Europe/Madrid',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour12: false
    });

    if(filas.length != 0){

        html = "<table id='tablapagos' class='table table-striped'><thead><tr>";

        html += "<th>Id de la Reserva</th><th>Método de Pago</th><th>Precio</th><th>Fecha de Pago</th>";

        html += "</tr></thead><tbody>";

        for(let i=0; i < filas.length; i++){

            const fila = filas[i];

            let fecha_Pago = formatoFecha.format(new Date(fila.fechapago));

            html += `<tr><td>${fila.idreserva}</td><td>${fila.metodopago}</td><td>${fila.precio}</td><td>${fecha_Pago}</td></tr>`;

        }

        html += "</tbody></table>";

        tablaPagos.innerHTML = html;

    } else{

        html = `El usuario ${usuario} no ha realizado ningún pago.`;

        tablaPagos.innerHTML = html;

    }

};