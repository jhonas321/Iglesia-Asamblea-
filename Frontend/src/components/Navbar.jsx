import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand">
        <img
          src="/images/logo.jpg"
          alt="Logo Iglesia"
          className="brand-logo"
        />

        <div className="brand-text">
          <h1>Asamblea Apostolica</h1>
          <p>de la fe en <span>Cristo Jesús</span></p>
        </div>
      </div>

      <ul className="nav-links">
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#nosotros">Nosotros</a></li>
        <li><a href="#ministerios">Ministerios</a></li>
        <li><a href="#horarios">Horarios</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;