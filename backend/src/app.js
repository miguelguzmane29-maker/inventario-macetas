const express = require('express');
const path = require("path");
const cors = require('cors');
const dotenv = require('dotenv');

const bitacoraRoutes = 
require("./routes/bitacoraRoutes");

const authRoutes =
require("./routes/authRoutes");

const ticketRoutes =
require("./routes/ticketRoutes");

const uploadRoutes =
require("./routes/uploadRoutes");

const reporteRoutes =
require("./routes/reporteRoutes");

const relacionRoutes =
require("./routes/relacionRoutes");

const proveedorRoutes =
require("./routes/proveedorRoutes");

const productoRoutes = require('./routes/productoRoutes');
const ventaRoutes = require('./routes/ventaRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(
    "/uploads",
    express.static(
        path.join(
            __dirname,
            "../uploads"
        )
    )
);

app.use('/api/proveedores', proveedorRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/ventas', ventaRoutes);

app.use(
    "/api/ticket",
    ticketRoutes
);

app.use(
    "/api/upload",
    uploadRoutes
);

app.use(
    "/api/relaciones",
    relacionRoutes
);

app.use(
    "/api/reportes",
    reporteRoutes
);

app.use(
    "/api/auth",
    authRoutes
);
app.use("/api/bitacora", bitacoraRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});