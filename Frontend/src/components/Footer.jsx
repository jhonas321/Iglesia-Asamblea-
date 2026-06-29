import "../styles/footer.css";

import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

import { obtenerHorariosGuardados } from "../data/adminStorage";

const ordenarHorariosFooter = (horarios) => {
  const ordenDias = {
    Lunes: 1,
    Martes: 2,
    Miércoles: 3,
    Jueves: 4,
    Viernes: 5,
    Sábado: 6,
    Domingo: 7,
  };

  return [...horarios].sort((a, b) => {
    const ordenA = ordenDias[a.dia] || 99;
    const ordenB = ordenDias[b.dia] || 99;

    if (ordenA !== ordenB) return ordenA - ordenB;

    return String(a.hora || "").localeCompare(String(b.hora || ""));
  });
};

function Footer() {
  const horariosFooter = ordenarHorariosFooter(obtenerHorariosGuardados());

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h3>Asamblea Apostólica</h3>

          <p className="footer-description">
            Iglesia cristiana dedicada a predicar la palabra de Dios, fortalecer
            la fe y servir a nuestra comunidad.
          </p>
        </div>

        <div className="footer-col">
          <h4>Horarios</h4>

          <div className="footer-schedule-list">
            {horariosFooter.length > 0 ? (
              horariosFooter.map((horario) => (
                <div className="footer-schedule-item" key={horario.id}>
                  <div className="footer-schedule-info">
                    <span className="footer-schedule-day">{horario.dia}</span>
                    <span className="footer-schedule-name">
                      {horario.actividad}
                    </span>
                  </div>

                  <strong className="footer-schedule-time">
                    {horario.hora}
                  </strong>
                </div>
              ))
            ) : (
              <p className="footer-schedule-empty">
                No hay horarios registrados.
              </p>
            )}
          </div>
        </div>

        <div className="footer-col">
          <h4>Contacto</h4>

          <div className="footer-contact-list">
            <div className="footer-contact-item">
              <span className="footer-contact-circle">
                <FaMapMarkerAlt />
              </span>

              <span>Cochabamba, Bolivia</span>
            </div>

            <div className="footer-contact-item">
              <span className="footer-contact-circle">
                <FaPhone />
              </span>

              <span>+591 70000000</span>
            </div>

            <div className="footer-contact-item">
              <span className="footer-contact-circle">
                <FaEnvelope />
              </span>

              <span>contacto@asamblea.com</span>
            </div>
          </div>
        </div>

        <div className="footer-col">
          <h4>Síguenos</h4>

          <div className="social-icons">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link facebook"
              aria-label="Facebook"
            >
              <span className="circle">
                <FaFacebookF />
              </span>

              <span className="social-text">Facebook</span>
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link youtube"
              aria-label="YouTube"
            >
              <span className="circle">
                <FaYoutube />
              </span>

              <span className="social-text">YouTube</span>
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link instagram"
              aria-label="Instagram"
            >
              <span className="circle">
                <FaInstagram />
              </span>

              <span className="social-text">Instagram</span>
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link tiktok"
              aria-label="TikTok"
            >
              <span className="circle">
                <FaTiktok />
              </span>

              <span className="social-text">TikTok</span>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Asamblea Apostólica de la Fe en Cristo
        Jesús
      </div>
    </footer>
  );
}

export default Footer;