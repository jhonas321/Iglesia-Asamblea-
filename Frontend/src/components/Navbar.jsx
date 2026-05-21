import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand">
        <img src="/images/logo.jpg" alt="Logo Iglesia" className="brand-logo" />

        <div className="brand-text">
          <h1>Asamblea Apostolica</h1>
          <p>
            de la fe en <span>Cristo Jesús</span>
          </p>
        </div>
      </div>

      <ul className="nav-links">
        <li>
          <HashLink smooth to="/#inicio">
            Inicio
          </HashLink>
        </li>

        <li>
          <HashLink smooth to="/#nosotros">
            Nosotros
          </HashLink>
        </li>

        <li>
          <HashLink smooth to="/#ministerios">
            Ministerios
          </HashLink>
        </li>

        <li>
          <HashLink smooth to="/#organigrama">
            Organigrama
          </HashLink>
        </li>

        <li>
          <HashLink smooth to="/#reglamento">
            Reglamento
          </HashLink>
        </li>

        <li>
          <HashLink smooth to="/#horarios">
            Horarios
          </HashLink>
        </li>

        <li>
          <HashLink smooth to="/#contacto">
            Contacto
          </HashLink>
        </li>

        <li>
          <Link to="/Login" className="login-nav-btn">
            Iniciar Sesión
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
