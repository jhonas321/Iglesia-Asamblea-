export const publicacionesBase = [
  {
    id: 1,
    ministerio: "Jóvenes",
    titulo: "Noche de adoración juvenil",
    fecha: "25 Mayo 2027",
    hora: "19:00",
    lugar: "Auditorio principal",
    descripcion:
      "Una noche de alabanza, oración y comunión preparada para los jóvenes de la iglesia.",

    // Imagen principal que aparece en la lista de publicaciones
    imagen: "/imagenes/publicaciones/jovenes/portada.jpg",

    // Fotografías que aparecen en el slider y en la galería
    fotos: [
      "/imagenes/publicaciones/jovenes/portada.jpg",
      "/imagenes/publicaciones/jovenes/foto-2.jpg",
      "/imagenes/publicaciones/jovenes/foto-3.jpg",
      "/imagenes/publicaciones/jovenes/foto-4.jpg",
      "/imagenes/publicaciones/jovenes/foto-5.jpg",
      "/imagenes/publicaciones/jovenes/foto-6.jpg",
      "/imagenes/publicaciones/jovenes/foto-7.jpg",
      "/imagenes/publicaciones/jovenes/foto-8.jpg",
    ],

    categoria: "Recuerdo",

    // Video corto almacenado dentro de public/videos
    videoTrailer: {
      url: "/videos/jovenes-trailer.mp4",
      portadaFallback: "/imagenes/publicaciones/jovenes/portada.jpg",
    },

    // Enlace externo al video completo
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

    imagen: "/imagenes/publicaciones/evangelismo/portada.jpg",

    fotos: [
      "/imagenes/publicaciones/evangelismo/portada.jpg",
      "/imagenes/publicaciones/evangelismo/foto-2.jpg",
      "/imagenes/publicaciones/evangelismo/foto-3.jpg",
      "/imagenes/publicaciones/evangelismo/foto-4.jpg",
      "/imagenes/publicaciones/evangelismo/foto-5.jpg",
      "/imagenes/publicaciones/evangelismo/foto-6.jpg",
      "/imagenes/publicaciones/evangelismo/foto-7.jpg",
      "/imagenes/publicaciones/evangelismo/foto-8.jpg",
    ],

    categoria: "Campaña",

    videoTrailer: {
      url: "/videos/evangelismo-trailer.mp4",
      portadaFallback:
        "/imagenes/publicaciones/evangelismo/portada.jpg",
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

    imagen: "/imagenes/publicaciones/infantil/portada.jpg",

    fotos: [
      "/imagenes/publicaciones/infantil/portada.jpg",
      "/imagenes/publicaciones/infantil/foto-2.jpg",
      "/imagenes/publicaciones/infantil/foto-3.jpg",
      "/imagenes/publicaciones/infantil/foto-4.jpg",
      "/imagenes/publicaciones/infantil/foto-5.jpg",
      "/imagenes/publicaciones/infantil/foto-6.jpg",
      "/imagenes/publicaciones/infantil/foto-7.jpg",
      "/imagenes/publicaciones/infantil/foto-8.jpg",
    ],

    categoria: "Infantil",

    videoTrailer: {
      url: "/videos/infantil-trailer.mp4",
      portadaFallback: "/imagenes/publicaciones/infantil/portada.jpg",
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

    imagen: "/imagenes/publicaciones/damas/portada.jpg",

    fotos: [
      "/imagenes/publicaciones/damas/portada.jpg",
      "/imagenes/publicaciones/damas/foto-2.jpg",
      "/imagenes/publicaciones/damas/foto-3.jpg",
      "/imagenes/publicaciones/damas/foto-4.jpg",
      "/imagenes/publicaciones/damas/foto-5.jpg",
      "/imagenes/publicaciones/damas/foto-6.jpg",
      "/imagenes/publicaciones/damas/foto-7.jpg",
      "/imagenes/publicaciones/damas/foto-8.jpg",
    ],

    categoria: "Comunión",

    videoTrailer: {
      url: "/videos/damas-trailer.mp4",
      portadaFallback: "/imagenes/publicaciones/damas/portada.jpg",
    },

    videoCompleto: {
      url: "https://www.facebook.com/",
    },
  },
];

/*
  Esta parte asegura que todas las publicaciones tengan:

  - Una imagen principal.
  - Un arreglo de fotografías.
  - Un video trailer compatible con el JSX.
  - Una portada de respaldo para el video.
*/

export const publicaciones = publicacionesBase.map((pub) => {
  const fotosValidas =
    Array.isArray(pub.fotos) && pub.fotos.length > 0
      ? pub.fotos
      : [pub.imagen];

  const imagenPrincipal = pub.imagen || fotosValidas[0];

  const videoTrailer = pub.videoTrailer?.url
    ? {
        url: pub.videoTrailer.url,
        portadaFallback:
          pub.videoTrailer.portadaFallback ||
          fotosValidas[0] ||
          imagenPrincipal,
      }
    : null;

  return {
    ...pub,
    imagen: imagenPrincipal,
    fotos: fotosValidas,
    videoTrailer,
  };
});