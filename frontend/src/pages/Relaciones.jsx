import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";

function Relaciones() {

    const [relaciones, setRelaciones] = useState([]);
    const [productos, setProductos] = useState([]);
    const [proveedores, setProveedores] = useState([]);

    const [formulario, setFormulario] = useState({
        id_producto: "",
        id_proveedor: "",
        nombre_proveedor: ""
    });

    useEffect(() => {

        obtenerRelaciones();
        obtenerProductos();
        obtenerProveedores();

    }, []);

    const obtenerRelaciones = async () => {

        try {

            const response = await axios.get(
                "https://inventario-macetas-production.up.railway.app/api/relaciones"
            );

            setRelaciones(response.data);

        } catch (error) {

            console.error(error);

        }

    };

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

    const obtenerProveedores = async () => {

        try {

            const response = await axios.get(
                "https://inventario-macetas-production.up.railway.app/api/proveedores"
            );

            setProveedores(response.data);

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

    const guardarRelacion = async () => {

        try {

            await axios.post(
                "https://inventario-macetas-production.up.railway.app/api/relaciones",
                formulario
            );

            obtenerRelaciones();

            setFormulario({
                id_producto: "",
                id_proveedor: "",
                nombre_proveedor: ""
            });

        } catch (error) {

            console.error(error);

        }

    };

    return (
        <DashboardLayout>

            <h1 className="text-4xl font-bold mb-6">
                Relación Producto - Proveedor
            </h1>

            <div className="bg-white p-6 rounded-lg shadow mb-6">

                <div className="grid grid-cols-3 gap-4">

                    <select
                        name="id_producto"
                        value={formulario.id_producto}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    >

                        <option value="">
                            Seleccionar producto
                        </option>

                        {
                            productos.map((producto) => (

                                <option
                                    key={producto.id_producto}
                                    value={producto.id_producto}
                                >
                                    {producto.id_producto} - {producto.nombre_interno}
                                </option>

                            ))
                        }

                    </select>

                    <select
                        name="id_proveedor"
                        value={formulario.id_proveedor}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    >

                        <option value="">
                            Seleccionar proveedor
                        </option>

                        {
                            proveedores.map((proveedor) => (

                                <option
                                    key={proveedor.id_proveedor}
                                    value={proveedor.id_proveedor}
                                >
                                    {proveedor.nombre}
                                </option>

                            ))
                        }

                    </select>

                    <input
                        type="text"
                        name="nombre_proveedor"
                        placeholder="Nombre Maceta"
                        value={formulario.nombre_proveedor}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                </div>

                <button
                    onClick={guardarRelacion}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
                >
                    Guardar Relación
                </button>

            </div>

            <div className="bg-white p-6 rounded-lg shadow">

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th>ID</th>
                            <th>Producto</th>
                            <th>Proveedor</th>
                            <th>Nombre Macetas</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            relaciones.map((relacion) => (

                                <tr
                                    key={relacion.id}
                                    className="border-b text-center"
                                >

                                    <td>{relacion.id}</td>

                                    <td>
                                        {relacion.id_producto}
                                    </td>

                                    <td>
                                        {relacion.proveedor}
                                    </td>

                                    <td>
                                        {relacion.nombre_proveedor}
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

export default Relaciones;