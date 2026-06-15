const connection = require("../config/db");

const {
    registrarBitacora
} = require("./bitacoraController");

// Validar valores numéricos
const validarProducto = (
    costo_compra,
    precio_venta,
    stock
) => {

    if (
        costo_compra === "" ||
        precio_venta === "" ||
        stock === ""
    ) {
        return "Costo, precio y stock son obligatorios";
    }

    if (
        Number(costo_compra) < 0 ||
        Number(precio_venta) < 0 ||
        Number(stock) < 0
    ) {
        return "No se permiten valores negativos";
    }

    if (
        isNaN(Number(costo_compra)) ||
        isNaN(Number(precio_venta)) ||
        isNaN(Number(stock))
    ) {
        return "Costo, precio y stock deben ser números válidos";
    }

    return null;

};

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

    const errorValidacion =
        validarProducto(
            costo_compra,
            precio_venta,
            stock
        );

    if (errorValidacion) {
        return res.status(400).json({
            mensaje: errorValidacion
        });
    }

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
            Number(costo_compra),
            Number(precio_venta),
            Number(stock),
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

    const errorValidacion =
        validarProducto(
            costo_compra,
            precio_venta,
            stock
        );

    if (errorValidacion) {
        return res.status(400).json({
            mensaje: errorValidacion
        });
    }

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
            Number(costo_compra),
            Number(precio_venta),
            Number(stock),
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

    const sqlDetalle = `
        SELECT id_detalle
        FROM detalle_venta
        WHERE id_producto = ?
        LIMIT 1
    `;

    connection.query(
        sqlDetalle,
        [id],
        (err, detalleResults) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (detalleResults.length > 0) {
                return res.status(400).json({
                    mensaje:
                        "No se puede eliminar este producto porque ya tiene ventas registradas"
                });
            }

            const sqlRelacion = `
                SELECT id
                FROM producto_proveedor
                WHERE id_producto = ?
                LIMIT 1
            `;

            connection.query(
                sqlRelacion,
                [id],
                (err, relacionResults) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    if (relacionResults.length > 0) {
                        return res.status(400).json({
                            mensaje:
                                "No se puede eliminar este producto porque está relacionado con un proveedor"
                        });
                    }

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

                }
            );

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