import axios from "axios";

const API =
    "http://localhost:3000/api/ventas";

export const obtenerVentas =
async () => {

    const response =
        await axios.get(API);

    return response.data;
};

export const crearVenta =
async (venta) => {

    const response =
        await axios.post(
            API,
            venta
        );

    return response.data;
};

export const obtenerGanancias =
async () => {

    const response =
        await axios.get(
            `${API}/ganancias`
        );

    return response.data;
};
export const obtenerVentasPorFecha =
async (
    fechaInicio,
    fechaFin
) => {

    const response =
        await axios.get(
            `${API}/filtro`,
            {
                params: {
                    fechaInicio,
                    fechaFin
                }
            }
        );

    return response.data;

};