const connection = require("../config/db");

// Obtener relaciones
const obtenerRelaciones = (req, res) => {

    const sql = `
        SELECT
            pp.id,
            pp.id_producto,
            p.nombre AS proveedor,
            pp.nombre_proveedor
        FROM producto_proveedor pp
        INNER JOIN proveedores p
        ON pp.id_proveedor = p.id_proveedor
    `;

    connection.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);

    });

};

// Crear relación
const crearRelacion = (req, res) => {

    const {
        id_producto,
        id_proveedor,
        nombre_proveedor
    } = req.body;

    const sql = `
        INSERT INTO producto_proveedor
        (
            id_producto,
            id_proveedor,
            nombre_proveedor
        )
        VALUES (?, ?, ?)
    `;

    connection.query(
        sql,
        [
            id_producto,
            id_proveedor,
            nombre_proveedor
        ],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                mensaje: "Relación creada"
            });

        }
    );

};

module.exports = {
    obtenerRelaciones,
    crearRelacion
};