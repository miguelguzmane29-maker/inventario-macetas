const connection = require("../config/db");

const {
    registrarBitacora
} = require("./bitacoraController");

// Obtener todos los productos
const obtenerProductos = (req, res) => {

    const sql = `
        SELECT *
        FROM productos
        ORDER BY id_producto
    `;

    connection.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);

    });

};

// Buscar por ID
const obtenerProductoPorId = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT *
        FROM productos
        WHERE id_producto = ?
    `;

    connection.query(
        sql,
        [id],
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(results[0]);

        }
    );

};

// Crear producto
const crearProducto = (req, res) => {

    const {
        id_producto,
        nombre_interno,
        descripcion,
        costo_compra,
        precio_venta,
        stock,
        tamaño,
        color,
        material,
        imagen
    } = req.body;

    const sql = `
        INSERT INTO productos
        (
            id_producto,
            nombre_interno,
            descripcion,
            costo_compra,
            precio_venta,
            stock,
            tamaño,
            color,
            material,
            imagen
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
        sql,
        [
            id_producto,
            nombre_interno,
            descripcion,
            costo_compra,
            precio_venta,
            stock,
            tamaño,
            color,
            material,
            imagen
        ],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }
                    registrarBitacora(
    "Sistema",
    "admin",
    `Creó producto ${id_producto}`,
    "Productos"
);

            res.json({
                mensaje: "Producto creado"
            });
    

        }
    );
};

// Actualizar producto
const actualizarProducto = (req, res) => {

    const { id } = req.params;

    const {
        nombre_interno,
        descripcion,
        costo_compra,
        precio_venta,
        stock,
        tamaño,
        color,
        material,
        imagen
    } = req.body;

    const sql = `
        UPDATE productos
        SET
            nombre_interno = ?,
            descripcion = ?,
            costo_compra = ?,
            precio_venta = ?,
            stock = ?,
            tamaño = ?,
            color = ?,
            material = ?,
            imagen = ?
        WHERE id_producto = ?
    `;

    connection.query(
        sql,
        [
            nombre_interno,
            descripcion,
            costo_compra,
            precio_venta,
            stock,
            tamaño,
            color,
            material,
            imagen,
            id
        ],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }
                     registrarBitacora(
    "Sistema",
    "admin",
    `Actualizó producto ${id}`,
    "Productos"
);

            res.json({
                mensaje: "Producto actualizado"
            });
   

        }
    );
};

// Eliminar producto
const eliminarProducto = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM productos
        WHERE id_producto = ?
    `;

    connection.query(
        sql,
        [id],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }
                    registrarBitacora(
    "Sistema",
    "admin",
    `Eliminó producto ${id}`,
    "Productos"
);

            res.json({
                mensaje: "Producto eliminado"
            });
    

        }
    );
};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};