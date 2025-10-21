import { Client } from 'pg';

const client = new Client({
    host: "192.168.122.79",
    port: 5432,
    database: "hotel",
    user: "david",
    password: "david"
});

client.connect()
    .then(()=> console.log('Conectado OK'))
    .catch(err=> console.error('Fallo conexión:', err))
    .finally(()=> client.end());