import { eventos as eventosBase } from "../data/eventosData";
import { publicaciones as publicacionesBase } from "../data/publicacionesData";
import { horarios as horariosBase } from "../data/horariosData";
import { organigrama as organigramaBase } from "../data/organigramaData";

const EVENTOS_KEY = "admin_eventos";
const PUBLICACIONES_KEY = "admin_publicaciones";
const HORARIOS_KEY = "admin_horarios";
const ORGANIGRAMA_KEY = "admin_organigrama";

const storageDisponible = () => {
  return typeof window !== "undefined" && window.localStorage;
};

const leerLista = (key, listaBase) => {
  if (!storageDisponible()) return listaBase;

  try {
    const datosGuardados = localStorage.getItem(key);

    if (!datosGuardados) return listaBase;

    const datosParseados = JSON.parse(datosGuardados);

    if (!Array.isArray(datosParseados)) return listaBase;

    return datosParseados;
  } catch (error) {
    console.error("Error leyendo localStorage:", error);
    return listaBase;
  }
};

const guardarLista = (key, lista) => {
  if (!storageDisponible()) return;

  try {
    localStorage.setItem(key, JSON.stringify(lista));
  } catch (error) {
    console.error("Error guardando localStorage:", error);
    window.alert(
      "No se pudo guardar. Puede que la imagen, video o archivo sea muy pesado para localStorage."
    );
  }
};

const normalizarEventos = (lista) => {
  return lista.map((evento) => ({
    ...evento,
    fechaFinal: evento.fechaFinal || evento.fechaInicio,
    detalles: evento.detalles || evento.descripcion || "",
  }));
};

const normalizarPublicaciones = (lista) => {
  return lista.map((publicacion) => {
    const fotosValidas =
      Array.isArray(publicacion.fotos) && publicacion.fotos.length > 0
        ? publicacion.fotos
        : publicacion.imagen
        ? [publicacion.imagen]
        : [];

    return {
      ...publicacion,
      imagen: publicacion.imagen || fotosValidas[0] || "",
      fotos: fotosValidas,
      videoTrailer: publicacion.videoTrailer?.url
        ? publicacion.videoTrailer
        : null,
      videoCompleto: publicacion.videoCompleto?.url
        ? publicacion.videoCompleto
        : null,
    };
  });
};

const normalizarHorarios = (lista) => {
  return lista.map((horario, index) => ({
    id: horario.id || Date.now() + index,
    dia: horario.dia || "",
    actividad: horario.actividad || "",
    hora: horario.hora || "",
    iconoTipo: horario.iconoTipo || "principal",
    descripcion: horario.descripcion || "",
  }));
};

const normalizarOrganigrama = (lista) => {
  return lista.map((seccion, indexSeccion) => {
    const idSeccion = seccion.id || `seccion-${indexSeccion}`;

    return {
      id: idSeccion,
      titulo: seccion.titulo || "",
      descripcion: seccion.descripcion || "",
      tipo: seccion.tipo === "principal" ? "principal" : "normal",
      miembros: Array.isArray(seccion.miembros)
        ? seccion.miembros.map((miembro, indexMiembro) => ({
            id: miembro.id || `${idSeccion}-miembro-${indexMiembro}`,
            cargo: miembro.cargo || "",
            nombre: miembro.nombre || "",
            genero: miembro.genero === "mujer" ? "mujer" : "hombre",
          }))
        : [],
    };
  });
};

export const obtenerEventosGuardados = () => {
  return normalizarEventos(leerLista(EVENTOS_KEY, eventosBase));
};

export const guardarEventos = (eventos) => {
  guardarLista(EVENTOS_KEY, normalizarEventos(eventos));
};

export const obtenerPublicacionesGuardadas = () => {
  return normalizarPublicaciones(leerLista(PUBLICACIONES_KEY, publicacionesBase));
};

export const guardarPublicaciones = (publicaciones) => {
  guardarLista(PUBLICACIONES_KEY, normalizarPublicaciones(publicaciones));
};

export const obtenerHorariosGuardados = () => {
  return normalizarHorarios(leerLista(HORARIOS_KEY, horariosBase));
};

export const guardarHorarios = (horarios) => {
  guardarLista(HORARIOS_KEY, normalizarHorarios(horarios));
};

export const obtenerOrganigramaGuardado = () => {
  return normalizarOrganigrama(leerLista(ORGANIGRAMA_KEY, organigramaBase));
};

export const guardarOrganigrama = (organigrama) => {
  guardarLista(ORGANIGRAMA_KEY, normalizarOrganigrama(organigrama));
};

export const reiniciarDatosAdmin = () => {
  if (!storageDisponible()) return;

  localStorage.removeItem(EVENTOS_KEY);
  localStorage.removeItem(PUBLICACIONES_KEY);
  localStorage.removeItem(HORARIOS_KEY);
  localStorage.removeItem(ORGANIGRAMA_KEY);
};