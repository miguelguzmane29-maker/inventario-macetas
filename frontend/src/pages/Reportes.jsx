import { useEffect, useState } from "react";

import axios from "axios";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function Reportes() {
  const [ganancias, setGanancias] = useState([]);

  const [reporte, setReporte] = useState({});

  const [masVendidos, setMasVendidos] = useState([]);

  useEffect(() => {
    obtenerReportes();
    obtenerTopProductos();
    obtenerGananciasProductos();
  }, []);

  const obtenerGananciasProductos =
async () => {

    try {

        const response =
            await axios.get(
                "http://localhost:3000/api/reportes/ganancias-productos"
            );

        setGanancias(
            response.data
        );

    } catch (error) {

        console.error(error);

    }

};

  const obtenerReportes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/reportes");

      setReporte(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerTopProductos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/reportes/mas-vendido",
      );

      setMasVendidos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const datosGrafica = {
    labels: masVendidos.map((producto) => producto.nombre_interno),

    datasets: [
      {
        label: "Cantidad Vendida",

        data: masVendidos.map((producto) => producto.total_vendido),

        backgroundColor: "rgba(34,197,94,0.7)",
      },
    ],
  };

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-8">Reportes</h1>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">Total Productos</h2>

          <p className="text-4xl mt-3">{reporte.total_productos}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">Total Proveedores</h2>

          <p className="text-4xl mt-3">{reporte.total_proveedores}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">Ventas Totales</h2>

          <p className="text-4xl mt-3">${reporte.total_ventas}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">Menor Stock</h2>

          <p className="text-2xl mt-3">{reporte.producto_menor_stock}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-2xl font-bold mb-5">
          Top 5 Productos Más Vendidos
        </h2>

        <Bar data={datosGrafica} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow mt-8">

    <h2 className="text-2xl font-bold mb-5">
        Ganancia por Producto
    </h2>

    <table className="w-full">

        <thead>

            <tr className="bg-green-700 text-white">

                <th className="p-3">
                    Producto
                </th>

                <th className="p-3">
                    Vendidos
                </th>

                <th className="p-3">
                    Ganancia
                </th>

            </tr>

        </thead>

        <tbody>

            {
                ganancias.map(
                    (producto, index) => (

                    <tr
                        key={index}
                        className="border-b text-center"
                    >

                        <td className="p-3">
                            {
                                producto.nombre_interno
                            }
                        </td>

                        <td className="p-3">
                            {
                                producto.total_vendido
                            }
                        </td>

                        <td className="p-3 font-bold text-green-700">
                            $
                            {
                                Number(
                                    producto.ganancia
                                ).toFixed(2)
                            }
                        </td>

                    </tr>

                ))
            }

        </tbody>

    </table>

</div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-5">Ranking de Ventas</h2>

        <table className="w-full">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="p-3">Producto</th>

              <th className="p-3">Cantidad Vendida</th>
            </tr>
          </thead>

          <tbody>
            {masVendidos.map((producto, index) => (
              <tr key={index} className="border-b text-center">
                <td className="p-3">{producto.nombre_interno}</td>

                <td className="p-3">{producto.total_vendido}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Reportes;
