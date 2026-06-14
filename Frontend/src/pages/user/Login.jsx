import "../../styles/iniciosesion.css";
import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaCrown,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Login() {
  const [mostrarPassword, setMostrarPassword] = useState(false);

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
            <p>Accede al sistema de administración de la iglesia.</p>

            <span>Asamblea Apostólica</span>
          </div>
        </div>

        <form className="login-card">
          <div className="login-title">
            <h1>Login</h1>
            <span></span>
          </div>

          <div className="login-input">
            <FaEnvelope />
            <div className="input-line"></div>
            <input type="email" placeholder="Ingresa tu correo" required />
          </div>

          <div className="login-input password-input">
            <FaLock />
            <div className="input-line"></div>

            <input
              type={mostrarPassword ? "text" : "password"}
              placeholder="Ingresa tu contraseña"
              required
            />

            <button
              type="button"
              className={`password-toggle ${mostrarPassword ? "active" : ""}`}
              onClick={() => setMostrarPassword(!mostrarPassword)}
              aria-label={
                mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="login-options">
            <label>
              <input type="checkbox" />
              Recordarme
            </label>

            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" className="login-button">
            <FaSignInAlt />
            Ingresar
          </button>

          <Link to="/" className="back-link">
            Volver al inicio
          </Link>
        </form>
      </section>
    </main>
  );
}

export default Login;