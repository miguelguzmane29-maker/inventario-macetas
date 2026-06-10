import {
    useEffect,
    useState
} from "react";

import axios from "axios";

function FormularioVenta({
    onGuardar
}) {

    const [productos, setProductos] =
        useState([]);

    const [formulario, setFormulario] =
        useState({
            id_producto: "",
            cantidad: 1
        });

    const [productosVenta, setProductosVenta] =
        useState([]);

    const cargarProductos = async () => {

        try {

            const response =
                await axios.get(
                    "https://inventario-macetas-production.up.railway.app/api/productos"
                );

            setProductos(
                response.data
            );

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        cargarProductos();

    }, []);

    const handleChange = (e) => {

        setFormulario({
            ...formulario,
            [e.target.name]:
                e.target.value
        });

    };

    const agregarProducto = () => {

        if (!formulario.id_producto) {

            alert(
                "Seleccione un producto"
            );

            return;

        }

        setProductosVenta([
            ...productosVenta,
            {
                id_producto:
                    formulario.id_producto,
                cantidad:
                    Number(
                        formulario.cantidad
                    )
            }
        ]);

        setFormulario({
            id_producto: "",
            cantidad: 1
        });

    };

    const eliminarProducto = (index) => {

        const nuevaLista =
            productosVenta.filter(
                (_, i) => i !== index
            );

        setProductosVenta(
            nuevaLista
        );

    };

    const finalizarVenta =
        async () => {

            if (
                productosVenta.length === 0
            ) {

                alert(
                    "Agregue al menos un producto"
                );

                return;

            }

            await onGuardar({
                productos:
                    productosVenta
            });

            await cargarProductos();

            setProductosVenta([]);

        };

    return (

        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">

            <h2 className="text-2xl font-bold mb-5">
                Registrar Venta
            </h2>

            <div className="grid grid-cols-2 gap-4">

                <select
                    name="id_producto"
                    value={
                        formulario.id_producto
                    }
                    onChange={
                        handleChange
                    }
                    className="border p-3 rounded-lg"
                >

                    <option value="">
                        Seleccione producto
                    </option>

                    {
                        productos.map(
                            (producto) => (

                                <option
                                    key={
                                        producto.id_producto
                                    }
                                    value={
                                        producto.id_producto
                                    }
                                >

                                    {
                                        producto.id_producto
                                    }
                                    {" - "}
                                    {
                                        producto.nombre_interno
                                    }
                                    {" | Stock: "}
                                    {
                                        producto.stock
                                    }

                                </option>

                            )
                        )
                    }

                </select>

                <input
                    type="number"
                    min="1"
                    name="cantidad"
                    value={
                        formulario.cantidad
                    }
                    onChange={
                        handleChange
                    }
                    className="border p-3 rounded-lg"
                />

            </div>

            <button
                type="button"
                onClick={
                    agregarProducto
                }
                className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
            >
                Agregar Producto
            </button>

            <div className="mt-6">

                <h3 className="font-bold mb-3">
                    Productos de la Venta
                </h3>

                {
                    productosVenta.map(
                        (item, index) => (

                            <div
                                key={index}
                                className="flex justify-between border-b py-2"
                            >

                                <span>
                                    {
                                        item.id_producto
                                    }
                                    {" - Cantidad: "}
                                    {
                                        item.cantidad
                                    }
                                </span>

                                <button
                                    onClick={() =>
                                        eliminarProducto(
                                            index
                                        )
                                    }
                                    className="text-red-600"
                                >
                                    Eliminar
                                </button>

                            </div>

                        )
                    )
                }

            </div>

            <button
                type="button"
                onClick={
                    finalizarVenta
                }
                className="bg-green-600 text-white py-3 rounded-lg w-full mt-6"
            >
                Finalizar Venta
            </button>

        </div>

    );

}

export default FormularioVenta;