const express = require("express");

const router = express.Router();

const {
    obtenerRelaciones,
    crearRelacion
} = require("../controllers/relacionController");

router.get("/", obtenerRelaciones);

router.post("/", crearRelacion);

module.exports = router;