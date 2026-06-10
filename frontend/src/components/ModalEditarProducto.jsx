import { useState, useEffect } from "react";

function ModalEditarProducto({
    producto,
    onCerrar,
    onGuardar
}) {

    const [formData, setFormData] =
        useState(producto);

    useEffect(() => {
        setFormData(producto);
    }, [producto]);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onGuardar(
            producto.id_producto,
            formData
        );

    };

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl p-8 w-[600px]">

                <h2 className="text-2xl font-bold mb-5">
                    Editar Producto
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-4"
                >

                    <input
                        name="nombre_interno"
                        placeholder="Nombre"
                        className="border p-3 rounded-lg"
                        value={formData.nombre_interno}
                        onChange={handleChange}
                    />

                    <input
                        name="descripcion"
                        placeholder="Descripción"
                        className="border p-3 rounded-lg"
                        value={formData.descripcion}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="costo_compra"
                        placeholder="Costo"
                        className="border p-3 rounded-lg"
                        value={formData.costo_compra}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="precio_venta"
                        placeholder="Precio"
                        className="border p-3 rounded-lg"
                        value={formData.precio_venta}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        className="border p-3 rounded-lg"
                        value={formData.stock}
                        onChange={handleChange}
                    />

                    <input
                        name="tamaño"
                        placeholder="Tamaño"
                        className="border p-3 rounded-lg"
                        value={formData.tamaño}
                        onChange={handleChange}
                    />

                    <input
                        name="color"
                        placeholder="Color"
                        className="border p-3 rounded-lg"
                        value={formData.color}
                        onChange={handleChange}
                    />

                    <input
                        name="material"
                        placeholder="Material"
                        className="border p-3 rounded-lg"
                        value={formData.material}
                        onChange={handleChange}
                    />

                    <div className="col-span-2 flex justify-end gap-3 mt-5">

                        <button
                            type="button"
                            onClick={onCerrar}
                            className="bg-gray-400 text-white px-5 py-2 rounded-lg"
                        >
                            Cancelar
                        </button>

                        <button
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                        >
                            Guardar
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default ModalEditarProducto;