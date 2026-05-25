require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./src/routes/authRoutes');
const shipmentRoutes = require('./src/routes/shipmentRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const contactRoutes = require('./src/routes/contactRoutes');

const app = express();

// Middlewares
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Responder explícitamente a las peticiones OPTIONS
//app.options('*', cors());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/shipments', shipmentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Backend funcionando' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Ocurrió un error en el servidor.' });
});

const PORT = process.env.PORT || 5000;

const mongooseOptions = {
    family: 4,                  // Fuerza a Node.js a usar IPv4 
    serverSelectionTimeoutMS: 5000 // Si en 5 segundos no conecta, aborta en lugar de detenerse 30 segundos
};

mongoose.connect(process.env.MONGO_URI, mongooseOptions)
    .then(() => {
        console.log('Conectado a MongoDB exitosamente');
        app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
    })
    .catch((error) => {
        console.error('Error crítico conectando a MongoDB:', error.message);
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en modo de degradación (Sin DB) en puerto ${PORT}`);
        });
    });