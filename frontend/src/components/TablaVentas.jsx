function TablaVentas({
    ventas,
    onEliminar
}) {

    return (

        <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-5">
                Lista de Ventas
            </h2>

            <table className="w-full">

                <thead>

                    <tr className="bg-slate-800 text-white">

                        <th className="p-3">
                            ID Venta
                        </th>

                        <th className="p-3">
                            Fecha
                        </th>

                        <th className="p-3">
                            Producto
                        </th>

                        <th className="p-3">
                            Cantidad
                        </th>

                        <th className="p-3">
                            Precio Unitario
                        </th>

                        <th className="p-3">
                            Total
                        </th>

                        <th className="p-3">
                            Acciones
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        ventas.map((venta, index) => (

                            <tr
                                key={`${venta.id_venta}-${index}`}
                                className="text-center border-b"
                            >

                                <td className="p-3">
                                    {venta.id_venta}
                                </td>

                                <td className="p-3">
                                    {
                                        new Date(
                                            venta.fecha
                                        ).toLocaleString()
                                    }
                                </td>

                                <td className="p-3">
                                    {venta.nombre_interno}
                                </td>

                                <td className="p-3">
                                    {venta.cantidad}
                                </td>

                                <td className="p-3">
                                    ${venta.precio_unitario}
                                </td>

                                <td className="p-3">
                                    ${venta.total}
                                </td>

                                <td className="p-3">

                                    <button
                                        onClick={() =>
                                            onEliminar(
                                                venta.id_venta
                                            )
                                        }
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                    >
                                        Eliminar
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );

}

export default TablaVentas;