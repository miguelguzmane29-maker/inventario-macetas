import {
    useEffect,
    useState
} from "react";

import axios from "axios";

import DashboardLayout
from "../layouts/DashboardLayout";

function Bitacora() {

    const [registros, setRegistros] =
        useState([]);

    useEffect(() => {
        obtenerBitacora();
    }, []);

    const obtenerBitacora = async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:3000/api/bitacora"
                );

            setRegistros(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <DashboardLayout>

            <h1 className="text-4xl font-bold mb-8">
                Bitácora
            </h1>

            <div className="bg-white p-6 rounded-xl shadow">

                <h2 className="text-2xl font-bold mb-5">
                    Registro de Actividades
                </h2>

                <table className="w-full">

                    <thead>

                        <tr className="bg-slate-800 text-white">

                            <th className="p-3">
                                ID
                            </th>

                            <th className="p-3">
                                Usuario
                            </th>

                            <th className="p-3">
                                Rol
                            </th>

                            <th className="p-3">
                                Acción
                            </th>

                            <th className="p-3">
                                Módulo
                            </th>

                            <th className="p-3">
                                Fecha
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            registros.map((item) => (

                                <tr
                                    key={item.id_bitacora}
                                    className="text-center border-b"
                                >

                                    <td className="p-3">
                                        {item.id_bitacora}
                                    </td>

                                    <td className="p-3">
                                        {item.usuario}
                                    </td>

                                    <td className="p-3">
                                        {item.rol}
                                    </td>

                                    <td className="p-3">
                                        {item.accion}
                                    </td>

                                    <td className="p-3">
                                        {item.modulo}
                                    </td>

                                    <td className="p-3">
                                        {
                                            new Date(
                                                item.fecha
                                            ).toLocaleString()
                                        }
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

export default Bitacora;