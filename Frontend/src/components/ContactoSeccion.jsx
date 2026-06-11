import "../styles/contacto-seccion.css";

function ContactoSeccion() {
  return (
    <section className="contact" id="contacto">
      <div className="contact-bg contact-bg-one"></div>
      <div className="contact-bg contact-bg-two"></div>
      <div className="contact-bg contact-bg-three"></div>

      <div className="contact-container-main">
        <div className="section-title">

          <h2>Contáctanos</h2>

          <p>
            Estamos para ayudarte, orar contigo y darte la bienvenida a nuestra
            congregación. Será una alegría poder recibirte.
          </p>
        </div>

        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-header">
              <div className="contact-main-icon">☎️</div>

              <div>
                <span>Información de la iglesia</span>
                <h3>Datos de contacto</h3>
              </div>
            </div>

            <div className="contact-list">
              <div className="contact-item">
                <div className="contact-icon">⛪</div>

                <div>
                  <span>Nombre</span>
                  <p>Asamblea Apostólica de la Fe en Cristo Jesús</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📍</div>

                <div>
                  <span>Dirección</span>
                  <p>Calle Santa Cruz entre Calama</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📞</div>

                <div>
                  <span>Teléfono</span>
                  <p>+591 70000000</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-message-card">
            <div className="message-icon">🤝</div>

            <h3>Queremos conocerte</h3>

            <p>
              Puedes visitarnos en nuestras reuniones o comunicarte con nosotros.
              Estamos listos para recibirte con cariño y compartir un tiempo de
              bendición.
            </p>

            
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactoSeccion;