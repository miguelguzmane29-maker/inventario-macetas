import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/Card";

import { obtenerProductos } from "../services/productosService";
import { obtenerVentas, obtenerGanancias } from "../services/ventasService";

import { useAuth } from "../context/AuthContext";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Dashboard() {

    const { usuario } = useAuth();

    const [ventasMes, setVentasMes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [ventas, setVentas] = useState([]);
    const [ganancia, setGanancia] = useState(0);
    const [stockBajo, setStockBajo] = useState([]);

    const cargarDashboard = async () => {

        try {

            const productosData = await obtenerProductos();
            setProductos(productosData);

            const stock = await axios.get(
                "https://inventario-macetas-production.up.railway.app/api/reportes/stock-bajo"
            );
            setStockBajo(stock.data);

            if (usuario?.rol === "admin") {

                const ventasPorMes = await axios.get(
                    "https://inventario-macetas-production.up.railway.app/api/ventas/ventas-mes"
                );
                setVentasMes(ventasPorMes.data);

                const ventasData = await obtenerVentas();
                setVentas(ventasData);

                const ganancias = await obtenerGanancias();
                setGanancia(ganancias.ganancias_totales || 0);

            }

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {
        cargarDashboard();
    }, []);

    const datosGrafica = {
        labels: ventas.map(
            (venta) => `Venta ${venta.id_venta}`
        ),

        datasets: [
            {
                label: "Ventas ($)",
                data: ventas.map(
                    (venta) => venta.total
                ),
                borderColor: "rgb(34,197,94)",
                backgroundColor: "rgba(34,197,94,0.5)",
                tension: 0.3,
            },
        ],
    };

    const nombresMeses = [
        "",
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ];

    const datosVentasMes = {
        labels: ventasMes.map(
            item => nombresMeses[item.mes]
        ),

        datasets: [
            {
                label: "Ventas por Mes",
                data: ventasMes.map(
                    item => item.total
                ),
                borderColor: "rgb(59,130,246)",
                backgroundColor: "rgba(59,130,246,0.5)",
                tension: 0.3
            }
        ]
    };

    return (

        <DashboardLayout>

            <h1 className="text-4xl font-bold mb-10">
                Dashboard
            </h1>

            {
                stockBajo.length > 0 && (

                    <div className="bg-red-100 border border-red-500 text-red-700 p-4 rounded-lg mb-6">
                        ⚠ Existen productos con stock bajo.
                    </div>

                )
            }

            <div className="grid grid-cols-4 gap-5">

                <Card
                    titulo="Productos"
                    valor={productos.length}
                />

                {
                    usuario?.rol === "admin" && (
                        <>
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
                        </>
                    )
                }

            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mt-10">

                <h2 className="text-2xl font-bold mb-5">
                    Resumen del Sistema
                </h2>

                <div className="grid grid-cols-2 gap-5">

                    <div className="border rounded-lg p-5">

                        <h3 className="font-bold text-lg mb-2">
                            Inventario
                        </h3>

                        <p>
                            Productos registrados:{" "}
                            <strong>{productos.length}</strong>
                        </p>

                    </div>

                    {
                        usuario?.rol === "admin" && (

                            <div className="border rounded-lg p-5">

                                <h3 className="font-bold text-lg mb-2">
                                    Ventas
                                </h3>

                                <p>
                                    Total ventas:{" "}
                                    <strong>{ventas.length}</strong>
                                </p>

                                <p>
                                    Ganancia total:{" "}
                                    <strong>${ganancia}</strong>
                                </p>

                            </div>

                        )
                    }

                </div>

            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mt-10">

                <h2 className="text-2xl font-bold text-red-600 mb-5">
                    ⚠ Productos con Stock Bajo
                </h2>

                {
                    stockBajo.length === 0 ? (
                        <p>No hay productos con stock bajo.</p>
                    ) : (
                        <table className="w-full">

                            <thead>
                                <tr className="border-b">
                                    <th className="p-3">ID</th>
                                    <th className="p-3">Producto</th>
                                    <th className="p-3">Stock</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    stockBajo.map((producto) => (

                                        <tr
                                            key={producto.id_producto}
                                            className="text-center border-b"
                                        >
                                            <td className="p-3">
                                                {producto.id_producto}
                                            </td>

                                            <td className="p-3">
                                                {producto.nombre_interno}
                                            </td>

                                            <td className="p-3 text-red-600 font-bold">
                                                {producto.stock}
                                            </td>
                                        </tr>

                                    ))
                                }
                            </tbody>

                        </table>
                    )
                }

            </div>

            {
                usuario?.rol === "admin" && (
                    <>
                        <div className="bg-white rounded-xl shadow-lg p-6 mt-10">

                            <h2 className="text-2xl font-bold mb-5">
                                Tendencia de Ventas
                            </h2>

                            <Line data={datosGrafica} />

                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 mt-10">

                            <h2 className="text-2xl font-bold mb-5">
                                Ventas por Mes
                            </h2>

                            <Line data={datosVentasMes} />

                        </div>
                    </>
                )
            }

        </DashboardLayout>

    );
}

export default Dashboard;