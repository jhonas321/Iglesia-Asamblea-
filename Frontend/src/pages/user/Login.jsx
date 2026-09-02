import "../../styles/iniciosesion.css";

import { useEffect, useState } from "react";

import {
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaCrown,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api";

function Login() {
  const navigate = useNavigate();

  const [mostrarPassword, setMostrarPassword] = useState(false);

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [recordarme, setRecordarme] = useState(false);

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const correoGuardado = localStorage.getItem("correoRecordado");

    if (correoGuardado) {
      setCorreo(correoGuardado);
      setRecordarme(true);
    }
  }, []);

  const leerRespuesta = async (response) => {
    const texto = await response.text();

    if (!texto) {
      return {};
    }

    try {
      return JSON.parse(texto);
    } catch {
      return {
        message: "El servidor devolvió una respuesta no válida.",
      };
    }
  };

  const limpiarSesionAnterior = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("userRole");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cargando) {
      return;
    }

    const emailLimpio = correo.trim();

    if (!emailLimpio) {
      setError("Debes ingresar tu correo electrónico.");
      return;
    }

    if (!password) {
      setError("Debes ingresar tu contraseña.");
      return;
    }

    setError("");
    setCargando(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: emailLimpio,
          password,
        }),
      });

      const data = await leerRespuesta(response);

      if (!response.ok) {
        if (data.errors?.email?.[0]) {
          setError(data.errors.email[0]);
        } else if (data.errors?.password?.[0]) {
          setError(data.errors.password[0]);
        } else if (data.message) {
          setError(data.message);
        } else {
          setError("No se pudo iniciar sesión.");
        }

        return;
      }

      if (!data.token || !data.user) {
        setError(
          "El servidor no devolvió los datos necesarios para iniciar sesión."
        );
        return;
      }

      limpiarSesionAnterior();

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "usuario",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "userRole",
        data.user?.rol?.nombre || ""
      );

      if (recordarme) {
        localStorage.setItem(
          "correoRecordado",
          emailLimpio
        );
      } else {
        localStorage.removeItem("correoRecordado");
      }

      window.dispatchEvent(
        new CustomEvent("usuario-actualizado", {
          detail: data.user,
        })
      );

      navigate("/admin/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      setError(
        "No se pudo conectar con el servidor. Verifica que Laravel esté iniciado."
      );
    } finally {
      setCargando(false);
    }
  };

  const mostrarAvisoRecuperacion = (e) => {
    e.preventDefault();

    setError(
      "La recuperación de contraseña todavía no está configurada."
    );
  };

  return (
    <main className="login-page">
      <div className="login-decoration decoration-one"></div>
      <div className="login-decoration decoration-two"></div>

      <section className="login-wrapper">
        <div className="welcome-panel">
          <div className="panel-shape shape-one"></div>
          <div className="panel-shape shape-two"></div>
          <div className="panel-shape shape-three"></div>
          <div className="panel-shape shape-four"></div>
          <div className="panel-shape shape-five"></div>
          <div className="panel-shape shape-six"></div>
          <div className="panel-shape shape-seven"></div>

          <div className="panel-content">
            <div className="panel-icon">
              <FaCrown />
            </div>

            <h2>¡Bienvenido!</h2>

            <p>
              Accede al sistema de administración de la iglesia.
            </p>

            <span>Asamblea Apostólica</span>
          </div>
        </div>

        <form
          className="login-card"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="login-title">
            <h1>Login</h1>
            <span></span>
          </div>

          <div className="login-input">
            <FaEnvelope />

            <div className="input-line"></div>

            <input
              type="email"
              placeholder="Ingresa tu correo"
              value={correo}
              onChange={(e) => {
                setCorreo(e.target.value);
                setError("");
              }}
              autoComplete="email"
              disabled={cargando}
            />
          </div>

          <div className="login-input password-input">
            <FaLock />

            <div className="input-line"></div>

            <input
              type={mostrarPassword ? "text" : "password"}
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              autoComplete="current-password"
              disabled={cargando}
            />

            <button
              type="button"
              className={`password-toggle ${
                mostrarPassword ? "active" : ""
              }`}
              onClick={() =>
                setMostrarPassword((actual) => !actual)
              }
              aria-label={
                mostrarPassword
                  ? "Ocultar contraseña"
                  : "Mostrar contraseña"
              }
              disabled={cargando}
            >
              {mostrarPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>

          <div className="login-options">
            <label>
              <input
                type="checkbox"
                checked={recordarme}
                onChange={(e) =>
                  setRecordarme(e.target.checked)
                }
                disabled={cargando}
              />

              Recordarme
            </label>

            <a
              href="#"
              onClick={mostrarAvisoRecuperacion}
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {error && (
            <p
              className="login-error"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={cargando}
          >
            <FaSignInAlt />

            {cargando
              ? "Ingresando..."
              : "Ingresar"}
          </button>

          <Link
            to="/"
            className="back-link"
          >
            Volver al inicio
          </Link>
        </form>
      </section>
    </main>
  );
}

export default Login;
