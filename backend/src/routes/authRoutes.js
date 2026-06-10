const express = require("express");

const router = express.Router();

const {
    registrarUsuario,
    login,
    obtenerUsuarios,
    actualizarUsuario,
    eliminarUsuario
} = require("../controllers/authController");

router.post(
    "/registro",
    registrarUsuario
);

router.post(
    "/login",
    login
);

router.get(
    "/usuarios",
    obtenerUsuarios
);

router.put(
    "/usuarios/:id",
    actualizarUsuario
);

router.delete(
    "/usuarios/:id",
    eliminarUsuario
);

module.exports = router;