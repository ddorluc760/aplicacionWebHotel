document.getElementById("inicioSesion").addEventListener("click", function(e){
    e.preventDefault();
    
    inicioSesion(e);
});

function inicioSesion(e){
    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("contrasenaLogin").value;

    validacionCampos(usuario, password, e);
};

function validacionCampos(usuario, password, e){
    if (usuario == ''){
        alert('El usuario está vacío');
        document.getElementById("usuario").classList.add('is-invalid');
    }else{
        document.getElementById("usuario").classList.remove('is-invalid');
        document.getElementById("usuario").classList.add('is-valid');

        if(password == ''){
            document.getElementById("contrasenaLogin").classList.add("is-invalid");
        } else{
            document.getElementById("contrasenaLogin").classList.remove("is-invalid");
            document.getElementById("contrasenaLogin").classList.add("is-valid");

            loginPostgreSQL(usuario, password);
        }
    }
};

function loginPostgreSQL(usuario, password){
    
    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password })
    }).then(res => {
        return res.json().then(data => ({ ok: res.ok, data }));
    }).then(({ ok, data }) => {
        if(ok){
            sessionStorage.setItem('usuario', usuario);
            sessionStorage.setItem('password', password);
            alert('Conectado correctamente a la base de datos');
            window.location.href = '../menu.html';
        }else{
            alert(data.error || 'Usuario o contraseña incorrectos');
        }
    }).catch(err => {
        alert('Error al conectar con el servidor');
        console.error(err);
    });
}