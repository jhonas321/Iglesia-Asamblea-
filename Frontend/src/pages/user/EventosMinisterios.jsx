import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaSearch,
  FaChevronUp,
  FaChevronDown,
  FaWhatsapp,
} from "react-icons/fa";
import CalendarioPersonalizado from "../../components/CalendarioPersonalizado";
import "../../styles/eventos-ministerios.css";

const eventos = [
  {
    id: 1,
    titulo: "Campaña Distrital",
    ministerio: "Ministerios Generales",
    fecha: "20 al 24 Mayo 2026",
    fechaOrden: "2026-05-20",
    hora: "19:30",
    lugar: "Templo principal",
    descripcion:
      "Semana dedicada a la oración, intercesión y fortalecimiento espiritual de los ministerios.",
    detalles:
      "Durante esta semana los ministerios participan en tiempos de oración, reflexión bíblica y búsqueda espiritual como iglesia.",
    imagen: "/images/convencion.jpeg",
    estado: "enCurso",
  },
  {
    id: 2,
    titulo: "Campaña de evangelismo",
    ministerio: "Ministerio de Evangelismo",
    fecha: "21 al 26 Mayo 2026",
    fechaOrden: "2026-05-21",
    hora: "17:00",
    lugar: "Plaza principal",
    descripcion:
      "Actividad de evangelismo y servicio para compartir el mensaje de esperanza con la comunidad.",
    detalles:
      "La campaña busca acercarse a las personas mediante oración, palabra de ánimo, música y acompañamiento espiritual.",
    imagen: "/images/distrital.jpeg",
    estado: "enCurso",
  },
  {
    id: 3,
    titulo: "Taller de formación bíblica",
    ministerio: "Ministerio de Enseñanza",
    fecha: "22 al 25 Mayo 2026",
    fechaOrden: "2026-05-22",
    hora: "18:00",
    lugar: "Aula de estudios",
    descripcion:
      "Espacio de enseñanza para fortalecer el conocimiento bíblico de los servidores.",
    detalles:
      "Este taller incluye estudios bíblicos, participación grupal y orientación para aplicar la Palabra de Dios en el servicio.",
    imagen: "/images/juvenil.jpeg",
    estado: "enCurso",
  },
  {
    id: 7,
    titulo: "Conferencia de jóvenes",
    ministerio: "Ministerio de Jóvenes",
    fecha: "25 Mayo 2026",
    fechaOrden: "2026-05-25",
    hora: "18:30",
    lugar: "Templo principal",
    descripcion:
      "Una noche especial para jóvenes con palabra, adoración, dinámicas y tiempo de compañerismo.",
    detalles:
      "Este evento está dirigido a jóvenes que desean fortalecer su fe, compartir con otros y participar en un tiempo especial de adoración.",
    imagen:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",
    estado: "proximo",
  },
  {
    id: 8,
    titulo: "Culto especial de alabanza",
    ministerio: "Ministerio de Alabanza",
    fecha: "30 Mayo 2026",
    fechaOrden: "2026-05-30",
    hora: "19:00",
    lugar: "Auditorio de la iglesia",
    descripcion:
      "Un tiempo dedicado a la adoración, oración y gratitud a Dios junto a toda la congregación.",
    detalles:
      "El ministerio de alabanza prepara un culto especial para compartir un tiempo de adoración, oración y reflexión.",
    imagen:
      "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=1000&q=80",
    estado: "proximo",
  },
  {
    id: 9,
    titulo: "Encuentro de matrimonios",
    ministerio: "Ministerio de Familias",
    fecha: "05 Junio 2026",
    fechaOrden: "2026-06-05",
    hora: "19:30",
    lugar: "Salón principal",
    descripcion:
      "Reunión especial para fortalecer la unidad, comunicación y vida espiritual familiar.",
    detalles:
      "El encuentro de matrimonios busca brindar enseñanza, reflexión y acompañamiento espiritual para las familias.",
    imagen:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=80",
    estado: "proximo",
  },
  {
    id: 13,
    titulo: "Encuentro de servidores",
    ministerio: "Ministerios Generales",
    fecha: "12 Mayo 2026",
    fechaOrden: "2026-05-12",
    hora: "18:00",
    lugar: "Salón principal",
    descripcion:
      "Encuentro realizado para capacitar y animar a los servidores de la iglesia.",
    detalles:
      "Este encuentro reunió a los servidores de diferentes áreas para recibir orientación y fortalecer el compromiso de servicio.",
    imagen:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=80",
    estado: "pasado",
  },
  {
    id: 14,
    titulo: "Actividad familiar de integración",
    ministerio: "Ministerio de Familias",
    fecha: "05 Mayo 2026",
    fechaOrden: "2026-05-05",
    hora: "16:00",
    lugar: "Patio de la iglesia",
    descripcion:
      "Actividad realizada para compartir como familias en un ambiente de comunión y alegría.",
    detalles:
      "La actividad familiar permitió fortalecer la convivencia entre hermanos mediante juegos, reflexión y compañerismo.",
    imagen:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80",
    estado: "pasado",
  },
  {
    id: 15,
    titulo: "Tarde de niños",
    ministerio: "Ministerio de Niños",
    fecha: "28 Abril 2026",
    fechaOrden: "2026-04-28",
    hora: "15:30",
    lugar: "Aula infantil",
    descripcion:
      "Actividad con juegos, enseñanza bíblica, música y participación de los niños.",
    detalles:
      "Los niños compartieron una tarde especial con dinámicas, canciones y una enseñanza bíblica preparada para su edad.",
    imagen:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1000&q=80",
    estado: "pasado",
  },
];

function EventosMinisterios() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [pestanaActiva, setPestanaActiva] = useState("todos");

  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
  const [tipoFiltroActivo, setTipoFiltroActivo] = useState("");

  const [busquedaTexto, setBusquedaTexto] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");

  const [calendarioAbierto, setCalendarioAbierto] = useState("");

  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroFechaInicio, setFiltroFechaInicio] = useState("");
  const [filtroFechaFinal, setFiltroFechaFinal] = useState("");

  useEffect(() => {
    if (!id) return;

    const eventoEncontrado = eventos.find((evento) => evento.id === Number(id));

    if (eventoEncontrado) {
      setEventoSeleccionado(eventoEncontrado);
    }
  }, [id]);

  useEffect(() => {
    if (!eventoSeleccionado) return;

    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      window.scrollTo(0, scrollY);
    };
  }, [eventoSeleccionado]);

  const textoEstado = (estado) => {
    if (estado === "enCurso") return "En curso";
    if (estado === "pasado") return "Finalizado";
    return "Próximo";
  };

  const normalizarTexto = (texto) => {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  };

  const limpiarFiltroTexto = () => {
    setBusquedaTexto("");
    setFiltroTexto("");
  };

  const limpiarFechaInicio = (e) => {
    if (e) e.stopPropagation();

    setFechaInicio("");
    setFiltroFechaInicio("");

    if (calendarioAbierto === "inicio") {
      setCalendarioAbierto("");
    }
  };

  const limpiarFechaFinal = (e) => {
    if (e) e.stopPropagation();

    setFechaFinal("");
    setFiltroFechaFinal("");

    if (calendarioAbierto === "final") {
      setCalendarioAbierto("");
    }
  };

  const limpiarFiltrosSinCerrar = () => {
    setBusquedaTexto("");
    setFechaInicio("");
    setFechaFinal("");
    setFiltroTexto("");
    setFiltroFechaInicio("");
    setFiltroFechaFinal("");
    setCalendarioAbierto("");
  };

  const limpiarFiltros = () => {
    limpiarFiltrosSinCerrar();
    setTipoFiltroActivo("");
  };

  const abrirFiltros = () => {
    setFiltrosAbiertos(!filtrosAbiertos);

    if (filtrosAbiertos) {
      limpiarFiltros();
    }
  };

  const seleccionarTipoFiltro = (tipo) => {
    if (tipoFiltroActivo !== tipo) {
      limpiarFiltrosSinCerrar();
    }

    setTipoFiltroActivo(tipo);
  };

  const aplicarBusquedaTexto = () => {
    setFiltroTexto(busquedaTexto);
  };

  const aplicarFiltroFechas = () => {
    setFiltroFechaInicio(fechaInicio);
    setFiltroFechaFinal(fechaFinal);
    setCalendarioAbierto("");
  };

  const manejarCambioBusquedaTexto = (valor) => {
    setBusquedaTexto(valor);
    setFiltroTexto(valor);
  };

  const manejarCambioFechaInicio = (valor) => {
    setFechaInicio(valor);
    setFiltroFechaInicio(valor);
  };

  const manejarCambioFechaFinal = (valor) => {
    setFechaFinal(valor);
    setFiltroFechaFinal(valor);
  };

  const ordenarEventos = (lista) => {
    if (pestanaActiva === "todos") {
      const prioridadEstado = {
        enCurso: 1,
        proximo: 2,
        pasado: 3,
      };

      return [...lista].sort((a, b) => {
        const diferenciaEstado =
          prioridadEstado[a.estado] - prioridadEstado[b.estado];

        if (diferenciaEstado !== 0) return diferenciaEstado;

        if (a.estado === "pasado") {
          return new Date(b.fechaOrden) - new Date(a.fechaOrden);
        }

        return new Date(a.fechaOrden) - new Date(b.fechaOrden);
      });
    }

    if (pestanaActiva === "pasado") {
      return [...lista].sort(
        (a, b) => new Date(b.fechaOrden) - new Date(a.fechaOrden)
      );
    }

    return [...lista].sort(
      (a, b) => new Date(a.fechaOrden) - new Date(b.fechaOrden)
    );
  };

  const filtrarPorTexto = (evento) => {
    if (!filtroTexto.trim()) return true;

    const textoBuscado = normalizarTexto(filtroTexto);
    const textoEvento = normalizarTexto(
      `${evento.ministerio} ${evento.titulo}`
    );

    return textoEvento.includes(textoBuscado);
  };

  const filtrarPorRangoFechas = (evento) => {
    const fechaEvento = evento.fechaOrden;

    if (filtroFechaInicio && filtroFechaFinal) {
      return fechaEvento >= filtroFechaInicio && fechaEvento <= filtroFechaFinal;
    }

    if (filtroFechaInicio) return fechaEvento >= filtroFechaInicio;
    if (filtroFechaFinal) return fechaEvento <= filtroFechaFinal;

    return true;
  };

  const eventosPorPestana =
    pestanaActiva === "todos"
      ? eventos
      : eventos.filter((evento) => evento.estado === pestanaActiva);

  const eventosFiltrados = ordenarEventos(
    eventosPorPestana.filter(
      (evento) => filtrarPorTexto(evento) && filtrarPorRangoFechas(evento)
    )
  );

  const cerrarModal = () => {
    setEventoSeleccionado(null);
    navigate("/ministerios/eventos");
  };

  const consultarWhatsApp = () => {
    if (!eventoSeleccionado) return;

    const mensaje = `Hola, quisiera consultar sobre el evento "${eventoSeleccionado.titulo}" del ${eventoSeleccionado.fecha} a horas ${eventoSeleccionado.hora}, en ${eventoSeleccionado.lugar}.`;

    const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
  };

  return (
    <main className="eventos-page">
      <section className="eventos-hero">
        <div className="eventos-hero-content">
          <h1>Eventos Ministeriales</h1>
          <p>
            Consulta las próximas actividades, eventos en curso y actividades ya
            realizadas por los ministerios de la iglesia.
          </p>
        </div>
      </section>

      <section className="eventos-section">
        <div className="eventos-tabs">
          <button
            type="button"
            className={pestanaActiva === "todos" ? "active" : ""}
            onClick={() => setPestanaActiva("todos")}
          >
            Todos
          </button>

          <button
            type="button"
            className={pestanaActiva === "enCurso" ? "active" : ""}
            onClick={() => setPestanaActiva("enCurso")}
          >
            En curso
          </button>

          <button
            type="button"
            className={pestanaActiva === "proximo" ? "active" : ""}
            onClick={() => setPestanaActiva("proximo")}
          >
            Próximos eventos
          </button>

          <button
            type="button"
            className={pestanaActiva === "pasado" ? "active" : ""}
            onClick={() => setPestanaActiva("pasado")}
          >
            Eventos pasados
          </button>
        </div>

        <button type="button" className="filter-toggle" onClick={abrirFiltros}>
          <span>Búsqueda</span>
          {filtrosAbiertos ? (
            <FaChevronUp className="filter-toggle-icon" aria-hidden="true" />
          ) : (
            <FaChevronDown className="filter-toggle-icon" aria-hidden="true" />
          )}
        </button>

        <div
          className={`filter-type-options ${
            filtrosAbiertos ? "filters-open" : ""
          }`}
        >
          <button
            type="button"
            className={tipoFiltroActivo === "busqueda" ? "active" : ""}
            onClick={() => seleccionarTipoFiltro("busqueda")}
          >
            <FaSearch className="filter-option-icon" aria-hidden="true" />
            Buscar eventos
          </button>

          <button
            type="button"
            className={tipoFiltroActivo === "fechas" ? "active" : ""}
            onClick={() => seleccionarTipoFiltro("fechas")}
          >
            <FaCalendarAlt className="filter-option-icon" aria-hidden="true" />
            Buscar por fecha
          </button>
        </div>

        <div
          className={`eventos-filters-wrapper ${
            filtrosAbiertos && tipoFiltroActivo ? "filters-open" : ""
          }`}
        >
          <div
            className={`eventos-filter-card ${
              tipoFiltroActivo === "busqueda" ? "filter-active" : ""
            }`}
          >
            <div className="filter-card-header">
              <span>Buscar eventos</span>
            </div>

            <div className="search-field">
              <label>Ministerio o título</label>

              <div className="search-input-wrapper">
                <input
                  type="text"
                  value={busquedaTexto}
                  onChange={(e) => manejarCambioBusquedaTexto(e.target.value)}
                  placeholder="Ej: Ministerios Generales, Evangelismo, Semana de oración..."
                />

                {busquedaTexto && (
                  <button
                    type="button"
                    className="field-clear-btn"
                    onClick={limpiarFiltroTexto}
                    aria-label="Borrar búsqueda"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            <div className="filter-actions">
              <button
                type="button"
                className="filter-btn"
                onClick={aplicarBusquedaTexto}
              >
                Buscar eventos
              </button>
            </div>
          </div>

          <div
            className={`eventos-filter-card ${
              tipoFiltroActivo === "fechas" ? "filter-active" : ""
            }`}
          >
            <div className="filter-card-header">
              <span>Buscar por fecha</span>
            </div>

            <div className="date-fields-row">
              <div
                className={`date-field ${
                  calendarioAbierto === "inicio"
                    ? "calendario-padre-activo"
                    : ""
                }`}
              >
                <label>Fecha inicial</label>

                <div
                  className={`date-picker-wrapper ${
                    calendarioAbierto === "inicio"
                      ? "calendario-wrapper-activo"
                      : ""
                  }`}
                >
                  <CalendarioPersonalizado
                    valor={fechaInicio}
                    onChange={manejarCambioFechaInicio}
                    ejemplo="Ej: 20/05/2026"
                    label="Seleccionar fecha inicial"
                    abierto={calendarioAbierto === "inicio"}
                    onAbrir={() =>
                      setCalendarioAbierto(
                        calendarioAbierto === "inicio" ? "" : "inicio"
                      )
                    }
                    onCerrar={() => setCalendarioAbierto("")}
                  />

                  {fechaInicio && (
                    <button
                      type="button"
                      className="field-clear-btn date-clear-btn"
                      onClick={limpiarFechaInicio}
                      aria-label="Borrar fecha inicial"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              <div
                className={`date-field ${
                  calendarioAbierto === "final"
                    ? "calendario-padre-activo"
                    : ""
                }`}
              >
                <label>Fecha final</label>

                <div
                  className={`date-picker-wrapper ${
                    calendarioAbierto === "final"
                      ? "calendario-wrapper-activo"
                      : ""
                  }`}
                >
                  <CalendarioPersonalizado
                    valor={fechaFinal}
                    onChange={manejarCambioFechaFinal}
                    ejemplo="Ej: 30/05/2026"
                    label="Seleccionar fecha final"
                    abierto={calendarioAbierto === "final"}
                    onAbrir={() =>
                      setCalendarioAbierto(
                        calendarioAbierto === "final" ? "" : "final"
                      )
                    }
                    onCerrar={() => setCalendarioAbierto("")}
                  />

                  {fechaFinal && (
                    <button
                      type="button"
                      className="field-clear-btn date-clear-btn"
                      onClick={limpiarFechaFinal}
                      aria-label="Borrar fecha final"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="filter-actions">
              <button
                type="button"
                className="filter-btn"
                onClick={aplicarFiltroFechas}
              >
                Buscar por fecha
              </button>
            </div>
          </div>
        </div>

        {eventosFiltrados.length === 0 && (
          <div className="eventos-empty">
            <h3>No se encontraron eventos</h3>
            <p>
              Intenta buscar otro ministerio, título o seleccionar otro rango de
              fechas.
            </p>
          </div>
        )}

        <div className="eventos-grid">
          {eventosFiltrados.map((evento) => (
            <article className="evento-card" key={evento.id}>
              <div className="evento-img">
                <img src={evento.imagen} alt={evento.titulo} />
              </div>

              <div className="evento-content">
                <span className={`evento-estado estado-${evento.estado}`}>
                  {textoEstado(evento.estado)}
                </span>

                <span className="evento-ministerio">{evento.ministerio}</span>

                <h3>{evento.titulo}</h3>

                <div className="evento-info">
                  <p>
                    <FaCalendarAlt className="evento-info-icon" />
                    {evento.fecha}
                  </p>
                  <p>
                    <FaClock className="evento-info-icon" />
                    {evento.hora}
                  </p>
                  <p>
                    <FaMapMarkerAlt className="evento-info-icon" />
                    {evento.lugar}
                  </p>
                </div>

                <p className="evento-descripcion">{evento.descripcion}</p>

                <button
                  type="button"
                  onClick={() => setEventoSeleccionado(evento)}
                >
                  Ver detalles
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {eventoSeleccionado && (
        <div className="evento-modal-overlay" onClick={cerrarModal}>
          <div className="evento-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="evento-modal-close"
              onClick={cerrarModal}
              aria-label="Cerrar modal"
            >
              ×
            </button>

            <div className="evento-modal-img">
              <img
                className="evento-modal-bg"
                src={eventoSeleccionado.imagen}
                alt=""
                aria-hidden="true"
              />

              <img
                className="evento-modal-flyer"
                src={eventoSeleccionado.imagen}
                alt={eventoSeleccionado.titulo}
              />
            </div>

            <div className="evento-modal-content">
              <span
                className={`evento-modal-estado estado-${eventoSeleccionado.estado}`}
              >
                {textoEstado(eventoSeleccionado.estado)}
              </span>

              <span className="evento-modal-ministerio">
                {eventoSeleccionado.ministerio}
              </span>

              <h2>{eventoSeleccionado.titulo}</h2>

              <div className="evento-modal-info">
                <p>
                  <FaCalendarAlt className="evento-info-icon" />
                  {eventoSeleccionado.fecha}
                </p>
                <p>
                  <FaClock className="evento-info-icon" />
                  {eventoSeleccionado.hora}
                </p>
                <p>
                  <FaMapMarkerAlt className="evento-info-icon" />
                  {eventoSeleccionado.lugar}
                </p>
              </div>

              <p className="evento-modal-descripcion">
                {eventoSeleccionado.detalles}
              </p>

              <button
                type="button"
                className="evento-modal-btn"
                onClick={consultarWhatsApp}
              >
                <FaWhatsapp className="evento-modal-btn-icon" />
                Consultar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default EventosMinisterios;