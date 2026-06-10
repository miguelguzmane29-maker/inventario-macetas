const express =
require("express");

const router =
express.Router();

const {
    obtenerProveedores,
    crearProveedor,
    relacionarProductoProveedor,
    obtenerRelacionProductoProveedor
} = require(
"../controllers/proveedorController"
);

router.get(
    "/",
    obtenerProveedores
);

router.post(
    "/",
    crearProveedor
);

router.post(
    "/relacionar",
    relacionarProductoProveedor
);

router.get(
    "/relaciones",
    obtenerRelacionProductoProveedor
);

module.exports =
router;