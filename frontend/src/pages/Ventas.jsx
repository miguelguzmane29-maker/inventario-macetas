import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import FormularioVenta from "../components/FormularioVenta";

import TablaVentas from "../components/TablaVentas";

import { useAuth } from "../context/AuthContext";

import {
  obtenerVentas,
  crearVenta,
  obtenerGanancias,
  obtenerVentasPorFecha,
} from "../services/ventasService";

import Card from "../components/Card";

function Ventas() {

    const { usuario } = useAuth();
    
  const [fechaInicio, setFechaInicio] = useState("");

  const [fechaFin, setFechaFin] = useState("");

  const [ventas, setVentas] = useState([]);

  const [ganancia, setGanancia] = useState(0);

  const cargarDatos = async () => {
    const data = await obtenerVentas();

    setVentas(data);

    const ganancias = await obtenerGanancias();

    setGanancia(ganancias.ganancias_totales || 0);
  };

  useEffect(() => {
    cargarDatos();
  }, []);
  const filtrarVentas = async () => {
    if (!fechaInicio || !fechaFin) {
      return;
    }

    const data = await obtenerVentasPorFecha(fechaInicio, fechaFin);

    setVentas(data);
  };
const guardarVenta =
async (venta) => {

    await crearVenta({
        ...venta,
        usuario: usuario?.nombre,
        rol: usuario?.rol
    });

    await cargarDatos();

};

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-8">Ventas</h1>

      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h2 className="font-bold mb-3">Filtrar por Fecha</h2>

        <div className="flex gap-3">
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="border p-2 rounded"
          />

          <button
            onClick={filtrarVentas}
            className="
                bg-blue-600
                text-white
                px-4
                rounded
            "
          >
            Filtrar
          </button>

          <button
            onClick={cargarDatos}
            className="
                bg-gray-600
                text-white
                px-4
                rounded
            "
          >
            Mostrar Todo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-8">
        <Card titulo="Ventas Registradas" valor={ventas.length} />

        <Card titulo="Ganancias Totales" valor={`$${ganancia}`} />

        <Card
          titulo="Última Venta"
          valor={ventas.length ? `$${ventas[ventas.length - 1].total}` : "$0"}
        />
      </div>

      <FormularioVenta onGuardar={guardarVenta} />

      <TablaVentas ventas={ventas} />
    </DashboardLayout>
  );
}

export default Ventas;
