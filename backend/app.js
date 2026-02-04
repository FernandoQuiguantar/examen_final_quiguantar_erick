const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/tasks', taskRoutes);

// Puerto
const PORT = 3000;

// Sincronización con la DB y arranque
sequelize.sync({ force: false }) // force: false evita borrar los datos cada vez que reinicias
    .then(() => {
        console.log('Conexión a PostgreSQL exitosa (Docker)');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al conectar con la base de datos:', err);
    });