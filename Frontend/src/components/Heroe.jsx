import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/heroe.css";

import hero1 from "/images/imagen1.jfif";
import hero2 from "/images/imagen2.jfif";
import hero3 from "/images/imagen3.jfif";
import hero4 from "/images/imagen4.jfif";

import { eventos } from "../data/eventosData";

function Heroe() {
  const navigate = useNavigate();

  const heroImages = [hero1, hero2, hero3, hero4];

  const eventosDestacados = useMemo(() => {
    const eventosEnCurso = eventos
      .filter((evento) => evento.estado === "enCurso")
      .sort((a, b) => new Date(a.fechaOrden) - new Date(b.fechaOrden));

    const eventosProximos = eventos
      .filter((evento) => evento.estado === "proximo")
      .sort((a, b) => new Date(a.fechaOrden) - new Date(b.fechaOrden));

    return [...eventosEnCurso, ...eventosProximos];
  }, []);

  const hayEventosDestacados = eventosDestacados.length > 0;

  const fondosHero = hayEventosDestacados
    ? eventosDestacados.map((evento) => evento.imagen)
    : heroImages;

  const [heroIndex, setHeroIndex] = useState(0);

  const eventoActivo = hayEventosDestacados
    ? eventosDestacados[heroIndex]
    : null;

  useEffect(() => {
    if (fondosHero.length <= 1) return;

    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % fondosHero.length);
    }, 6500);

    return () => clearInterval(interval);
  }, [fondosHero.length]);

  const textoEstado = (estado) => {
    if (estado === "enCurso") return "En curso";
    if (estado === "proximo") return "Próximo";
    return "Evento";
  };

  const cambiarAnterior = () => {
    if (!hayEventosDestacados || eventosDestacados.length <= 1) return;

    setHeroIndex((prev) =>
      prev === 0 ? eventosDestacados.length - 1 : prev - 1
    );
  };

  const cambiarSiguiente = () => {
    if (!hayEventosDestacados || eventosDestacados.length <= 1) return;

    setHeroIndex((prev) =>
      prev === eventosDestacados.length - 1 ? 0 : prev + 1
    );
  };

  const irDetalleEvento = (eventoId) => {
    navigate(`/ministerios/eventos/${eventoId}`);
  };

  const irEventosPasados = () => {
    navigate("/ministerios/eventos");
  };

  const obtenerClaseTarjeta = (index) => {
    if (index === heroIndex) return "card-active";

    const total = eventosDestacados.length;
    const diferencia = (index - heroIndex + total) % total;

    if (diferencia === 1) return "card-next";
    if (diferencia === 2) return "card-back";
    if (diferencia === total - 1) return "card-prev";

    return "card-hidden";
  };

  const obtenerImagenSinEventos = (posicion) => {
    return fondosHero[(heroIndex + posicion) % fondosHero.length];
  };

  return (
    <header className="hero-header" id="inicio">
      <div className="hero-slider-bg">
        {fondosHero.map((image, index) => (
          <div
            key={index}
            className={`hero-bg-image ${heroIndex === index ? "active" : ""}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}

        <div className="hero-overlay"></div>
      </div>

      <div className="hero-bg-shape shape-1"></div>
      <div className="hero-bg-shape shape-2"></div>
      <div className="hero-bg-shape shape-3"></div>

      <div className="hero">
        <div className="hero-content">
          <span className="hero-tag">Bienvenidos a nuestra congregación</span>

          <h1>Bienvenidos a nuestra iglesia</h1>

          <h2 className="hero-church-name">
            Asamblea Apostólica de la Fe en Cristo Jesús
          </h2>

          <p>
            Un lugar para adorar, crecer en la fe y compartir el amor de Cristo.
            Te invitamos a ser parte de nuestra comunidad y vivir una
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

        <aside className="hero-event-stack">
          <div className="event-stack-label">
            <span>Eventos destacados</span>
          </div>

          {eventoActivo ? (
            <>
              <div className="event-stack-wrapper">
                <button
                  type="button"
                  className="event-stack-arrow event-arrow-left"
                  onClick={cambiarAnterior}
                  aria-label="Evento anterior"
                >
                  ‹
                </button>

                <div className="event-cards-area">
                  {eventosDestacados.map((evento, index) => (
                    <article
                      key={evento.id}
                      className={`event-stack-card ${obtenerClaseTarjeta(
                        index
                      )}`}
                      onClick={() => irDetalleEvento(evento.id)}
                    >
                      <img src={evento.imagen} alt={evento.titulo} />

                      <div className="event-stack-overlay"></div>

                      <div className="event-stack-content">
                        <span className={`event-status status-${evento.estado}`}>
                          {textoEstado(evento.estado)}
                        </span>

                        <small>{evento.ministerio}</small>

                        <h3>{evento.titulo}</h3>

                        <p>📅 {evento.fecha}</p>

                        {index === heroIndex && (
                          <Link
                            to={`/ministerios/eventos/${evento.id}`}
                            className="event-stack-btn"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Ver detalles
                          </Link>
                        )}
                      </div>
                    </article>
                  ))}
                </div>

                <button
                  type="button"
                  className="event-stack-arrow event-arrow-right"
                  onClick={cambiarSiguiente}
                  aria-label="Siguiente evento"
                >
                  ›
                </button>
              </div>

              <div className="event-stack-dots">
                <button
                  type="button"
                  onClick={cambiarAnterior}
                  aria-label="Evento anterior"
                ></button>

                <button
                  type="button"
                  className="active"
                  aria-label="Evento actual"
                ></button>

                <button
                  type="button"
                  onClick={cambiarSiguiente}
                  aria-label="Siguiente evento"
                ></button>
              </div>
            </>
          ) : (
            <div className="event-cards-area">
              <article className="event-stack-card card-active event-empty-card">
                <img
                  src={obtenerImagenSinEventos(0)}
                  alt="No hay eventos activos"
                />

                <div className="event-stack-overlay"></div>

                <div className="event-stack-content">
                  <span className="event-status status-empty">
                    Sin eventos
                  </span>

                  <small>Eventos destacados</small>

                  <h3>No hay eventos en curso ni próximos</h3>

                  <p>Por el momento no tenemos actividades publicadas.</p>

                  <button
                    type="button"
                    className="event-stack-btn event-empty-btn"
                    onClick={irEventosPasados}
                  >
                    Ver eventos pasados
                  </button>
                </div>
              </article>

              <article className="event-stack-card card-next event-empty-ghost">
                <img
                  src={obtenerImagenSinEventos(1)}
                  alt=""
                  aria-hidden="true"
                />
              </article>

              <article className="event-stack-card card-back event-empty-ghost">
                <img
                  src={obtenerImagenSinEventos(2)}
                  alt=""
                  aria-hidden="true"
                />
              </article>

              <article className="event-stack-card card-prev event-empty-ghost">
                <img
                  src={obtenerImagenSinEventos(3)}
                  alt=""
                  aria-hidden="true"
                />
              </article>
            </div>
          )}
        </aside>
      </div>
    </header>
  );
}

export default Heroe;