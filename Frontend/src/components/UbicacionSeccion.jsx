import "../styles/ubicacion-seccion.css";

function UbicacionSeccion() {
  return (
    <section id="ubicacion" className="location">
      <div className="location-bg location-bg-one"></div>
      <div className="location-bg location-bg-two"></div>
      <div className="location-bg location-bg-three"></div>

      <div className="location-container">
        <div className="section-title">

          <h2>Ubicación</h2>

          <p>
            Visítanos y comparte con nosotros un tiempo especial en la presencia
            de Dios. Estamos felices de recibirte en nuestra iglesia.
          </p>
        </div>

        <div className="location-content">
          <div className="location-info-card">
            <div className="location-icon">📍</div>

            <div>
              <span>Estamos en</span>
              <h3>Iglesia Asamblea Apostólica</h3>
              <p>Sacaba, Cochabamba - Bolivia</p>
            </div>
          </div>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d565.9212292574731!2d-66.03366457115301!3d-17.409432894819446!2m3!1f0!2f0!3f0!2m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e37b53a494b22d%3A0xca10c01eae063aa0!2sIglesia%20Asamblea%20Apostolica%20De%20La%20Fe%20En%20Cristo%20Jesus-Sacaba!5e0!3m2!1ses-419!2sbo!4v1773023623560!5m2!1ses-419!2sbo"
              loading="lazy"
              title="Ubicación Iglesia"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UbicacionSeccion;