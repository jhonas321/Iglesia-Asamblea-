import "../styles/publicaciones.css";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaImages,
  FaChurch,
  FaSearch,
  FaTimes,
  FaDownload,
  FaPlay,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const videoPrueba = "/videos/download.mp4";

const publicaciones = [
  {
    id: 1,
    ministerio: "Jóvenes",
    titulo: "Noche de adoración juvenil",
    fecha: "25 Mayo 2026",
    hora: "19:00",
    lugar: "Auditorio principal",
    descripcion:
      "Una noche de alabanza, oración y comunión preparada para los jóvenes de la iglesia.",
    contenido:
      "La noche de adoración juvenil fue un espacio de encuentro espiritual, música, oración y reflexión bíblica. Los jóvenes compartieron un tiempo especial de unidad, crecimiento en la fe y compañerismo.",
    imagen:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    fotos: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
    ],
    categoria: "Recuerdo",
    videoTrailer: {
      url: videoPrueba,
      portadaFallback:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    },
    videoCompleto: {
      url: "https://www.youtube.com/",
    },
  },
  {
    id: 2,
    ministerio: "Evangelismo",
    titulo: "Campaña de evangelismo",
    fecha: "21 al 26 Mayo 2026",
    hora: "17:00",
    lugar: "Plaza principal",
    descripcion:
      "Actividad realizada para compartir un mensaje de esperanza con la comunidad.",
    contenido:
      "La campaña de evangelismo permitió compartir palabra de ánimo, oración y acompañamiento espiritual con diferentes personas de la comunidad.",
    imagen:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
    fotos: [
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&q=80",
    ],
    categoria: "Campaña",
    videoTrailer: {
      url: videoPrueba,
      portadaFallback:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
    },
    videoCompleto: {
      url: "https://drive.google.com/",
    },
  },
  {
    id: 3,
    ministerio: "Infantil",
    titulo: "Escuelita bíblica para niños",
    fecha: "30 Mayo 2026",
    hora: "09:00",
    lugar: "Salón de niños",
    descripcion:
      "Actividad infantil con enseñanza bíblica, canciones, juegos y manualidades.",
    contenido:
      "Los niños participaron en una mañana especial preparada por el Ministerio Infantil. Se compartieron historias bíblicas, canciones, juegos, manualidades y oración.",
    imagen:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80",
    fotos: [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=80",
    ],
    categoria: "Infantil",
    videoTrailer: {
      url: videoPrueba,
      portadaFallback:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80",
    },
    videoCompleto: {
      url: "https://t.me/",
    },
  },
  {
    id: 4,
    ministerio: "Damas",
    titulo: "Reunión de comunión",
    fecha: "15 Junio 2026",
    hora: "16:00",
    lugar: "Salón principal",
    descripcion:
      "Un encuentro de oración, enseñanza bíblica y compañerismo entre hermanas.",
    contenido:
      "El Ministerio de Damas compartió una tarde de oración, reflexión bíblica y compañerismo para fortalecer la unidad y el servicio.",
    imagen:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    fotos: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    ],
    categoria: "Comunión",
    videoTrailer: {
      url: videoPrueba,
      portadaFallback:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    },
    videoCompleto: {
      url: "https://www.facebook.com/",
    },
  },
  {
    id: 5,
    ministerio: "Alabanza",
    titulo: "Ensayo general de alabanza",
    fecha: "18 Junio 2026",
    hora: "18:30",
    lugar: "Templo principal",
    descripcion:
      "El equipo de alabanza realizó un ensayo general para preparar el servicio especial.",
    contenido:
      "El Ministerio de Alabanza llevó adelante un ensayo general para coordinar cantos, instrumentos y cada parte del servicio especial.",
    imagen:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
    fotos: [
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80",
    ],
    categoria: "Alabanza",
    videoTrailer: {
      url: videoPrueba,
      portadaFallback:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
    },
    videoCompleto: {
      url: "https://www.youtube.com/",
    },
  },
  {
    id: 6,
    ministerio: "Oración",
    titulo: "Vigilia de oración",
    fecha: "22 Junio 2026",
    hora: "21:00",
    lugar: "Templo principal",
    descripcion:
      "Una noche dedicada a la oración, intercesión y búsqueda espiritual.",
    contenido:
      "El Ministerio de Oración organizó una vigilia especial para orar por las familias, jóvenes, ministerios y necesidades de la comunidad.",
    imagen:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80",
    fotos: [
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&q=80",
    ],
    categoria: "Oración",
    videoTrailer: {
      url: videoPrueba,
      portadaFallback:
        "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80",
    },
    videoCompleto: {
      url: "https://drive.google.com/",
    },
  },
  {
    id: 7,
    ministerio: "Matrimonios",
    titulo: "Cena para matrimonios",
    fecha: "28 Junio 2026",
    hora: "20:00",
    lugar: "Salón de eventos",
    descripcion:
      "Una cena especial para fortalecer la comunicación y unidad familiar.",
    contenido:
      "El Ministerio de Matrimonios preparó una cena especial con reflexión bíblica, dinámicas y un tiempo de conversación.",
    imagen:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    fotos: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1200&q=80",
    ],
    categoria: "Familia",
    videoTrailer: {
      url: videoPrueba,
      portadaFallback:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    },
    videoCompleto: {
      url: "https://t.me/",
    },
  },
  {
    id: 8,
    ministerio: "Ayuda Social",
    titulo: "Entrega de alimentos",
    fecha: "5 Julio 2026",
    hora: "10:00",
    lugar: "Zona central",
    descripcion:
      "Jornada solidaria de entrega de alimentos a familias necesitadas.",
    contenido:
      "El Ministerio de Ayuda Social realizó una jornada de servicio entregando alimentos y compartiendo palabras de ánimo con familias de la comunidad.",
    imagen:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    fotos: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609139003551-ee40f5f73ec0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
    ],
    categoria: "Servicio",
    videoTrailer: {
      url: videoPrueba,
      portadaFallback:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    },
    videoCompleto: {
      url: "https://drive.google.com/",
    },
  },
];

const filtros = [
  "Todos",
  "Jóvenes",
  "Evangelismo",
  "Infantil",
  "Damas",
  "Alabanza",
  "Oración",
  "Matrimonios",
  "Ayuda Social",
];

const crearMiniaturaVideo = (url) => {
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

    video.src = url;
    video.muted = true;
    video.playsInline = true;
    video.preload = "metadata";

    video.addEventListener("loadedmetadata", () => {
      const ancho = video.videoWidth || 0;
      const alto = video.videoHeight || 0;

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

            const portada = canvas.toDataURL("image/jpeg", 0.85);

            finalizar({
              portada,
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

function PublicacionesMinisterios() {
  const navigate = useNavigate();
  const { id } = useParams();

  const publicacionSeleccionada = useMemo(() => {
    if (!id) return null;
    return publicaciones.find((pub) => pub.id === Number(id)) || null;
  }, [id]);

  const [filtroActivo, setFiltroActivo] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [fotoActual, setFotoActual] = useState(0);
  const [fotoModal, setFotoModal] = useState(null);
  const [videoModal, setVideoModal] = useState(null);
  const [datosVideos, setDatosVideos] = useState({});

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [id]);

  useEffect(() => {
    if (!publicacionSeleccionada) return;

    setFotoActual(0);

    const intervalo = setInterval(() => {
      setFotoActual((actual) =>
        actual === publicacionSeleccionada.fotos.length - 1 ? 0 : actual + 1
      );
    }, 3500);

    return () => clearInterval(intervalo);
  }, [publicacionSeleccionada]);

  useEffect(() => {
    document.body.style.overflow = fotoModal || videoModal ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [fotoModal, videoModal]);

  useEffect(() => {
    const videosUnicos = [
      ...new Set(
        publicaciones
          .map((pub) => pub.videoTrailer?.url)
          .filter((url) => Boolean(url))
      ),
    ];

    videosUnicos.forEach(async (url) => {
      if (datosVideos[url]) return;

      const datos = await crearMiniaturaVideo(url);

      setDatosVideos((actual) => ({
        ...actual,
        [url]: datos,
      }));
    });
  }, [datosVideos]);

  const obtenerDatosVideo = (videoTrailer) => {
    const datosGenerados = datosVideos[videoTrailer.url];

    return {
      ...videoTrailer,
      portada: datosGenerados?.portada || videoTrailer.portadaFallback,
      orientacion: datosGenerados?.orientacion || "horizontal",
    };
  };

  const publicacionesFiltradas = useMemo(() => {
    const textoBusqueda = busqueda.trim().toLowerCase();

    return publicaciones.filter((pub) => {
      const coincideFiltro =
        filtroActivo === "Todos" || pub.ministerio === filtroActivo;

      const coincideBusqueda =
        textoBusqueda === "" ||
        pub.titulo.toLowerCase().includes(textoBusqueda) ||
        pub.descripcion.toLowerCase().includes(textoBusqueda) ||
        pub.contenido.toLowerCase().includes(textoBusqueda) ||
        pub.ministerio.toLowerCase().includes(textoBusqueda) ||
        pub.categoria.toLowerCase().includes(textoBusqueda) ||
        pub.fecha.toLowerCase().includes(textoBusqueda) ||
        pub.lugar.toLowerCase().includes(textoBusqueda);

      return coincideFiltro && coincideBusqueda;
    });
  }, [filtroActivo, busqueda]);

  const limpiarFiltros = () => {
    setBusqueda("");
    setFiltroActivo("Todos");
  };

  const seleccionarPublicacion = (pub) => {
    setFotoActual(0);
    setFotoModal(null);
    setVideoModal(null);
    navigate(`/ministerios/publicaciones/${pub.id}`);
  };

  const volverPublicaciones = () => {
    setFotoActual(0);
    setFotoModal(null);
    setVideoModal(null);
    navigate("/ministerios/publicaciones");
  };

  const crearNombreArchivo = (titulo) => {
    return titulo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const descargarFoto = async (url) => {
    const nombreBase = crearNombreArchivo(
      publicacionSeleccionada?.titulo || "foto-publicacion"
    );

    try {
      const respuesta = await fetch(url, { mode: "cors" });
      const blob = await respuesta.blob();
      const urlTemporal = URL.createObjectURL(blob);

      const enlace = document.createElement("a");
      enlace.href = urlTemporal;
      enlace.download = `${nombreBase}.jpg`;
      document.body.appendChild(enlace);
      enlace.click();
      enlace.remove();

      URL.revokeObjectURL(urlTemporal);
    } catch (error) {
      const enlace = document.createElement("a");
      enlace.href = url;
      enlace.target = "_blank";
      enlace.rel = "noopener noreferrer";
      enlace.click();
    }
  };

  if (id && !publicacionSeleccionada) {
    return (
      <main className="publicaciones-page">
        <section className="galeria-detalle">
          <button className="btn-volver" onClick={volverPublicaciones}>
            <FaArrowLeft />
            Volver a publicaciones
          </button>

          <div className="sin-publicaciones">
            <h3>Publicación no encontrada</h3>
            <p>La publicación que buscas no existe o fue eliminada.</p>
            <button type="button" onClick={volverPublicaciones}>
              Ver publicaciones
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (publicacionSeleccionada) {
    const videoVisual = publicacionSeleccionada.videoTrailer
      ? obtenerDatosVideo(publicacionSeleccionada.videoTrailer)
      : null;

    return (
      <main className="publicaciones-page">
        <section className="galeria-detalle">
          <button className="btn-volver" onClick={volverPublicaciones}>
            <FaArrowLeft />
            Volver a publicaciones
          </button>

          <article className="galeria-detalle-card">
            <div className="detalle-slider">
              {publicacionSeleccionada.fotos.map((foto, index) => (
                <div
                  className={`detalle-slide ${
                    fotoActual === index ? "activo" : ""
                  }`}
                  key={index}
                >
                  <img
                    src={foto}
                    alt={`${publicacionSeleccionada.titulo} ${index + 1}`}
                  />
                </div>
              ))}

              <div className="detalle-slider-overlay">
                <span>{publicacionSeleccionada.categoria}</span>
                <h1>{publicacionSeleccionada.titulo}</h1>
                <p>Ministerio de {publicacionSeleccionada.ministerio}</p>
              </div>

              <div className="detalle-slider-progreso">
                {publicacionSeleccionada.fotos.map((_, index) => (
                  <span
                    key={index}
                    className={fotoActual === index ? "activo" : ""}
                  ></span>
                ))}
              </div>
            </div>

            <div className="galeria-detalle-info">
              <div className="detalle-etiquetas">
                <span>{publicacionSeleccionada.categoria}</span>
                <span>
                  <FaChurch /> Ministerio de {publicacionSeleccionada.ministerio}
                </span>
              </div>

              <h2>{publicacionSeleccionada.titulo}</h2>

              <p className="detalle-resumen">
                {publicacionSeleccionada.descripcion}
              </p>

              {publicacionSeleccionada.videoCompleto?.url && (
                <div className="detalle-acciones-media">
                  <a
                    className="btn-video-completo"
                    href={publicacionSeleccionada.videoCompleto.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaExternalLinkAlt />
                    Ver video completo
                  </a>
                </div>
              )}

              <div className="detalle-datos">
                <p>
                  <FaCalendarAlt /> {publicacionSeleccionada.fecha}
                </p>
                <p>
                  <FaClock /> {publicacionSeleccionada.hora}
                </p>
                <p>
                  <FaMapMarkerAlt /> {publicacionSeleccionada.lugar}
                </p>
              </div>

              <p className="contenido-detalle">
                {publicacionSeleccionada.contenido}
              </p>

              {videoVisual && (
                <div className="detalle-videos">
                  <div className="detalle-videos-title">
                    <h2>Videos trailer</h2>
                    <p>
                      Mira un resumen corto del evento. El video se reproduce al
                      abrirlo.
                    </p>
                  </div>

                  <div className="videos-trailer-grid">
                    <button
                      type="button"
                      className="video-trailer-card"
                      onClick={() => setVideoModal(videoVisual)}
                    >
                      <img
                        src={videoVisual.portada}
                        alt={`Trailer de ${publicacionSeleccionada.titulo}`}
                      />

                      <div className="video-trailer-card-overlay">
                        <div className="video-trailer-play">
                          <FaPlay />
                        </div>

                        <div className="video-trailer-text">
                          <h3>Ver resumen del evento</h3>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              <div className="detalle-galeria">
                <div className="detalle-galeria-title">
                  <h2>Más fotos de esta publicación</h2>
                  <p>
                    Haz click en una foto para verla en grande y descargarla.
                  </p>
                </div>

                <div className="detalle-fotos-grid">
                  {publicacionSeleccionada.fotos.map((foto, index) => (
                    <button
                      type="button"
                      className="detalle-foto"
                      key={index}
                      onClick={() => setFotoModal(foto)}
                    >
                      <img
                        src={foto}
                        alt={`${publicacionSeleccionada.titulo} ${index + 1}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </section>

        {fotoModal && (
          <div className="foto-modal" onClick={() => setFotoModal(null)}>
            <div
              className="foto-modal-fondo"
              style={{ backgroundImage: `url(${fotoModal})` }}
            ></div>

            <button
              type="button"
              className="foto-modal-cerrar"
              onClick={() => setFotoModal(null)}
              aria-label="Cerrar imagen"
            >
              <FaTimes />
            </button>

            <button
              type="button"
              className="foto-modal-descargar"
              onClick={(e) => {
                e.stopPropagation();
                descargarFoto(fotoModal);
              }}
            >
              <FaDownload />
              Descargar foto
            </button>

            <div
              className="foto-modal-contenido"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={fotoModal} alt="Vista ampliada" />
            </div>
          </div>
        )}

        {videoModal && (
          <div className="video-modal" onClick={() => setVideoModal(null)}>
            <div className="video-modal-fondo"></div>

            <button
              type="button"
              className="video-modal-cerrar"
              onClick={() => setVideoModal(null)}
              aria-label="Cerrar video"
            >
              <FaTimes />
            </button>

            <div
              className={`video-modal-contenido ${
                videoModal.orientacion === "vertical"
                  ? "modal-video-vertical"
                  : ""
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={videoModal.url}
                poster={videoModal.portada}
                controls
                playsInline
              ></video>
            </div>
          </div>
        )}
      </main>
    );
  }

  return (
    <main className="publicaciones-page">
      <section className="publicaciones-hero">
        <div className="publicaciones-hero-content">
          <span>Ministerios</span>
          <h1>Galería de publicaciones</h1>
          <p>
            Explora fotografías, recuerdos y momentos importantes de las
            actividades realizadas por los ministerios de la iglesia.
          </p>
        </div>
      </section>

      <section className="galeria-section">
        <div className="galeria-title">
          <h2>Momentos compartidos</h2>
          <p>
            Busca por título, ministerio, fecha o lugar, y selecciona una
            publicación para ver la información completa.
          </p>
        </div>

        <div className="busqueda-publicaciones">
          <div className="busqueda-input-box">
            <FaSearch className="busqueda-icono" />

            <input
              type="text"
              placeholder="Buscar publicaciones por título, ministerio, fecha o lugar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />

            {busqueda && (
              <button
                type="button"
                className="btn-limpiar-busqueda"
                onClick={() => setBusqueda("")}
                aria-label="Limpiar búsqueda"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        <div className="filtros-publicaciones">
          {filtros.map((filtro) => (
            <button
              key={filtro}
              type="button"
              className={filtroActivo === filtro ? "activo" : ""}
              onClick={() => setFiltroActivo(filtro)}
            >
              {filtro}
            </button>
          ))}
        </div>

        {(busqueda || filtroActivo !== "Todos") && (
          <div className="resumen-filtros">
            <p>
              Mostrando {publicacionesFiltradas.length} publicación
              {publicacionesFiltradas.length === 1 ? "" : "es"}
            </p>

            <button type="button" onClick={limpiarFiltros}>
              Limpiar filtros
            </button>
          </div>
        )}

        <div className="galeria-grid">
          {publicacionesFiltradas.map((pub, index) => (
            <article
              className={`galeria-item item-${index + 1}`}
              key={pub.id}
              onClick={() => seleccionarPublicacion(pub)}
            >
              <img src={pub.imagen} alt={pub.titulo} />

              <div className="galeria-overlay">
                <span>
                  <FaImages /> {pub.categoria}
                </span>

                <div>
                  <h3>{pub.titulo}</h3>
                  <p>{pub.descripcion}</p>

                  <div className="galeria-meta">
                    <small>
                      <FaChurch /> {pub.ministerio}
                    </small>
                    <small>
                      <FaCalendarAlt /> {pub.fecha}
                    </small>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {publicacionesFiltradas.length === 0 && (
          <div className="sin-publicaciones">
            <h3>No se encontraron publicaciones</h3>
            <p>Prueba con otro título, ministerio, fecha o lugar.</p>
            <button type="button" onClick={limpiarFiltros}>
              Mostrar todas
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default PublicacionesMinisterios;