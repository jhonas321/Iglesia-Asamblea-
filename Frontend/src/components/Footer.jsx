import { useEffect, useMemo, useState } from "react";
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

const API_URL = "http://127.0.0.1:8000/api";

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

const normalizarHora = (hora) => {
  const valor = String(hora || "").trim();

  if (!valor) return "";

  return valor.length >= 5 ? valor.slice(0, 5) : valor;
};

const formatearTelefono = (telefono) => {
  const valor = String(telefono || "").trim();

  if (!valor) return "";

  const limpio = valor.replace(/[^\d+]/g, "");

  if (limpio.startsWith("+591")) {
    return `+591 ${limpio.slice(4)}`;
  }

  if (limpio.startsWith("591")) {
    return `+591 ${limpio.slice(3)}`;
  }

  return valor;
};

function Footer() {
  const [horarios, setHorarios] = useState([]);

  const [contacto, setContacto] = useState({
    nombreIglesia: "",
    footerUbicacion: "",
    footerTelefono: "",
    footerCorreo: "",
    facebookUrl: "",
    youtubeUrl: "",
    instagramUrl: "",
    tiktokUrl: "",
    twitterUrl: "",
    telegramUrl: "",
  });

  useEffect(() => {
    let activo = true;

    const cargarDatosFooter = async () => {
      try {
        const [respuestaHorarios, respuestaContacto] = await Promise.all([
          fetch(`${API_URL}/horarios`, {
            headers: {
              Accept: "application/json",
            },
          }),

          fetch(`${API_URL}/contactos`, {
            headers: {
              Accept: "application/json",
            },
          }),
        ]);

        if (!respuestaHorarios.ok) {
          throw new Error(`Horarios: ${respuestaHorarios.status}`);
        }

        if (!respuestaContacto.ok) {
          throw new Error(`Contactos: ${respuestaContacto.status}`);
        }

        const datosHorarios = await respuestaHorarios.json();
        const datosContacto = await respuestaContacto.json();

        if (!activo) return;

        const listaHorarios = Array.isArray(datosHorarios)
          ? datosHorarios
          : Array.isArray(datosHorarios?.data)
          ? datosHorarios.data
          : [];

        const contactoBackend = datosContacto?.data || datosContacto || {};

        setHorarios(
          listaHorarios
            .filter((horario) => horario?.activo !== false)
            .map((horario) => ({
              id: horario.id,
              dia: horario.dia || "",
              actividad: horario.actividad || "",
              hora: normalizarHora(horario.hora),
            }))
        );

        setContacto({
          nombreIglesia: contactoBackend.nombre_iglesia || "",
          footerUbicacion: contactoBackend.footer_ubicacion || "",
          footerTelefono: contactoBackend.footer_telefono || "",
          footerCorreo: contactoBackend.footer_correo || "",
          facebookUrl: contactoBackend.facebook_url || "",
          youtubeUrl: contactoBackend.youtube_url || "",
          instagramUrl: contactoBackend.instagram_url || "",
          tiktokUrl: contactoBackend.tiktok_url || "",
          twitterUrl: contactoBackend.twitter_url || "",
          telegramUrl: contactoBackend.telegram_url || "",
        });
      } catch (error) {
        console.error("Error cargando datos del footer:", error);

        if (activo) {
          setHorarios([]);

          setContacto({
            nombreIglesia: "",
            footerUbicacion: "",
            footerTelefono: "",
            footerCorreo: "",
            facebookUrl: "",
            youtubeUrl: "",
            instagramUrl: "",
            tiktokUrl: "",
            twitterUrl: "",
            telegramUrl: "",
          });
        }
      }
    };

    cargarDatosFooter();

    return () => {
      activo = false;
    };
  }, []);

  const horariosFooter = useMemo(() => {
    return ordenarHorariosFooter(horarios);
  }, [horarios]);

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
          {contacto.nombreIglesia && (
            <h3>{contacto.nombreIglesia}</h3>
          )}

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
                    <span className="footer-schedule-day">
                      {horario.dia}
                    </span>

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
            {contacto.footerUbicacion && (
              <div className="footer-contact-item">
                <span className="footer-contact-circle">
                  <FaMapMarkerAlt />
                </span>

                <span>{contacto.footerUbicacion}</span>
              </div>
            )}

            {contacto.footerTelefono && (
              <div className="footer-contact-item">
                <span className="footer-contact-circle">
                  <FaPhone />
                </span>

                <span>
                  {formatearTelefono(contacto.footerTelefono)}
                </span>
              </div>
            )}

            {contacto.footerCorreo && (
              <div className="footer-contact-item">
                <span className="footer-contact-circle">
                  <FaEnvelope />
                </span>

                <span>{contacto.footerCorreo}</span>
              </div>
            )}
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

                  <span className="social-text">
                    {red.nombre}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {contacto.nombreIglesia && (
        <div className="footer-bottom">
          © {new Date().getFullYear()} {contacto.nombreIglesia}
        </div>
      )}
    </footer>
  );
}

export default Footer;