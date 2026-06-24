import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  PlusCircle,
  X,
  UploadCloud,
  CalendarDays,
  Clock,
  MapPin,
} from "lucide-react";

import ListaAdmin from "../../components/admin/ListaAdmin";
import {
  guardarEventos,
  obtenerEventosGuardados,
} from "../../data/adminStorage";

import "../../styles/AdminCrudPage.css";
import "../../styles/eventos-ministerios.css";
import "../../styles/EventosAdmin.css";

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
  if (!fechaInput) return "";

  const fecha = crearFechaLocalDesdeInput(fechaInput);

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = obtenerNombreMes(fecha.getMonth());
  const anio = fecha.getFullYear();

  return `${dia} ${mes} ${anio}`;
};

const formatearRangoFechaEvento = (fechaInicio, fechaFinal) => {
  if (!fechaInicio) return "";

  const inicio = crearFechaLocalDesdeInput(fechaInicio);
  const final = crearFechaLocalDesdeInput(fechaFinal || fechaInicio);

  const mismoDia =
    inicio.getFullYear() === final.getFullYear() &&
    inicio.getMonth() === final.getMonth() &&
    inicio.getDate() === final.getDate();

  if (mismoDia) return formatearFechaEvento(fechaInicio);

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

const textoEstadoEvento = (estado) => {
  if (estado === "enCurso") return "En curso";
  if (estado === "pasado") return "Finalizado";
  return "Próximo";
};

const claseEstadoAdmin = (estado) => {
  if (estado === "enCurso") return "en-curso";
  return estado;
};

const claseEstadoPublico = (estado) => {
  return `estado-${estado}`;
};

const ordenarEventosAdmin = (lista) => {
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
      return new Date(b.fechaInicio) - new Date(a.fechaInicio);
    }

    return new Date(a.fechaInicio) - new Date(b.fechaInicio);
  });
};

const crearFormularioEventoVacio = () => ({
  titulo: "",
  ministerio: "",
  fechaInicio: obtenerFechaActualInput(),
  fechaFinal: "",
  hora: "",
  lugar: "",
  descripcion: "",
  detalles: "",
  imagen: "",
});

const convertirArchivoABase64 = (archivo) => {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();

    lector.onload = () => resolve(lector.result);
    lector.onerror = () => reject(new Error("No se pudo leer la imagen."));
    lector.readAsDataURL(archivo);
  });
};

const CrearEventos = () => {
  const [eventosAdmin, setEventosAdmin] = useState(() =>
    obtenerEventosGuardados()
  );

  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("crear");
  const [panelActivo, setPanelActivo] = useState("formulario");
  const [eventoEditandoId, setEventoEditandoId] = useState(null);
  const [formulario, setFormulario] = useState(crearFormularioEventoVacio);
  const [errorFormulario, setErrorFormulario] = useState("");

  const esModoVista = modoFormulario === "ver";

  const cerrarModal = useCallback(() => {
    setModalAbierto(false);
    setEventoEditandoId(null);
    setFormulario(crearFormularioEventoVacio());
    setErrorFormulario("");
    setPanelActivo("formulario");
  }, []);

  useEffect(() => {
    if (!modalAbierto) return;

    const scrollY = window.scrollY;

    const body = document.body;
    const html = document.documentElement;

    const estilosAnteriores = {
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      htmlOverflow: html.style.overflow,
    };

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    html.style.overflow = "hidden";

    return () => {
      body.style.overflow = estilosAnteriores.bodyOverflow;
      body.style.position = estilosAnteriores.bodyPosition;
      body.style.top = estilosAnteriores.bodyTop;
      body.style.width = estilosAnteriores.bodyWidth;
      html.style.overflow = estilosAnteriores.htmlOverflow;

      window.scrollTo(0, scrollY);
    };
  }, [modalAbierto]);

  useEffect(() => {
    if (!modalAbierto) return;

    const cerrarConEscape = (e) => {
      if (e.key === "Escape") cerrarModal();
    };

    window.addEventListener("keydown", cerrarConEscape);

    return () => {
      window.removeEventListener("keydown", cerrarConEscape);
    };
  }, [modalAbierto, cerrarModal]);

  const eventosProcesados = useMemo(() => {
    const fechaActual = obtenerFechaActualInput();

    const eventosConEstado = eventosAdmin.map((evento) => ({
      ...evento,
      fecha: formatearRangoFechaEvento(evento.fechaInicio, evento.fechaFinal),
      estado: obtenerEstadoEvento(evento, fechaActual),
    }));

    return ordenarEventosAdmin(eventosConEstado);
  }, [eventosAdmin]);

  const estadoVistaPrevia = obtenerEstadoEvento(
    {
      fechaInicio: formulario.fechaInicio,
      fechaFinal: formulario.fechaFinal || formulario.fechaInicio,
    },
    obtenerFechaActualInput()
  );

  const fechaVistaPrevia = formatearRangoFechaEvento(
    formulario.fechaInicio,
    formulario.fechaFinal
  );

  const columnasEventos = [
    { key: "titulo", label: "Título" },
    { key: "ministerio", label: "Ministerio" },
    { key: "fecha", label: "Fecha" },
    { key: "hora", label: "Hora" },
    { key: "lugar", label: "Lugar" },
    {
      key: "estado",
      label: "Estado",
      render: (evento) => (
        <span className={`admin-status ${claseEstadoAdmin(evento.estado)}`}>
          {textoEstadoEvento(evento.estado)}
        </span>
      ),
    },
  ];

  const actualizarCampo = (e) => {
    const { name, value } = e.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));

    setErrorFormulario("");
  };

  const manejarImagenArchivo = async (e) => {
    const archivo = e.target.files?.[0];

    if (!archivo) return;

    if (!archivo.type.startsWith("image/")) {
      setErrorFormulario("Debes seleccionar una imagen válida.");
      return;
    }

    try {
      const imagenBase64 = await convertirArchivoABase64(archivo);

      setFormulario((actual) => ({
        ...actual,
        imagen: imagenBase64,
      }));

      setErrorFormulario("");
    } catch (error) {
      setErrorFormulario("No se pudo cargar la imagen.");
    }
  };

  const cargarFormularioEvento = (evento) => {
    setFormulario({
      titulo: evento.titulo || "",
      ministerio: evento.ministerio || "",
      fechaInicio: evento.fechaInicio || obtenerFechaActualInput(),
      fechaFinal: evento.fechaFinal || evento.fechaInicio || "",
      hora: evento.hora || "",
      lugar: evento.lugar || "",
      descripcion: evento.descripcion || "",
      detalles: evento.detalles || "",
      imagen: evento.imagen || "",
    });
  };

  const abrirModalCrear = () => {
    setModoFormulario("crear");
    setPanelActivo("formulario");
    setEventoEditandoId(null);
    setFormulario(crearFormularioEventoVacio());
    setErrorFormulario("");
    setModalAbierto(true);
  };

  const validarFormulario = () => {
    if (!formulario.titulo.trim()) return "El título es obligatorio.";
    if (!formulario.ministerio.trim()) return "El ministerio es obligatorio.";
    if (!formulario.fechaInicio) return "La fecha inicial es obligatoria.";
    if (!formulario.hora.trim()) return "La hora es obligatoria.";
    if (!formulario.lugar.trim()) return "El lugar es obligatorio.";
    if (!formulario.descripcion.trim())
      return "La descripción corta es obligatoria.";
    if (!formulario.imagen.trim()) return "La imagen o afiche es obligatorio.";

    if (
      formulario.fechaInicio &&
      formulario.fechaFinal &&
      formulario.fechaInicio > formulario.fechaFinal
    ) {
      return "La fecha inicial no puede ser mayor que la fecha final.";
    }

    return "";
  };

  const guardarFormulario = (e) => {
    e.preventDefault();

    const error = validarFormulario();

    if (error) {
      setErrorFormulario(error);
      setPanelActivo("formulario");
      return;
    }

    const eventoNormalizado = {
      titulo: formulario.titulo.trim(),
      ministerio: formulario.ministerio.trim(),
      fechaInicio: formulario.fechaInicio,
      fechaFinal: formulario.fechaFinal || formulario.fechaInicio,
      hora: formulario.hora.trim(),
      lugar: formulario.lugar.trim(),
      descripcion: formulario.descripcion.trim(),
      detalles: formulario.detalles.trim() || formulario.descripcion.trim(),
      imagen: formulario.imagen.trim(),
    };

    let nuevaLista = [];

    if (modoFormulario === "editar") {
      nuevaLista = eventosAdmin.map((evento) =>
        evento.id === eventoEditandoId
          ? {
              ...evento,
              ...eventoNormalizado,
            }
          : evento
      );
    } else {
      const nuevoEvento = {
        id: Date.now(),
        ...eventoNormalizado,
      };

      nuevaLista = [nuevoEvento, ...eventosAdmin];
    }

    setEventosAdmin(nuevaLista);
    guardarEventos(nuevaLista);
    cerrarModal();
  };

  const handleCrear = () => {
    abrirModalCrear();
  };

  const handleVer = (evento) => {
    setModoFormulario("ver");
    setPanelActivo("vista");
    setEventoEditandoId(evento.id);
    cargarFormularioEvento(evento);
    setErrorFormulario("");
    setModalAbierto(true);
  };

  const handleEditar = (evento) => {
    setModoFormulario("editar");
    setPanelActivo("formulario");
    setEventoEditandoId(evento.id);
    cargarFormularioEvento(evento);
    setErrorFormulario("");
    setModalAbierto(true);
  };

  const handleEliminar = (evento) => {
    const confirmar = window.confirm(
      `¿Seguro que quieres eliminar el evento "${evento.titulo}"?`
    );

    if (!confirmar) return;

    const nuevaLista = eventosAdmin.filter((item) => item.id !== evento.id);

    setEventosAdmin(nuevaLista);
    guardarEventos(nuevaLista);
  };

  const renderEventoPublico = () => (
    <article className="evento-detalle-card">
      <div className="evento-detalle-img">
        {formulario.imagen ? (
          <>
            <img
              className="evento-detalle-bg"
              src={formulario.imagen}
              alt=""
              aria-hidden="true"
            />
            <img
              className="evento-detalle-flyer"
              src={formulario.imagen}
              alt={formulario.titulo}
            />
          </>
        ) : (
          <div className="admin-preview-empty-image">Imagen del evento</div>
        )}
      </div>

      <div className="evento-detalle-content">
        <span
          className={`evento-detalle-estado ${claseEstadoPublico(
            estadoVistaPrevia
          )}`}
        >
          {textoEstadoEvento(estadoVistaPrevia)}
        </span>

        <span className="evento-detalle-ministerio">
          {formulario.ministerio || "Ministerio"}
        </span>

        <h2>{formulario.titulo || "Título del evento"}</h2>

        <div className="evento-detalle-info">
          <p>
            <CalendarDays size={18} />
            {fechaVistaPrevia || "Fecha del evento"}
          </p>

          <p>
            <Clock size={18} />
            {formulario.hora || "Hora del evento"}
          </p>

          <p>
            <MapPin size={18} />
            {formulario.lugar || "Lugar del evento"}
          </p>
        </div>

        <p className="evento-detalle-descripcion">
          {formulario.detalles ||
            formulario.descripcion ||
            "Descripción completa del evento."}
        </p>
      </div>
    </article>
  );

  const formularioEventos = (
    <form className="admin-form" onSubmit={guardarFormulario}>
      {errorFormulario && (
        <div className="admin-form-error">{errorFormulario}</div>
      )}

      <div className="admin-form-grid">
        <label>
          <span>Título *</span>
          <input
            type="text"
            name="titulo"
            value={formulario.titulo}
            onChange={actualizarCampo}
            placeholder="Ej: Noche de fogata"
          />
        </label>

        <label>
          <span>Ministerio *</span>
          <input
            type="text"
            name="ministerio"
            value={formulario.ministerio}
            onChange={actualizarCampo}
            placeholder="Ej: Jóvenes"
          />
        </label>

        <label>
          <span>Fecha inicial *</span>
          <input
            type="date"
            name="fechaInicio"
            value={formulario.fechaInicio}
            onChange={actualizarCampo}
          />
        </label>

        <label>
          <span>Fecha final</span>
          <input
            type="date"
            name="fechaFinal"
            value={formulario.fechaFinal}
            onChange={actualizarCampo}
          />
        </label>

        <label>
          <span>Hora *</span>
          <input
            type="text"
            name="hora"
            value={formulario.hora}
            onChange={actualizarCampo}
            placeholder="Ej: 7:30 pm"
          />
        </label>

        <label>
          <span>Lugar *</span>
          <input
            type="text"
            name="lugar"
            value={formulario.lugar}
            onChange={actualizarCampo}
            placeholder="Ej: Iglesia El Buen Pastor"
          />
        </label>
      </div>

      <label>
        <span>Imagen o afiche por URL *</span>
        <input
          type="text"
          name="imagen"
          value={formulario.imagen}
          onChange={actualizarCampo}
          placeholder="Ej: /img/eventos/fogata.jpg o una URL"
        />
      </label>

      <label className="admin-file-upload">
        <UploadCloud size={22} />
        <div>
          <strong>Subir imagen desde tu PC</strong>
          <small>Por ahora se guarda en localStorage. Usa imágenes livianas.</small>
        </div>
        <input type="file" accept="image/*" onChange={manejarImagenArchivo} />
      </label>

      <label>
        <span>Descripción corta *</span>
        <textarea
          name="descripcion"
          value={formulario.descripcion}
          onChange={actualizarCampo}
          placeholder="Descripción que se verá en la tarjeta del evento."
          rows="3"
        />
      </label>

      <label>
        <span>Detalles</span>
        <textarea
          name="detalles"
          value={formulario.detalles}
          onChange={actualizarCampo}
          placeholder="Información completa que se verá en el detalle del evento."
          rows="5"
        />
      </label>

      <div className="admin-form-actions">
        <button type="button" className="admin-form-cancel" onClick={cerrarModal}>
          Cancelar
        </button>

        <button type="submit" className="admin-form-save">
          {modoFormulario === "editar" ? "Guardar cambios" : "Crear evento"}
        </button>
      </div>
    </form>
  );

  const modalVistaUsuario = (
    <div className="admin-form-overlay" onClick={cerrarModal}>
      <div
        className="admin-public-preview-modal admin-evento-public-preview-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="admin-public-preview-close"
          onClick={cerrarModal}
          aria-label="Cerrar vista previa"
        >
          <X size={22} />
        </button>

        <div className="admin-public-preview-content">{renderEventoPublico()}</div>
      </div>
    </div>
  );

  const modalFormulario = (
    <div className="admin-form-overlay" onClick={cerrarModal}>
      <div
        className="admin-form-modal admin-form-modal-wide"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-form-modal-header">
          <div>
            <span className="admin-crud-label">
              {modoFormulario === "editar" ? "Editar registro" : "Nuevo registro"}
            </span>

            <h2>
              {modoFormulario === "editar" ? "Editar evento" : "Crear evento"}
            </h2>
          </div>

          <button
            type="button"
            className="admin-form-close"
            onClick={cerrarModal}
            aria-label="Cerrar formulario"
          >
            <X size={22} />
          </button>
        </div>

        <div className="admin-editor-tabs">
          <button
            type="button"
            className={`admin-editor-tab ${
              panelActivo === "formulario" ? "active" : ""
            }`}
            onClick={() => setPanelActivo("formulario")}
          >
            Formulario
          </button>

          <button
            type="button"
            className={`admin-editor-tab ${
              panelActivo === "vista" ? "active" : ""
            }`}
            onClick={() => setPanelActivo("vista")}
          >
            Vista previa
          </button>
        </div>

        <div className="admin-editor-body">
          {panelActivo === "formulario" ? (
            <div className="admin-editor-form-wrap">{formularioEventos}</div>
          ) : (
            <div className="admin-preview-page-shell">{renderEventoPublico()}</div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="admin-crud-page">
      <div className="admin-crud-header">
        <div>
          <span className="admin-crud-label">Gestión administrativa</span>
          <h1>Eventos</h1>
          <p>Administra los eventos registrados de la iglesia.</p>
        </div>

        <button type="button" className="admin-create-btn" onClick={handleCrear}>
          <PlusCircle size={20} />
          <span>Crear evento</span>
        </button>
      </div>

      <ListaAdmin
        columnas={columnasEventos}
        datos={eventosProcesados}
        onVer={handleVer}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        mensajeVacio="No hay eventos registrados."
      />

      {modalAbierto &&
        createPortal(
          esModoVista ? modalVistaUsuario : modalFormulario,
          document.body
        )}
    </section>
  );
};

export default CrearEventos;