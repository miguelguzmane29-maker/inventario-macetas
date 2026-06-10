import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import PrivateRoute from "./components/PrivateRoute";

import Bitacora from "./pages/Bitacora";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Productos from "./pages/Productos";
import Ventas from "./pages/Ventas";
import Proveedores from "./pages/Proveedores";
import Reportes from "./pages/Reportes";
import Relaciones from "./pages/Relaciones";
import Usuarios from "./pages/Usuarios";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/productos"
            element={
              <PrivateRoute>
                <Productos />
              </PrivateRoute>
            }
          />

          <Route
            path="/ventas"
            element={
              <PrivateRoute>
                <Ventas />
              </PrivateRoute>
            }
          />

          <Route
            path="/proveedores"
            element={
              <PrivateRoute roles={["admin"]}>
                <Proveedores />
              </PrivateRoute>
            }
          />

          <Route
            path="/relaciones"
            element={
              <PrivateRoute roles={["admin"]}>
                <Relaciones />
              </PrivateRoute>
            }
          />

          <Route
            path="/reportes"
            element={
              <PrivateRoute roles={["admin"]}>
                <Reportes />
              </PrivateRoute>
            }
          />

          <Route
            path="/usuarios"
            element={
              <PrivateRoute roles={["admin"]}>
                <Usuarios />
              </PrivateRoute>
            }
          />
          <Route
            path="/bitacora"
            element={
              <PrivateRoute roles={["admin"]}>
                <Bitacora />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
