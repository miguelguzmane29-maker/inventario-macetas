const PDFDocument = require("pdfkit");
const connection = require("../config/db");

const generarTicket = (req, res) => {

    const { id } = req.params;

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
        WHERE v.id_venta = ?
    `;

    connection.query(
        sql,
        [id],
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (results.length === 0) {

                return res.status(404).json({
                    mensaje: "Venta no encontrada"
                });

            }

            const venta = results[0];

            const doc = new PDFDocument();

            res.setHeader(
                "Content-Type",
                "application/pdf"
            );

            res.setHeader(
                "Content-Disposition",
                `attachment; filename=ticket-${id}.pdf`
            );

            doc.pipe(res);

            doc.fontSize(20)
                .text(
                    "MACETAS DE BARRO",
                    {
                        align: "center"
                    }
                );

            doc.moveDown();

            doc.fontSize(14)
                .text(
                    `Venta #${venta.id_venta}`
                );

            doc.text(
                `Fecha: ${new Date(
                    venta.fecha
                ).toLocaleString()}`
            );

            doc.moveDown();

            results.forEach((item) => {

                const subtotal =
                    item.cantidad *
                    item.precio_unitario;

                doc.text(
                    `${item.nombre_interno} x${item.cantidad} = $${subtotal}`
                );

            });

            doc.moveDown();

            doc.fontSize(16)
                .text(
                    `TOTAL: $${venta.total}`
                );

            doc.end();

        }
    );

};

module.exports = {
    generarTicket
};