const connection = require("../config/db");

// Obtener proveedores
const obtenerProveedores = (req, res) => {

    const sql =
        "SELECT * FROM proveedores";

    connection.query(
        sql,
        (err, results) => {

            if (err) {
                return res
                    .status(500)
                    .json(err);
            }

            res.json(results);

        }
    );
};

// Crear proveedor
const crearProveedor = (req, res) => {

    const {
        nombre,
        telefono,
        correo
    } = req.body;

    const sql = `
        INSERT INTO proveedores
        (nombre, telefono, correo)
        VALUES (?, ?, ?)
    `;

    connection.query(
        sql,
        [
            nombre,
            telefono,
            correo
        ],
        (err, result) => {

            if (err) {
                return res
                    .status(500)
                    .json(err);
            }

            res.json({
                mensaje:
                    "Proveedor creado",
                id:
                    result.insertId
            });

        }
    );
};

// Relacionar producto con proveedor
const relacionarProductoProveedor =
(req, res) => {

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
                return res
                    .status(500)
                    .json(err);
            }

            res.json({
                mensaje:
                    "Relación creada"
            });

        }
    );
};

// Ver relaciones producto-proveedor
const obtenerRelacionProductoProveedor =
(req, res) => {

    const sql = `
        SELECT
            pp.id,
            p.nombre AS proveedor,
            pp.id_producto,
            pp.nombre_proveedor
        FROM producto_proveedor pp
        INNER JOIN proveedores p
        ON pp.id_proveedor = p.id
    `;

    connection.query(
        sql,
        (err, results) => {

            if (err) {
                return res
                    .status(500)
                    .json(err);
            }

            res.json(results);

        }
    );
};

module.exports = {
    obtenerProveedores,
    crearProveedor,
    relacionarProductoProveedor,
    obtenerRelacionProductoProveedor
};