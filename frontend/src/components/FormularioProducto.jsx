import { useState } from "react";

function FormularioProducto({ onGuardar }) {

    const [formData, setFormData] = useState({
        id_producto: "",
        nombre_interno: "",
        descripcion: "",
        costo_compra: "",
        precio_venta: "",
        stock: "",
        tamaño: "",
        color: "",
        material: "",
        imagen: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onGuardar(formData);

        setFormData({
            id_producto: "",
            nombre_interno: "",
            descripcion: "",
            costo_compra: "",
            precio_venta: "",
            stock: "",
            tamaño: "",
            color: "",
            material: "",
            imagen: ""
        });
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-10">

            <h2 className="text-2xl font-bold mb-5">
                Agregar Producto
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 gap-4"
            >

                <input
                    type="text"
                    name="id_producto"
                    placeholder="ID"
                    className="border p-3 rounded-lg"
                    value={formData.id_producto}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="nombre_interno"
                    placeholder="Nombre"
                    className="border p-3 rounded-lg"
                    value={formData.nombre_interno}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
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
                    placeholder="Precio venta"
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
                    type="text"
                    name="tamaño"
                    placeholder="Tamaño"
                    className="border p-3 rounded-lg"
                    value={formData.tamaño}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="color"
                    placeholder="Color"
                    className="border p-3 rounded-lg"
                    value={formData.color}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="material"
                    placeholder="Material"
                    className="border p-3 rounded-lg"
                    value={formData.material}
                    onChange={handleChange}
                />

                <button
                    className="bg-green-600 text-white p-3 rounded-lg col-span-2"
                >
                    Guardar Producto
                </button>

            </form>
        </div>
    );
}

export default FormularioProducto;