import { Link } from "react-router-dom";
import "../styles/ministerios-preview.css";

function MinisteriosPreview() {
  return (
    <section className="ministerios-preview">
      <div className="ministerios-title">
        <h2>Ministerios</h2>
        <div className="ministerios-line"></div>
        <p>
          En esta sección encontrarás publicaciones, recuerdos, eventos y
          actividades programadas dentro de los ministerios de la iglesia.
        </p>
      </div>

      <div className="ministerios-wrapper">
        <Link to="/ministerios/publicaciones" className="ministerio-card">
          <div className="ministerio-image">
            <img
              src="\images\banner.avif"
              alt="Publicaciones de ministerios cristianos"
            />
            <div className="ministerio-overlay"></div>

            <div className="ministerio-image-title">
              <span>Ministerios</span>
              <h3>Publicaciones</h3>
              <p>
                Fotos, videos, testimonios y recuerdos de actividades realizadas.
              </p>
            </div>
          </div>

          <div className="ministerio-info">
            <div className="ministerio-content">
              <div className="ministerio-icon">📸</div>
              <h3>Publicaciones</h3>
              <p>
                Revive momentos especiales mediante fotografías, videos,
                resúmenes y publicaciones de actividades ya realizadas por los
                ministerios.
              </p>
              <button type="button">Ver publicaciones</button>
            </div>
          </div>
        </Link>

        <Link to="/ministerios/eventos" className="ministerio-card">
          <div className="ministerio-image">
            <img
              src="public\images\avisos.avif"
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
              <div className="ministerio-icon">📅</div>
              <h3>Eventos</h3>
              <p>
                Consulta la agenda de los ministerios: próximos eventos,
                reuniones, cultos especiales, ensayos y actividades programadas.
              </p>
              <button type="button">Ver eventos</button>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default MinisteriosPreview;