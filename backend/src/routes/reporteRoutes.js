const express = require("express");

const router = express.Router();

const {
    obtenerReportes,
    obtenerMasVendido,
    obtenerGananciaProductos,
    obtenerStockBajo
} = require("../controllers/reporteController");

router.get(
    "/",
    obtenerReportes
);

router.get(
    "/mas-vendido",
    obtenerMasVendido
);

router.get(
    "/ganancias-productos",
    obtenerGananciaProductos
);

router.get(
    "/stock-bajo",
    obtenerStockBajo
);

module.exports = router;