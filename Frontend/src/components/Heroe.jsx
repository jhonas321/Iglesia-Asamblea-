import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import "../styles/heroe.css";

const API_URL = "http://127.0.0.1:8000/api";
const BACKEND_URL = "http://127.0.0.1:8000";


const obtenerUrlArchivo = (ruta) => {
  if (!ruta) return "";

  const valor = String(ruta).trim();

  if (
    valor.startsWith("http://") ||
    valor.startsWith("https://") ||
    valor.startsWith("data:") ||
    valor.startsWith("blob:") ||
    valor.startsWith("/")
  ) {
    return valor;
  }

  return `${BACKEND_URL}/storage/${valor}`;
};

const convertirEventoApi = (evento) => ({
  id: evento.id,
  titulo: evento.titulo || "",
  ministerio:
    evento.ministerio?.nombre ||
    evento.ministerio_nombre ||
    "Sin ministerio",
  fechaInicio: evento.fecha_inicio || "",
  fechaFinal: evento.fecha_final || evento.fecha_inicio || "",
  imagen: obtenerUrlArchivo(evento.imagen),
});

const convertirHeroFotoApi = (foto) => ({
  id: foto.id,
  titulo: foto.titulo || "",
  imagen: obtenerUrlArchivo(foto.imagen),
  orden: Number(foto.orden || 0),
  activo: foto.activo !== false,
});

const TIEMPO_CAMBIO_HERO = 6000;

const obtenerFechaActualInput = () => {
  const hoy = new Date();

  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
};

const crearFechaLocalDesdeInput = (fechaInput) => {
  if (!fechaInput) return null;

  const [anio, mes, dia] = String(fechaInput).split("-").map(Number);

  if (!anio || !mes || !dia) return null;

  return new Date(anio, mes - 1, dia);
};

const obtenerNombreMes = (numeroMes) => {
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return meses[numeroMes];
};

const formatearFechaEvento = (fechaInput) => {
  const fecha = crearFechaLocalDesdeInput(fechaInput);

  if (!fecha) return "Sin fecha";

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = obtenerNombreMes(fecha.getMonth());
  const anio = fecha.getFullYear();

  return `${dia} ${mes} ${anio}`;
};

const formatearRangoFechaEvento = (fechaInicio, fechaFinal) => {
  const inicio = crearFechaLocalDesdeInput(fechaInicio);
  const final = crearFechaLocalDesdeInput(fechaFinal || fechaInicio);

  const mismoDia =
    inicio.getFullYear() === final.getFullYear() &&
    inicio.getMonth() === final.getMonth() &&
    inicio.getDate() === final.getDate();

  if (mismoDia) {
    return formatearFechaEvento(fechaInicio);
  }

  const mismoMes =
    inicio.getFullYear() === final.getFullYear() &&
    inicio.getMonth() === final.getMonth();

  if (mismoMes) {
    const diaInicio = String(inicio.getDate()).padStart(2, "0");
    const diaFinal = String(final.getDate()).padStart(2, "0");
    const mes = obtenerNombreMes(inicio.getMonth());
    const anio = inicio.getFullYear();

    return `${diaInicio} al ${diaFinal} ${mes} ${anio}`;
  }

  const mismoAnio = inicio.getFullYear() === final.getFullYear();

  if (mismoAnio) {
    const diaInicio = String(inicio.getDate()).padStart(2, "0");
    const mesInicio = obtenerNombreMes(inicio.getMonth());
    const diaFinal = String(final.getDate()).padStart(2, "0");
    const mesFinal = obtenerNombreMes(final.getMonth());
    const anio = inicio.getFullYear();

    return `${diaInicio} ${mesInicio} al ${diaFinal} ${mesFinal} ${anio}`;
  }

  return `${formatearFechaEvento(fechaInicio)} al ${formatearFechaEvento(
    fechaFinal
  )}`;
};

const obtenerEstadoEvento = (evento, fechaActual) => {
  const fechaInicio = evento.fechaInicio;
  const fechaFinal = evento.fechaFinal || evento.fechaInicio;

  if (fechaActual < fechaInicio) return "proximo";
  if (fechaActual > fechaFinal) return "pasado";

  return "enCurso";
};

const obtenerFechaOrdenEvento = (evento) => {
  return evento.fechaInicio;
};

function Heroe() {
  const navigate = useNavigate();

  const [eventos, setEventos] = useState([]);
  const [heroFotos, setHeroFotos] = useState([]);
  const [nombreIglesia, setNombreIglesia] = useState("");

  useEffect(() => {
    let activo = true;

    const extraerLista = (data) => {
      if (Array.isArray(data)) return data;
      if (Array.isArray(data?.data)) return data.data;
      return [];
    };

    const cargarEventos = async () => {
      try {
        const response = await fetch(`${API_URL}/eventos`, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Eventos: ${response.status}`);
        }

        const data = await response.json();

        if (!activo) return;

        setEventos(
          extraerLista(data).map(convertirEventoApi)
        );
      } catch (error) {
        console.error("Error cargando eventos del Hero:", error);

        if (activo) {
          setEventos([]);
        }
      }
    };

    const cargarHeroFotos = async () => {
      try {
        const response = await fetch(`${API_URL}/hero-fotos`, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Hero fotos: ${response.status}`);
        }

        const data = await response.json();

        if (!activo) return;

        setHeroFotos(
          extraerLista(data)
            .map(convertirHeroFotoApi)
            .filter((foto) => foto.activo && foto.imagen)
            .sort((a, b) => a.orden - b.orden)
        );
      } catch (error) {
        console.error("Error cargando fotos del Hero:", error);

        if (activo) {
          setHeroFotos([]);
        }
      }
    };

    const cargarContacto = async () => {
      try {
        const response = await fetch(`${API_URL}/contactos`, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Contactos: ${response.status}`);
        }

        const data = await response.json();

        if (!activo) return;

        const contacto = data?.data || data || {};

        setNombreIglesia(
          String(contacto.nombre_iglesia || "").trim()
        );
      } catch (error) {
        console.error("Error cargando nombre de la iglesia:", error);

        if (activo) {
          setNombreIglesia("");
        }
      }
    };

    cargarEventos();
    cargarHeroFotos();
    cargarContacto();

    return () => {
      activo = false;
    };
  }, []);

  const fechaActual = obtenerFechaActualInput();

  const eventosDestacados = useMemo(() => {
    const eventosActualizados = eventos.map((evento) => ({
      ...evento,
      fecha: formatearRangoFechaEvento(evento.fechaInicio, evento.fechaFinal),
      estado: obtenerEstadoEvento(evento, fechaActual),
    }));

    const eventosEnCurso = eventosActualizados
      .filter((evento) => evento.estado === "enCurso")
      .sort(
        (a, b) =>
          new Date(obtenerFechaOrdenEvento(a)) -
          new Date(obtenerFechaOrdenEvento(b))
      );

    const eventosProximos = eventosActualizados
      .filter((evento) => evento.estado === "proximo")
      .sort(
        (a, b) =>
          new Date(obtenerFechaOrdenEvento(a)) -
          new Date(obtenerFechaOrdenEvento(b))
      );

    return [...eventosEnCurso, ...eventosProximos];
  }, [eventos, fechaActual]);

  const hayEventosDestacados = eventosDestacados.length > 0;

  const fondosHero = useMemo(() => {
    /*
      PRIORIDAD DEL HERO:

      1. Si existen eventos EN CURSO o PRÓXIMOS,
         usamos las imágenes de esos eventos como fondo.

      2. Solamente cuando NO existen eventos destacados,
         usamos las fotos configuradas en "Hero Fotos".
    */

    if (eventosDestacados.length > 0) {
      return eventosDestacados
        .map((evento) => evento.imagen)
        .filter(Boolean);
    }

    return heroFotos
      .map((foto) => foto.imagen)
      .filter(Boolean);
  }, [eventosDestacados, heroFotos]);

  const [heroIndex, setHeroIndex] = useState(0);

  const eventoActivo = hayEventosDestacados
    ? eventosDestacados[heroIndex % eventosDestacados.length]
    : null;

  useEffect(() => {
    if (heroIndex >= fondosHero.length) {
      setHeroIndex(0);
    }
  }, [fondosHero.length, heroIndex]);

  useEffect(() => {
    if (fondosHero.length <= 1) return;

    const timeout = setTimeout(() => {
      setHeroIndex((prev) => (prev + 1) % fondosHero.length);
    }, TIEMPO_CAMBIO_HERO);

    return () => clearTimeout(timeout);
  }, [heroIndex, fondosHero.length]);

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
    if (index === heroIndex % eventosDestacados.length) return "card-active";

    const total = eventosDestacados.length;
    const diferencia = (index - (heroIndex % total) + total) % total;

    if (diferencia === 1) return "card-next";
    if (diferencia === 2) return "card-back";
    if (diferencia === total - 1) return "card-prev";

    return "card-hidden";
  };

  const obtenerClaseTarjetaSinEventos = (index) => {
    const total = fondosHero.length;
    if (total === 0) return "card-hidden";

    if (index === heroIndex % total) return "card-active";

    const diferencia = (index - (heroIndex % total) + total) % total;

    if (diferencia === 1) return "card-next";
    if (diferencia === 2) return "card-back";
    if (diferencia === total - 1) return "card-prev";

    return "card-hidden";
  };

  return (
    <header className="hero-header" id="inicio">
      <div className="hero-slider-bg">
        {fondosHero.map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            aria-hidden="true"
            className={`hero-bg-image ${heroIndex === index ? "active" : ""}`}
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

          {nombreIglesia && (
            <h2 className="hero-church-name">
              {nombreIglesia}
            </h2>
          )}

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

                        <p className="event-date-line">
                          <CalendarDays
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                          <span>{evento.fecha}</span>
                        </p>

                        {index === heroIndex % eventosDestacados.length && (
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
              {fondosHero.length > 0 ? (
                fondosHero.map((image, index) => {
                  const claseTarjeta = obtenerClaseTarjetaSinEventos(index);
                  const esActiva = index === heroIndex % fondosHero.length;

                  return (
                    <article
                      key={index}
                      className={`event-stack-card ${claseTarjeta} ${
                        esActiva ? "event-empty-card" : "event-empty-ghost"
                      }`}
                    >
                      <img src={image} alt="" aria-hidden={!esActiva} />

                      <div className="event-stack-overlay"></div>

                      {esActiva && (
                        <div className="event-stack-content">
                          <span className="event-status status-empty">
                            Sin eventos
                          </span>

                          <small>Eventos destacados</small>

                          <h3>No hay eventos en curso ni próximos</h3>

                          <p>
                            Por el momento no tenemos actividades publicadas.
                          </p>

                          <button
                            type="button"
                            className="event-stack-btn event-empty-btn"
                            onClick={irEventosPasados}
                          >
                            Ver eventos pasados
                          </button>
                        </div>
                      )}
                    </article>
                  );
                })
              ) : (
                <article className="event-stack-card card-active event-empty-card">
                  <div className="event-stack-overlay"></div>

                  <div className="event-stack-content">
                    <span className="event-status status-empty">
                      Sin eventos
                    </span>

                    <small>Eventos destacados</small>

                    <h3>No hay eventos en curso ni próximos</h3>

                    <p>
                      Por el momento no tenemos actividades publicadas.
                    </p>

                    <button
                      type="button"
                      className="event-stack-btn event-empty-btn"
                      onClick={irEventosPasados}
                    >
                      Ver eventos pasados
                    </button>
                  </div>
                </article>
              )}
            </div>
          )}
        </aside>
      </div>
    </header>
  );
}

export default Heroe;