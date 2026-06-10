const connection = require("../config/db");

const obtenerReportes = (req, res) => {

    const sql = `
        SELECT
            (SELECT COUNT(*) FROM productos) AS total_productos,
            (SELECT COUNT(*) FROM proveedores) AS total_proveedores,
            (SELECT IFNULL(SUM(total),0) FROM ventas) AS total_ventas,
            (
                SELECT nombre_interno
                FROM productos
                ORDER BY stock ASC
                LIMIT 1
            ) AS producto_menor_stock
    `;

    connection.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results[0]);

    });

};

const obtenerMasVendido = (req, res) => {

    const sql = `
        SELECT
            p.nombre_interno,
            SUM(dv.cantidad) AS total_vendido
        FROM detalle_venta dv
        INNER JOIN productos p
            ON dv.id_producto = p.id_producto
        GROUP BY p.id_producto
        ORDER BY total_vendido DESC
        LIMIT 5
    `;

    connection.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);

    });

};

const obtenerGananciaProductos = (req, res) => {

    const sql = `
        SELECT
            p.nombre_interno,
            SUM(dv.cantidad) AS total_vendido,
            SUM(
                (p.precio_venta - p.costo_compra)
                * dv.cantidad
            ) AS ganancia
        FROM detalle_venta dv
        INNER JOIN productos p
            ON dv.id_producto = p.id_producto
        GROUP BY p.id_producto
        ORDER BY ganancia DESC
    `;

    connection.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);

    });

};

const obtenerStockBajo = (req, res) => {

    const sql = `
        SELECT
            id_producto,
            nombre_interno,
            stock
        FROM productos
        WHERE stock <= 5
        ORDER BY stock ASC
    `;

    connection.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);

    });

};

module.exports = {
    obtenerReportes,
    obtenerMasVendido,
    obtenerGananciaProductos,
    obtenerStockBajo
};