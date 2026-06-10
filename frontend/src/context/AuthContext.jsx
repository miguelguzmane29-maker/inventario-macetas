import {
    createContext,
    useContext,
    useState
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [usuario, setUsuario] = useState(() => {
        const data = localStorage.getItem("usuario");
        return data ? JSON.parse(data) : null;
    });

    const login = (usuarioData, token) => {

        localStorage.setItem(
            "usuario",
            JSON.stringify(usuarioData)
        );

        localStorage.setItem(
            "token",
            token
        );

        setUsuario(usuarioData);

    };

    const logout = () => {

        localStorage.removeItem("usuario");
        localStorage.removeItem("token");

        setUsuario(null);

    };

    return (
        <AuthContext.Provider
            value={{
                usuario,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};