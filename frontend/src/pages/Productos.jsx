import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";

function Productos() {

    const [productos, setProductos] = useState([]);
    const [busqueda,
    setBusqueda] =
    useState("");

    const [modoEdicion, setModoEdicion] = useState(false);

    const [formulario, setFormulario] = useState({
        id_producto: "",
        nombre_interno: "",
        descripcion: "",
        costo_compra: "",
        precio_venta: "",
        stock: "",
        tamaño: "",
        color: "",
        material: "",
        imagen: ""
    });

    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = async () => {

        try {

            const response = await axios.get(
                "https://inventario-macetas-production.up.railway.app/api/productos"
            );

            setProductos(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });

    };

    const limpiarFormulario = () => {

        setFormulario({
            id_producto: "",
            nombre_interno: "",
            descripcion: "",
            costo_compra: "",
            precio_venta: "",
            stock: "",
            tamaño: "",
            color: "",
            material: "",
            imagen: ""
        });

        setModoEdicion(false);

    };

    const guardarProducto = async () => {

        try {

            await axios.post(
                "https://inventario-macetas-production.up.railway.app/api/productos",
                formulario
            );

            obtenerProductos();
            limpiarFormulario();

        } catch (error) {

            console.error(error);

        }

    };

    const editarProducto = (producto) => {

        setFormulario({
            id_producto: producto.id_producto,
            nombre_interno: producto.nombre_interno,
            descripcion: producto.descripcion,
            costo_compra: producto.costo_compra,
            precio_venta: producto.precio_venta,
            stock: producto.stock,
            tamaño: producto.tamaño,
            color: producto.color,
            material: producto.material,
            imagen: producto.imagen
        });

        setModoEdicion(true);

    };

    const actualizarProducto = async () => {

        try {

            await axios.put(
                `https://inventario-macetas-production.up.railway.app/api/productos/${formulario.id_producto}`,
                formulario
            );

            obtenerProductos();
            limpiarFormulario();

        } catch (error) {

            console.error(error);

        }

    };

    const eliminarProducto = async (id) => {

        if (!window.confirm("¿Eliminar producto?")) {
            return;
        }

        try {

            await axios.delete(
                `https://inventario-macetas-production.up.railway.app/api/productos/${id}`
            );

            obtenerProductos();

        } catch (error) {

            console.error(error);

        }

    };
    const productosFiltrados =
    productos.filter(
        (producto) =>
            producto.nombre_interno
                ?.toLowerCase()
                .includes(
                    busqueda.toLowerCase()
                ) ||

            producto.id_producto
                ?.toLowerCase()
                .includes(
                    busqueda.toLowerCase()
                ) ||

            producto.color
                ?.toLowerCase()
                .includes(
                    busqueda.toLowerCase()
                )
    );

    return (
        <DashboardLayout>

           <h1 className="text-4xl font-bold mb-6">
    Productos
</h1>

<input
    type="text"
    placeholder="Buscar producto por ID, nombre o color..."
    value={busqueda}
    onChange={(e) =>
        setBusqueda(e.target.value)
    }
    className="border p-3 rounded-lg w-full mb-6"
/>

            <div className="bg-white shadow rounded-lg p-6 mb-6">
                 
                <div className="grid grid-cols-2 gap-4">

                    <input
                        name="id_producto"
                        placeholder="ID Producto"
                        value={formulario.id_producto}
                        onChange={handleChange}
                        disabled={modoEdicion}
                        className="border p-2 rounded"
                    />

                    <input
                        name="nombre_interno"
                        placeholder="Nombre"
                        value={formulario.nombre_interno}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        name="descripcion"
                        placeholder="Descripción"
                        value={formulario.descripcion}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        name="costo_compra"
                        placeholder="Costo Compra"
                        value={formulario.costo_compra}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        name="precio_venta"
                        placeholder="Precio Venta"
                        value={formulario.precio_venta}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        name="stock"
                        placeholder="Stock"
                        value={formulario.stock}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        name="tamaño"
                        placeholder="Tamaño"
                        value={formulario.tamaño}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        name="color"
                        placeholder="Color"
                        value={formulario.color}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        name="material"
                        placeholder="Material"
                        value={formulario.material}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                   <input
    type="file"
    onChange={async (e) => {

        const data =
            new FormData();

        data.append(
            "imagen",
            e.target.files[0]
        );

        const response =
            await axios.post(
                "https://inventario-macetas-production.up.railway.app/api/upload",
                data
            );

        setFormulario({
            ...formulario,
            imagen:
                response.data.imagen
        });

    }}
    className="border p-2 rounded"
/>

                </div>

                <div className="flex gap-3 mt-4">

                    {
                        modoEdicion ? (

                            <button
                                onClick={actualizarProducto}
                                className="bg-yellow-500 text-white px-4 py-2 rounded"
                            >
                                Actualizar Producto
                            </button>

                        ) : (

                            <button
                                onClick={guardarProducto}
                                className="bg-green-600 text-white px-4 py-2 rounded"
                            >
                                Guardar Producto
                            </button>

                        )
                    }

                    <button
                        onClick={limpiarFormulario}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Limpiar
                    </button>

                </div>

            </div>

            <div className="bg-white shadow rounded-lg p-6">

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th>Imagen</th>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Stock</th>
                            <th>Costo</th>
                            <th>Venta</th>
                            <th>Acciones</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
productosFiltrados.map((producto) => (
                                <tr
                                    key={producto.id_producto}
                                    className="border-b text-center"
                                >
                                    <td>

    {
        producto.imagen && (

            <img
                src={
                    `https://inventario-macetas-production.up.railway.app/uploads/${producto.imagen}`
                }
                alt="producto"
                className="w-16 h-16 object-cover rounded mx-auto"
            />

        )
    }

</td>
                                    <td>{producto.id_producto}</td>

                                    <td>{producto.nombre_interno}</td>

                                    <td>{producto.stock}</td>

                                    <td>${producto.costo_compra}</td>

                                    <td>${producto.precio_venta}</td>

                                    <td>

                                        <div className="flex justify-center gap-2">

                                            <button
                                                onClick={() =>
                                                    editarProducto(producto)
                                                }
                                                className="bg-blue-600 text-white px-3 py-1 rounded"
                                            >
                                                Editar
                                            </button>

                                            <button
                                                onClick={() =>
                                                    eliminarProducto(
                                                        producto.id_producto
                                                    )
                                                }
                                                className="bg-red-600 text-white px-3 py-1 rounded"
                                            >
                                                Eliminar
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </DashboardLayout>
    );
}

export default Productos;