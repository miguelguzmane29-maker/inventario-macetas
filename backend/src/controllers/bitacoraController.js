const connection = require("../config/db");

const obtenerBitacora = (req, res) => {

    const sql = `
        SELECT *
        FROM bitacora
        ORDER BY fecha DESC
    `;

    connection.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);

    });

};

const registrarBitacora = (
    usuario,
    rol,
    accion,
    modulo
) => {

    const sql = `
        INSERT INTO bitacora
        (usuario, rol, accion, modulo)
        VALUES (?, ?, ?, ?)
    `;

    connection.query(
        sql,
        [
            usuario,
            rol,
            accion,
            modulo
        ],
        (err) => {
            if (err) {
                console.log("Error bitácora:", err);
            }
        }
    );

};

module.exports = {
    obtenerBitacora,
    registrarBitacora
};