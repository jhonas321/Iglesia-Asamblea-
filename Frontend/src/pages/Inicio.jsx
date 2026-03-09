import "../styles/inicio.css";

function Inicio() {
  return (
    <>
      {/* HERO */}
      <header className="hero-header" id="inicio">
        <div className="hero">
          <div className="hero-content">
            <span className="hero-tag">Bienvenidos a nuestra congregación</span>

            <h1>
              Bienvenidos a Iglesia Asamblea Apostolica de la fe en Cristo Jesus
            </h1>

            <p>
              Un lugar para adorar, crecer en la fe y compartir el amor de
              Cristo. Te invitamos a ser parte de nuestra comunidad y vivir una
              experiencia espiritual transformadora.
            </p>

            <div className="btn-group">
              <a href="#contacto" className="btn btn-primary">
                Contáctanos
              </a>
              <a href="#horarios" className="btn btn-secondary">
                Ver Horarios
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* SOBRE NOSOTROS */}
      <section id="nosotros">
        <div className="section-title">
          <h2>Sobre Nosotros</h2>
          <p>
            Somos una iglesia cristiana dedicada a predicar la Palabra de Dios,
            fortalecer la fe y servir a nuestra comunidad.
          </p>
        </div>

        <div className="about">
          <img src="/images/portada.avif" alt="Iglesia cristiana" />

          <div className="about-text">
            <h3>Una familia de fe y esperanza</h3>

            <p>
              En la iglesia creemos en el poder de la oración, en la enseñanza
              de la Biblia y en la importancia de vivir una vida guiada por el
              amor, la gracia y la verdad de Jesucristo.
            </p>

            <p>
              Nuestro propósito es acompañar a cada persona en su crecimiento
              espiritual, brindando espacios de adoración, enseñanza, servicio y
              comunión.
            </p>

            <p>
              Aquí encontrarás una iglesia abierta para todos, con un ambiente
              cálido, espiritual y lleno de propósito.
            </p>
          </div>
        </div>
      </section>

      {/* MISION Y VISION */}
      <section className="mission">
        <div className="section-title">
          <h2>Misión y Visión</h2>
        </div>

        <div className="mission-container">
          <div className="mission-card">
            <h3>Misión</h3>
            <p>
              Predicar el evangelio de Jesucristo, fortalecer la fe de los
              creyentes y servir a nuestra comunidad con amor, guiando a las
              personas a una relación viva con Dios.
            </p>
          </div>

          <div className="mission-card">
            <h3>Visión</h3>
            <p>
              Ser una iglesia que impacte vidas, forme discípulos comprometidos
              y lleve esperanza a nuestra ciudad a través del amor y la palabra
              de Dios.
            </p>
          </div>
        </div>
      </section>

      {/* MINISTERIOS */}
      <section className="services" id="ministerios">
        <div className="section-title">
          <h2>Ministerios</h2>
          <p>
            Espacios diseñados para cada etapa de la vida y el crecimiento
            espiritual.
          </p>
        </div>

        <div className="services-grid">
          <div className="service-box">
            <h3>Ministerio de Niños</h3>
            <p>
              Formación bíblica y actividades para los más pequeños en un
              ambiente seguro y alegre.
            </p>
          </div>

          <div className="service-box">
            <h3>Ministerio de Jóvenes</h3>
            <p>
              Encuentros y enseñanzas para fortalecer la identidad, la fe y el
              propósito en Cristo.
            </p>
          </div>

          <div className="service-box">
            <h3>Ministerio de Alabanza</h3>
            <p>
              Adoramos a Dios con excelencia, pasión y reverencia a través de la
              música.
            </p>
          </div>

          <div className="service-box">
            <h3>Escuela Bíblica</h3>
            <p>
              Estudios y enseñanza profunda de la Palabra de Dios para toda la
              congregación.
            </p>
          </div>

          <div className="service-box">
            <h3>Oración</h3>
            <p>
              Espacios especiales para interceder, buscar a Dios y fortalecer la
              vida espiritual.
            </p>
          </div>

          <div className="service-box">
            <h3>Servicio Social</h3>
            <p>
              Apoyo a familias y acciones solidarias para impactar positivamente
              a la comunidad.
            </p>
          </div>
        </div>
      </section>

      {/* HORARIOS */}
      <section className="schedule" id="horarios">
        <div className="section-title">
          <h2>Horarios de Reunión</h2>
          <p>
            Te esperamos en nuestras reuniones semanales para compartir juntos
            la presencia de Dios.
          </p>
        </div>

        <div className="schedule-table">
          <table>
            <thead>
              <tr>
                <th>Día</th>
                <th>Actividad</th>
                <th>Hora</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Lunes</td>
                <td>Oración</td>
                <td>19:00</td>
              </tr>

              <tr>
                <td>Sábado</td>
                <td>Reunión de Jóvenes</td>
                <td>19:30</td>
              </tr>

              <tr>
                <td>Domingo</td>
                <td>Culto General</td>
                <td>19:00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* UBICACION */}
      <section className="location">
        <div className="section-title">
          <h2>Ubicación</h2>
          <p>
            Visítanos y comparte con nosotros un tiempo especial en la presencia
            de Dios.
          </p>
        </div>

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d565.9212292574731!2d-66.03366457115301!3d-17.409432894819446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e37b53a494b22d%3A0xca10c01eae063aa0!2sIglesia%20Asamblea%20Apostolica%20De%20La%20Fe%20En%20Cristo%20Jesus-Sacaba!5e0!3m2!1ses-419!2sbo!4v1773023623560!5m2!1ses-419!2sbo"
            loading="lazy"
            title="Ubicación Iglesia"
          ></iframe>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="contact" id="contacto">
        <div className="section-title">
          <h2>Contáctanos</h2>
          <p>
            Estamos para ayudarte, orar contigo y darte la bienvenida a nuestra
            congregación.
          </p>
        </div>

        <div className="contact-container">
          <div className="contact-info">
            <h3>Información de la Iglesia</h3>

            <p>
              <strong>Nombre:</strong> Asamblea Apostolica de la fe en Cristo
              Jesús
            </p>
            <p>
              <strong>Dirección:</strong> Calle Santa Cruz entre Calama
            </p>
            <p>
              <strong>Teléfono:</strong> +591 70000000
            </p>
            <p>
              <strong>Email:</strong> contacto@asamblea.com
            </p>
          </div>

          <div className="contact-form">
            <h3>Envíanos un mensaje</h3>

            <form>
              <input type="text" placeholder="Tu nombre" required />
              <input
                type="email"
                placeholder="Tu correo electrónico"
                required
              />
              <textarea
                placeholder="Escribe tu mensaje aquí..."
                required
              ></textarea>
              <button type="submit">Enviar mensaje</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Inicio;
