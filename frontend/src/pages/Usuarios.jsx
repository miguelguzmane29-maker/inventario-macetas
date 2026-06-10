import {
    useEffect,
    useState
} from "react";

import axios from "axios";

import DashboardLayout
from "../layouts/DashboardLayout";

function Usuarios() {

    const [usuarios, setUsuarios] =
        useState([]);

    const [modoEdicion, setModoEdicion] =
        useState(false);

    const [idUsuarioEditar, setIdUsuarioEditar] =
        useState(null);

    const [formulario, setFormulario] =
        useState({
            nombre: "",
            correo: "",
            password: "",
            rol: "empleado"
        });

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const obtenerUsuarios = async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:3000/api/auth/usuarios"
                );

            setUsuarios(
                response.data
            );

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        setFormulario({
            ...formulario,
            [e.target.name]:
                e.target.value
        });

    };

    const limpiarFormulario = () => {

        setFormulario({
            nombre: "",
            correo: "",
            password: "",
            rol: "empleado"
        });

        setModoEdicion(false);
        setIdUsuarioEditar(null);

    };

    const guardarUsuario = async () => {

        try {

            await axios.post(
                "http://localhost:3000/api/auth/registro",
                formulario
            );

            limpiarFormulario();
            obtenerUsuarios();

        } catch (error) {

            console.error(error);
            alert("Error al guardar usuario");

        }

    };

    const editarUsuario = (usuario) => {

        setFormulario({
            nombre:
                usuario.nombre,
            correo:
                usuario.correo,
            password:
                "",
            rol:
                usuario.rol
        });

        setIdUsuarioEditar(
            usuario.id_usuario
        );

        setModoEdicion(true);

    };

    const actualizarUsuario = async () => {

        try {

            await axios.put(
                `http://localhost:3000/api/auth/usuarios/${idUsuarioEditar}`,
                formulario
            );

            limpiarFormulario();
            obtenerUsuarios();

        } catch (error) {

            console.error(error);
            alert("Error al actualizar usuario");

        }

    };

    const eliminarUsuario = async (id) => {

        if (
            !window.confirm(
                "¿Eliminar usuario?"
            )
        ) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:3000/api/auth/usuarios/${id}`
            );

            obtenerUsuarios();

        } catch (error) {

            console.error(error);
            alert("Error al eliminar usuario");

        }

    };

    return (

        <DashboardLayout>

            <h1 className="text-4xl font-bold mb-8">
                Usuarios
            </h1>

            <div className="bg-white p-6 rounded-xl shadow mb-8">

                <h2 className="text-2xl font-bold mb-5">
                    {
                        modoEdicion
                        ? "Editar Usuario"
                        : "Registrar Usuario"
                    }
                </h2>

                <div className="grid grid-cols-2 gap-4">

                    <input
                        name="nombre"
                        placeholder="Nombre"
                        value={formulario.nombre}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        name="correo"
                        type="email"
                        placeholder="Correo"
                        value={formulario.correo}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder={
                            modoEdicion
                            ? "Nueva contraseña opcional"
                            : "Contraseña"
                        }
                        value={formulario.password}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <select
                        name="rol"
                        value={formulario.rol}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    >
                        <option value="empleado">
                            Empleado
                        </option>

                        <option value="admin">
                            Admin
                        </option>
                    </select>

                </div>

                <div className="flex gap-3 mt-5">

                    {
                        modoEdicion ? (

                            <button
                                onClick={actualizarUsuario}
                                className="bg-yellow-500 text-white px-5 py-3 rounded"
                            >
                                Actualizar Usuario
                            </button>

                        ) : (

                            <button
                                onClick={guardarUsuario}
                                className="bg-green-600 text-white px-5 py-3 rounded"
                            >
                                Guardar Usuario
                            </button>

                        )
                    }

                    <button
                        onClick={limpiarFormulario}
                        className="bg-gray-600 text-white px-5 py-3 rounded"
                    >
                        Limpiar
                    </button>

                </div>

            </div>

            <div className="bg-white p-6 rounded-xl shadow">

                <h2 className="text-2xl font-bold mb-5">
                    Lista de Usuarios
                </h2>

                <table className="w-full">

                    <thead>
                        <tr className="bg-slate-800 text-white">
                            <th className="p-3">
                                ID
                            </th>

                            <th className="p-3">
                                Nombre
                            </th>

                            <th className="p-3">
                                Correo
                            </th>

                            <th className="p-3">
                                Rol
                            </th>

                            <th className="p-3">
                                Acciones
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            usuarios.map(
                                (usuario) => (

                                    <tr
                                        key={
                                            usuario.id_usuario
                                        }
                                        className="text-center border-b"
                                    >

                                        <td className="p-3">
                                            {
                                                usuario.id_usuario
                                            }
                                        </td>

                                        <td className="p-3">
                                            {
                                                usuario.nombre
                                            }
                                        </td>

                                        <td className="p-3">
                                            {
                                                usuario.correo
                                            }
                                        </td>

                                        <td className="p-3">
                                            <span
                                                className={
                                                    usuario.rol === "admin"
                                                    ? "bg-green-600 text-white px-3 py-1 rounded-full"
                                                    : "bg-blue-600 text-white px-3 py-1 rounded-full"
                                                }
                                            >
                                                {
                                                    usuario.rol
                                                }
                                            </span>
                                        </td>

                                        <td className="p-3">

                                            <div className="flex justify-center gap-2">

                                                <button
                                                    onClick={() =>
                                                        editarUsuario(
                                                            usuario
                                                        )
                                                    }
                                                    className="bg-blue-600 text-white px-3 py-1 rounded"
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        eliminarUsuario(
                                                            usuario.id_usuario
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

export default Usuarios;