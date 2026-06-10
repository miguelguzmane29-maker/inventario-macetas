import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";

function Proveedores() {

    const [proveedores, setProveedores] = useState([]);

    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");

    useEffect(() => {
        obtenerProveedores();
    }, []);

    const obtenerProveedores = async () => {

        try {

            const response = await axios.get(
                "http://localhost:3000/api/proveedores"
            );

            setProveedores(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const guardarProveedor = async () => {

        try {

            await axios.post(
                "http://localhost:3000/api/proveedores",
                {
                    nombre,
                    telefono,
                    correo
                }
            );

            setNombre("");
            setTelefono("");
            setCorreo("");

            obtenerProveedores();

        } catch (error) {

            console.error(error);

        }

    };

    return (
        <DashboardLayout>

            <h1 className="text-4xl font-bold mb-6">
                Proveedores
            </h1>

            <div className="bg-white rounded-lg shadow p-6">

                <div className="grid grid-cols-3 gap-4 mb-4">

                    <input
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) =>
                            setNombre(e.target.value)
                        }
                        className="border p-2 rounded"
                    />

                    <input
                        type="text"
                        placeholder="Teléfono"
                        value={telefono}
                        onChange={(e) =>
                            setTelefono(e.target.value)
                        }
                        className="border p-2 rounded"
                    />

                    <input
                        type="email"
                        placeholder="Correo"
                        value={correo}
                        onChange={(e) =>
                            setCorreo(e.target.value)
                        }
                        className="border p-2 rounded"
                    />

                </div>

                <button
                    onClick={guardarProveedor}
                    className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
                >
                    Guardar proveedor
                </button>

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

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

                        </tr>

                    </thead>

                    <tbody>

                        {
                            proveedores.map(
                                (proveedor) => (

                                    <tr
                                        key={
                                            proveedor.id_proveedor
                                        }
                                        className="border-b"
                                    >

                                        <td className="p-3">
                                            {
                                                proveedor.id_proveedor
                                            }
                                        </td>

                                        <td className="p-3">
                                            {
                                                proveedor.nombre
                                            }
                                        </td>

                                        <td className="p-3">
                                            {
                                                proveedor.telefono
                                            }
                                        </td>

                                        <td className="p-3">
                                            {
                                                proveedor.correo
                                            }
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