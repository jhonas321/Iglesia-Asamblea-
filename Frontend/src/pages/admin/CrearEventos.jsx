import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  PlusCircle,
  X,
  UploadCloud,
  CalendarDays,
  Clock,
  MapPin,
} from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import ListaAdmin from "../../components/admin/ListaAdmin";
import "../../styles/AdminCrudPage.css";
import "../../styles/eventos-ministerios.css";
import "../../styles/EventosAdmin.css";

const API_URL = "http://127.0.0.1:8000/api";
const BACKEND_URL = "http://127.0.0.1:8000";

const obtenerFechaActualInput = () => {
  const hoy = new Date();

  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
};

const convertirFechaAInput = (fecha) => {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");

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

const formatearFechaCampo = (fechaInput) => {
  if (!fechaInput) return "";

  const [anio, mes, dia] = fechaInput.split("-");

  return `${dia}/${mes}/${anio}`;
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
  whatsappNumero: "",
  descripcion: "",
  detalles: "",
  imagen: "",
});


const normalizarHoraInput = (hora) => {
  if (!hora) return "";

  const horaLimpia = String(hora).trim();

  if (/^\d{2}:\d{2}$/.test(horaLimpia)) return horaLimpia;
  if (/^\d{2}:\d{2}:\d{2}$/.test(horaLimpia)) return horaLimpia.slice(0, 5);

  const match = horaLimpia.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i);

  if (!match) return "";

  let horas = Number(match[1]);
  const minutos = match[2];
  const periodo = match[3].toLowerCase();

  if (periodo === "pm" && horas < 12) horas += 12;
  if (periodo === "am" && horas === 12) horas = 0;

  return `${String(horas).padStart(2, "0")}:${minutos}`;
};

const limpiarNumeroWhatsApp = (numero) => {
  return String(numero || "").replace(/\D/g, "");
};


const obtenerToken = () => localStorage.getItem("token");

const obtenerUrlImagen = (imagen) => {
  if (!imagen) return "";

  const valor = String(imagen);

  // Imágenes externas, vistas previas blob/base64 o rutas públicas antiguas de React.
  if (
    valor.startsWith("http://") ||
    valor.startsWith("https://") ||
    valor.startsWith("blob:") ||
    valor.startsWith("data:") ||
    valor.startsWith("/")
  ) {
    return valor;
  }

  // Rutas nuevas almacenadas por Laravel, por ejemplo:
  // eventos/abc123.jpg
  return `${BACKEND_URL}/storage/${valor}`;
};

const convertirEventoBackendAFrontend = (evento) => ({
  id: evento.id,
  titulo: evento.titulo || "",
  ministerioId: evento.ministerio_id,
  ministerio: evento.ministerio?.nombre || "",
  fechaInicio: evento.fecha_inicio || "",
  fechaFinal: evento.fecha_final || evento.fecha_inicio || "",
  hora: evento.hora || "",
  lugar: evento.lugar || "",
  whatsappNumero: evento.whatsapp_numero || "",
  descripcion: evento.descripcion || "",
  detalles: evento.detalles || "",
  imagen: obtenerUrlImagen(evento.imagen),
  activo: evento.activo,
});

const obtenerDiasCalendario = (fechaBase) => {
  const anio = fechaBase.getFullYear();
  const mes = fechaBase.getMonth();

  const primerDiaMes = new Date(anio, mes, 1);
  const desfaseLunes = (primerDiaMes.getDay() + 6) % 7;

  const dias = [];

  for (let i = 0; i < 42; i += 1) {
    const fecha = new Date(anio, mes, 1 - desfaseLunes + i);

    dias.push({
      fecha,
      fechaInput: convertirFechaAInput(fecha),
      dia: fecha.getDate(),
      esMesActual: fecha.getMonth() === mes,
    });
  }

  return dias;
};

const HORAS = Array.from({ length: 24 }, (_, index) =>
  String(index).padStart(2, "0")
);

const MINUTOS = Array.from({ length: 12 }, (_, index) =>
  String(index * 5).padStart(2, "0")
);

const CrearEventos = () => {
  const ministerioBoxRef = useRef(null);
  const fechaInicioBoxRef = useRef(null);
  const fechaFinalBoxRef = useRef(null);
  const horaBoxRef = useRef(null);

  const [eventosAdmin, setEventosAdmin] = useState([]);
  const [ministeriosDisponibles, setMinisteriosDisponibles] = useState([]);
  const [cargandoDatos, setCargandoDatos] = useState(true);
  const [guardandoEvento, setGuardandoEvento] = useState(false);
  const [errorCarga, setErrorCarga] = useState("");

  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("crear");
  const [panelActivo, setPanelActivo] = useState("formulario");
  const [eventoEditandoId, setEventoEditandoId] = useState(null);
  const [formulario, setFormulario] = useState(crearFormularioEventoVacio);
  const [errorFormulario, setErrorFormulario] = useState("");
  const [archivoImagen, setArchivoImagen] = useState(null);

  const [ministerioAbierto, setMinisterioAbierto] = useState(false);
  const [calendarioAbierto, setCalendarioAbierto] = useState(null);
  const [mesCalendario, setMesCalendario] = useState(() =>
    crearFechaLocalDesdeInput(obtenerFechaActualInput())
  );
  const [horaAbierta, setHoraAbierta] = useState(false);
  const [horaTemporal, setHoraTemporal] = useState({
    hora: "18",
    minuto: "00",
  });

  const esModoVista = modoFormulario === "ver";


  const cargarDatos = useCallback(async () => {
    const token = obtenerToken();

    try {
      setCargandoDatos(true);
      setErrorCarga("");

      const [respuestaEventos, respuestaMinisterios] = await Promise.all([
        fetch(`${API_URL}/eventos`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch(`${API_URL}/ministerios`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      if (!respuestaEventos.ok) {
        throw new Error("No se pudieron cargar los eventos.");
      }

      if (!respuestaMinisterios.ok) {
        throw new Error("No se pudieron cargar los ministerios.");
      }

      const datosEventos = await respuestaEventos.json();
      const datosMinisterios = await respuestaMinisterios.json();

      setEventosAdmin(datosEventos.map(convertirEventoBackendAFrontend));
      setMinisteriosDisponibles(datosMinisterios);
    } catch (error) {
      console.error("Error cargando eventos:", error);
      setErrorCarga(error.message || "No se pudieron cargar los datos.");
    } finally {
      setCargandoDatos(false);
    }
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const cerrarSelectores = useCallback(() => {
    setMinisterioAbierto(false);
    setCalendarioAbierto(null);
    setHoraAbierta(false);
  }, []);

  const abrirMinisterio = () => {
    setMinisterioAbierto((actual) => !actual);
    setCalendarioAbierto(null);
    setHoraAbierta(false);
  };

  const abrirCalendario = (campo) => {
    const fechaCampo = formulario[campo] || obtenerFechaActualInput();

    setMesCalendario(crearFechaLocalDesdeInput(fechaCampo));
    setCalendarioAbierto((actual) => (actual === campo ? null : campo));
    setMinisterioAbierto(false);
    setHoraAbierta(false);
  };

  const abrirSelectorHora = () => {
    const horaActual = formulario.hora || "18:00";
    const [hora, minuto] = horaActual.split(":");

    setHoraTemporal({
      hora: hora || "18",
      minuto: minuto || "00",
    });

    setHoraAbierta((actual) => !actual);
    setMinisterioAbierto(false);
    setCalendarioAbierto(null);
  };

  const seleccionarMinisterio = (nombreMinisterio) => {
    setFormulario((actual) => ({
      ...actual,
      ministerio: nombreMinisterio,
    }));

    setMinisterioAbierto(false);
    setErrorFormulario("");
  };

  const seleccionarFecha = (campo, fechaInput) => {
    setFormulario((actual) => ({
      ...actual,
      [campo]: fechaInput,
    }));

    setCalendarioAbierto(null);
    setErrorFormulario("");
  };

  const limpiarFechaFinal = () => {
    setFormulario((actual) => ({
      ...actual,
      fechaFinal: "",
    }));

    setCalendarioAbierto(null);
    setErrorFormulario("");
  };

  const seleccionarHora = (hora) => {
    setHoraTemporal((actual) => ({
      ...actual,
      hora,
    }));
  };

  const seleccionarMinuto = (minuto) => {
    const horaFinal = `${horaTemporal.hora}:${minuto}`;

    setFormulario((actual) => ({
      ...actual,
      hora: horaFinal,
    }));

    setHoraTemporal((actual) => ({
      ...actual,
      minuto,
    }));

    setHoraAbierta(false);
    setErrorFormulario("");
  };

  const manejarTeclaCampo = (e, accion) => {
    if (e.key !== "Enter" && e.key !== " ") return;

    e.preventDefault();
    accion();
  };

  const actualizarCampo = (e) => {
    const { name, value } = e.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));

    setErrorFormulario("");
  };

  const actualizarWhatsapp = (valor) => {
    setFormulario((actual) => ({
      ...actual,
      whatsappNumero: valor,
    }));

    setErrorFormulario("");
  };

  const cerrarModal = useCallback(() => {
    setModalAbierto(false);
    setEventoEditandoId(null);
    setFormulario(crearFormularioEventoVacio());
    setArchivoImagen(null);
    setErrorFormulario("");
    setPanelActivo("formulario");
    cerrarSelectores();
  }, [cerrarSelectores]);

  useEffect(() => {
    if (!modalAbierto) return;

    const cerrarAlHacerClickFuera = (e) => {
      const clickEnMinisterio = ministerioBoxRef.current?.contains(e.target);
      const clickEnFechaInicio = fechaInicioBoxRef.current?.contains(e.target);
      const clickEnFechaFinal = fechaFinalBoxRef.current?.contains(e.target);
      const clickEnHora = horaBoxRef.current?.contains(e.target);

      if (
        !clickEnMinisterio &&
        !clickEnFechaInicio &&
        !clickEnFechaFinal &&
        !clickEnHora
      ) {
        cerrarSelectores();
      }
    };

    document.addEventListener("mousedown", cerrarAlHacerClickFuera);

    return () => {
      document.removeEventListener("mousedown", cerrarAlHacerClickFuera);
    };
  }, [modalAbierto, cerrarSelectores]);

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

  const manejarImagenArchivo = (e) => {
    const archivo = e.target.files?.[0];

    if (!archivo) return;

    const tiposPermitidos = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!tiposPermitidos.includes(archivo.type)) {
      setErrorFormulario(
        "La imagen debe ser JPG, JPEG, PNG o WEBP."
      );
      e.target.value = "";
      return;
    }

    const maximoBytes = 5 * 1024 * 1024;

    if (archivo.size > maximoBytes) {
      setErrorFormulario(
        "La imagen no puede superar los 5 MB."
      );
      e.target.value = "";
      return;
    }

    setArchivoImagen(archivo);

    const vistaPrevia = URL.createObjectURL(archivo);

    setFormulario((actual) => ({
      ...actual,
      imagen: vistaPrevia,
    }));

    setErrorFormulario("");
  };

  const cargarFormularioEvento = (evento) => {
    setArchivoImagen(null);

    setFormulario({
      titulo: evento.titulo || "",
      ministerio: evento.ministerio || "",
      fechaInicio: evento.fechaInicio || obtenerFechaActualInput(),
      fechaFinal: evento.fechaFinal || evento.fechaInicio || "",
      hora: normalizarHoraInput(evento.hora),
      lugar: evento.lugar || "",
      whatsappNumero: evento.whatsappNumero || "",
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
    setArchivoImagen(null);
    setErrorFormulario("");
    cerrarSelectores();
    setModalAbierto(true);
  };

  const validarFormulario = () => {
    const numeroWhatsApp = limpiarNumeroWhatsApp(formulario.whatsappNumero);

    if (!formulario.titulo.trim()) return "El título es obligatorio.";
    if (!formulario.ministerio.trim()) return "El ministerio es obligatorio.";
    if (!formulario.fechaInicio) return "La fecha inicial es obligatoria.";
    if (!formulario.hora.trim()) return "La hora es obligatoria.";
    if (!formulario.lugar.trim()) return "El lugar es obligatorio.";
    if (!formulario.descripcion.trim())
      return "La descripción corta es obligatoria.";
    if (!formulario.imagen.trim()) return "Debes seleccionar una imagen o afiche.";

    if (numeroWhatsApp && numeroWhatsApp.length < 8) {
      return "El número de WhatsApp no es válido.";
    }

    if (
      formulario.fechaInicio &&
      formulario.fechaFinal &&
      formulario.fechaInicio > formulario.fechaFinal
    ) {
      return "La fecha inicial no puede ser mayor que la fecha final.";
    }

    return "";
  };

  const guardarFormulario = async (e) => {
    e.preventDefault();

    const error = validarFormulario();

    if (error) {
      setErrorFormulario(error);
      setPanelActivo("formulario");
      return;
    }

    const ministerioSeleccionado = ministeriosDisponibles.find(
      (ministerio) =>
        ministerio.nombre.trim().toLowerCase() ===
        formulario.ministerio.trim().toLowerCase()
    );

    if (!ministerioSeleccionado) {
      setErrorFormulario("El ministerio seleccionado no es válido.");
      setPanelActivo("formulario");
      return;
    }

    const token = obtenerToken();
    const esEdicion = modoFormulario === "editar";

    const datosEvento = new FormData();

    datosEvento.append("ministerio_id", ministerioSeleccionado.id);
    datosEvento.append("titulo", formulario.titulo.trim());
    datosEvento.append("fecha_inicio", formulario.fechaInicio);
    datosEvento.append(
      "fecha_final",
      formulario.fechaFinal || formulario.fechaInicio
    );
    datosEvento.append("hora", formulario.hora.trim());
    datosEvento.append("lugar", formulario.lugar.trim());

    const numeroWhatsapp = limpiarNumeroWhatsApp(
      formulario.whatsappNumero
    );

    if (numeroWhatsapp) {
      datosEvento.append("whatsapp_numero", numeroWhatsapp);
    }

    datosEvento.append(
      "descripcion",
      formulario.descripcion.trim()
    );

    datosEvento.append(
      "detalles",
      formulario.detalles.trim() ||
        formulario.descripcion.trim()
    );

    datosEvento.append("activo", "1");

    // Solo se envía "imagen" cuando el usuario escogió un archivo nuevo.
    // En edición, si no se selecciona otra imagen, Laravel conserva la anterior.
    if (archivoImagen) {
      datosEvento.append("imagen", archivoImagen);
    }

    // Para archivos con Laravel es más confiable enviar POST y simular PUT.
    if (esEdicion) {
      datosEvento.append("_method", "PUT");
    }

    try {
      setGuardandoEvento(true);
      setErrorFormulario("");

      const url = esEdicion
        ? `${API_URL}/eventos/${eventoEditandoId}`
        : `${API_URL}/eventos`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: datosEvento,
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const primerError = Object.values(data.errors)[0];

          setErrorFormulario(
            Array.isArray(primerError)
              ? primerError[0]
              : "Revisa los datos ingresados."
          );
        } else {
          setErrorFormulario(
            data.message || "No se pudo guardar el evento."
          );
        }

        setPanelActivo("formulario");
        return;
      }

      await cargarDatos();
      cerrarModal();
    } catch (error) {
      console.error("Error guardando evento:", error);

      setErrorFormulario(
        "No se pudo conectar con el servidor."
      );
    } finally {
      setGuardandoEvento(false);
    }
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
    cerrarSelectores();
    setModalAbierto(true);
  };

  const handleEditar = (evento) => {
    setModoFormulario("editar");
    setPanelActivo("formulario");
    setEventoEditandoId(evento.id);
    cargarFormularioEvento(evento);
    setErrorFormulario("");
    cerrarSelectores();
    setModalAbierto(true);
  };

  const handleEliminar = async (evento) => {
    const confirmar = window.confirm(
      `¿Seguro que quieres eliminar el evento "${evento.titulo}"?`
    );

    if (!confirmar) return;

    const token = obtenerToken();

    try {
      const response = await fetch(`${API_URL}/eventos/${evento.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      let data = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(
          data?.message || "No se pudo eliminar el evento."
        );
      }

      setEventosAdmin((actuales) =>
        actuales.filter((item) => item.id !== evento.id)
      );
    } catch (error) {
      console.error("Error eliminando evento:", error);
      window.alert(error.message || "No se pudo eliminar el evento.");
    }
  };

  const cambiarMesCalendario = (cantidad) => {
    setMesCalendario(
      (actual) => new Date(actual.getFullYear(), actual.getMonth() + cantidad, 1)
    );
  };

  const renderCalendario = (campo) => {
    const diasCalendario = obtenerDiasCalendario(mesCalendario);
    const valorCampo = formulario[campo];
    const hoyInput = obtenerFechaActualInput();

    return (
      <div className="admin-calendar-panel">
        <div className="admin-calendar-header">
          <button type="button" onClick={() => cambiarMesCalendario(-1)}>
            ‹
          </button>

          <strong>
            {obtenerNombreMes(mesCalendario.getMonth())}{" "}
            {mesCalendario.getFullYear()}
          </strong>

          <button type="button" onClick={() => cambiarMesCalendario(1)}>
            ›
          </button>
        </div>

        <div className="admin-calendar-weekdays">
          <span>LU</span>
          <span>MA</span>
          <span>MI</span>
          <span>JU</span>
          <span>VI</span>
          <span>SA</span>
          <span>DO</span>
        </div>

        <div className="admin-calendar-days">
          {diasCalendario.map((dia) => (
            <button
              type="button"
              className={[
                dia.esMesActual ? "" : "outside",
                dia.fechaInput === valorCampo ? "active" : "",
                dia.fechaInput === hoyInput ? "today" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => seleccionarFecha(campo, dia.fechaInput)}
              key={dia.fechaInput}
            >
              {dia.dia}
            </button>
          ))}
        </div>

        <div className="admin-calendar-footer">
          {campo === "fechaFinal" && (
            <button type="button" onClick={limpiarFechaFinal}>
              Borrar
            </button>
          )}

          <button
            type="button"
            onClick={() => seleccionarFecha(campo, hoyInput)}
          >
            Hoy
          </button>
        </div>
      </div>
    );
  };

  const renderSelectorHora = () => (
    <div className="admin-time-panel">
      <div className="admin-time-column">
        <strong>Hora</strong>

        <div>
          {HORAS.map((hora) => (
            <button
              type="button"
              className={horaTemporal.hora === hora ? "active" : ""}
              onClick={() => seleccionarHora(hora)}
              key={hora}
            >
              {hora}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-time-column">
        <strong>Minutos</strong>

        <div>
          {MINUTOS.map((minuto) => (
            <button
              type="button"
              className={horaTemporal.minuto === minuto ? "active" : ""}
              onClick={() => seleccionarMinuto(minuto)}
              key={minuto}
            >
              {minuto}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

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
    <form
      className="admin-form"
      onSubmit={guardarFormulario}
      autoComplete="off"
    >
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
            autoComplete="off"
          />
        </label>

        <label>
          <span>Ministerio *</span>

          <div
            className={`admin-custom-select ${
              ministerioAbierto ? "is-open" : ""
            }`}
            ref={ministerioBoxRef}
          >
            <button
              type="button"
              className={`admin-custom-select-control ${
                formulario.ministerio ? "has-value" : ""
              }`}
              onClick={abrirMinisterio}
            >
              <span>{formulario.ministerio || "Selecciona un ministerio"}</span>
            </button>

            {ministerioAbierto && (
              <div className="admin-custom-select-menu">
                {ministeriosDisponibles.map((ministerio) => (
                  <button
                    type="button"
                    className={`admin-custom-select-option ${
                      formulario.ministerio === ministerio.nombre
                        ? "active"
                        : ""
                    }`}
                    onClick={() => seleccionarMinisterio(ministerio.nombre)}
                    key={ministerio.id}
                  >
                    {ministerio.nombre}
                  </button>
                ))}
              </div>
            )}
          </div>
        </label>

        <label>
          <span>Fecha inicial *</span>

          <div
            className={`admin-picker-wrapper ${
              calendarioAbierto === "fechaInicio" ? "is-open" : ""
            }`}
            ref={fechaInicioBoxRef}
          >
            <button
              type="button"
              className={`admin-picker-field ${
                formulario.fechaInicio ? "has-value" : ""
              }`}
              onClick={() => abrirCalendario("fechaInicio")}
              onKeyDown={(e) =>
                manejarTeclaCampo(e, () => abrirCalendario("fechaInicio"))
              }
            >
              <span>
                {formulario.fechaInicio
                  ? formatearFechaCampo(formulario.fechaInicio)
                  : "dd/mm/aaaa"}
              </span>
            </button>

            {calendarioAbierto === "fechaInicio" &&
              renderCalendario("fechaInicio")}
          </div>
        </label>

        <label>
          <span>Fecha final</span>

          <div
            className={`admin-picker-wrapper ${
              calendarioAbierto === "fechaFinal" ? "is-open" : ""
            }`}
            ref={fechaFinalBoxRef}
          >
            <button
              type="button"
              className={`admin-picker-field ${
                formulario.fechaFinal ? "has-value" : ""
              }`}
              onClick={() => abrirCalendario("fechaFinal")}
              onKeyDown={(e) =>
                manejarTeclaCampo(e, () => abrirCalendario("fechaFinal"))
              }
            >
              <span>
                {formulario.fechaFinal
                  ? formatearFechaCampo(formulario.fechaFinal)
                  : "dd/mm/aaaa"}
              </span>
            </button>

            {calendarioAbierto === "fechaFinal" &&
              renderCalendario("fechaFinal")}
          </div>
        </label>

        <label>
          <span>Hora *</span>

          <div
            className={`admin-picker-wrapper ${horaAbierta ? "is-open" : ""}`}
            ref={horaBoxRef}
          >
            <button
              type="button"
              className={`admin-picker-field ${
                formulario.hora ? "has-value" : ""
              }`}
              onClick={abrirSelectorHora}
              onKeyDown={(e) => manejarTeclaCampo(e, abrirSelectorHora)}
            >
              <span>{formulario.hora || "--:--"}</span>
            </button>

            {horaAbierta && renderSelectorHora()}
          </div>
        </label>

        <label>
          <span>Lugar *</span>

          <input
            type="text"
            name="lugar"
            value={formulario.lugar}
            onChange={actualizarCampo}
            placeholder="Ej: Iglesia El Buen Pastor"
            autoComplete="off"
          />
        </label>
      </div>

      <label>
        <span>Número de WhatsApp</span>

        <div className="admin-phone-wrapper">
          <PhoneInput
            country="bo"
            value={formulario.whatsappNumero}
            onChange={actualizarWhatsapp}
            enableSearch={false}
            countryCodeEditable={false}
            specialLabel=""
            placeholder="Ej: 79386322"
            inputProps={{
              name: "whatsappNumero",
              autoComplete: "off",
            }}
            containerClass="admin-phone-input-container"
            inputClass="admin-phone-input-field"
            buttonClass="admin-phone-input-button"
            dropdownClass="admin-phone-dropdown"
          />
        </div>
      </label>

      <label className="admin-file-upload">
        <UploadCloud size={22} />

        <div>
          <strong>
            {formulario.imagen
              ? "Cambiar imagen del evento"
              : "Subir imagen desde tu PC"}
          </strong>
          <small>
            JPG, JPEG, PNG o WEBP. Tamaño máximo: 5 MB.
          </small>
        </div>

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={manejarImagenArchivo}
          disabled={guardandoEvento}
        />
      </label>

      {formulario.imagen && (
        <div className="admin-evento-imagen-seleccionada">
          <div className="admin-evento-imagen-preview">
            <img
              src={formulario.imagen}
              alt="Vista previa del afiche"
            />
          </div>

          <div className="admin-evento-imagen-info">
            <span className="admin-evento-imagen-titulo">
              Vista previa de la imagen
            </span>

            <span className="admin-evento-imagen-nombre">
              {archivoImagen
                ? archivoImagen.name
                : "Imagen actual del evento"}
            </span>
          </div>
        </div>
      )}

      <label>
        <span>Descripción corta *</span>

        <textarea
          name="descripcion"
          value={formulario.descripcion}
          onChange={actualizarCampo}
          placeholder="Descripción que se verá en la tarjeta del evento."
          rows="3"
          autoComplete="off"
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
          autoComplete="off"
        />
      </label>

      <div className="admin-form-actions">
        <button
          type="button"
          className="admin-form-cancel"
          onClick={cerrarModal}
          disabled={guardandoEvento}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="admin-form-save"
          disabled={guardandoEvento}
        >
          {guardandoEvento
            ? "Guardando..."
            : modoFormulario === "editar"
            ? "Guardar cambios"
            : "Crear evento"}
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

        <div className="admin-public-preview-content">
          {renderEventoPublico()}
        </div>
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
              {modoFormulario === "editar"
                ? "Editar registro"
                : "Nuevo registro"}
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
            <div className="admin-preview-page-shell">
              {renderEventoPublico()}
            </div>
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

      {errorCarga && (
        <div className="admin-form-error">{errorCarga}</div>
      )}

      <ListaAdmin
        columnas={columnasEventos}
        datos={cargandoDatos ? [] : eventosProcesados}
        onVer={handleVer}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        mensajeVacio={
          cargandoDatos
            ? "Cargando eventos..."
            : "No hay eventos registrados."
        }
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