const express = require('express');

const router = express.Router();

const {
    crearVenta,
    obtenerVentas,
    obtenerGanancias,
    obtenerVentasPorFecha,
    obtenerVentasPorMes
} = require('../controllers/ventaController');

router.post('/', crearVenta);

router.get('/', obtenerVentas);

router.get('/ganancias', obtenerGanancias);

router.get('/por-fecha', obtenerVentasPorFecha);
router.get('/ventas-mes', obtenerVentasPorMes);

module.exports = router;