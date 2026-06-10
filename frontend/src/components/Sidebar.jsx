import { Link, useNavigate } from "react-router-dom";

import {
    FaHome,
    FaBoxOpen,
    FaShoppingCart,
    FaTruck,
    FaChartBar,
    FaLink,
    FaSignOutAlt,
    FaUsers,
    FaClipboardList,
    FaLeaf
} from "react-icons/fa";

import logoMacetas from "../assets/MACETAS.png";

import { useAuth } from "../context/AuthContext";

function Sidebar() {

    const {
        usuario,
        logout
    } = useAuth();

    const navigate =
        useNavigate();

    const cerrarSesion = () => {

        logout();

        navigate("/login");

    };

    const linkClass =
        "flex items-center gap-3 hover:bg-green-700 p-3 rounded-lg transition";

    return (

        <aside className="w-72 min-h-screen bg-slate-950 text-white p-5 flex flex-col">

            <div className="flex flex-col items-center mb-8">

                <img
                    src={logoMacetas}
                    alt="Logo Macetas"
                    className="w-24 h-24 object-contain mb-3"
                />

                <h1 className="text-2xl font-bold text-center">
                    Inventario Macetas
                </h1>

                <p className="text-sm text-gray-400 text-center mt-1">
                    Control de ventas e inventario
                </p>

            </div>

            <div className="bg-slate-900 rounded-xl p-4 mb-6 text-center">

                <p className="font-bold">
                    {usuario?.nombre}
                </p>

                <p className="text-sm text-green-400 uppercase">
                    {usuario?.rol}
                </p>

            </div>

            <nav className="flex flex-col gap-3 flex-1">

                <Link
                    to="/dashboard"
                    className={linkClass}
                >
                    <FaHome />
                    Dashboard
                </Link>

                <Link
                    to="/productos"
                    className={linkClass}
                >
                    <FaBoxOpen />
                    Productos
                </Link>

                <Link
                    to="/ventas"
                    className={linkClass}
                >
                    <FaShoppingCart />
                    Ventas
                </Link>

                {
                    usuario?.rol === "admin" && (
                        <>
                            <Link
                                to="/proveedores"
                                className={linkClass}
                            >
                                <FaTruck />
                                Proveedores
                            </Link>

                            <Link
                                to="/relaciones"
                                className={linkClass}
                            >
                                <FaLink />
                                Relaciones
                            </Link>

                            <Link
                                to="/reportes"
                                className={linkClass}
                            >
                                <FaChartBar />
                                Reportes
                            </Link>

                            <Link
                                to="/usuarios"
                                className={linkClass}
                            >
                                <FaUsers />
                                Usuarios
                            </Link>

                            <Link
                                to="/bitacora"
                                className={linkClass}
                            >
                                <FaClipboardList />
                                Bitácora
                            </Link>
                        </>
                    )
                }

            </nav>

            <button
                onClick={cerrarSesion}
                className="flex items-center gap-3 bg-red-700 hover:bg-red-800 p-3 rounded-lg transition mt-6"
            >
                <FaSignOutAlt />
                Cerrar Sesión
            </button>

        </aside>

    );

}

export default Sidebar;