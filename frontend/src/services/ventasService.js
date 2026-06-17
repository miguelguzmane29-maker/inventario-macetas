import axios from "axios";

const API_URL =
    "https://inventario-macetas-production.up.railway.app/api/ventas";

export const obtenerVentas = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const crearVenta = async (venta) => {
    const response = await axios.post(API_URL, venta);
    return response.data;
};

export const eliminarVenta = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

export const obtenerGanancias = async () => {
    const response = await axios.get(`${API_URL}/ganancias`);
    return response.data;
};

export const obtenerVentasPorFecha = async (
    fechaInicio,
    fechaFin
) => {
    const response = await axios.get(
        `${API_URL}/filtro?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
    );

    return response.data;
};