const videoPrueba = "";

/*
  Si luego tienes un video real, puedes usar:
  const videoPrueba = "/videos/download.mp4";

  Pero debe existir aquí:
  public/videos/download.mp4
*/

const bancoFotos = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1609139003551-ee40f5f73ec0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1544776193-352d25ca82cd?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?auto=format&fit=crop&w=1200&q=80",
];

const obtenerFotosPublicacion = (id, imagenPrincipal) => {
  const fotosSinPrincipal = bancoFotos.filter((foto) => foto !== imagenPrincipal);
  const inicio = (id * 7) % fotosSinPrincipal.length;

  const fotosRotadas = [
    ...fotosSinPrincipal.slice(inicio),
    ...fotosSinPrincipal.slice(0, inicio),
  ];

  return [imagenPrincipal, ...fotosRotadas].slice(0, 18);
};

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
    imagen:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    categoria: "Recuerdo",
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
    imagen:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
    categoria: "Campaña",
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
    imagen:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80",
    categoria: "Infantil",
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
    imagen:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    categoria: "Comunión",
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
    imagen:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
    categoria: "Alabanza",
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
    imagen:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80",
    categoria: "Oración",
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
    imagen:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    categoria: "Familia",
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
    imagen:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    categoria: "Servicio",
    videoCompleto: {
      url: "https://drive.google.com/",
    },
  },
  {
    id: 9,
    ministerio: "Ayuda Social",
    titulo: "Entrega de alimentos",
    fecha: "5 Julio 2026",
    hora: "10:00",
    lugar: "Zona central",
    descripcion:
      "Jornada solidaria de entrega de alimentos a familias necesitadas.",
    imagen:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80",
    categoria: "Servicio",
    videoCompleto: {
      url: "https://drive.google.com/",
    },
  },
  {
    id: 10,
    ministerio: "Ayuda Social",
    titulo: "Entrega de alimentos",
    fecha: "5 Julio 2026",
    hora: "10:00",
    lugar: "Zona central",
    descripcion:
      "Jornada solidaria de entrega de alimentos a familias necesitadas.",
    imagen:
      "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&w=1200&q=80",
    categoria: "Servicio",
    videoCompleto: {
      url: "https://drive.google.com/",
    },
  },
  {
    id: 11,
    ministerio: "Ayuda Social",
    titulo: "Entrega de alimentos",
    fecha: "5 Julio 2026",
    hora: "10:00",
    lugar: "Zona central",
    descripcion:
      "Jornada solidaria de entrega de alimentos a familias necesitadas.",
    imagen:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&q=80",
    categoria: "Servicio",
    videoCompleto: {
      url: "https://drive.google.com/",
    },
  },
  {
    id: 12,
    ministerio: "Ayuda Social",
    titulo: "Entrega de alimentos",
    fecha: "5 Julio 2026",
    hora: "10:00",
    lugar: "Zona central",
    descripcion:
      "Jornada solidaria de entrega de alimentos a familias necesitadas.",
    imagen:
      "https://images.unsplash.com/photo-1609139003551-ee40f5f73ec0?auto=format&fit=crop&w=1200&q=80",
    categoria: "Servicio",
    videoCompleto: {
      url: "https://drive.google.com/",
    },
  },
  {
    id: 13,
    ministerio: "Ayuda Social",
    titulo: "Entrega de alimentos",
    fecha: "5 Julio 2026",
    hora: "10:00",
    lugar: "Zona central",
    descripcion:
      "Jornada solidaria de entrega de alimentos a familias necesitadas.",
    imagen:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
    categoria: "Servicio",
    videoCompleto: {
      url: "https://drive.google.com/",
    },
  },
  {
    id: 14,
    ministerio: "Ayuda Social",
    titulo: "Entrega de alimentos",
    fecha: "5 Julio 2026",
    hora: "10:00",
    lugar: "Zona central",
    descripcion:
      "Jornada solidaria de entrega de alimentos a familias necesitadas.",
    imagen:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
    categoria: "Servicio",
    videoCompleto: {
      url: "https://drive.google.com/",
    },
  },
];

export const publicaciones = publicacionesBase.map((pub) => {
  const fotos = obtenerFotosPublicacion(pub.id, pub.imagen);

  return {
    ...pub,
    fotos,
    videoTrailer: videoPrueba
      ? {
          url: videoPrueba,
          portadaFallback: fotos[0],
        }
      : null,
  };
});