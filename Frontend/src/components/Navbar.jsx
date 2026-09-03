import "../styles/navbar.css";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

const API_URL = "http://127.0.0.1:8000/api";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [nombreIglesia, setNombreIglesia] = useState("");

  const { pathname } = useLocation();

  const cerrarMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const cargarNombreIglesia = async () => {
      try {
        const response = await fetch(`${API_URL}/contactos`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("No se pudo cargar el nombre de la iglesia.");
        }

        const data = await response.json();

        if (data?.nombre_iglesia?.trim()) {
          setNombreIglesia(data.nombre_iglesia.trim());
        }
      } catch (error) {
        console.error("Error cargando nombre de la iglesia:", error);
      }
    };

    cargarNombreIglesia();
  }, []);

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

  const scrollNavbarConOffset = (el, offset = 90) => {
    const estaEnInicio = pathname === "/";

    const y =
      el.getBoundingClientRect().top +
      window.pageYOffset -
      offset;

    window.scrollTo({
      top: y,
      behavior: estaEnInicio ? "smooth" : "auto",
    });
  };

  const separarNombreIglesia = (nombre) => {
    const texto = String(nombre || "").trim();

    const coincidencia = texto.match(
      /^(.*?)\s+de\s+la\s+fe\s+en\s+(.*)$/i
    );

    if (coincidencia) {
      return {
        primeraLinea: coincidencia[1],
        segundaLinea: "de la fe en",
        destacado: coincidencia[2],
      };
    }

    return {
      primeraLinea: texto,
      segundaLinea: "",
      destacado: "",
    };
  };

  const nombreFormateado = separarNombreIglesia(nombreIglesia);

  return (
    <>
      <nav className="navbar">
        <div className="brand">
          <HashLink
            to="/#inicio"
            onClick={cerrarMenu}
            scroll={(el) => scrollNavbarConOffset(el, 90)}
            className="brand-logo-link"
          >
            <img
              src="/images/logo.jpg"
              alt="Logo Iglesia"
              className="brand-logo"
            />
          </HashLink>

          <div className="brand-text">
            <h1>{nombreFormateado.primeraLinea}</h1>

            {nombreFormateado.segundaLinea && (
              <p>
                {nombreFormateado.segundaLinea}{" "}
                <span>{nombreFormateado.destacado}</span>
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <HashLink
              to="/#inicio"
              onClick={cerrarMenu}
              scroll={(el) => scrollNavbarConOffset(el, 90)}
            >
              <FaHome className="nav-icon" />
              Inicio
            </HashLink>
          </li>

          <li>
            <HashLink
              to="/#horarios"
              onClick={cerrarMenu}
              scroll={(el) => scrollNavbarConOffset(el, 90)}
            >
              <FaClock className="nav-icon" />
              Horarios
            </HashLink>
          </li>

          <li>
            <HashLink
              to="/#ministerios"
              onClick={cerrarMenu}
              scroll={(el) => scrollNavbarConOffset(el, 90)}
            >
              <FaUsers className="nav-icon" />
              Ministerios
            </HashLink>
          </li>

          <li>
            <HashLink
              to="/#ubicacion"
              onClick={cerrarMenu}
              scroll={(el) => scrollNavbarConOffset(el, 90)}
            >
              <FaMapMarkerAlt className="nav-icon" />
              Ubicación
            </HashLink>
          </li>

          <li>
            <HashLink
              to="/#mision-vision"
              onClick={cerrarMenu}
              scroll={(el) => scrollNavbarConOffset(el, 90)}
            >
              <FaBullseye className="nav-icon" />
              Misión y Visión
            </HashLink>
          </li>

          <li>
            <HashLink
              to="/#contacto"
              onClick={cerrarMenu}
              scroll={(el) => scrollNavbarConOffset(el, 90)}
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
            <Link
              to="/login"
              className="login-nav-btn"
              onClick={cerrarMenu}
            >
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