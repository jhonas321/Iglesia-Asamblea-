import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaSearch,
  FaChevronUp,
  FaChevronDown,
  FaWhatsapp,
  FaArrowLeft,
  FaDownload,
} from "react-icons/fa";

import CalendarioPersonalizado from "../../components/CalendarioPersonalizado";
import Paginacion from "../../components/ui/Paginacion";
import "../../styles/eventos-ministerios.css";

const API_URL = "http://127.0.0.1:8000/api";
const STORAGE_URL = "http://127.0.0.1:8000/storage";

const construirUrlImagen = (ruta) => {
  const valor = String(ruta || "").trim();

  if (!valor) return "";

  if (
    valor.startsWith("http://") ||
    valor.startsWith("https://") ||
    valor.startsWith("data:") ||
    valor.startsWith("blob:")
  ) {
    return valor;
  }

  if (valor.startsWith("/storage/")) {
    return `http://127.0.0.1:8000${valor}`;
  }

  if (valor.startsWith("storage/")) {
    return `http://127.0.0.1:8000/${valor}`;
  }

  return `${STORAGE_URL}/${valor.replace(/^\/+/, "")}`;
};

const normalizarHora = (hora) => {
  const valor = String(hora || "").trim();

  if (!valor) return "";

  return valor.length >= 5 ? valor.slice(0, 5) : valor;
};

const convertirEventoBackendAFrontend = (evento) => {
  const ministerioBackend = evento?.ministerio;

  const nombreMinisterio =
    typeof ministerioBackend === "object" && ministerioBackend !== null
      ? ministerioBackend.nombre || ""
      : ministerioBackend || evento?.ministerio_nombre || "";

  return {
    id: Number(evento?.id),
    ministerio: nombreMinisterio,
    titulo: evento?.titulo || "",
    descripcion: evento?.descripcion || "",
    detalles: evento?.detalles || evento?.descripcion || "",
    fechaInicio: evento?.fecha_inicio || evento?.fechaInicio || "",
    fechaFinal:
      evento?.fecha_final ||
      evento?.fecha_fin ||
      evento?.fechaFinal ||
      evento?.fecha_inicio ||
      evento?.fechaInicio ||
      "",
    hora: normalizarHora(evento?.hora),
    lugar: evento?.lugar || "",
    imagen: construirUrlImagen(
      evento?.imagen || evento?.imagen_url || evento?.foto || ""
    ),
    whatsappNumero:
      evento?.whatsapp_numero ||
      evento?.whatsappNumero ||
      "",
  };
};

const convertirContactoBackendAFrontend = (contacto) => ({
  whatsappNumero:
    contacto?.whatsapp_numero ||
    contacto?.whatsappNumero ||
    "",
});


const obtenerVistaTabletOCelular = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= 1280;
};

const obtenerFechaActualInput = () => {
  const hoy = new Date();

  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
};

const crearFechaLocalDesdeInput = (fechaInput) => {
  const [anio, mes, dia] = fechaInput.split("-").map(Number);
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

const limpiarNumeroWhatsApp = (numero) => {
  return String(numero || "").replace(/\D/g, "");
};

function EventosMinisterios() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [eventos, setEventos] = useState([]);
  const [contacto, setContacto] = useState({
    whatsappNumero: "",
  });
  const [cargandoEventos, setCargandoEventos] = useState(true);

  const fechaActual = obtenerFechaActualInput();

  const eventosActualizados = useMemo(() => {
    return eventos.map((evento) => ({
      ...evento,
      fecha: formatearRangoFechaEvento(evento.fechaInicio, evento.fechaFinal),
      estado: obtenerEstadoEvento(evento, fechaActual),
    }));
  }, [eventos, fechaActual]);

  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [pestanaActiva, setPestanaActiva] = useState("todos");

  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
  const [tipoFiltroActivo, setTipoFiltroActivo] = useState("");

  const [busquedaTexto, setBusquedaTexto] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [errorFechas, setErrorFechas] = useState("");

  const [calendarioAbierto, setCalendarioAbierto] = useState("");

  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroFechaInicio, setFiltroFechaInicio] = useState("");
  const [filtroFechaFinal, setFiltroFechaFinal] = useState("");

  const [paginaActual, setPaginaActual] = useState(1);
  const [eventosPorPagina, setEventosPorPagina] = useState(() =>
    obtenerVistaTabletOCelular() ? 4 : 6
  );
  const [esTabletOCelular, setEsTabletOCelular] = useState(
    obtenerVistaTabletOCelular
  );

  const scrollAntesModalPc = useRef(0);

  useEffect(() => {
    let activo = true;

    const cargarDatosPublicos = async () => {
      try {
        setCargandoEventos(true);

        const [respuestaEventos, respuestaContacto] = await Promise.all([
          fetch(`${API_URL}/eventos`, {
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

        if (!respuestaEventos.ok) {
          throw new Error(`Eventos: ${respuestaEventos.status}`);
        }

        const datosEventos = await respuestaEventos.json();

        let datosContacto = null;

        if (respuestaContacto.ok) {
          datosContacto = await respuestaContacto.json();
        }

        if (!activo) return;

        const listaEventos = Array.isArray(datosEventos)
          ? datosEventos
          : Array.isArray(datosEventos?.data)
          ? datosEventos.data
          : [];

        setEventos(
          listaEventos
            .map(convertirEventoBackendAFrontend)
            .filter((evento) => evento.id && evento.fechaInicio)
        );

        const registroContacto = datosContacto?.data || datosContacto || null;

        setContacto(convertirContactoBackendAFrontend(registroContacto));
      } catch (error) {
        console.error("Error cargando eventos públicos:", error);

        if (activo) {
          setEventos([]);
        }
      } finally {
        if (activo) {
          setCargandoEventos(false);
        }
      }
    };

    cargarDatosPublicos();

    return () => {
      activo = false;
    };
  }, []);

  useEffect(() => {
    const actualizarVista = () => {
      const vistaTabletOCelular = window.innerWidth <= 1280;
      const nuevaCantidad = vistaTabletOCelular ? 4 : 6;

      setEsTabletOCelular(vistaTabletOCelular);

      setEventosPorPagina((cantidadActual) => {
        if (cantidadActual !== nuevaCantidad) {
          setPaginaActual(1);
          return nuevaCantidad;
        }

        return cantidadActual;
      });
    };

    actualizarVista();

    window.addEventListener("resize", actualizarVista);

    return () => {
      window.removeEventListener("resize", actualizarVista);
    };
  }, []);

  useEffect(() => {
    setPaginaActual(1);
  }, [pestanaActiva, filtroTexto, filtroFechaInicio, filtroFechaFinal]);

  useEffect(() => {
    if (cargandoEventos) return;

    if (!id) {
      setEventoSeleccionado(null);
      return;
    }

    const eventoEncontrado = eventosActualizados.find(
      (evento) => evento.id === Number(id)
    );

    if (eventoEncontrado) {
      setEventoSeleccionado(eventoEncontrado);
      return;
    }

    setEventoSeleccionado(null);
    navigate("/ministerios/eventos", { replace: true });
  }, [id, navigate, eventosActualizados, cargandoEventos]);

  useEffect(() => {
    if (!eventoSeleccionado || !esTabletOCelular) return;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [eventoSeleccionado, esTabletOCelular]);

  useEffect(() => {
    if (!eventoSeleccionado || esTabletOCelular) return;

    const scrollY = scrollAntesModalPc.current || window.scrollY;

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

      window.scrollTo({
        top: scrollY,
        left: 0,
        behavior: "auto",
      });
    };
  }, [eventoSeleccionado, esTabletOCelular]);

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
    setErrorFechas("");

    if (calendarioAbierto === "inicio") {
      setCalendarioAbierto("");
    }
  };

  const limpiarFechaFinal = (e) => {
    if (e) e.stopPropagation();

    setFechaFinal("");
    setFiltroFechaFinal("");
    setErrorFechas("");

    if (calendarioAbierto === "final") {
      setCalendarioAbierto("");
    }
  };

  const abrirFiltros = () => {
    if (filtrosAbiertos) {
      setCalendarioAbierto("");
    }

    setFiltrosAbiertos(!filtrosAbiertos);
  };

  const seleccionarTipoFiltro = (tipo) => {
    setCalendarioAbierto("");
    setTipoFiltroActivo(tipo);
  };

  const aplicarBusquedaTexto = () => {
    setFiltroTexto(busquedaTexto);
  };

  const aplicarFiltroFechas = () => {
    if (fechaInicio && fechaFinal && fechaInicio > fechaFinal) {
      setErrorFechas("La fecha inicial no puede ser mayor que la fecha final.");
      return;
    }

    setErrorFechas("");
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
    setErrorFechas("");
  };

  const manejarCambioFechaFinal = (valor) => {
    setFechaFinal(valor);
    setErrorFechas("");
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
          return (
            new Date(obtenerFechaOrdenEvento(b)) -
            new Date(obtenerFechaOrdenEvento(a))
          );
        }

        return (
          new Date(obtenerFechaOrdenEvento(a)) -
          new Date(obtenerFechaOrdenEvento(b))
        );
      });
    }

    if (pestanaActiva === "pasado") {
      return [...lista].sort(
        (a, b) =>
          new Date(obtenerFechaOrdenEvento(b)) -
          new Date(obtenerFechaOrdenEvento(a))
      );
    }

    return [...lista].sort(
      (a, b) =>
        new Date(obtenerFechaOrdenEvento(a)) -
        new Date(obtenerFechaOrdenEvento(b))
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
    const inicioEvento = evento.fechaInicio;
    const finalEvento = evento.fechaFinal || evento.fechaInicio;

    if (filtroFechaInicio && filtroFechaFinal) {
      return inicioEvento <= filtroFechaFinal && finalEvento >= filtroFechaInicio;
    }

    if (filtroFechaInicio) return finalEvento >= filtroFechaInicio;
    if (filtroFechaFinal) return inicioEvento <= filtroFechaFinal;

    return true;
  };

  const eventosPorPestana =
    pestanaActiva === "todos"
      ? eventosActualizados
      : eventosActualizados.filter((evento) => evento.estado === pestanaActiva);

  const eventosFiltrados = ordenarEventos(
    eventosPorPestana.filter(
      (evento) => filtrarPorTexto(evento) && filtrarPorRangoFechas(evento)
    )
  );

  const indiceInicio = (paginaActual - 1) * eventosPorPagina;
  const indiceFinal = indiceInicio + eventosPorPagina;

  const eventosVisibles = eventosFiltrados.slice(indiceInicio, indiceFinal);

  const mostrarDetalleNormal = eventoSeleccionado && esTabletOCelular;
  const mostrarModalPc = eventoSeleccionado && !esTabletOCelular;

  const cambiarPagina = (pagina) => {
    setPaginaActual(pagina);
  };

  const restaurarScrollPc = (scrollObjetivo) => {
    if (esTabletOCelular) return;

    const posicion = Number(scrollObjetivo) || 0;

    requestAnimationFrame(() => {
      window.scrollTo({
        top: posicion,
        left: 0,
        behavior: "auto",
      });
    });

    [30, 80, 160].forEach((tiempo) => {
      setTimeout(() => {
        window.scrollTo({
          top: posicion,
          left: 0,
          behavior: "auto",
        });
      }, tiempo);
    });
  };

  const abrirDetalle = (evento) => {
    if (!esTabletOCelular) {
      const scrollActual = window.scrollY;
      scrollAntesModalPc.current = scrollActual;

      setEventoSeleccionado(evento);

      navigate(`/ministerios/eventos/${evento.id}`, {
        state: { mantenerScroll: true, scrollObjetivo: scrollActual },
        preventScrollReset: true,
      });

      return;
    }

    setEventoSeleccionado(evento);
    navigate(`/ministerios/eventos/${evento.id}`);
  };

  const volverAEventos = () => {
    setEventoSeleccionado(null);
    navigate("/ministerios/eventos");
  };

  const cerrarModal = () => {
    const scrollObjetivo = scrollAntesModalPc.current || 0;

    setEventoSeleccionado(null);

    navigate("/ministerios/eventos", {
      replace: true,
      state: { mantenerScroll: true, scrollObjetivo },
      preventScrollReset: true,
    });

    restaurarScrollPc(scrollObjetivo);
  };

  useEffect(() => {
    if (!mostrarModalPc) return;

    const cerrarConEscape = (e) => {
      if (e.key === "Escape") {
        cerrarModal();
      }
    };

    window.addEventListener("keydown", cerrarConEscape);

    return () => {
      window.removeEventListener("keydown", cerrarConEscape);
    };
  }, [mostrarModalPc]);

  const consultarWhatsApp = (evento = eventoSeleccionado) => {
    if (!evento) return;

    const mensaje = `Hola, quisiera consultar sobre el evento "${evento.titulo}" del ${evento.fecha} a horas ${evento.hora}, en ${evento.lugar}.`;

    const numeroEvento = limpiarNumeroWhatsApp(evento.whatsappNumero);
    const numeroGeneral = limpiarNumeroWhatsApp(contacto.whatsappNumero);
    const numeroWhatsApp = numeroEvento || numeroGeneral;

    const url = numeroWhatsApp
      ? `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`
      : `https://wa.me/?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const limpiarNombreArchivo = (texto) => {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const obtenerExtensionImagen = (blob, rutaImagen) => {
    if (blob?.type) {
      const extensionDesdeMime = blob.type.split("/")[1];

      if (extensionDesdeMime) {
        return extensionDesdeMime === "jpeg" ? "jpg" : extensionDesdeMime;
      }
    }

    const rutaSinParametros = rutaImagen.split("?")[0].toLowerCase();
    const extensionEncontrada = rutaSinParametros.match(
      /\.(jpg|jpeg|png|webp|gif)$/
    );

    if (extensionEncontrada) {
      return extensionEncontrada[1] === "jpeg" ? "jpg" : extensionEncontrada[1];
    }

    return "jpg";
  };

  const descargarDesdeUrl = (url, nombreArchivo) => {
    const enlace = document.createElement("a");

    enlace.href = url;
    enlace.download = nombreArchivo;
    enlace.target = "_blank";
    enlace.rel = "noopener noreferrer";

    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();
  };

  const descargarAfiche = async (evento = eventoSeleccionado) => {
    if (!evento) return;

    const nombreBase = `afiche-${
      limpiarNombreArchivo(evento.titulo) || "evento"
    }`;

    try {
      const respuesta = await fetch(evento.imagen, { mode: "cors" });

      if (!respuesta.ok) {
        throw new Error("No se pudo obtener la imagen.");
      }

      const blob = await respuesta.blob();
      const extension = obtenerExtensionImagen(blob, evento.imagen);
      const urlTemporal = URL.createObjectURL(blob);

      descargarDesdeUrl(urlTemporal, `${nombreBase}.${extension}`);

      setTimeout(() => {
        URL.revokeObjectURL(urlTemporal);
      }, 1000);
    } catch (error) {
      const extension = obtenerExtensionImagen(null, evento.imagen);

      descargarDesdeUrl(evento.imagen, `${nombreBase}.${extension}`);
    }
  };

  return (
    <main className="eventos-page">
      {!mostrarDetalleNormal && (
        <section className="eventos-hero">
          <div className="eventos-hero-content">
            <h1>Eventos Ministeriales</h1>
            <p>
              Consulta las próximas actividades, eventos en curso y actividades
              ya realizadas por los ministerios de la iglesia.
            </p>
          </div>
        </section>
      )}

      <section
        className={`eventos-section ${
          mostrarDetalleNormal ? "eventos-section-detalle-activo" : ""
        }`}
      >
        {mostrarDetalleNormal ? (
          <div className="evento-detalle-page">
            <button
              type="button"
              className="evento-detalle-back"
              onClick={volverAEventos}
            >
              <FaArrowLeft className="evento-detalle-back-icon" />
              Volver a eventos
            </button>

            <article className="evento-detalle-card">
              <div className="evento-detalle-img">
                <img
                  className="evento-detalle-bg"
                  src={eventoSeleccionado.imagen}
                  alt=""
                  aria-hidden="true"
                />

                <img
                  className="evento-detalle-flyer"
                  src={eventoSeleccionado.imagen}
                  alt={eventoSeleccionado.titulo}
                />
              </div>

              <div className="evento-detalle-content">
                <span
                  className={`evento-detalle-estado estado-${eventoSeleccionado.estado}`}
                >
                  {textoEstado(eventoSeleccionado.estado)}
                </span>

                <span className="evento-detalle-ministerio">
                  {eventoSeleccionado.ministerio}
                </span>

                <h2>{eventoSeleccionado.titulo}</h2>

                <div className="evento-detalle-info">
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

                <p className="evento-detalle-descripcion">
                  {eventoSeleccionado.detalles}
                </p>

                <div className="evento-detalle-actions">
                  <button
                    type="button"
                    className="evento-detalle-btn"
                    onClick={() => consultarWhatsApp(eventoSeleccionado)}
                  >
                    <FaWhatsapp className="evento-detalle-btn-icon" />
                    Consultar por WhatsApp
                  </button>

                  <button
                    type="button"
                    className="evento-detalle-download-btn"
                    onClick={() => descargarAfiche(eventoSeleccionado)}
                  >
                    <FaDownload className="evento-detalle-download-icon" />
                    Descargar afiche
                  </button>
                </div>
              </div>
            </article>
          </div>
        ) : (
          <>
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

            <button
              type="button"
              className="filter-toggle"
              onClick={abrirFiltros}
            >
              <span>Búsqueda</span>
              {filtrosAbiertos ? (
                <FaChevronUp className="filter-toggle-icon" aria-hidden="true" />
              ) : (
                <FaChevronDown
                  className="filter-toggle-icon"
                  aria-hidden="true"
                />
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
                <FaCalendarAlt
                  className="filter-option-icon"
                  aria-hidden="true"
                />
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
                      onChange={(e) =>
                        manejarCambioBusquedaTexto(e.target.value)
                      }
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
                      } ${errorFechas ? "date-picker-error" : ""}`}
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
                      } ${errorFechas ? "date-picker-error" : ""}`}
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
                    className={`filter-btn ${
                      errorFechas ? "filter-btn-error" : ""
                    }`}
                    onClick={aplicarFiltroFechas}
                    title={errorFechas || undefined}
                  >
                    {errorFechas
                      ? "Corrige el rango de fechas"
                      : "Buscar por fecha"}
                  </button>
                </div>
              </div>
            </div>

            {cargandoEventos && (
              <div className="eventos-empty">
                <h3>Cargando eventos...</h3>
              </div>
            )}

            {!cargandoEventos && eventosFiltrados.length === 0 && (
              <div className="eventos-empty">
                <h3>No se encontraron eventos</h3>
                <p>
                  Intenta buscar otro ministerio, título o seleccionar otro rango
                  de fechas.
                </p>
              </div>
            )}

            {!cargandoEventos && eventosFiltrados.length > 0 && (
              <>
                <Paginacion
                  paginaActual={paginaActual}
                  totalElementos={eventosFiltrados.length}
                  elementosPorPagina={eventosPorPagina}
                  onCambiarPagina={cambiarPagina}
                  scrollAlCambiar={false}
                />

                <br />

                <div className="eventos-grid">
                  {eventosVisibles.map((evento) => (
                    <article className="evento-card" key={evento.id}>
                      <div className="evento-img">
                        <img src={evento.imagen} alt={evento.titulo} />
                      </div>

                      <div className="evento-content">
                        <span
                          className={`evento-estado estado-${evento.estado}`}
                        >
                          {textoEstado(evento.estado)}
                        </span>

                        <span className="evento-ministerio">
                          {evento.ministerio}
                        </span>

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

                        <p className="evento-descripcion">
                          {evento.descripcion}
                        </p>

                        <button
                          type="button"
                          onClick={() => abrirDetalle(evento)}
                        >
                          Ver detalles
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                <Paginacion
                  paginaActual={paginaActual}
                  totalElementos={eventosFiltrados.length}
                  elementosPorPagina={eventosPorPagina}
                  onCambiarPagina={cambiarPagina}
                  scrollAlCambiar={true}
                />
              </>
            )}
          </>
        )}
      </section>

      {mostrarModalPc && (
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

              <div className="evento-modal-actions">
                <button
                  type="button"
                  className="evento-modal-btn"
                  onClick={() => consultarWhatsApp(eventoSeleccionado)}
                >
                  <FaWhatsapp className="evento-modal-btn-icon" />
                  Consultar por WhatsApp
                </button>

                <button
                  type="button"
                  className="evento-modal-download-btn"
                  onClick={() => descargarAfiche(eventoSeleccionado)}
                >
                  <FaDownload className="evento-modal-download-icon" />
                  Descargar afiche
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default EventosMinisterios;