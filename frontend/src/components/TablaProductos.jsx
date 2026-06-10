function TablaProductos({ productos, onEliminar, onEditar }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-800 text-white">
            <th>ID</th>
            <th>Nombre</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Costo</th>
            <th>Venta</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id_producto} className="text-center border-b">
              <td className="p-3">{producto.id_producto}</td>

              <td className="p-3">{producto.nombre_interno}</td>

              <td className="p-3">${producto.precio_venta}</td>

              <td className="p-3">{producto.stock}</td>
              <td>
                {producto.stock === 0 ? (
                  <span
                    className="
                bg-red-500
                text-white
                px-3
                py-1
                rounded-full
                text-sm
            "
                  >
                    Agotado
                  </span>
                ) : producto.stock <= 8 ? (
                  <span
                    className="
                bg-yellow-500
                text-white
                px-3
                py-1
                rounded-full
                text-sm
            "
                  >
                    Stock Bajo
                  </span>
                ) : (
                  <span
                    className="
                bg-green-600
                text-white
                px-3
                py-1
                rounded-full
                text-sm
            "
                  >
                    Disponible
                  </span>
                )}
              </td>

              <td className="p-3 flex justify-center gap-2">
                <button
                  onClick={() => onEditar(producto)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Editar
                </button>

                <button
                  onClick={() => onEliminar(producto.id_producto)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaProductos;
