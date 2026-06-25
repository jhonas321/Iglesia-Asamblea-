import { useCallback, useEffect, useMemo, useState } from "react";
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
import {
  guardarPublicaciones,
  obtenerPublicacionesGuardadas,
} from "../../data/adminStorage";

import "../../styles/AdminCrudPage.css";
import "../../styles/publicaciones.css";
import "../../styles/PublicacionesAdmin.css";

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

const convertirArchivoABase64 = (archivo) => {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();

    lector.onload = () => resolve(lector.result);
    lector.onerror = () => reject(new Error("No se pudo leer el archivo."));
    lector.readAsDataURL(archivo);
  });
};

const crearMiniaturaDesdeVideo = (urlVideo) => {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    let terminado = false;

    const finalizar = (resultado) => {
      if (terminado) return;

      terminado = true;
      video.removeAttribute("src");
      video.load();
      resolve(resultado);
    };

    video.src = urlVideo;
    video.muted = true;
    video.playsInline = true;
    video.preload = "metadata";

    video.addEventListener("loadedmetadata", () => {
      const ancho = video.videoWidth || 1280;
      const alto = video.videoHeight || 720;

      const orientacion = alto > ancho ? "vertical" : "horizontal";

      const segundoCaptura = Number.isFinite(video.duration)
        ? Math.min(1, Math.max(video.duration - 0.1, 0))
        : 0.5;

      video.currentTime = segundoCaptura;

      video.addEventListener(
        "seeked",
        () => {
          try {
            const canvas = document.createElement("canvas");
            canvas.width = ancho;
            canvas.height = alto;

            const contexto = canvas.getContext("2d");
            contexto.drawImage(video, 0, 0, ancho, alto);

            finalizar({
              portada: canvas.toDataURL("image/jpeg", 0.85),
              orientacion,
            });
          } catch (error) {
            finalizar({
              portada: null,
              orientacion,
            });
          }
        },
        { once: true }
      );
    });

    video.addEventListener("error", () => {
      finalizar({
        portada: null,
        orientacion: "horizontal",
      });
    });
  });
};

const quitarCategoria = (publicacion) => {
  const { categoria, ...resto } = publicacion;
  return resto;
};

const CrearPublicacion = () => {
  const [publicacionesAdmin, setPublicacionesAdmin] = useState(() =>
    obtenerPublicacionesGuardadas().map(quitarCategoria)
  );

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

  const esModoVista = modoFormulario === "ver";

  const videoTrailerSubidoDesdePc =
    formulario.videoTrailerUrl.startsWith("data:video");

  const cerrarModal = useCallback(() => {
    setModalAbierto(false);
    setPublicacionEditandoId(null);
    setFormulario(crearFormularioPublicacionVacio());
    setErrorFormulario("");
    setPanelActivo("formulario");
    setFotoActualPreview(0);
    setVideoModalPreview(null);
  }, []);

  const cerrarVideoPreview = () => {
    setVideoModalPreview(null);
  };

  const quitarVideoTrailerSubido = () => {
    setFormulario((actual) => ({
      ...actual,
      videoTrailerUrl: "",
      videoTrailerPortada: "",
    }));

    setVideoModalPreview(null);
    setErrorFormulario("");
  };

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

  const actualizarVideoTrailerUrl = (e) => {
    const value = e.target.value;

    setFormulario((actual) => ({
      ...actual,
      videoTrailerUrl: value,
    }));

    setErrorFormulario("");
  };

  const manejarImagenPrincipalArchivo = async (e) => {
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

  const manejarFotosGaleriaArchivos = async (e) => {
    const archivos = Array.from(e.target.files || []);

    if (archivos.length === 0) return;

    const soloImagenes = archivos.filter((archivo) =>
      archivo.type.startsWith("image/")
    );

    if (soloImagenes.length === 0) {
      setErrorFormulario("Debes seleccionar imágenes válidas.");
      return;
    }

    try {
      const imagenesBase64 = await Promise.all(
        soloImagenes.map((archivo) => convertirArchivoABase64(archivo))
      );

      setFormulario((actual) => {
        const textoAnterior = actual.fotosTexto.trim();
        const textoNuevo = imagenesBase64.join("\n");

        return {
          ...actual,
          fotosTexto: textoAnterior
            ? `${textoAnterior}\n${textoNuevo}`
            : textoNuevo,
        };
      });

      setErrorFormulario("");
    } catch (error) {
      setErrorFormulario("No se pudieron cargar las imágenes.");
    }
  };

  const manejarVideoTrailerArchivo = async (e) => {
    const archivo = e.target.files?.[0];

    if (!archivo) return;

    if (!archivo.type.startsWith("video/")) {
      setErrorFormulario("Debes seleccionar un video válido.");
      return;
    }

    try {
      const videoBase64 = await convertirArchivoABase64(archivo);
      const miniatura = await crearMiniaturaDesdeVideo(videoBase64);

      setFormulario((actual) => ({
        ...actual,
        videoTrailerUrl: videoBase64,
        videoTrailerPortada:
          miniatura.portada || actual.videoTrailerPortada || actual.imagen,
      }));

      setErrorFormulario("");
    } catch (error) {
      setErrorFormulario("No se pudo cargar el video trailer.");
    }
  };

  const cargarFormularioPublicacion = (publicacion) => {
    const publicacionLimpia = quitarCategoria(publicacion);
    const rangoFecha = obtenerRangoFecha(publicacionLimpia.fecha);

    setFormulario({
      titulo: publicacionLimpia.titulo || "",
      ministerio: publicacionLimpia.ministerio || "",
      fechaInicio:
        publicacionLimpia.fechaInicio ||
        fechaDateAInput(rangoFecha.inicio) ||
        obtenerFechaActualInput(),
      fechaFinal:
        publicacionLimpia.fechaFinal ||
        fechaDateAInput(rangoFecha.fin) ||
        publicacionLimpia.fechaInicio ||
        "",
      hora: publicacionLimpia.hora || "",
      lugar: publicacionLimpia.lugar || "",
      descripcion: publicacionLimpia.descripcion || "",
      imagen: publicacionLimpia.imagen || "",
      fotosTexto: convertirListaFotosATexto(publicacionLimpia.fotos),
      videoTrailerUrl: publicacionLimpia.videoTrailer?.url || "",
      videoTrailerPortada:
        publicacionLimpia.videoTrailer?.portadaFallback || "",
      videoCompletoUrl: publicacionLimpia.videoCompleto?.url || "",
    });
  };

  const abrirModalCrear = () => {
    setModoFormulario("crear");
    setPanelActivo("formulario");
    setPublicacionEditandoId(null);
    setFormulario(crearFormularioPublicacionVacio());
    setErrorFormulario("");
    setFotoActualPreview(0);
    setVideoModalPreview(null);
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

  const guardarFormulario = (e) => {
    e.preventDefault();

    const error = validarFormulario();

    if (error) {
      setErrorFormulario(error);
      setPanelActivo("formulario");
      return;
    }

    const fechaFinalNormalizada =
      formulario.fechaFinal || formulario.fechaInicio;

    const imagenPrincipal = formulario.imagen.trim();

    const fotos = convertirFotosTextoALista(
      formulario.fotosTexto,
      imagenPrincipal
    );

    const publicacionNormalizada = {
      titulo: formulario.titulo.trim(),
      ministerio: formulario.ministerio.trim(),
      fechaInicio: formulario.fechaInicio,
      fechaFinal: fechaFinalNormalizada,
      fecha: formatearRangoFechaPublicacion(
        formulario.fechaInicio,
        fechaFinalNormalizada
      ),
      hora: formulario.hora.trim(),
      lugar: formulario.lugar.trim(),
      descripcion: formulario.descripcion.trim(),
      imagen: imagenPrincipal,
      fotos,
      videoTrailer: formulario.videoTrailerUrl.trim()
        ? {
            url: formulario.videoTrailerUrl.trim(),
            portadaFallback:
              formulario.videoTrailerPortada.trim() || imagenPrincipal,
          }
        : null,
      videoCompleto: formulario.videoCompletoUrl.trim()
        ? {
            url: formulario.videoCompletoUrl.trim(),
          }
        : null,
    };

    let nuevaLista = [];

    if (modoFormulario === "editar") {
      nuevaLista = publicacionesAdmin.map((publicacion) => {
        const publicacionSinCategoria = quitarCategoria(publicacion);

        if (publicacion.id === publicacionEditandoId) {
          return {
            ...publicacionSinCategoria,
            ...publicacionNormalizada,
          };
        }

        return publicacionSinCategoria;
      });
    } else {
      const nuevaPublicacion = {
        id: Date.now(),
        ...publicacionNormalizada,
      };

      nuevaLista = [
        nuevaPublicacion,
        ...publicacionesAdmin.map(quitarCategoria),
      ];
    }

    setPublicacionesAdmin(nuevaLista);
    guardarPublicaciones(nuevaLista);
    cerrarModal();
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
    setModalAbierto(true);
  };

  const handleEliminar = (publicacion) => {
    const confirmar = window.confirm(
      `¿Seguro que quieres eliminar la publicación "${publicacion.titulo}"?`
    );

    if (!confirmar) return;

    const nuevaLista = publicacionesAdmin
      .filter((item) => item.id !== publicacion.id)
      .map(quitarCategoria);

    setPublicacionesAdmin(nuevaLista);
    guardarPublicaciones(nuevaLista);
  };

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
            placeholder="Ej: Noche de adoración"
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

          <div className="admin-date-wrap">
            <input
              type="date"
              name="fechaInicio"
              value={formulario.fechaInicio}
              onChange={actualizarCampo}
            />
          </div>
        </label>

        <label>
          <span>Fecha final</span>

          <div className="admin-date-wrap">
            <input
              type="date"
              name="fechaFinal"
              value={formulario.fechaFinal}
              onChange={actualizarCampo}
            />
          </div>
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

        <label>
          <span>Imagen principal por URL *</span>
          <input
            type="text"
            name="imagen"
            value={formulario.imagen}
            onChange={actualizarCampo}
            placeholder="Ej: /img/publicaciones/foto1.jpg o una URL"
          />
        </label>
      </div>

      <label className="admin-file-upload">
        <UploadCloud size={22} />
        <div>
          <strong>Subir imagen principal desde tu PC</strong>
          <small>Por ahora se guarda en localStorage. Usa imágenes livianas.</small>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={manejarImagenPrincipalArchivo}
        />
      </label>

      <label>
        <span>Descripción *</span>
        <textarea
          name="descripcion"
          value={formulario.descripcion}
          onChange={actualizarCampo}
          placeholder="Descripción de la publicación."
          rows="4"
        />
      </label>

      <label>
        <span>Fotos de la galería por URL</span>
        <textarea
          name="fotosTexto"
          value={formulario.fotosTexto}
          onChange={actualizarCampo}
          placeholder={`Puedes poner una URL por línea:
/img/publicaciones/foto1.jpg
/img/publicaciones/foto2.jpg
/img/publicaciones/foto3.jpg`}
          rows="5"
        />
      </label>

      <label className="admin-file-upload">
        <UploadCloud size={22} />
        <div>
          <strong>Subir varias fotos para la galería</strong>
          <small>Puedes seleccionar varias imágenes livianas para prueba.</small>
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={manejarFotosGaleriaArchivos}
        />
      </label>

      <div className="admin-form-grid">
        <label>
          <span>URL video trailer</span>
          <input
            type="text"
            name="videoTrailerUrl"
            value={videoTrailerSubidoDesdePc ? "" : formulario.videoTrailerUrl}
            onChange={actualizarVideoTrailerUrl}
            placeholder={
              videoTrailerSubidoDesdePc
                ? "Ya hay un video subido desde tu PC"
                : "Ej: /videos/trailer.mp4"
            }
            disabled={videoTrailerSubidoDesdePc}
            className={videoTrailerSubidoDesdePc ? "admin-input-disabled" : ""}
          />

          {videoTrailerSubidoDesdePc && (
            <div className="admin-video-uploaded-note">
              <span>Video trailer subido desde tu PC correctamente.</span>

              <button type="button" onClick={quitarVideoTrailerSubido}>
                Quitar video
              </button>
            </div>
          )}
        </label>

        <label>
          <span>Portada del trailer</span>
          <input
            type="text"
            name="videoTrailerPortada"
            value={formulario.videoTrailerPortada}
            onChange={actualizarCampo}
            placeholder="Si lo dejas vacío, usará la imagen principal"
          />
        </label>

        <label>
          <span>URL video completo</span>
          <input
            type="text"
            name="videoCompletoUrl"
            value={formulario.videoCompletoUrl}
            onChange={actualizarCampo}
            placeholder="Ej: link de YouTube, Facebook o video"
          />
        </label>
      </div>

      <label className="admin-file-upload">
        <UploadCloud size={22} />
        <div>
          <strong>Subir video trailer desde tu PC</strong>
          <small>Recomendado: MP4 corto de 15 a 30 segundos.</small>
        </div>
        <input
          type="file"
          accept="video/mp4,video/webm,video/ogg,video/*"
          onChange={manejarVideoTrailerArchivo}
        />
      </label>

      <div className="admin-form-actions">
        <button type="button" className="admin-form-cancel" onClick={cerrarModal}>
          Cancelar
        </button>

        <button type="submit" className="admin-form-save">
          {modoFormulario === "editar"
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

      <ListaAdmin
        columnas={columnasPublicaciones}
        datos={publicacionesProcesadas}
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