let mostrarTabla = false;

document.getElementById("habitaciones").addEventListener('click', function (e){

    mostrarTabla = !mostrarTabla;

    if(mostrarTabla == true){
        cargarTablaHabitaciones();
    } else {
        document.getElementById("tablahabitaciones").style.display = 'none';
    }
});

function cargarTablaHabitaciones(){
    
    const usuario = sessionStorage.getItem('usuario');
    const password = sessionStorage.getItem('password');

    fetch('/menu/tablaHabitaciones', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
                   'usuario': usuario,
                   'password': password
        }
    }).then(response => response.json()).then(data => {
        console.log(data);
        mostrarTablaHabitaciones(usuario, data.datos);
    }).catch(error => console.error('Error: ', error));
};


function mostrarTablaHabitaciones(usuario, filas){

    const tablaHabitaciones = document.getElementById("tablaHabitaciones");

    let html = document.getElementById('tablaHabitaciones');

    

    if (filas.length != 0){
        
        html = "<table id='tablahabitaciones' class='table table-striped'><thead><tr>";

        html += `<th>Número</th><th>Tipo</th><th>Precio</th>`
        

        html += "</tr></thead><tbody>";

        for (let i=0; i < filas.length; i++){

            const fila = filas[i];
            html += "<tr>";

            html += `
                <td>${fila.numero}</td>
                <td>${fila.tipo}</td>
                <td>${fila.precio}</td>
            `;

            html += "</tr>";
        }
        
        html += "</tbody></table>";

        tablaHabitaciones.innerHTML = html;
    } else {

        html = `<p>El usuario ${usuario} no ha reservado ninguna habitación</p>`

        tablaHabitaciones.innerHTML = html;
    }

};
