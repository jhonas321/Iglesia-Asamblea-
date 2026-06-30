import { eventos as eventosBase } from "../data/eventosData";
import { publicaciones as publicacionesBase } from "../data/publicacionesData";
import { horarios as horariosBase } from "../data/horariosData";
import { organigrama as organigramaBase } from "../data/organigramaData";
import { contacto as contactoBase } from "../data/contactoData";
import { heroFotos as heroFotosBase } from "../data/heroFotosData";
import { ministerios as ministeriosBase } from "../data/ministeriosData";
import { configuracion as configuracionBase } from "../data/configuracionData";

const EVENTOS_KEY = "admin_eventos";
const PUBLICACIONES_KEY = "admin_publicaciones";
const HORARIOS_KEY = "admin_horarios";
const ORGANIGRAMA_KEY = "admin_organigrama";
const CONTACTO_KEY = "admin_contacto";
const HERO_FOTOS_KEY = "admin_hero_fotos";
const MINISTERIOS_KEY = "admin_ministerios";
const CONFIGURACION_KEY = "admin_configuracion";

const MAX_FOTOS_HERO = 8;

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

const leerObjeto = (key, objetoBase) => {
  if (!storageDisponible()) return objetoBase;

  try {
    const datosGuardados = localStorage.getItem(key);

    if (!datosGuardados) return objetoBase;

    const datosParseados = JSON.parse(datosGuardados);

    if (
      !datosParseados ||
      typeof datosParseados !== "object" ||
      Array.isArray(datosParseados)
    ) {
      return objetoBase;
    }

    return datosParseados;
  } catch (error) {
    console.error("Error leyendo localStorage:", error);
    return objetoBase;
  }
};

const guardarObjeto = (key, objeto) => {
  if (!storageDisponible()) return;

  try {
    localStorage.setItem(key, JSON.stringify(objeto));
  } catch (error) {
    console.error("Error guardando localStorage:", error);
    window.alert("No se pudo guardar la información.");
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

const normalizarContacto = (contacto) => ({
  nombreIglesia:
    contacto.nombreIglesia || "Asamblea Apostólica de la Fe en Cristo Jesús",
  direccion: contacto.direccion || "Calle Santa Cruz entre Calama",
  telefono: contacto.telefono || "+591 70000000",

  whatsappNumero: contacto.whatsappNumero || "59179386322",

  footerUbicacion: contacto.footerUbicacion || "Cochabamba, Bolivia",
  footerTelefono:
    contacto.footerTelefono || contacto.telefono || "+591 70000000",
  footerCorreo: contacto.footerCorreo || "contacto@asamblea.com",

  facebookUrl: contacto.facebookUrl || "#",
  youtubeUrl: contacto.youtubeUrl || "#",
  instagramUrl: contacto.instagramUrl || "#",
  tiktokUrl: contacto.tiktokUrl || "#",
  twitterUrl: contacto.twitterUrl || "#",
  telegramUrl: contacto.telegramUrl || "#",
});

const normalizarHeroFotos = (lista) => {
  const listaSegura =
    Array.isArray(lista) && lista.length > 0 ? lista : heroFotosBase;

  const fotosNormalizadas = listaSegura
    .filter((foto) => foto && foto.imagen)
    .slice(0, MAX_FOTOS_HERO)
    .map((foto, index) => ({
      id: foto.id || `hero-${Date.now()}-${index}`,
      titulo: `Foto ${index + 1}`,
      imagen: foto.imagen || "",
    }));

  if (fotosNormalizadas.length === 0) {
    return heroFotosBase.slice(0, 1).map((foto, index) => ({
      id: foto.id || `hero-base-${index + 1}`,
      titulo: `Foto ${index + 1}`,
      imagen: foto.imagen || "",
    }));
  }

  return fotosNormalizadas;
};

const normalizarMinisterios = (lista) => {
  const listaSegura = Array.isArray(lista) ? lista : ministeriosBase;

  return listaSegura.map((ministerio, index) => ({
    id: ministerio.id || `ministerio-${Date.now()}-${index}`,
    nombre: ministerio.nombre || "",
    descripcion: ministerio.descripcion || "",
  }));
};

const normalizarConfiguracion = (configuracion) => {
  const configSegura =
    configuracion && typeof configuracion === "object" ? configuracion : {};

  return {
    nombreAdmin: configSegura.nombreAdmin || "Admin User",
    iconoAdmin: configSegura.iconoAdmin || "hombre-1",
    passwordAdmin: configSegura.passwordAdmin || "admin123",
  };
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

export const obtenerContactoGuardado = () => {
  return normalizarContacto(leerObjeto(CONTACTO_KEY, contactoBase));
};

export const guardarContacto = (contacto) => {
  guardarObjeto(CONTACTO_KEY, normalizarContacto(contacto));
};

export const obtenerHeroFotosGuardadas = () => {
  return normalizarHeroFotos(leerLista(HERO_FOTOS_KEY, heroFotosBase));
};

export const guardarHeroFotos = (fotos) => {
  guardarLista(HERO_FOTOS_KEY, normalizarHeroFotos(fotos));
};

export const obtenerMinisteriosGuardados = () => {
  return normalizarMinisterios(leerLista(MINISTERIOS_KEY, ministeriosBase));
};

export const guardarMinisterios = (ministerios) => {
  guardarLista(MINISTERIOS_KEY, normalizarMinisterios(ministerios));
};

export const obtenerConfiguracionGuardada = () => {
  return normalizarConfiguracion(
    leerObjeto(CONFIGURACION_KEY, configuracionBase)
  );
};

export const guardarConfiguracion = (configuracion) => {
  const configuracionNormalizada = normalizarConfiguracion(configuracion);

  guardarObjeto(CONFIGURACION_KEY, configuracionNormalizada);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("admin-config-updated"));
  }
};

export const cambiarPasswordAdmin = ({ passwordActual, passwordNueva }) => {
  const configuracionActual = obtenerConfiguracionGuardada();

  if (configuracionActual.passwordAdmin !== passwordActual) {
    return {
      ok: false,
      mensaje: "La contraseña actual no es correcta.",
    };
  }

  guardarConfiguracion({
    ...configuracionActual,
    passwordAdmin: passwordNueva,
  });

  return {
    ok: true,
    mensaje: "La contraseña se cambió correctamente.",
  };
};

export const reiniciarDatosAdmin = () => {
  if (!storageDisponible()) return;

  localStorage.removeItem(EVENTOS_KEY);
  localStorage.removeItem(PUBLICACIONES_KEY);
  localStorage.removeItem(HORARIOS_KEY);
  localStorage.removeItem(ORGANIGRAMA_KEY);
  localStorage.removeItem(CONTACTO_KEY);
  localStorage.removeItem(HERO_FOTOS_KEY);
  localStorage.removeItem(MINISTERIOS_KEY);
  localStorage.removeItem(CONFIGURACION_KEY);
};