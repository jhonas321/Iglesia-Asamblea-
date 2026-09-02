import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api";

const ProtectedRoute = ({ children }) => {
  const [verificando, setVerificando] = useState(true);
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    let componenteActivo = true;

    const limpiarSesion = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      localStorage.removeItem("userRole");
      localStorage.removeItem("recordarme");
    };

    const verificarSesion = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        if (componenteActivo) {
          setAutenticado(false);
          setVerificando(false);
        }

        return;
      }

      try {
        const response = await fetch(`${API_URL}/user`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401 || response.status === 403) {
          limpiarSesion();

          if (componenteActivo) {
            setAutenticado(false);
          }

          return;
        }

        if (!response.ok) {
          throw new Error(
            `Error del servidor: ${response.status}`
          );
        }

        const data = await response.json();

        if (!data?.user) {
          limpiarSesion();

          if (componenteActivo) {
            setAutenticado(false);
          }

          return;
        }

        localStorage.setItem(
          "usuario",
          JSON.stringify(data.user)
        );

        if (data.user?.rol?.nombre) {
          localStorage.setItem(
            "userRole",
            data.user.rol.nombre
          );
        }

        if (componenteActivo) {
          setAutenticado(true);
        }
      } catch (error) {
        console.error(
          "Error verificando autenticación:",
          error
        );

        /*
          Si Laravel está momentáneamente caído o hay un problema de red,
          no eliminamos el token automáticamente. Solo impedimos el acceso
          mientras no se pueda confirmar la sesión.
        */
        if (componenteActivo) {
          setAutenticado(false);
        }
      } finally {
        if (componenteActivo) {
          setVerificando(false);
        }
      }
    };

    verificarSesion();

    return () => {
      componenteActivo = false;
    };
  }, []);

  if (verificando) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
        }}
      >
        Verificando sesión...
      </div>
    );
  }

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
