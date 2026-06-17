import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";

function Productos() {

    const API_URL =
        "https://inventario-macetas-production.up.railway.app";

    const [productos, setProductos] =
        useState([]);

    const [busqueda, setBusqueda] =
        useState("");

    const [modoEdicion, setModoEdicion] =
        useState(false);

    const [formulario, setFormulario] =
        useState({
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
                `${API_URL}/api/productos`
            );

            setProductos(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (
            ["costo_compra", "precio_venta", "stock"].includes(name) &&
            Number(value) < 0
        ) {
            alert("No se permiten valores negativos");
            return;
        }

        setFormulario({
            ...formulario,
            [name]: value
        });

    };

    const validarFormulario = () => {

        if (
            Number(formulario.costo_compra) < 0 ||
            Number(formulario.precio_venta) < 0 ||
            Number(formulario.stock) < 0
        ) {
            alert("No se permiten valores negativos");
            return false;
        }

        if (
            formulario.costo_compra === "" ||
            formulario.precio_venta === "" ||
            formulario.stock === ""
        ) {
            alert("Costo, precio y stock son obligatorios");
            return false;
        }

        return true;

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

        if (!validarFormulario()) {
            return;
        }

        try {

            await axios.post(
                `${API_URL}/api/productos`,
                formulario
            );

            await obtenerProductos();
            limpiarFormulario();

            alert("Producto guardado correctamente");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.mensaje ||
                "Error al guardar producto"
            );

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

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

    const actualizarProducto = async () => {

        if (!validarFormulario()) {
            return;
        }

        try {

            await axios.put(
                `${API_URL}/api/productos/${formulario.id_producto}`,
                formulario
            );

            await obtenerProductos();
            limpiarFormulario();

            alert("Producto actualizado correctamente");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.mensaje ||
                "Error al actualizar producto"
            );

        }

    };

    const eliminarProducto = async (id) => {

        if (!window.confirm("¿Eliminar producto?")) {
            return;
        }

        try {

            await axios.delete(
                `${API_URL}/api/productos/${id}`
            );

            await obtenerProductos();

            alert("Producto eliminado correctamente");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.mensaje ||
                "No se pudo eliminar el producto. Puede estar relacionado con ventas."
            );

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

            <div className="bg-white shadow rounded-lg p-6 mb-6">

                <h2 className="text-2xl font-bold mb-5">
                    {
                        modoEdicion
                            ? "Editar Producto"
                            : "Registro de Productos"
                    }
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div>
                        <label className="block font-semibold mb-1">
                            ID Producto
                        </label>

                        <input
                            name="id_producto"
                            placeholder="Ej. MAC-001"
                            value={formulario.id_producto}
                            onChange={handleChange}
                            disabled={modoEdicion}
                            className="border p-3 rounded w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">
                            Nombre del Producto
                        </label>

                        <input
                            name="nombre_interno"
                            placeholder="Ej. Maceta de barro"
                            value={formulario.nombre_interno}
                            onChange={handleChange}
                            className="border p-3 rounded w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">
                            Descripción
                        </label>

                        <input
                            name="descripcion"
                            placeholder="Ej. Maceta artesanal"
                            value={formulario.descripcion}
                            onChange={handleChange}
                            className="border p-3 rounded w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">
                            Costo de Compra ($)
                        </label>

                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            name="costo_compra"
                            placeholder="Ej. 120.00"
                            value={formulario.costo_compra}
                            onChange={handleChange}
                            className="border p-3 rounded w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">
                            Precio de Venta ($)
                        </label>

                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            name="precio_venta"
                            placeholder="Ej. 220.00"
                            value={formulario.precio_venta}
                            onChange={handleChange}
                            className="border p-3 rounded w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">
                            Stock
                        </label>

                        <input
                            type="number"
                            min="0"
                            step="1"
                            name="stock"
                            placeholder="Ej. 10"
                            value={formulario.stock}
                            onChange={handleChange}
                            className="border p-3 rounded w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">
                            Tamaño
                        </label>

                        <input
                            name="tamaño"
                            placeholder="Ej. Grande, mediana, 12x15"
                            value={formulario.tamaño}
                            onChange={handleChange}
                            className="border p-3 rounded w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">
                            Color
                        </label>

                        <input
                            name="color"
                            placeholder="Ej. Rojo, café, verde"
                            value={formulario.color}
                            onChange={handleChange}
                            className="border p-3 rounded w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">
                            Material
                        </label>

                        <input
                            name="material"
                            placeholder="Ej. Barro"
                            value={formulario.material}
                            onChange={handleChange}
                            className="border p-3 rounded w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">
                            Imagen del Producto
                        </label>

                        <input
                            type="file"
                            onChange={async (e) => {

                                const archivo =
                                    e.target.files[0];

                                if (!archivo) {
                                    return;
                                }

                                const data =
                                    new FormData();

                                data.append(
                                    "imagen",
                                    archivo
                                );

                                const response =
                                    await axios.post(
                                        `${API_URL}/api/upload`,
                                        data
                                    );

                                setFormulario({
                                    ...formulario,
                                    imagen:
                                        response.data.imagen
                                });

                            }}
                            className="border p-3 rounded w-full"
                        />

                        {
                            formulario.imagen && (
                                <p className="text-sm text-green-700 mt-2">
                                    Imagen cargada correctamente
                                </p>
                            )
                        }
                    </div>

                </div>

                <div className="flex gap-3 mt-6">

                    {
                        modoEdicion ? (

                            <button
                                onClick={actualizarProducto}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded font-semibold"
                            >
                                Actualizar Producto
                            </button>

                        ) : (

                            <button
                                onClick={guardarProducto}
                                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded font-semibold"
                            >
                                Guardar Producto
                            </button>

                        )
                    }

                    <button
                        onClick={limpiarFormulario}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded font-semibold"
                    >
                        Limpiar
                    </button>

                </div>

            </div>

            <div className="mb-6">

                <label className="block font-semibold mb-2">
                    Buscar Producto
                </label>

                <input
                    type="text"
                    placeholder="Buscar por ID, nombre o color..."
                    value={busqueda}
                    onChange={(e) =>
                        setBusqueda(e.target.value)
                    }
                    className="border p-3 rounded-lg w-full"
                />

            </div>

            <div className="bg-white shadow rounded-lg p-6 overflow-x-auto">

                <h2 className="text-2xl font-bold mb-5">
                    Lista de Productos
                </h2>

                <table className="w-full">

                    <thead>

                        <tr className="bg-slate-800 text-white">

                            <th className="p-3">Imagen</th>
                            <th className="p-3">ID</th>
                            <th className="p-3">Nombre</th>
                            <th className="p-3">Stock</th>
                            <th className="p-3">Costo</th>
                            <th className="p-3">Venta</th>
                            <th className="p-3">Acciones</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            productosFiltrados.map((producto) => (

                                <tr
                                    key={producto.id_producto}
                                    className="border-b text-center"
                                >

                                    <td className="p-3">

                                        {
                                            producto.imagen ? (

                                                <img
                                                    src={
                                                        `${API_URL}/uploads/${producto.imagen}`
                                                    }
                                                    alt="producto"
                                                    className="w-16 h-16 object-cover rounded mx-auto"
                                                />

                                            ) : (

                                                <span className="text-gray-400">
                                                    Sin imagen
                                                </span>

                                            )
                                        }

                                    </td>

                                    <td className="p-3">
                                        {producto.id_producto}
                                    </td>

                                    <td className="p-3">
                                        {producto.nombre_interno}
                                    </td>

                                    <td className="p-3">
                                        <span
                                            className={
                                                producto.stock <= 5
                                                    ? "bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold"
                                                    : producto.stock <= 10
                                                        ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold"
                                                        : "bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold"
                                            }
                                        >
                                            {producto.stock}
                                        </span>
                                    </td>

                                    <td className="p-3">
                                        ${producto.costo_compra}
                                    </td>

                                    <td className="p-3">
                                        ${producto.precio_venta}
                                    </td>

                                    <td className="p-3">

                                        <div className="flex justify-center gap-2">

                                            <button
                                                onClick={() =>
                                                    editarProducto(producto)
                                                }
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                                            >
                                                Editar
                                            </button>

                                            <button
                                                onClick={() =>
                                                    eliminarProducto(
                                                        producto.id_producto
                                                    )
                                                }
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
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