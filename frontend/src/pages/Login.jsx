import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {
  const [correo, setCorreo] = useState("");

  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const iniciarSesion = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://inventario-macetas-production.up.railway.app/api/auth/login",
        {
          correo,
          password,
        },
      );

      login(response.data.usuario, response.data.token);

      navigate("/dashboard");
    } catch (error) {
      alert("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-green-900 to-slate-800">
      <div className="bg-white w-[450px] rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <img
            src="/MACETAS.png"
            alt="Logo Macetas"
            className="w-40 h-40 object-contain mb-3"
          />

          <h1 className="text-3xl font-bold text-slate-800">
            Inventario Macetas
          </h1>

          <p className="text-gray-500 mt-2">Sistema de Control y Ventas</p>
        </div>

        <form onSubmit={iniciarSesion}>
          <label className="font-semibold text-gray-700">Correo</label>

          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="admin@gmail.com"
            className="
                            w-full
                            border
                            rounded-lg
                            px-4
                            py-3
                            mt-2
                            mb-5
                            focus:outline-none
                            focus:ring-2
                            focus:ring-green-600
                        "
            required
          />

          <label className="font-semibold text-gray-700">Contraseña</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="
                            w-full
                            border
                            rounded-lg
                            px-4
                            py-3
                            mt-2
                            mb-6
                            focus:outline-none
                            focus:ring-2
                            focus:ring-green-600
                        "
            required
          />

          <button
            type="submit"
            className="
                            w-full
                            bg-green-700
                            hover:bg-green-800
                            text-white
                            font-bold
                            py-3
                            rounded-lg
                            transition
                        "
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">Proyecto Integrador</p>

          <p className="text-gray-500 text-sm">
            Inventario de Macetas de Barro
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
