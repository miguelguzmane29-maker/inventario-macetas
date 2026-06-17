const express = require("express");

const router = express.Router();

const {
    obtenerProveedores,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor,
    relacionarProductoProveedor,
    obtenerRelacionProductoProveedor
} = require("../controllers/proveedorController");

router.get(
    "/",
    obtenerProveedores
);

router.post(
    "/",
    crearProveedor
);

router.put(
    "/:id",
    actualizarProveedor
);

router.delete(
    "/:id",
    eliminarProveedor
);

router.post(
    "/relacionar",
    relacionarProductoProveedor
);

router.get(
    "/relaciones",
    obtenerRelacionProductoProveedor
);

module.exports = router;