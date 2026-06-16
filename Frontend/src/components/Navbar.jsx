import "../styles/navbar.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaClock,
  FaUsers,
  FaBullseye,
  FaMapMarkerAlt,
  FaEnvelope,
  FaSitemap,
  FaSignInAlt,
} from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const cerrarMenu = () => {
    setMenuOpen(false);
  };
  useEffect(() => {
    if (!menuOpen) return;

    const esResponsive = window.matchMedia("(max-width: 1280px)").matches;

    if (!esResponsive) return;

    const scrollY = window.scrollY;

    const body = document.body;
    const html = document.documentElement;

    const overflowBodyAnterior = body.style.overflow;
    const positionBodyAnterior = body.style.position;
    const topBodyAnterior = body.style.top;
    const widthBodyAnterior = body.style.width;
    const overflowHtmlAnterior = html.style.overflow;

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    html.style.overflow = "hidden";

    return () => {
      body.style.overflow = overflowBodyAnterior;
      body.style.position = positionBodyAnterior;
      body.style.top = topBodyAnterior;
      body.style.width = widthBodyAnterior;
      html.style.overflow = overflowHtmlAnterior;

      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);
  return (
    <>
      <nav className="navbar">
        <div className="brand">
          <HashLink
            smooth
            to="/#inicio"
            onClick={cerrarMenu}
            className="brand-logo-link"
          >
            <img
              src="/images/logo.jpg"
              alt="Logo Iglesia"
              className="brand-logo"
            />
          </HashLink>

          <div className="brand-text">
            <h1>Asamblea Apostólica</h1>
            <p>
              de la fe en <span>Cristo Jesús</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <HashLink smooth to="/#inicio" onClick={cerrarMenu}>
              <FaHome className="nav-icon" />
              Inicio
            </HashLink>
          </li>

          <li>
            <HashLink smooth to="/#horarios" onClick={cerrarMenu}>
              <FaClock className="nav-icon" />
              Horarios
            </HashLink>
          </li>

          <li>
            <HashLink
              smooth
              to="/#ministerios"
              onClick={cerrarMenu}
              scroll={(el) => {
                const y =
                  el.getBoundingClientRect().top + window.pageYOffset - 70;
                window.scrollTo({ top: y, behavior: "smooth" });
              }}
            >
              <FaUsers className="nav-icon" />
              Ministerios
            </HashLink>
          </li>

          <li>
            <HashLink smooth to="/#ubicacion" onClick={cerrarMenu}>
              <FaMapMarkerAlt className="nav-icon" />
              Ubicación
            </HashLink>
          </li>

          <li>
            <HashLink smooth to="/#mision-vision" onClick={cerrarMenu}>
              <FaBullseye className="nav-icon" />
              Misión y Visión
            </HashLink>
          </li>

          <li>
            <HashLink
              smooth
              to="/#contacto"
              onClick={cerrarMenu}
              scroll={(el) => {
                const y =
                  el.getBoundingClientRect().top + window.pageYOffset - 90;
                window.scrollTo({ top: y, behavior: "smooth" });
              }}
            >
              <FaEnvelope className="nav-icon" />
              Contacto
            </HashLink>
          </li>

          <li>
            <Link to="/organigrama" onClick={cerrarMenu}>
              <FaSitemap className="nav-icon" />
              Organigrama
            </Link>
          </li>

          <li>
            <Link to="/login" className="login-nav-btn" onClick={cerrarMenu}>
              <FaSignInAlt className="nav-icon" />
              Iniciar Sesión
            </Link>
          </li>
        </ul>
      </nav>

      <div
        className={`menu-overlay ${menuOpen ? "active" : ""}`}
        onClick={cerrarMenu}
        onWheel={(e) => e.preventDefault()}
        onTouchMove={(e) => e.preventDefault()}
      ></div>
    </>
  );
}

export default Navbar;
