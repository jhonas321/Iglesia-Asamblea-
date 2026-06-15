import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, CalendarDays } from "lucide-react";
import "../styles/ministerios-preview.css";

function MinisteriosPreview() {
  const navigate = useNavigate();
  const [tarjetaActiva, setTarjetaActiva] = useState("");

  const manejarClickTarjeta = (tarjeta) => {
    setTarjetaActiva((actual) => (actual === tarjeta ? "" : tarjeta));
  };

  const irAPublicaciones = (e) => {
    e.stopPropagation();
    navigate("/ministerios/publicaciones");
  };

  const irAEventos = (e) => {
    e.stopPropagation();
    navigate("/ministerios/eventos");
  };

  return (
    <section id="ministerios" className="ministerios-preview">
      <div className="ministerios-title">
        <h2>Ministerios</h2>
        <div className="ministerios-line"></div>

        <p>
          En esta sección encontrarás publicaciones, recuerdos, eventos y
          actividades programadas dentro de los ministerios de la iglesia.
        </p>
      </div>

      <div className="ministerios-wrapper">
        <article
          className={`ministerio-card ${
            tarjetaActiva === "publicaciones" ? "card-activa" : ""
          }`}
          onClick={() => manejarClickTarjeta("publicaciones")}
        >
          <div className="ministerio-image">
            <img
              src="/images/banner.avif"
              alt="Publicaciones de ministerios cristianos"
            />

            <div className="ministerio-overlay"></div>

            <div className="ministerio-image-title">
              <span>Ministerios</span>
              <h3>Publicaciones</h3>

              <p>
                Fotos, videos, testimonios y recuerdos de actividades
                realizadas.
              </p>
            </div>
          </div>

          <div className="ministerio-info">
            <div className="ministerio-content">
              <div className="ministerio-icon">
                <Camera size={34} strokeWidth={2.4} />
              </div>

              <h3>Publicaciones</h3>

              <p>
                Revive momentos especiales mediante fotografías, videos,
                resúmenes y publicaciones de actividades ya realizadas por los
                ministerios.
              </p>

              <span className="ministerio-tap-hint">
                Toca nuevamente la tarjeta para cerrar.
              </span>

              <button type="button" onClick={irAPublicaciones}>
                Ver publicaciones
              </button>
            </div>
          </div>
        </article>

        <article
          className={`ministerio-card ${
            tarjetaActiva === "eventos" ? "card-activa" : ""
          }`}
          onClick={() => manejarClickTarjeta("eventos")}
        >
          <div className="ministerio-image">
            <img
              src="/images/avisos.avif"
              alt="Eventos cristianos de la iglesia"
            />

            <div className="ministerio-overlay"></div>

            <div className="ministerio-image-title">
              <span>Ministerios</span>
              <h3>Eventos</h3>

              <p>
                Próximas reuniones, actividades, cultos especiales y fechas
                importantes.
              </p>
            </div>
          </div>

          <div className="ministerio-info">
            <div className="ministerio-content">
              <div className="ministerio-icon">
                <CalendarDays size={34} strokeWidth={2.4} />
              </div>

              <h3>Eventos</h3>

              <p>
                Consulta la agenda de los ministerios: próximos eventos,
                reuniones, cultos especiales, ensayos y actividades programadas.
              </p>

              <span className="ministerio-tap-hint">
                Toca nuevamente la tarjeta para cerrar.
              </span>

              <button type="button" onClick={irAEventos}>
                Ver eventos
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default MinisteriosPreview;