let mostrarTabla = false;
let mostrarTabla1 = false;

document.getElementById("usuarios").addEventListener('click', function (e){

    mostrarTabla = !mostrarTabla;

    if(mostrarTabla == true){
        cargarTablaUsuarios();
    } else {
        document.getElementById("tablausuarios").style.display = 'none';
    }
});

document.getElementById("clientes").addEventListener('click', function (e){

    mostrarTabla1 = !mostrarTabla1;

    if(mostrarTabla1 == true){
        cargarTablaClientes();
    } else {
        document.getElementById("tablaclientes").style.display = 'none';
    }
});


function cargarTablaUsuarios(){
    const usuario = sessionStorage.getItem('usuario');
    const password = sessionStorage.getItem('password');

    fetch('/menu/tablaUsuarios', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'usuario': usuario,
            'password': password
        }
    }).then(response => response.json()).then(data => {
        mostrarDatosUsuario(usuario, data.datos);
    }).catch(error => console.error('Error: ', error));
};

function mostrarDatosUsuario(usuario, filas){

    const tablaUsuarios = document.getElementById("tablaUsuarios");

    let html = document.getElementById('tablaUsuarios');

    

    if (filas.length != 0){
        
        html = "<table id='tablausuarios' class='table table-striped'><thead><tr>";

        html += `<th>Usuario</th><th>Contraseña</th><th>Cliente</th>`
        

        html += "</tr></thead><tbody>";

        for (let i=0; i < filas.length; i++){

            const fila = filas[i];
            html += "<tr>";

            html += `
                <td>${fila.usuario}</td>
                <td>${fila.password}</td>
                <td>${fila.idcliente}</td>
            `;

            html += "</tr>";
        }
        
        html += "</tbody></table>";

        tablaUsuarios.innerHTML = html;
    } else {

        html = `<p>El usuario ${usuario} no existe.</p>`

        tablaUsuarios.innerHTML = html;
    }

};

function cargarTablaClientes(){
    const usuario = sessionStorage.getItem('usuario');
    const password = sessionStorage.getItem('password');

    fetch('/menu/tablaClientes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'usuario': usuario,
            'password': password
        }
    }).then(response => response.json()).then(data => {
        mostrarDatosCliente(usuario, data.datos);
    }).catch(error => console.error('Error: ', error));
};

function mostrarDatosCliente(usuario, filas){

    const tablaClientes = document.getElementById("tablaClientes");

    let html = document.getElementById('tablaClientes');

    

    if (filas.length != 0){
        
        html = "<table id='tablaclientes' class='table table-striped'><thead><tr>";

        html += `<th>Nombre</th><th>Primer Apellido</th><th>Segundo Apellido</th><th>Correo Electrónico</th><th>Teléfono</th>`
        

        html += "</tr></thead><tbody>";

        for (let i=0; i < filas.length; i++){

            const fila = filas[i];
            html += "<tr>";

            html += `
                <td>${fila.nombre}</td>
                <td>${fila.primerapellido}</td>
                <td>${fila.segundoapellido}</td>
                <td>${fila.email}</td>
                <td>${fila.telefono}</td>
            `;

            html += "</tr>";
        }
        
        html += "</tbody></table>";

        tablaClientes.innerHTML = html;
    } else {

        html = `<p>El usuario ${usuario} no existe.</p>`

        tablaClientes.innerHTML = html;
    }

};