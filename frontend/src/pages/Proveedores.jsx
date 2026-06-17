import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";

function Proveedores() {

    const API_URL =
        "https://inventario-macetas-production.up.railway.app";

    const [proveedores, setProveedores] =
        useState([]);

    const [modoEdicion, setModoEdicion] =
        useState(false);

    const [idProveedorEditar, setIdProveedorEditar] =
        useState(null);

    const [formulario, setFormulario] =
        useState({
            nombre: "",
            telefono: "",
            correo: ""
        });

    useEffect(() => {
        obtenerProveedores();
    }, []);

    const obtenerProveedores = async () => {

        try {

            const response =
                await axios.get(
                    `${API_URL}/api/proveedores`
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

    const limpiarFormulario = () => {

        setFormulario({
            nombre: "",
            telefono: "",
            correo: ""
        });

        setModoEdicion(false);
        setIdProveedorEditar(null);

    };

    const validarFormulario = () => {

        if (
            !formulario.nombre ||
            formulario.nombre.trim() === ""
        ) {
            alert("El nombre del proveedor es obligatorio");
            return false;
        }

        return true;

    };

    const guardarProveedor = async () => {

        if (!validarFormulario()) {
            return;
        }

        try {

            await axios.post(
                `${API_URL}/api/proveedores`,
                formulario
            );

            limpiarFormulario();
            obtenerProveedores();

            alert("Proveedor guardado correctamente");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.mensaje ||
                "Error al guardar proveedor"
            );

        }

    };

    const editarProveedor = (proveedor) => {

        setFormulario({
            nombre: proveedor.nombre || "",
            telefono: proveedor.telefono || "",
            correo: proveedor.correo || ""
        });

        setIdProveedorEditar(
            proveedor.id
        );

        setModoEdicion(true);

    };

    const actualizarProveedor = async () => {

        if (!validarFormulario()) {
            return;
        }

        try {

            await axios.put(
                `${API_URL}/api/proveedores/${idProveedorEditar}`,
                formulario
            );

            limpiarFormulario();
            obtenerProveedores();

            alert("Proveedor actualizado correctamente");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.mensaje ||
                "Error al actualizar proveedor"
            );

        }

    };

    const eliminarProveedor = async (id) => {

        if (
            !window.confirm(
                "¿Eliminar proveedor?"
            )
        ) {
            return;
        }

        try {

            await axios.delete(
                `${API_URL}/api/proveedores/${id}`
            );

            obtenerProveedores();

            alert("Proveedor eliminado correctamente");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.mensaje ||
                "No se pudo eliminar el proveedor"
            );

        }

    };

    return (

        <DashboardLayout>

            <h1 className="text-4xl font-bold mb-6">
                Proveedores
            </h1>

            <div className="bg-white rounded-lg shadow p-6 mb-6">

                <h2 className="text-2xl font-bold mb-5">
                    {
                        modoEdicion
                            ? "Editar Proveedor"
                            : "Registrar Proveedor"
                    }
                </h2>

                <div className="grid grid-cols-3 gap-4 mb-4">

                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={formulario.nombre}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        type="text"
                        name="telefono"
                        placeholder="Teléfono"
                        value={formulario.telefono}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        type="email"
                        name="correo"
                        placeholder="Correo"
                        value={formulario.correo}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                </div>

                <div className="flex gap-3">

                    {
                        modoEdicion ? (

                            <button
                                onClick={actualizarProveedor}
                                className="bg-yellow-500 text-white px-4 py-2 rounded"
                            >
                                Actualizar proveedor
                            </button>

                        ) : (

                            <button
                                onClick={guardarProveedor}
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Guardar proveedor
                            </button>

                        )
                    }

                    <button
                        onClick={limpiarFormulario}
                        className="bg-gray-600 text-white px-4 py-2 rounded"
                    >
                        Limpiar
                    </button>

                </div>

            </div>

            <div className="bg-white rounded-lg shadow p-6">

                <h2 className="text-2xl font-bold mb-5">
                    Lista de Proveedores
                </h2>

                <table className="w-full">

                    <thead>

                        <tr className="bg-slate-800 text-white">

                            <th className="text-left p-3">
                                ID
                            </th>

                            <th className="text-left p-3">
                                Nombre
                            </th>

                            <th className="text-left p-3">
                                Teléfono
                            </th>

                            <th className="text-left p-3">
                                Correo
                            </th>

                            <th className="text-center p-3">
                                Acciones
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            proveedores.map(
                                (proveedor) => (

                                    <tr
                                        key={proveedor.id_proveedor}
                                        className="border-b"
                                    >

                                        <td className="p-3">
                                            {proveedor.id_proveedor}
                                        </td>

                                        <td className="p-3">
                                            {proveedor.nombre}
                                        </td>

                                        <td className="p-3">
                                            {proveedor.telefono}
                                        </td>

                                        <td className="p-3">
                                            {proveedor.correo}
                                        </td>

                                        <td className="p-3">

                                            <div className="flex justify-center gap-2">

                                                <button
                                                    onClick={() =>
                                                        editarProveedor(
                                                            proveedor
                                                        )
                                                    }
                                                    className="bg-blue-600 text-white px-3 py-1 rounded"
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        eliminarProveedor(
                                                            proveedor.id_proveedor
                                                        )
                                                    }
                                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Eliminar
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                )
                            )
                        }

                    </tbody>

                </table>

            </div>

        </DashboardLayout>

    );
}

export default Proveedores;