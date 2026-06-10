import axios from "axios";

const API = "https://inventario-macetas-production.up.railway.app/api/productos";

export const obtenerProductos =
async () => {

    const response =
        await axios.get(API);

    return response.data;
};

export const crearProducto = async (producto) => {
    const response = await axios.post(API, producto);
    return response.data;
};

export const eliminarProducto = async (id) => {
    const response = await axios.delete(`${API}/${id}`);
    return response.data;
};

export const buscarProductoPorId = async (id) => {
    const response = await axios.get(`${API}/${id}`);
    return response.data;
};

export const actualizarProducto = async (id, data) => {
    const response = await axios.put(`${API}/${id}`, data);
    return response.data;
};