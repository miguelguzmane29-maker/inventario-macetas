const connection = require("../config/db");
const {
    registrarBitacora
} = require("./bitacoraController");
// Crear venta
const crearVenta = (req, res) => {

    const { productos } = req.body;

    if (!productos || productos.length === 0) {

        return res.status(400).json({
            mensaje: "No hay productos"
        });

    }

    let totalVenta = 0;

    const obtenerProductos = `
        SELECT *
        FROM productos
        WHERE id_producto = ?
    `;

    let productosProcesados = [];
    let procesados = 0;

    productos.forEach((item) => {

        connection.query(
            obtenerProductos,
            [item.id_producto],
            (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                const producto = result[0];

                if (!producto) {

                    return res.status(404).json({
                        mensaje:
                            "Producto no encontrado"
                    });

                }

                if (
                    producto.stock <
                    item.cantidad
                ) {

                    return res.status(400).json({
                        mensaje:
                            `Stock insuficiente para ${producto.nombre_interno}`
                    });

                }

                const subtotal =
                    producto.precio_venta *
                    item.cantidad;

                totalVenta += subtotal;

                productosProcesados.push({
                    producto,
                    cantidad:
                        item.cantidad
                });

                procesados++;

                if (
                    procesados ===
                    productos.length
                ) {

                    guardarVenta();

                }

            }
        );

    });

    function guardarVenta() {

        const sqlVenta = `
            INSERT INTO ventas
            (total)
            VALUES (?)
        `;

        connection.query(
            sqlVenta,
            [totalVenta],
            (err, ventaResult) => {

                if (err) {

                    return res
                        .status(500)
                        .json(err);

                }

                const idVenta =
                    ventaResult.insertId;

                let detallesGuardados = 0;

                productosProcesados.forEach(
                    (item) => {

                        const sqlDetalle = `
                            INSERT INTO detalle_venta
                            (
                                id_venta,
                                id_producto,
                                cantidad,
                                precio_unitario
                            )
                            VALUES (?, ?, ?, ?)
                        `;

                        connection.query(
                            sqlDetalle,
                            [
                                idVenta,
                                item.producto.id_producto,
                                item.cantidad,
                                item.producto.precio_venta
                            ],
                            (err) => {

                                if (err) {

                                    return res
                                        .status(500)
                                        .json(err);

                                }

                                const sqlStock = `
                                    UPDATE productos
                                    SET stock = stock - ?
                                    WHERE id_producto = ?
                                `;

                                connection.query(
                                    sqlStock,
                                    [
                                        item.cantidad,
                                        item.producto.id_producto
                                    ]
                                );

                                detallesGuardados++;

                                if (
                                    detallesGuardados ===
                                    productosProcesados.length
                                ) {

    registrarBitacora(
    req.body.usuario || "Sistema",
    req.body.rol || "admin",
    `Registró venta #${idVenta}`,
    "Ventas"
);

res.json({
    mensaje: "Venta registrada correctamente"
});

                                }

                            }
                        );

                    }
                );

            }
        );

    }

};
// Obtener ventas con detalle
const obtenerVentas = (req, res) => {

    const sql = `
        SELECT
            v.id_venta,
            v.fecha,
            v.total,
            p.nombre_interno,
            dv.cantidad,
            dv.precio_unitario
        FROM ventas v
        INNER JOIN detalle_venta dv
            ON v.id_venta = dv.id_venta
        INNER JOIN productos p
            ON dv.id_producto = p.id_producto
        ORDER BY v.fecha DESC
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

// Obtener ganancias
const obtenerGanancias = (req, res) => {

    const sql = `
        SELECT
            IFNULL(SUM(total),0)
            AS ganancias_totales
        FROM ventas
    `;

    connection.query(
        sql,
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(results[0]);

        }
    );

};

const obtenerVentasPorFecha = (req, res) => {

    const {
        fechaInicio,
        fechaFin
    } = req.query;

    const sql = `
        SELECT
            v.id_venta,
            v.fecha,
            v.total,
            p.nombre_interno,
            dv.cantidad,
            dv.precio_unitario
        FROM ventas v
        INNER JOIN detalle_venta dv
            ON v.id_venta = dv.id_venta
        INNER JOIN productos p
            ON dv.id_producto = p.id_producto
        WHERE DATE(v.fecha)
        BETWEEN ? AND ?
        ORDER BY v.fecha DESC
    `;

    connection.query(
        sql,
        [
            fechaInicio,
            fechaFin
        ],
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(results);

        }
    );

};
const obtenerVentasPorMes = (req, res) => {

    const sql = `
        SELECT
            MONTH(fecha) AS mes,
            SUM(total) AS total
        FROM ventas
        GROUP BY MONTH(fecha)
        ORDER BY MONTH(fecha)
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
    crearVenta,
    obtenerVentas,
    obtenerGanancias,
    obtenerVentasPorFecha,
    obtenerVentasPorMes
};