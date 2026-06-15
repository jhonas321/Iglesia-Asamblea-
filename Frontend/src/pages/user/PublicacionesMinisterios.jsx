import "../../styles/publicaciones.css";

import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaChurch,
  FaSearch,
  FaTimes,
  FaDownload,
  FaPlay,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Paginacion from "../../components/ui/Paginacion";
import CalendarioPersonalizado from "../../components/CalendarioPersonalizado";

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
    imagen:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    fotos: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
      "/images/vertical.jpeg",
      "/images/prueba.jpeg",
      "/images/panorama.jpg",
      "/images/grande.webp",
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
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

const limpiarTexto = (texto) => {
  return texto
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
  const fechaLimpia = limpiarTexto(fechaTexto.trim());

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

const convertirFechaInput = (valor) => {
  if (!valor) return null;

  const [anio, mes, dia] = valor.split("-").map(Number);

  return crearFechaLocal(anio, mes - 1, dia);
};

const fechaCoincideConRangoBusqueda = (
  fechaInicioInput,
  fechaFinInput,
  fechaPublicacion
) => {
  const fechaInicioFiltro = convertirFechaInput(fechaInicioInput);
  const fechaFinFiltro = convertirFechaInput(fechaFinInput);
  const { inicio, fin } = obtenerRangoFecha(fechaPublicacion);

  if (!inicio || !fin) return false;

  if (!fechaInicioFiltro && !fechaFinFiltro) return true;

  if (fechaInicioFiltro && !fechaFinFiltro) {
    return fin >= fechaInicioFiltro;
  }

  if (!fechaInicioFiltro && fechaFinFiltro) {
    return inicio <= fechaFinFiltro;
  }

  return inicio <= fechaFinFiltro && fin >= fechaInicioFiltro;
};

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

const PUBLICACIONES_POR_PAGINA = 8;
const FOTOS_POR_PAGINA = 8;

function PublicacionesMinisterios() {
  const navigate = useNavigate();
  const { id } = useParams();

  const publicacionSeleccionada = useMemo(() => {
    if (!id) return null;

    return publicaciones.find((pub) => pub.id === Number(id)) || null;
  }, [id]);

  const [busqueda, setBusqueda] = useState("");
  const [filtroTexto, setFiltroTexto] = useState("");
  const [fechaInicioBusqueda, setFechaInicioBusqueda] = useState("");
  const [fechaFinBusqueda, setFechaFinBusqueda] = useState("");

  const [filtroFechaInicio, setFiltroFechaInicio] = useState("");
  const [filtroFechaFin, setFiltroFechaFin] = useState("");

  const [tipoBusqueda, setTipoBusqueda] = useState(null);
  const [calendarioAbierto, setCalendarioAbierto] = useState("");
  const [fotoActual, setFotoActual] = useState(0);
  const [fotoModal, setFotoModal] = useState(null);
  const [videoModal, setVideoModal] = useState(null);
  const [datosVideos, setDatosVideos] = useState({});
  const [paginaActual, setPaginaActual] = useState(1);
  const [paginaFotosActual, setPaginaFotosActual] = useState(1);

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
    const cerrarConEscape = (e) => {
      if (e.key === "Escape") {
        setFotoModal(null);
        setVideoModal(null);
      }
    };

    window.addEventListener("keydown", cerrarConEscape);

    return () => {
      window.removeEventListener("keydown", cerrarConEscape);
    };
  }, []);

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

  const publicacionesOrdenadas = useMemo(() => {
    return [...publicaciones].sort(
      (a, b) => obtenerFechaOrden(b.fecha) - obtenerFechaOrden(a.fecha)
    );
  }, []);

  const publicacionesFiltradas = useMemo(() => {
    const textoBusqueda = limpiarTexto(filtroTexto.trim());

    return publicacionesOrdenadas.filter((pub) => {
      if (tipoBusqueda === "fecha") {
        return fechaCoincideConRangoBusqueda(
          filtroFechaInicio,
          filtroFechaFin,
          pub.fecha
        );
      }

      if (tipoBusqueda === "texto") {
        const textoCompleto = limpiarTexto(`
          ${pub.titulo}
          ${pub.ministerio}
          ${pub.lugar}
        `);

        return textoBusqueda === "" || textoCompleto.includes(textoBusqueda);
      }

      return true;
    });
  }, [
    filtroTexto,
    filtroFechaInicio,
    filtroFechaFin,
    tipoBusqueda,
    publicacionesOrdenadas,
  ]);

  useEffect(() => {
    setPaginaActual(1);
  }, [filtroTexto, filtroFechaInicio, filtroFechaFin, tipoBusqueda]);

  useEffect(() => {
    const totalPaginas = Math.ceil(
      publicacionesFiltradas.length / PUBLICACIONES_POR_PAGINA
    );

    if (totalPaginas > 0 && paginaActual > totalPaginas) {
      setPaginaActual(totalPaginas);
    }
  }, [publicacionesFiltradas.length, paginaActual]);

  const publicacionesPaginadas = useMemo(() => {
    const indiceInicial = (paginaActual - 1) * PUBLICACIONES_POR_PAGINA;
    const indiceFinal = indiceInicial + PUBLICACIONES_POR_PAGINA;

    return publicacionesFiltradas.slice(indiceInicial, indiceFinal);
  }, [publicacionesFiltradas, paginaActual]);

  useEffect(() => {
    setPaginaFotosActual(1);
  }, [publicacionSeleccionada?.id]);

  useEffect(() => {
    if (!publicacionSeleccionada) return;

    const totalPaginasFotos = Math.ceil(
      publicacionSeleccionada.fotos.length / FOTOS_POR_PAGINA
    );

    if (totalPaginasFotos > 0 && paginaFotosActual > totalPaginasFotos) {
      setPaginaFotosActual(totalPaginasFotos);
    }
  }, [publicacionSeleccionada, paginaFotosActual]);

  const fotosPaginadas = useMemo(() => {
    if (!publicacionSeleccionada) return [];

    const indiceInicial = (paginaFotosActual - 1) * FOTOS_POR_PAGINA;
    const indiceFinal = indiceInicial + FOTOS_POR_PAGINA;

    return publicacionSeleccionada.fotos.slice(indiceInicial, indiceFinal);
  }, [publicacionSeleccionada, paginaFotosActual]);

  const cambiarPaginaFotos = (nuevaPagina) => {
    setPaginaFotosActual(nuevaPagina);
  };

  const cambiarPaginaPublicaciones = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    setCalendarioAbierto("");
  };

  const alternarBusquedaTexto = () => {
    setTipoBusqueda((actual) => {
      if (actual === "texto") {
        setBusqueda("");
        setFiltroTexto("");
        return null;
      }

      setFechaInicioBusqueda("");
      setFechaFinBusqueda("");
      setFiltroFechaInicio("");
      setFiltroFechaFin("");
      setCalendarioAbierto("");

      return "texto";
    });
  };

  const alternarBusquedaFecha = () => {
    setTipoBusqueda((actual) => {
      if (actual === "fecha") {
        setFechaInicioBusqueda("");
        setFechaFinBusqueda("");
        setFiltroFechaInicio("");
        setFiltroFechaFin("");
        setCalendarioAbierto("");

        return null;
      }

      setBusqueda("");
      setFiltroTexto("");
      setCalendarioAbierto("");

      return "fecha";
    });
  };

  const aplicarBusquedaTexto = () => {
    setFiltroTexto(busqueda);
  };

  const limpiarBusquedaTexto = () => {
    setBusqueda("");
    setFiltroTexto("");
  };

  const aplicarFiltroFechas = () => {
    setFiltroFechaInicio(fechaInicioBusqueda);
    setFiltroFechaFin(fechaFinBusqueda);
    setCalendarioAbierto("");
  };

  const limpiarFechaInicioBusqueda = (e) => {
    e.stopPropagation();

    setFechaInicioBusqueda("");

    if (!fechaFinBusqueda) {
      setFiltroFechaInicio("");
      setFiltroFechaFin("");
    }

    if (calendarioAbierto === "inicio") {
      setCalendarioAbierto("");
    }
  };

  const limpiarFechaFinBusqueda = (e) => {
    e.stopPropagation();

    setFechaFinBusqueda("");

    if (!fechaInicioBusqueda) {
      setFiltroFechaInicio("");
      setFiltroFechaFin("");
    }

    if (calendarioAbierto === "fin") {
      setCalendarioAbierto("");
    }
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
                <span>
                  <FaChurch /> Ministerio de{" "}
                  {publicacionSeleccionada.ministerio}
                </span>
              </div>

              <h2>{publicacionSeleccionada.titulo}</h2>

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

              <p className="detalle-descripcion-unica">
                {publicacionSeleccionada.descripcion}
              </p>

              {videoVisual && (
                <div className="detalle-videos">
                  <div className="detalle-videos-title">
                    <h2>Video trailer</h2>
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
                          <h3>Ver trailer</h3>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

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

              <div className="detalle-galeria">
                <div className="detalle-galeria-title">
                  <h2>Más fotos de esta publicación</h2>
                  <p>Haz click en una foto para verla en grande.</p>
                </div>

                <div className="detalle-fotos-grid">
                  {fotosPaginadas.map((foto, index) => {
                    const numeroFotoGlobal =
                      (paginaFotosActual - 1) * FOTOS_POR_PAGINA + index + 1;

                    return (
                      <button
                        type="button"
                        className="detalle-foto"
                        key={`${foto}-${numeroFotoGlobal}`}
                        onClick={() => setFotoModal(foto)}
                      >
                        <img
                          src={foto}
                          alt={`${publicacionSeleccionada.titulo} ${numeroFotoGlobal}`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
              <Paginacion
                paginaActual={paginaFotosActual}
                totalElementos={publicacionSeleccionada.fotos.length}
                elementosPorPagina={FOTOS_POR_PAGINA}
                onCambiarPagina={cambiarPaginaFotos}
              />
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
                autoPlay
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
          <h1>Galería de publicaciones</h1>
          <p>
            Explora fotografías, recuerdos y momentos importantes de las
            actividades realizadas por los ministerios de la iglesia.
          </p>
        </div>
      </section>

      <section className="galeria-section">
        <div className="galeria-title"></div>

        <div className="busqueda-publicaciones">
          <div className="selector-busqueda">
            <button
              type="button"
              className={tipoBusqueda === "texto" ? "activo" : ""}
              onClick={alternarBusquedaTexto}
            >
              <FaSearch />
              Buscar publicaciones
            </button>

            <button
              type="button"
              className={tipoBusqueda === "fecha" ? "activo" : ""}
              onClick={alternarBusquedaFecha}
            >
              <FaCalendarAlt />
              Buscar por fecha
            </button>
          </div>

          {tipoBusqueda === "texto" && (
            <div className="busqueda-panel-desplegable">
              <div className="busqueda-texto-formato-evento">
                <div className="busqueda-card-header">
                  <span>BUSCAR PUBLICACIONES</span>
                </div>

                <div className="busqueda-campo-texto">
                  <label>Título, ministerio o lugar</label>

                  <div className="busqueda-input-wrapper">
                    <input
                      type="text"
                      placeholder="Ej: Jóvenes, Evangelismo, noche de adoración..."
                      value={busqueda}
                      onChange={(e) => {
                        setBusqueda(e.target.value);
                        setFiltroTexto(e.target.value);
                      }}
                    />

                    {busqueda && (
                      <button
                        type="button"
                        className="field-clear-btn texto-clear-btn"
                        onClick={limpiarBusquedaTexto}
                        aria-label="Limpiar búsqueda"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>

                <div className="acciones-busqueda">
                  <button
                    type="button"
                    className="btn-aplicar-busqueda"
                    onClick={aplicarBusquedaTexto}
                  >
                    Buscar publicaciones
                  </button>
                </div>
              </div>
            </div>
          )}

          {tipoBusqueda === "fecha" && (
            <div className="busqueda-panel-desplegable">
              <div className="busqueda-fecha-formato-evento">
                <div className="busqueda-card-header">
                  <span>BUSCAR POR FECHA</span>
                </div>

                <div className="busqueda-rango-fechas">
                  <div
                    className={`fecha-parametro-wrapper ${
                      calendarioAbierto === "inicio"
                        ? "calendario-padre-activo"
                        : ""
                    }`}
                  >
                    <div className="fecha-titulo">
                      <span>Fecha inicial</span>
                    </div>

                    <div
                      className={`date-picker-wrapper publicaciones-date-wrapper ${
                        calendarioAbierto === "inicio"
                          ? "calendario-wrapper-activo"
                          : ""
                      }`}
                    >
                      <CalendarioPersonalizado
                        valor={fechaInicioBusqueda}
                        onChange={setFechaInicioBusqueda}
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

                      {fechaInicioBusqueda && (
                        <button
                          type="button"
                          className="field-clear-btn date-clear-btn"
                          onClick={limpiarFechaInicioBusqueda}
                          aria-label="Borrar fecha inicial"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>

                  <div
                    className={`fecha-parametro-wrapper ${
                      calendarioAbierto === "fin"
                        ? "calendario-padre-activo"
                        : ""
                    }`}
                  >
                    <div className="fecha-titulo">
                      <span>Fecha final</span>
                    </div>

                    <div
                      className={`date-picker-wrapper publicaciones-date-wrapper ${
                        calendarioAbierto === "fin"
                          ? "calendario-wrapper-activo"
                          : ""
                      }`}
                    >
                      <CalendarioPersonalizado
                        valor={fechaFinBusqueda}
                        onChange={setFechaFinBusqueda}
                        ejemplo="Ej: 30/05/2026"
                        label="Seleccionar fecha final"
                        abierto={calendarioAbierto === "fin"}
                        onAbrir={() =>
                          setCalendarioAbierto(
                            calendarioAbierto === "fin" ? "" : "fin"
                          )
                        }
                        onCerrar={() => setCalendarioAbierto("")}
                      />

                      {fechaFinBusqueda && (
                        <button
                          type="button"
                          className="field-clear-btn date-clear-btn"
                          onClick={limpiarFechaFinBusqueda}
                          aria-label="Borrar fecha final"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="acciones-busqueda">
                  <button
                    type="button"
                    className="btn-aplicar-busqueda"
                    onClick={aplicarFiltroFechas}
                  >
                    Buscar por fecha
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <Paginacion
          paginaActual={paginaActual}
          totalElementos={publicacionesFiltradas.length}
          elementosPorPagina={PUBLICACIONES_POR_PAGINA}
          onCambiarPagina={cambiarPaginaPublicaciones}
        />
        <br></br>

        <div className="galeria-grid">
          {publicacionesPaginadas.map((pub, index) => (
            <article
              className={`galeria-item item-${index + 1}`}
              key={pub.id}
              onClick={() => seleccionarPublicacion(pub)}
            >
              <img src={pub.imagen} alt={pub.titulo} />

              <div className="galeria-overlay">
                <div className="galeria-info-simple">
                  <h3>{pub.titulo}</h3>

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

        <Paginacion
          paginaActual={paginaActual}
          totalElementos={publicacionesFiltradas.length}
          elementosPorPagina={PUBLICACIONES_POR_PAGINA}
          onCambiarPagina={cambiarPaginaPublicaciones}
          scrollAlCambiar={true}
        />

        {publicacionesFiltradas.length === 0 && (
          <div className="sin-publicaciones">
            <h3>No se encontraron publicaciones</h3>
            <p>Prueba con otro título, ministerio, lugar o fecha.</p>
            <button
              type="button"
              onClick={() => {
                setBusqueda("");
                setFiltroTexto("");
                setFechaInicioBusqueda("");
                setFechaFinBusqueda("");
                setFiltroFechaInicio("");
                setFiltroFechaFin("");
                setTipoBusqueda(null);
                setCalendarioAbierto("");
              }}
            >
              Mostrar todas
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default PublicacionesMinisterios;
