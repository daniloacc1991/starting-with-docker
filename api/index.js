const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'my_first_db',
    password: process.env.DB_PASSWORD || 'POSTGRES',
    port: process.env.DB_PORT || 5433,
});

app.get('/', (req, res) => {
    res.json({ message: '¡Hola, mundo!', nodeVersion: process.version });
});

app.get('/products', (req, res) => {
    pool.query('SELECT * FROM products', (error, results) => {
        if (error) {
            console.error('Error al obtener los productos:', error);
            res.status(500).json({ error: 'Error al obtener los productos' });
        } else {
            res.json(results.rows);
        }
    });
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});