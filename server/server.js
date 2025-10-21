import { Client } from "pg";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { error } from "console";
import { ok } from "assert";

const app = express();
const port = 4000;
const __filename = fileURLToPath(import.meta.url);

app.use(express.json());

//Usar archivos de la carpeta public tanto htmls como javascripts.
app.use(express.static(path.join(path.dirname(__filename), '../public')));

//Mostrar el login.html como primerar página nada más acceder a la URL
app.get('/', (req, res) => {
    res.sendFile(path.join(path.dirname(__filename), '../public/login.html'));
});

//Ruta LOGIN
app.post('/login', async(req, res) => {

    const { usuario, password } = req.body;

    if (!usuario || !password){
        return res.status(400).json({ error: 'Falta usuario o contraseña' });
    } else{
        const conexion = new Client({
            host: "192.168.122.79",
            port: 5432,
            database: "webhotel",
            user: usuario,
            password: password
        });

        try {
            await conexion.connect();
            //await conexion.end();
            res.json({ ok: true, msg: 'Login correcto' });
            
        } catch(err){
            await conexion.end().catch(() => {});
            res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }
    }

});

//Obtener tabla Habitaciones
app.get('/menu/tablaHabitaciones', (req, res) => {
    
    const { usuario, password } = req.headers;

    if (!usuario || !password){
        return res.status(400).json({ error: "Faltan credenciales en la cabecera" });
    } else {
        const conexion = new Client({
            host: "192.168.122.79",
            port: 5432,
            database: "webhotel",
            user: usuario,
            password: password
        });

        conexion.connect().then(() => {
            const query = `SELECT * FROM habitaciones WHERE id IN (SELECT idHabitacion FROM reservas WHERE idCliente IN (SELECT id FROM clientes WHERE id IN (SELECT idCliente FROM usuarios WHERE usuario = $1 AND password = $2)) );`;
            return conexion.query(query, [usuario, password]);
        }).then(result => {
            res.json({ ok: true, datos: result.rows});
            //return conexion.end();
        }).catch(err => {
            console.error("Error al obtener habitaciones: ", err.message);
            res.status(500).json({ error: "No se pudieron obtener los datos" });
            conexion.end();
        });
    }

});

//Obtener reservas de un usuario
app.get('/menu/tablaReservas', (req, res) => {
    const { usuario, password } = req.headers;

    if(!usuario || !password){
        return res.status(400).json({error: "Faltan credenciales en la cabecera"});
    } else{
        const conexion = new Client({
            host: "192.168.122.79",
            port: 5432,
            database: "webhotel",
            user: usuario,
            password: password
        });

        conexion.connect().then(() => {
            const query = `SELECT r.* FROM reservas r WHERE r.idCliente IN (SELECT c.id FROM clientes c WHERE c.id IN (SELECT u.idCliente FROM usuarios u WHERE u.usuario = $1 AND u.password = $2))`;
            return conexion.query(query, [usuario, password]);
        }).then(result => {
            res.json({
                ok: true,
                datos: result.rows
            });
        }).catch(err => {
            console.log("Error al obtener las reservas: ", err.message);
            res.status(500).json({ error: "No se pudieron obtener los datos." });
            conexion.end();
        });

    }

});

//Obtener pagos de las reservas
app.get('/menu/tablaPagos', (req, res) => {

    let { usuario, password} = req.headers;

    if(!usuario | !password){

        return res.status(400).json({ error: "Faltan credenciales en la cabecera"});

    } else{

        const conexion = new Client({
            host: "192.168.122.79",
            port: 5432,
            database: "webhotel",
            user: usuario,
            password: password
        });

        conexion.connect().then(() => {
            const query = `SELECT p.* FROM pagos p WHERE p.idReserva IN (SELECT r.id FROM reservas r WHERE r.idCliente IN (SELECT c.id FROM clientes c WHERE c.id IN (SELECT u.idCliente FROM usuarios u WHERE u.usuario = $1 AND u.password = $2)))`;
            return conexion.query(query, [usuario, password]);
        }).then(result => {
            res.json({
                ok: true,
                datos: result.rows
            });
        }).catch(err => {
            res.status(500).json({ error: "No se pudieron obtener los datos." });
            conexion.end();
        });
    }

});

//Obtener datos de los Clientes
app.get('/menu/tablaClientes', (req,res) => {

    let {usuario, password} = req.headers;

    if(!usuario || !password){
        return res.status(400).json({ error: "Faltan credenciales en la cabecera" });
    } else{
        const conexion = new Client({
            host: "192.168.122.79",
            port: 5432,
            database: "webhotel",
            user: usuario,
            password: password
        });

        conexion.connect().then(() => {
            const query = `SELECT c.* FROM clientes c WHERE c.id IN (SELECT u.idCliente FROM usuarios u WHERE u.usuario = $1 AND u.password = $2)`;
            return conexion.query(query, [usuario, password]);
        }).then(result => {
            res.json({
                ok: true,
                datos: result.rows
            });
        }).catch(err => {
            res.status(500).json({ error: "No se pudieron obtener los datos." })
            conexion.end();
        });
    }

});

app.get('/menu/tablaUsuarios', (req,res) => {

    let {usuario, password} = req.headers;

    if(!usuario || !password){
        return res.status(400).json({ error: "Faltan credenciales en la cabecera" });
    } else{
        const conexion = new Client({
            host: "192.168.122.79",
            port: 5432,
            database: "webhotel",
            user: usuario,
            password: password
        });

        conexion.connect().then(() => {
            const query = `SELECT u.* FROM usuarios u WHERE u.usuario = $1 AND u.password = $2`;
            return conexion.query(query, [usuario, password]);
        }).then(result => {
            res.json({
                ok: true,
                datos: result.rows
            });
        }).catch(err => {
            res.status(500).json({ error: "No se pudieron obtener los datos." })
            conexion.end();
        });
    }

});

//Arrancar el servidor
app.listen(port, () => {
    console.log(`Servidor Corriendo en http://localhost:${port}`);
});