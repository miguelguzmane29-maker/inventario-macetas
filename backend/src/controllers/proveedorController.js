const connection = require("../config/db");

const {
    registrarBitacora
} = require("./bitacoraController");

// Obtener proveedores
const obtenerProveedores = (req, res) => {

    const sql = `
        SELECT *
        FROM proveedores
        ORDER BY id_proveedor DESC
    `;

    connection.query(
        sql,
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
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

    if (!nombre || nombre.trim() === "") {
        return res.status(400).json({
            mensaje: "El nombre del proveedor es obligatorio"
        });
    }

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
                return res.status(500).json(err);
            }

            registrarBitacora(
                "Sistema",
                "admin",
                `Creó proveedor ${nombre}`,
                "Proveedores"
            );

            res.json({
                mensaje: "Proveedor creado",
                id: result.insertId
            });

        }
    );
};

// Actualizar proveedor
const actualizarProveedor = (req, res) => {

    const { id } = req.params;

    const {
        nombre,
        telefono,
        correo
    } = req.body;

    const sql = `
        UPDATE proveedores
        SET
            nombre = ?,
            telefono = ?,
            correo = ?
        WHERE id_proveedor = ?
    `;

    connection.query(
        sql,
        [
            nombre,
            telefono,
            correo,
            id
        ],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                mensaje: "Proveedor actualizado"
            });

        }
    );

};

// Eliminar proveedor
const eliminarProveedor = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM proveedores
        WHERE id_proveedor = ?
    `;

    connection.query(
        sql,
        [id],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                mensaje: "Proveedor eliminado"
            });

        }
    );

};

// Relacionar producto con proveedor
const relacionarProductoProveedor = (req, res) => {

    const {
        id_producto,
        id_proveedor,
        nombre_proveedor
    } = req.body;

    if (!id_producto || !id_proveedor || !nombre_proveedor) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

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

            registrarBitacora(
                "Sistema",
                "admin",
                `Relacionó producto ${id_producto} con proveedor ${id_proveedor}`,
                "Relaciones"
            );

            res.json({
                mensaje: "Relación creada"
            });

        }
    );
};

// Ver relaciones producto-proveedor
const obtenerRelacionProductoProveedor = (req, res) => {

    const sql = `
        SELECT
            pp.id,
            p.nombre AS proveedor,
            pp.id_producto,
            pp.nombre_proveedor
        FROM producto_proveedor pp
        INNER JOIN proveedores p
            ON pp.id_proveedor = p.id
        ORDER BY pp.id DESC
    `;

    connection.query(
        sql,
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(results);

        }
    );
};

module.exports = {
    obtenerProveedores,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor,
    relacionarProductoProveedor,
    obtenerRelacionProductoProveedor
};