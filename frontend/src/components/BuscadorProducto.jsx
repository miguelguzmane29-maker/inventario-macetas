import { useState } from "react";

function BuscadorProducto({
    onBuscar
}) {

    const [id, setId] =
        useState("");

    return (

        <div className="bg-white p-5 rounded-xl shadow-lg mb-6">

            <h2 className="text-xl font-bold mb-4">
                Buscar por ID
            </h2>

            <div className="flex gap-3">

                <input
                    type="text"
                    placeholder="Ej: MAC-001"
                    className="border p-3 rounded-lg flex-1"
                    value={id}
                    onChange={(e) =>
                        setId(e.target.value)
                    }
                />

                <button
                    onClick={() =>
                        onBuscar(id)
                    }
                    className="bg-slate-900 text-white px-6 rounded-lg"
                >
                    Buscar
                </button>

            </div>

        </div>
    );
}

export default BuscadorProducto;