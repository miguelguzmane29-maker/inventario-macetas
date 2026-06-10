const express = require("express");

const router =
    express.Router();

const {
    generarTicket
} = require(
    "../controllers/ticketController"
);

router.get(
    "/:id",
    generarTicket
);

module.exports =
    router;