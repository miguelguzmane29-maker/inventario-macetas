import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

function DashboardLayout({ children }) {

    const { usuario } = useAuth();

    const fechaActual =
        new Date().toLocaleDateString(
            "es-MX",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

    return (

        <div className="flex bg-gray-100 min-h-screen">

            <Sidebar />

            <main className="flex-1">

                <header className="bg-white shadow px-8 py-5 flex justify-between items-center">

                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Sistema de Inventario
                        </h1>

                        <p className="text-gray-500 capitalize">
                            {fechaActual}
                        </p>
                    </div>

                    <div className="text-right">

                        <p className="font-bold text-slate-800">
                            {usuario?.nombre}
                        </p>

                        <p className="text-sm text-green-700 font-semibold uppercase">
                            {usuario?.rol}
                        </p>

                    </div>

                </header>

                <section className="p-8">
                    {children}
                </section>

            </main>

        </div>

    );

}

export default DashboardLayout;