import "../styles/footer.css";

import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaTelegramPlane,
} from "react-icons/fa";

import {
  obtenerContactoGuardado,
  obtenerHorariosGuardados,
} from "../data/adminStorage";

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

const tieneUrl = (url) => {
  const valor = String(url || "").trim();

  return valor !== "" && valor !== "#";
};

const normalizarUrl = (url) => {
  const valor = String(url || "").trim();

  if (!valor || valor === "#") return "#";

  if (valor.startsWith("http://") || valor.startsWith("https://")) {
    return valor;
  }

  return `https://${valor}`;
};

function Footer() {
  const horariosFooter = ordenarHorariosFooter(obtenerHorariosGuardados());
  const contacto = obtenerContactoGuardado();

  const redesSociales = [
    {
      nombre: "Facebook",
      url: contacto.facebookUrl,
      clase: "facebook",
      icono: <FaFacebookF />,
    },
    {
      nombre: "YouTube",
      url: contacto.youtubeUrl,
      clase: "youtube",
      icono: <FaYoutube />,
    },
    {
      nombre: "Instagram",
      url: contacto.instagramUrl,
      clase: "instagram",
      icono: <FaInstagram />,
    },
    {
      nombre: "TikTok",
      url: contacto.tiktokUrl,
      clase: "tiktok",
      icono: <FaTiktok />,
    },
    {
      nombre: "X / Twitter",
      url: contacto.twitterUrl,
      clase: "twitter",
      icono: <span className="x-twitter-icon">𝕏</span>,
    },
    {
      nombre: "Telegram",
      url: contacto.telegramUrl,
      clase: "telegram",
      icono: <FaTelegramPlane />,
    },
  ];

  const redesSocialesVisibles = redesSociales.filter((red) =>
    tieneUrl(red.url)
  );

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

              <span>{contacto.footerUbicacion}</span>
            </div>

            <div className="footer-contact-item">
              <span className="footer-contact-circle">
                <FaPhone />
              </span>

              <span>{contacto.footerTelefono}</span>
            </div>

            <div className="footer-contact-item">
              <span className="footer-contact-circle">
                <FaEnvelope />
              </span>

              <span>{contacto.footerCorreo}</span>
            </div>
          </div>
        </div>

        {redesSocialesVisibles.length > 0 && (
          <div className="footer-col">
            <h4>Síguenos</h4>

            <div className="social-icons">
              {redesSocialesVisibles.map((red) => (
                <a
                  href={normalizarUrl(red.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-link ${red.clase}`}
                  aria-label={red.nombre}
                  key={red.nombre}
                >
                  <span className="circle">{red.icono}</span>

                  <span className="social-text">{red.nombre}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Asamblea Apostólica de la Fe en Cristo
        Jesús
      </div>
    </footer>
  );
}

export default Footer;