import "../styles/footer.css";

import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h3>Asamblea Apostolica</h3>
          <p>
            Iglesia cristiana dedicada a predicar la palabra de Dios,
            fortalecer la fe y servir a nuestra comunidad.
          </p>
        </div>

        <div className="footer-col">
          <h4>Horarios</h4>
          <p>Sábado - Reunión de Jóvenes 19:30</p>
          <p>Domingo - Culto General 19:00</p>
        </div>

        <div className="footer-col">
          <h4>Contacto</h4>

          <p>
            <FaMapMarkerAlt className="contact-icon" />
            Cochabamba, Bolivia
          </p>

          <p>
            <FaPhone className="contact-icon" />
            +591 70000000
          </p>

          <p>
            <FaEnvelope className="contact-icon" />
            contacto@asamblea.com
          </p>
        </div>

        <div className="footer-col">
          <h4>Síguenos</h4>

          <div className="social-icons">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link facebook"
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
        © {new Date().getFullYear()} Asamblea Apostolica de la fe en Cristo Jesús
      </div>
    </footer>
  );
}

export default Footer;