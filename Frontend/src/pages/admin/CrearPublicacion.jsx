import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  PlusCircle,
  X,
  UploadCloud,
  CalendarDays,
  Clock,
  MapPin,
  Church,
  Play,
  ExternalLink,
} from "lucide-react";

import ListaAdmin from "../../components/admin/ListaAdmin";

import "../../styles/AdminCrudPage.css";
import "../../styles/publicaciones.css";
import "../../styles/PublicacionesAdmin.css";

const API_URL = "http://127.0.0.1:8000/api";
const BACKEND_URL = "http://127.0.0.1:8000";

const meses = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  setiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
};

const nombresMeses = [
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

const limpiarTexto = (texto) => {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const crearFechaLocal = (anio, mes, dia) => {
  return new Date(Number(anio), Number(mes), Number(dia), 0, 0, 0, 0);
};

const crearFechaDesdeTexto = (dia, mesTexto, anio) => {
  const mes = meses[limpiarTexto(mesTexto)];

  if (mes === undefined) return null;

  return crearFechaLocal(anio, mes, dia);
};

const obtenerRangoFecha = (fechaTexto) => {
  const fechaLimpia = limpiarTexto(String(fechaTexto || "").trim());

  const rango = fechaLimpia.match(
    /(\d{1,2})\s+al\s+(\d{1,2})\s+([a-zñ]+)\s+(\d{4})/
  );

  if (rango) {
    return {
      inicio: crearFechaDesdeTexto(rango[1], rango[3], rango[4]),
      fin: crearFechaDesdeTexto(rango[2], rango[3], rango[4]),
    };
  }

  const fechaSimple = fechaLimpia.match(/(\d{1,2})\s+([a-zñ]+)\s+(\d{4})/);

  if (fechaSimple) {
    const fecha = crearFechaDesdeTexto(
      fechaSimple[1],
      fechaSimple[2],
      fechaSimple[3]
    );

    return {
      inicio: fecha,
      fin: fecha,
    };
  }

  return {
    inicio: null,
    fin: null,
  };
};

const obtenerFechaOrden = (fechaTexto) => {
  const { fin } = obtenerRangoFecha(fechaTexto);
  return fin ? fin.getTime() : 0;
};

const obtenerFechaActualInput = () => {
  const hoy = new Date();

  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
};

const fechaDateAInput = (fecha) => {
  if (!fecha) return "";

  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
};

const crearFechaLocalDesdeInput = (fechaInput) => {
  const [anio, mes, dia] = fechaInput.split("-").map(Number);
  return new Date(anio, mes - 1, dia);
};

const formatearFechaCampo = (fechaInput) => {
  if (!fechaInput) return "";

  const [anio, mes, dia] = fechaInput.split("-");

  return `${dia}/${mes}/${anio}`;
};

const formatearFechaPublicacion = (fechaInput) => {
  if (!fechaInput) return "";

  const fecha = crearFechaLocalDesdeInput(fechaInput);

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = nombresMeses[fecha.getMonth()];
  const anio = fecha.getFullYear();

  return `${dia} ${mes} ${anio}`;
};

const formatearRangoFechaPublicacion = (fechaInicio, fechaFinal) => {
  if (!fechaInicio) return "";

  const inicio = crearFechaLocalDesdeInput(fechaInicio);
  const final = crearFechaLocalDesdeInput(fechaFinal || fechaInicio);

  const mismoDia =
    inicio.getFullYear() === final.getFullYear() &&
    inicio.getMonth() === final.getMonth() &&
    inicio.getDate() === final.getDate();

  if (mismoDia) return formatearFechaPublicacion(fechaInicio);

  const mismoMes =
    inicio.getFullYear() === final.getFullYear() &&
    inicio.getMonth() === final.getMonth();

  if (mismoMes) {
    const diaInicio = String(inicio.getDate()).padStart(2, "0");
    const diaFinal = String(final.getDate()).padStart(2, "0");
    const mes = nombresMeses[inicio.getMonth()];
    const anio = inicio.getFullYear();

    return `${diaInicio} al ${diaFinal} ${mes} ${anio}`;
  }

  const mismoAnio = inicio.getFullYear() === final.getFullYear();

  if (mismoAnio) {
    const diaInicio = String(inicio.getDate()).padStart(2, "0");
    const mesInicio = nombresMeses[inicio.getMonth()];
    const diaFinal = String(final.getDate()).padStart(2, "0");
    const mesFinal = nombresMeses[final.getMonth()];
    const anio = inicio.getFullYear();

    return `${diaInicio} ${mesInicio} al ${diaFinal} ${mesFinal} ${anio}`;
  }

  return `${formatearFechaPublicacion(
    fechaInicio
  )} al ${formatearFechaPublicacion(fechaFinal)}`;
};

const crearFormularioPublicacionVacio = () => ({
  titulo: "",
  ministerio: "",
  fechaInicio: obtenerFechaActualInput(),
  fechaFinal: "",
  hora: "",
  lugar: "",
  descripcion: "",
  imagen: "",
  fotosTexto: "",
  videoTrailerUrl: "",
  videoTrailerPortada: "",
  videoCompletoUrl: "",
});

const convertirFotosTextoALista = (texto, imagenPrincipal) => {
  const fotos = String(texto || "")
    .split(/\n|,/)
    .map((foto) => foto.trim())
    .filter(Boolean);

  if (fotos.length > 0) return fotos;

  return imagenPrincipal ? [imagenPrincipal] : [];
};

const convertirListaFotosATexto = (fotos) => {
  if (!Array.isArray(fotos)) return "";
  return fotos.join("\n");
};


const quitarCategoria = (publicacion) => {
  const { categoria, ...resto } = publicacion;
  return resto;
};

const normalizarHoraInput = (hora) => {
  if (!hora) return "";

  const horaLimpia = String(hora).trim();

  if (/^\d{2}:\d{2}$/.test(horaLimpia)) return horaLimpia;

  if (/^\d{2}:\d{2}:\d{2}$/.test(horaLimpia)) {
    return horaLimpia.slice(0, 5);
  }

  const match = horaLimpia.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i);

  if (!match) return "";

  let horas = Number(match[1]);
  const minutos = match[2];
  const periodo = match[3].toLowerCase();

  if (periodo === "pm" && horas < 12) horas += 12;
  if (periodo === "am" && horas === 12) horas = 0;

  return `${String(horas).padStart(2, "0")}:${minutos}`;
};

const obtenerToken = () => localStorage.getItem("token");

const obtenerUrlArchivo = (ruta) => {
  if (!ruta) return "";

  const valor = String(ruta);

  if (
    valor.startsWith("http://") ||
    valor.startsWith("https://") ||
    valor.startsWith("blob:") ||
    valor.startsWith("data:") ||
    valor.startsWith("/")
  ) {
    return valor;
  }

  return `${BACKEND_URL}/storage/${valor}`;
};

const convertirPublicacionBackendAFrontend = (publicacion) => {
  const fechaInicio = publicacion.fecha_inicio || "";
  const fechaFinal = publicacion.fecha_final || fechaInicio;

  const fotos = Array.isArray(publicacion.fotos)
    ? publicacion.fotos
        .map((foto) => obtenerUrlArchivo(foto.imagen))
        .filter(Boolean)
    : [];

  const imagen = obtenerUrlArchivo(publicacion.imagen);

  const videoTrailerUrl = obtenerUrlArchivo(
    publicacion.video_trailer_url
  );

  const videoTrailerPortada = obtenerUrlArchivo(
    publicacion.video_trailer_portada
  );

  return {
    id: publicacion.id,
    titulo: publicacion.titulo || "",
    ministerioId: publicacion.ministerio_id,
    ministerio: publicacion.ministerio?.nombre || "",
    fechaInicio,
    fechaFinal,
    fecha: formatearRangoFechaPublicacion(fechaInicio, fechaFinal),
    hora: normalizarHoraInput(publicacion.hora),
    lugar: publicacion.lugar || "",
    descripcion: publicacion.descripcion || "",
    imagen,
    fotos: fotos.length > 0 ? fotos : imagen ? [imagen] : [],
    videoTrailer: videoTrailerUrl
      ? {
          url: videoTrailerUrl,
          portadaFallback: videoTrailerPortada || imagen,
        }
      : null,
    videoCompleto: publicacion.video_completo_url
      ? {
          url: publicacion.video_completo_url,
        }
      : null,
    activo: publicacion.activo,
  };
};

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
      fechaInput: fechaDateAInput(fecha),
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

const CrearPublicacion = () => {
  const ministerioBoxRef = useRef(null);
  const fechaInicioBoxRef = useRef(null);
  const fechaFinalBoxRef = useRef(null);
  const horaBoxRef = useRef(null);

  const [publicacionesAdmin, setPublicacionesAdmin] = useState([]);
  const [ministeriosDisponibles, setMinisteriosDisponibles] = useState([]);

  const [cargandoDatos, setCargandoDatos] = useState(true);
  const [guardandoPublicacion, setGuardandoPublicacion] = useState(false);
  const [eliminandoId, setEliminandoId] = useState(null);

  const [archivoImagenPrincipal, setArchivoImagenPrincipal] = useState(null);
  const [archivosGaleria, setArchivosGaleria] = useState([]);
  const [archivoVideoTrailer, setArchivoVideoTrailer] = useState(null);
  const [archivoPortadaTrailer, setArchivoPortadaTrailer] = useState(null);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("crear");
  const [panelActivo, setPanelActivo] = useState("formulario");
  const [publicacionEditandoId, setPublicacionEditandoId] = useState(null);
  const [formulario, setFormulario] = useState(
    crearFormularioPublicacionVacio
  );
  const [errorFormulario, setErrorFormulario] = useState("");
  const [fotoActualPreview, setFotoActualPreview] = useState(0);
  const [videoModalPreview, setVideoModalPreview] = useState(null);

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

  const videoTrailerSubidoDesdePc = Boolean(archivoVideoTrailer);

  const cargarDatos = useCallback(async () => {
    const token = obtenerToken();

    try {
      setCargandoDatos(true);

      const [respuestaPublicaciones, respuestaMinisterios] =
        await Promise.all([
          fetch(`${API_URL}/publicaciones`, {
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

      if (!respuestaPublicaciones.ok) {
        throw new Error("No se pudieron cargar las publicaciones.");
      }

      if (!respuestaMinisterios.ok) {
        throw new Error("No se pudieron cargar los ministerios.");
      }

      const datosPublicaciones = await respuestaPublicaciones.json();
      const datosMinisterios = await respuestaMinisterios.json();

      setPublicacionesAdmin(
        datosPublicaciones.map(convertirPublicacionBackendAFrontend)
      );

      setMinisteriosDisponibles(datosMinisterios);
    } catch (error) {
      console.error("Error cargando publicaciones:", error);
      setErrorFormulario(
        error.message || "No se pudieron cargar los datos."
      );
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

  const cerrarModal = useCallback(() => {
    setModalAbierto(false);
    setPublicacionEditandoId(null);
    setFormulario(crearFormularioPublicacionVacio());
    setArchivoImagenPrincipal(null);
    setArchivosGaleria([]);
    setArchivoVideoTrailer(null);
    setArchivoPortadaTrailer(null);
    setErrorFormulario("");
    setPanelActivo("formulario");
    setFotoActualPreview(0);
    setVideoModalPreview(null);
    cerrarSelectores();
  }, [cerrarSelectores]);

  const cerrarVideoPreview = () => {
    setVideoModalPreview(null);
  };

  const quitarVideoTrailerSubido = () => {
    if (!archivoVideoTrailer) return;

    setArchivoVideoTrailer(null);

    setFormulario((actual) => ({
      ...actual,
      videoTrailerUrl: "",
    }));

    setVideoModalPreview(null);
    setErrorFormulario("");
  };

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
      if (e.key === "Escape") {
        if (videoModalPreview) {
          setVideoModalPreview(null);
          return;
        }

        cerrarModal();
      }
    };

    window.addEventListener("keydown", cerrarConEscape);

    return () => {
      window.removeEventListener("keydown", cerrarConEscape);
    };
  }, [modalAbierto, videoModalPreview, cerrarModal]);

  const publicacionesProcesadas = useMemo(() => {
    return [...publicacionesAdmin].sort(
      (a, b) => obtenerFechaOrden(b.fecha) - obtenerFechaOrden(a.fecha)
    );
  }, [publicacionesAdmin]);

  const fotosVistaPrevia = convertirFotosTextoALista(
    formulario.fotosTexto,
    formulario.imagen
  );

  const fechaVistaPrevia = formatearRangoFechaPublicacion(
    formulario.fechaInicio,
    formulario.fechaFinal || formulario.fechaInicio
  );

  const imagenPrincipalPreview =
    formulario.imagen || fotosVistaPrevia[0] || "";

  useEffect(() => {
    if (!modalAbierto) {
      setFotoActualPreview(0);
      return;
    }

    if (fotosVistaPrevia.length === 0) {
      setFotoActualPreview(0);
      return;
    }

    setFotoActualPreview(0);

    const intervalo = setInterval(() => {
      setFotoActualPreview((actual) =>
        actual === fotosVistaPrevia.length - 1 ? 0 : actual + 1
      );
    }, 3500);

    return () => clearInterval(intervalo);
  }, [modalAbierto, fotosVistaPrevia.length]);

  const columnasPublicaciones = [
    { key: "titulo", label: "Título" },
    { key: "ministerio", label: "Ministerio" },
    { key: "fecha", label: "Fecha" },
    { key: "hora", label: "Hora" },
    { key: "lugar", label: "Lugar" },
    {
      key: "estado",
      label: "Estado",
      render: () => <span className="admin-status publicado">Publicado</span>,
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


  const validarImagenSeleccionada = (archivo) => {
    const tiposPermitidos = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!tiposPermitidos.includes(archivo.type)) {
      return "La imagen debe ser JPG, JPEG, PNG o WEBP.";
    }

    if (archivo.size > 5 * 1024 * 1024) {
      return "Cada imagen debe pesar como máximo 5 MB.";
    }

    return "";
  };

  const manejarImagenPrincipalArchivo = (e) => {
    const archivo = e.target.files?.[0];

    if (!archivo) return;

    const errorImagen = validarImagenSeleccionada(archivo);

    if (errorImagen) {
      setErrorFormulario(errorImagen);
      e.target.value = "";
      return;
    }

    setArchivoImagenPrincipal(archivo);

    const preview = URL.createObjectURL(archivo);

    setFormulario((actual) => ({
      ...actual,
      imagen: preview,
    }));

    setErrorFormulario("");
  };

  const manejarFotosGaleriaArchivos = (e) => {
    const archivos = Array.from(e.target.files || []);

    if (archivos.length === 0) return;

    const errorImagen = archivos
      .map(validarImagenSeleccionada)
      .find(Boolean);

    if (errorImagen) {
      setErrorFormulario(errorImagen);
      e.target.value = "";
      return;
    }

    setArchivosGaleria(archivos);

    const previews = archivos.map((archivo) =>
      URL.createObjectURL(archivo)
    );

    setFormulario((actual) => ({
      ...actual,
      fotosTexto: previews.join("\n"),
    }));

    setFotoActualPreview(0);
    setErrorFormulario("");
  };

  const manejarVideoTrailerArchivo = (e) => {
    const archivo = e.target.files?.[0];

    if (!archivo) return;

    const tiposPermitidos = [
      "video/mp4",
      "video/webm",
      "video/ogg",
    ];

    if (!tiposPermitidos.includes(archivo.type)) {
      setErrorFormulario(
        "El trailer debe ser un archivo MP4, WEBM u OGG."
      );
      e.target.value = "";
      return;
    }

    if (archivo.size > 50 * 1024 * 1024) {
      setErrorFormulario(
        "El video trailer no puede superar los 50 MB."
      );
      e.target.value = "";
      return;
    }

    setArchivoVideoTrailer(archivo);

    const preview = URL.createObjectURL(archivo);

    setFormulario((actual) => ({
      ...actual,
      videoTrailerUrl: preview,
    }));

    setErrorFormulario("");
  };

  const manejarPortadaTrailerArchivo = (e) => {
    const archivo = e.target.files?.[0];

    if (!archivo) return;

    const errorImagen = validarImagenSeleccionada(archivo);

    if (errorImagen) {
      setErrorFormulario(errorImagen);
      e.target.value = "";
      return;
    }

    setArchivoPortadaTrailer(archivo);

    const preview = URL.createObjectURL(archivo);

    setFormulario((actual) => ({
      ...actual,
      videoTrailerPortada: preview,
    }));

    setErrorFormulario("");
  };

  const cargarFormularioPublicacion = (publicacion) => {
    const publicacionLimpia = quitarCategoria(publicacion);

    setArchivoImagenPrincipal(null);
    setArchivosGaleria([]);
    setArchivoVideoTrailer(null);
    setArchivoPortadaTrailer(null);

    setFormulario({
      titulo: publicacionLimpia.titulo || "",
      ministerio: publicacionLimpia.ministerio || "",
      fechaInicio:
        publicacionLimpia.fechaInicio || obtenerFechaActualInput(),
      fechaFinal:
        publicacionLimpia.fechaFinal ||
        publicacionLimpia.fechaInicio ||
        "",
      hora: normalizarHoraInput(publicacionLimpia.hora),
      lugar: publicacionLimpia.lugar || "",
      descripcion: publicacionLimpia.descripcion || "",
      imagen: publicacionLimpia.imagen || "",
      fotosTexto: convertirListaFotosATexto(
        publicacionLimpia.fotos || []
      ),
      videoTrailerUrl:
        publicacionLimpia.videoTrailer?.url || "",
      videoTrailerPortada:
        publicacionLimpia.videoTrailer?.portadaFallback || "",
      videoCompletoUrl:
        publicacionLimpia.videoCompleto?.url || "",
    });
  };

  const abrirModalCrear = () => {
    setModoFormulario("crear");
    setPanelActivo("formulario");
    setPublicacionEditandoId(null);
    setFormulario(crearFormularioPublicacionVacio());
    setArchivoImagenPrincipal(null);
    setArchivosGaleria([]);
    setArchivoVideoTrailer(null);
    setArchivoPortadaTrailer(null);
    setErrorFormulario("");
    setFotoActualPreview(0);
    setVideoModalPreview(null);
    cerrarSelectores();
    setModalAbierto(true);
  };

  const validarFormulario = () => {
    if (!formulario.titulo.trim()) return "El título es obligatorio.";
    if (!formulario.ministerio.trim()) return "El ministerio es obligatorio.";
    if (!formulario.fechaInicio) return "La fecha inicial es obligatoria.";
    if (!formulario.hora.trim()) return "La hora es obligatoria.";
    if (!formulario.lugar.trim()) return "El lugar es obligatorio.";
    if (!formulario.descripcion.trim()) return "La descripción es obligatoria.";
    if (!formulario.imagen.trim()) return "La imagen principal es obligatoria.";

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
      setErrorFormulario(
        "El ministerio seleccionado no es válido."
      );
      setPanelActivo("formulario");
      return;
    }

    const token = obtenerToken();
    const esEdicion = modoFormulario === "editar";

    const datos = new FormData();

    datos.append("ministerio_id", ministerioSeleccionado.id);
    datos.append("titulo", formulario.titulo.trim());
    datos.append("fecha_inicio", formulario.fechaInicio);
    datos.append(
      "fecha_final",
      formulario.fechaFinal || formulario.fechaInicio
    );
    datos.append("hora", formulario.hora.trim());
    datos.append("lugar", formulario.lugar.trim());
    datos.append("descripcion", formulario.descripcion.trim());
    datos.append("activo", "1");

    if (formulario.videoCompletoUrl.trim()) {
      datos.append(
        "video_completo_url",
        formulario.videoCompletoUrl.trim()
      );
    }

    if (archivoImagenPrincipal) {
      datos.append("imagen", archivoImagenPrincipal);
    }

    archivosGaleria.forEach((archivo) => {
      datos.append("fotos[]", archivo);
    });

    if (archivoVideoTrailer) {
      datos.append("video_trailer", archivoVideoTrailer);
    }

    if (archivoPortadaTrailer) {
      datos.append(
        "video_trailer_portada",
        archivoPortadaTrailer
      );
    }

    if (esEdicion) {
      datos.append("_method", "PUT");
    }

    try {
      setGuardandoPublicacion(true);
      setErrorFormulario("");

      const url = esEdicion
        ? `${API_URL}/publicaciones/${publicacionEditandoId}`
        : `${API_URL}/publicaciones`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: datos,
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
            data.message ||
              "No se pudo guardar la publicación."
          );
        }

        setPanelActivo("formulario");
        return;
      }

      await cargarDatos();
      cerrarModal();
    } catch (error) {
      console.error(
        "Error guardando publicación:",
        error
      );

      setErrorFormulario(
        "No se pudo conectar con el servidor."
      );
    } finally {
      setGuardandoPublicacion(false);
    }
  };

  const abrirVideoTrailer = () => {
    if (!formulario.videoTrailerUrl.trim()) return;

    setVideoModalPreview({
      url: formulario.videoTrailerUrl.trim(),
      portada: formulario.videoTrailerPortada || imagenPrincipalPreview,
      orientacion: "horizontal",
    });
  };

  const handleCrear = () => {
    abrirModalCrear();
  };

  const handleVer = (publicacion) => {
    setModoFormulario("ver");
    setPanelActivo("vista");
    setPublicacionEditandoId(publicacion.id);
    cargarFormularioPublicacion(publicacion);
    setErrorFormulario("");
    setFotoActualPreview(0);
    setVideoModalPreview(null);
    cerrarSelectores();
    setModalAbierto(true);
  };

  const handleEditar = (publicacion) => {
    setModoFormulario("editar");
    setPanelActivo("formulario");
    setPublicacionEditandoId(publicacion.id);
    cargarFormularioPublicacion(publicacion);
    setErrorFormulario("");
    setFotoActualPreview(0);
    setVideoModalPreview(null);
    cerrarSelectores();
    setModalAbierto(true);
  };

  const handleEliminar = async (publicacion) => {
    const confirmar = window.confirm(
      `¿Seguro que quieres eliminar la publicación "${publicacion.titulo}"?`
    );

    if (!confirmar) return;

    const token = obtenerToken();

    try {
      setEliminandoId(publicacion.id);

      const response = await fetch(
        `${API_URL}/publicaciones/${publicacion.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let data = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "No se pudo eliminar la publicación."
        );
      }

      setPublicacionesAdmin((actuales) =>
        actuales.filter(
          (item) => item.id !== publicacion.id
        )
      );
    } catch (error) {
      console.error(
        "Error eliminando publicación:",
        error
      );

      window.alert(
        error.message ||
          "No se pudo eliminar la publicación."
      );
    } finally {
      setEliminandoId(null);
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
            {nombresMeses[mesCalendario.getMonth()]} {mesCalendario.getFullYear()}
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

  const renderPublicacionPublica = () => (
    <article className="galeria-detalle-card">
      <div className="detalle-slider">
        {fotosVistaPrevia.length > 0 ? (
          fotosVistaPrevia.map((foto, index) => (
            <div
              className={`detalle-slide ${
                fotoActualPreview === index ? "activo" : ""
              }`}
              key={`${foto}-${index}`}
            >
              <img src={foto} alt={`${formulario.titulo} ${index + 1}`} />
            </div>
          ))
        ) : (
          <div className="detalle-slide activo">
            <div className="admin-preview-empty-image">Imagen principal</div>
          </div>
        )}

        <div className="detalle-slider-overlay">
          <h1>{formulario.titulo || "Título de la publicación"}</h1>
        </div>

        <div className="detalle-slider-progreso">
          {(fotosVistaPrevia.length > 0 ? fotosVistaPrevia : [1]).map(
            (_, index) => (
              <span
                key={index}
                className={fotoActualPreview === index ? "activo" : ""}
              ></span>
            )
          )}
        </div>
      </div>

      <div className="galeria-detalle-info">
        <div className="detalle-etiquetas">
          <span>
            <Church size={16} />
            Ministerio de {formulario.ministerio || "Ministerio"}
          </span>
        </div>

        <div className="detalle-datos">
          <p>
            <CalendarDays size={18} />
            {fechaVistaPrevia || "Fecha"}
          </p>

          <p>
            <Clock size={18} />
            {formulario.hora || "Hora"}
          </p>

          <p>
            <MapPin size={18} />
            {formulario.lugar || "Lugar"}
          </p>
        </div>

        <p className="detalle-descripcion-unica">
          {formulario.descripcion ||
            "Aquí se mostrará la descripción de la publicación."}
        </p>

        {formulario.videoTrailerUrl && (
          <section className="detalle-videos">
            <div className="detalle-videos-title">
              <h2>Video trailer</h2>
            </div>

            <div className="videos-trailer-grid">
              <button
                type="button"
                className="video-trailer-card"
                onClick={abrirVideoTrailer}
              >
                <img
                  src={formulario.videoTrailerPortada || imagenPrincipalPreview}
                  alt="Video trailer"
                />

                <div className="video-trailer-card-overlay">
                  <div className="video-trailer-play">
                    <Play size={18} />
                  </div>

                  <div className="video-trailer-text">
                    <h3>Ver trailer</h3>
                  </div>
                </div>
              </button>
            </div>
          </section>
        )}

        {formulario.videoCompletoUrl && (
          <div className="detalle-acciones-media">
            <a
              href={formulario.videoCompletoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-video-completo"
            >
              <ExternalLink size={16} />
              Ver video completo
            </a>
          </div>
        )}

        <div className="detalle-galeria">
          <div className="detalle-galeria-title">
            <h2>Más fotos de esta publicación</h2>
            <p>Haz click en una foto para verla en grande.</p>
          </div>

          <div className="detalle-fotos-grid">
            {fotosVistaPrevia.slice(0, 8).map((foto, index) => (
              <button
                type="button"
                className="detalle-foto"
                key={`${foto}-${index}`}
              >
                <img src={foto} alt={`Foto ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </article>
  );

  const formularioPublicacion = (
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
            placeholder="Ej: Noche de adoración"
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

      <label className="admin-file-upload">
        <UploadCloud size={22} />
        <div>
          <strong>
            {formulario.imagen
              ? "Cambiar imagen principal"
              : "Subir imagen principal desde tu PC"}
          </strong>
          <small>
            JPG, JPEG, PNG o WEBP. Máximo 5 MB.
          </small>
        </div>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={manejarImagenPrincipalArchivo}
          disabled={guardandoPublicacion}
        />
      </label>

      {formulario.imagen && (
        <div className="admin-publicacion-imagen-seleccionada">
          <div className="admin-publicacion-imagen-preview">
            <img
              src={formulario.imagen}
              alt="Vista previa de la imagen principal"
            />
          </div>

          <div className="admin-publicacion-imagen-info">
            <strong>Imagen principal</strong>
            <span>
              {archivoImagenPrincipal
                ? archivoImagenPrincipal.name
                : "Imagen actual de la publicación"}
            </span>
          </div>
        </div>
      )}

      <label>
        <span>Descripción *</span>
        <textarea
          name="descripcion"
          value={formulario.descripcion}
          onChange={actualizarCampo}
          placeholder="Descripción de la publicación."
          rows="4"
          autoComplete="off"
        />
      </label>

      <label className="admin-file-upload">
        <UploadCloud size={22} />
        <div>
          <strong>
            {formulario.fotosTexto
              ? "Cambiar fotos de la galería"
              : "Subir fotos para la galería"}
          </strong>
          <small>
            Puedes elegir varias imágenes. Cada una máximo 5 MB.
          </small>
        </div>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={manejarFotosGaleriaArchivos}
          disabled={guardandoPublicacion}
        />
      </label>

      {fotosVistaPrevia.length > 0 && (
        <div className="admin-publicacion-galeria-preview">
          {fotosVistaPrevia.slice(0, 8).map((foto, index) => (
            <div
              className="admin-publicacion-galeria-item"
              key={`${foto}-${index}`}
            >
              <img
                src={foto}
                alt={`Vista previa ${index + 1}`}
              />
            </div>
          ))}
        </div>
      )}

      <div className="admin-form-grid">
        <label>
          <span>URL video completo</span>
          <input
            type="text"
            name="videoCompletoUrl"
            value={formulario.videoCompletoUrl}
            onChange={actualizarCampo}
            placeholder="Ej: enlace de YouTube, Facebook o Vimeo"
            autoComplete="off"
            disabled={guardandoPublicacion}
          />
        </label>
      </div>

      <label className="admin-file-upload">
        <UploadCloud size={22} />
        <div>
          <strong>
            {formulario.videoTrailerUrl
              ? "Cambiar video trailer"
              : "Subir video trailer desde tu PC"}
          </strong>
          <small>
            MP4, WEBM u OGG. Máximo 50 MB.
          </small>
        </div>
        <input
          type="file"
          accept="video/mp4,video/webm,video/ogg"
          onChange={manejarVideoTrailerArchivo}
          disabled={guardandoPublicacion}
        />
      </label>

      {videoTrailerSubidoDesdePc && (
        <div className="admin-video-uploaded-note">
          <span>
            Nuevo trailer seleccionado: {archivoVideoTrailer.name}
          </span>

          <button
            type="button"
            onClick={quitarVideoTrailerSubido}
            disabled={guardandoPublicacion}
          >
            Quitar video
          </button>
        </div>
      )}

      {formulario.videoTrailerUrl && (
        <div className="admin-publicacion-video-preview">
          <video
            src={formulario.videoTrailerUrl}
            controls
            playsInline
          />
        </div>
      )}

      <label className="admin-file-upload">
        <UploadCloud size={22} />
        <div>
          <strong>
            {formulario.videoTrailerPortada
              ? "Cambiar portada del trailer"
              : "Subir portada del trailer"}
          </strong>
          <small>
            Opcional. JPG, PNG o WEBP. Máximo 5 MB.
          </small>
        </div>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={manejarPortadaTrailerArchivo}
          disabled={guardandoPublicacion}
        />
      </label>

      {formulario.videoTrailerPortada && (
        <div className="admin-publicacion-portada-preview">
          <img
            src={formulario.videoTrailerPortada}
            alt="Portada del trailer"
          />
          <span>
            {archivoPortadaTrailer
              ? archivoPortadaTrailer.name
              : "Portada actual del trailer"}
          </span>
        </div>
      )}

      <div className="admin-form-actions">
        <button
          type="button"
          className="admin-form-cancel"
          onClick={cerrarModal}
          disabled={guardandoPublicacion}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="admin-form-save"
          disabled={guardandoPublicacion}
        >
          {guardandoPublicacion
            ? "Guardando..."
            : modoFormulario === "editar"
            ? "Guardar cambios"
            : "Crear publicación"}
        </button>
      </div>
    </form>
  );

  const modalVistaUsuario = (
    <div className="admin-form-overlay" onClick={cerrarModal}>
      <div
        className="admin-public-preview-modal admin-publicacion-public-preview-modal"
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
          {renderPublicacionPublica()}
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
              {modoFormulario === "editar" ? "Editar registro" : "Nuevo registro"}
            </span>

            <h2>
              {modoFormulario === "editar"
                ? "Editar publicación"
                : "Crear publicación"}
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
            <div className="admin-editor-form-wrap">{formularioPublicacion}</div>
          ) : (
            <div className="admin-preview-page-shell">
              {renderPublicacionPublica()}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const modalVideoPreview =
    videoModalPreview &&
    createPortal(
      <div
        className="video-modal"
        style={{ zIndex: 1000001 }}
        onClick={cerrarVideoPreview}
        onWheel={(e) => e.preventDefault()}
        onTouchMove={(e) => e.preventDefault()}
      >
        <div className="video-modal-fondo"></div>

        <button
          type="button"
          className="video-modal-cerrar"
          onClick={(e) => {
            e.stopPropagation();
            cerrarVideoPreview();
          }}
          aria-label="Cerrar video"
        >
          <X size={22} />
        </button>

        <div
          className={`video-modal-contenido ${
            videoModalPreview.orientacion === "vertical"
              ? "modal-video-vertical"
              : ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <video
            src={videoModalPreview.url}
            poster={videoModalPreview.portada}
            controls
            playsInline
            autoPlay
            onLoadedMetadata={(e) => {
              const video = e.currentTarget;
              const orientacion =
                video.videoHeight > video.videoWidth ? "vertical" : "horizontal";

              setVideoModalPreview((actual) =>
                actual
                  ? {
                      ...actual,
                      orientacion,
                    }
                  : actual
              );
            }}
          ></video>
        </div>
      </div>,
      document.body
    );

  return (
    <section className="admin-crud-page">
      <div className="admin-crud-header">
        <div>
          <span className="admin-crud-label">Gestión administrativa</span>
          <h1>Publicaciones</h1>
          <p>Administra las publicaciones visibles en la página principal.</p>
        </div>

        <button type="button" className="admin-create-btn" onClick={handleCrear}>
          <PlusCircle size={20} />
          <span>Crear publicación</span>
        </button>
      </div>

      {cargandoDatos && (
        <div className="admin-publicaciones-cargando">
          Cargando publicaciones...
        </div>
      )}

      <ListaAdmin
        columnas={columnasPublicaciones}
        datos={cargandoDatos ? [] : publicacionesProcesadas}
        onVer={handleVer}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        mensajeVacio="No hay publicaciones registradas."
      />

      {modalAbierto &&
        createPortal(
          esModoVista ? modalVistaUsuario : modalFormulario,
          document.body
        )}

      {modalVideoPreview}
    </section>
  );
};

export default CrearPublicacion;