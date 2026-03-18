import "../styles/contacto-seccion.css";

function ContactoSeccion() {
  return (
    <section className="contact light-section" id="contacto">
      <div className="section-bg-decoration decoration-left"></div>
      <div className="section-bg-decoration decoration-right"></div>

      <div className="section-title">
        <h2>Contáctanos</h2>
        <p>
          Estamos para ayudarte, orar contigo y darte la bienvenida a nuestra
          congregación.
        </p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h3>Información de la iglesia</h3>

          <p>
            <strong>Nombre:</strong> Asamblea Apostólica de la Fe en Cristo Jesús
          </p>

          <p>
            <strong>Dirección:</strong> Calle Santa Cruz entre Calama
          </p>

          <p>
            <strong>Teléfono:</strong> +591 70000000
          </p>
        </div>
      </div>
    </section>
  );
}

export default ContactoSeccion;