function TablaVentas({ ventas }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5">
      <h2 className="text-2xl font-bold mb-5">Historial de Ventas</h2>

      <table className="w-full">
        <thead>
          <tr className="bg-slate-800 text-white">
            
            <th className="p-3">Ticket</th>

            <th className="p-3">ID Venta</th>

            <th className="p-3">Producto</th>

            <th className="p-3">Cantidad</th>

            <th className="p-3">Precio Unitario</th>

            <th className="p-3">Total</th>

            <th className="p-3">Fecha</th>
          </tr>
        </thead>

        <tbody>
          {ventas.map((venta) => (
            <tr
              key={`${venta.id_venta}-${venta.nombre_interno}`}
              className="text-center border-b"
            >
              <td>
                <a
                  href={`http://localhost:3000/api/ticket/${venta.id_venta}`}
                  target="_blank"
                  rel="noreferrer"
                  className="
            bg-green-600
            text-white
            px-3
            py-1
            rounded
        "
                >
                  PDF
                </a>
              </td>
              <td className="p-3">{venta.id_venta}</td>

              <td className="p-3">{venta.nombre_interno}</td>

              <td className="p-3">{venta.cantidad}</td>

              <td className="p-3">${venta.precio_unitario}</td>

              <td className="p-3">${venta.total}</td>

              <td className="p-3">
                {new Date(venta.fecha).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaVentas;
