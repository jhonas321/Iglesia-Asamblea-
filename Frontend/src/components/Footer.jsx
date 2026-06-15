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

function Footer() {
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

          <p>Lunes - Oración 19:00</p>
          <p>Viernes - Culto de Enseñanza 19:30</p>
          <p>Sábado - Reunión de Jóvenes 19:30</p>
          <p>Domingo - Culto General 19:00</p>
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