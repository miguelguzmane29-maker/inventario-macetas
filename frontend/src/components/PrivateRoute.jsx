import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({
    children,
    roles
}) {

    const { usuario } = useAuth();

    if (!usuario) {
        return <Navigate to="/login" />;
    }

    if (
        roles &&
        !roles.includes(usuario.rol)
    ) {
        return <Navigate to="/dashboard" />;
    }

    return children;
}

export default PrivateRoute;