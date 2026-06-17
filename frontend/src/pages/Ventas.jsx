import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import FormularioVenta from "../components/FormularioVenta";

import TablaVentas from "../components/TablaVentas";

import { useAuth } from "../context/AuthContext";

import {
    obtenerVentas,
    crearVenta,
    eliminarVenta,
    obtenerGanancias,
    obtenerVentasPorFecha,
} from "../services/ventasService";

import Card from "../components/Card";

function Ventas() {

    const { usuario } =
        useAuth();

    const [fechaInicio, setFechaInicio] =
        useState("");

    const [fechaFin, setFechaFin] =
        useState("");

    const [ventas, setVentas] =
        useState([]);

    const [ganancia, setGanancia] =
        useState(0);

    const cargarDatos = async () => {

        try {

            const data =
                await obtenerVentas();

            setVentas(data);

            const ganancias =
                await obtenerGanancias();

            setGanancia(
                ganancias.ganancias_totales || 0
            );

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.mensaje ||
                "Error al cargar ventas"
            );

        }

    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const filtrarVentas = async () => {

        if (!fechaInicio || !fechaFin) {
            alert("Selecciona fecha de inicio y fecha final");
            return;
        }

        try {

            const data =
                await obtenerVentasPorFecha(
                    fechaInicio,
                    fechaFin
                );

            setVentas(data);

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.mensaje ||
                "Error al filtrar ventas"
            );

        }

    };

    const guardarVenta = async (venta) => {

        try {

            await crearVenta({
                ...venta,
                usuario: usuario?.nombre,
                rol: usuario?.rol
            });

            await cargarDatos();

            alert("Venta registrada correctamente");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.mensaje ||
                "Error al registrar venta"
            );

        }

    };

    const eliminarVentaSeleccionada = async (idVenta) => {

        if (
            !window.confirm(
                `¿Eliminar la venta #${idVenta}? El stock será restaurado.`
            )
        ) {
            return;
        }

        try {

            const response =
                await eliminarVenta(idVenta);

            alert(
                response.mensaje ||
                "Venta eliminada correctamente"
            );

            await cargarDatos();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.mensaje ||
                "Error al eliminar venta"
            );

        }

    };

    return (

        <DashboardLayout>

            <h1 className="text-4xl font-bold mb-8">
                Ventas
            </h1>

            <div className="bg-white p-5 rounded-xl shadow mb-6">

                <h2 className="font-bold mb-3">
                    Filtrar por Fecha
                </h2>

                <div className="flex gap-3">

                    <input
                        type="date"
                        value={fechaInicio}
                        onChange={(e) =>
                            setFechaInicio(e.target.value)
                        }
                        className="border p-2 rounded"
                    />

                    <input
                        type="date"
                        value={fechaFin}
                        onChange={(e) =>
                            setFechaFin(e.target.value)
                        }
                        className="border p-2 rounded"
                    />

                    <button
                        onClick={filtrarVentas}
                        className="bg-blue-600 text-white px-4 rounded"
                    >
                        Filtrar
                    </button>

                    <button
                        onClick={cargarDatos}
                        className="bg-gray-600 text-white px-4 rounded"
                    >
                        Mostrar Todo
                    </button>

                </div>

            </div>

            <div className="grid grid-cols-3 gap-5 mb-8">

                <Card
                    titulo="Ventas Registradas"
                    valor={ventas.length}
                />

                <Card
                    titulo="Ganancias Totales"
                    valor={`$${ganancia}`}
                />

                <Card
                    titulo="Última Venta"
                    valor={
                        ventas.length
                            ? `$${ventas[ventas.length - 1].total}`
                            : "$0"
                    }
                />

            </div>

            <FormularioVenta
                onGuardar={guardarVenta}
            />

            <TablaVentas
                ventas={ventas}
                onEliminar={eliminarVentaSeleccionada}
            />

        </DashboardLayout>

    );

}

export default Ventas;