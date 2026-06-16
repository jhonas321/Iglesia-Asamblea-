import { FaRegUser, FaRegUserCircle } from "react-icons/fa";
import "../../styles/organigrama.css";

const secciones = [
  {
    titulo: "Pastorado",
    descripcion: "Dirección espiritual y guía principal de la iglesia.",
    tipo: "principal",
    miembros: [
      {
        cargo: "Pastor General",
        nombre: "Pastor Mario Rodriguez Flores",
        genero: "hombre",
      },
    ],
  },

  {
    titulo: "Dorcas",
    descripcion: "Ministerio de mujeres al servicio de la iglesia.",
    miembros: [
      {
        cargo: "Presidenta",
        nombre: "Olga Quispe",
        genero: "mujer",
      },
      {
        cargo: "Vicepresidenta",
        nombre: "Francisca Choque",
        genero: "mujer",
      },
      {
        cargo: "Tesorera",
        nombre: "Rebeca Rodríguez",
        genero: "mujer",
      },
      {
        cargo: "Subtesorera",
        nombre: "Natividad Alejandro",
        genero: "mujer",
      },
      {
        cargo: "Secretaria",
        nombre: "Flora Sotori",
        genero: "mujer",
      },
      {
        cargo: "Subsecretaria",
        nombre: "Victoria Bustamante",
        genero: "mujer",
      },
    ],
  },

  {
    titulo: "Apostólicos",
    descripcion: "Equipo de liderazgo y apoyo espiritual apostólico.",
    miembros: [
      {
        cargo: "Presidente",
        nombre: "Orlando Soliz",
        genero: "hombre",
      },
      {
        cargo: "Vicepresidente",
        nombre: "Felix Romero",
        genero: "hombre",
      },
      {
        cargo: "Tesorero",
        nombre: "Fabián Saliz",
        genero: "hombre",
      },
      {
        cargo: "Secretario",
        nombre: "Ariel Sánchez",
        genero: "hombre",
      },
    ],
  },

  {
    titulo: "Ministerio de Alabanza",
    descripcion:
      "Equipo encargado de dirigir la adoración, la música y el ambiente espiritual durante los cultos.",
    miembros: [
      {
        cargo: "Líder de Alabanza",
        nombre: "David Mamani",
        genero: "hombre",
      },
      {
        cargo: "Vocalista",
        nombre: "Ana Quispe",
        genero: "mujer",
      },
      {
        cargo: "Guitarrista",
        nombre: "Carlos Rojas",
        genero: "hombre",
      },
      {
        cargo: "Baterista",
        nombre: "Luis Fernández",
        genero: "hombre",
      },
      {
        cargo: "Tecladista",
        nombre: "María López",
        genero: "mujer",
      },
    ],
  },

  {
    titulo: "Ministerio de Niños",
    descripcion:
      "Formación espiritual, enseñanza bíblica y cuidado de los niños.",
    miembros: [
      {
        cargo: "Maestra Encargada",
        nombre: "Marlene Sotori",
        genero: "mujer",
      },
      {
        cargo: "Maestra Encargada",
        nombre: "Adriana Torrez",
        genero: "mujer",
      },
    ],
  },

  {
    titulo: "Pandero",
    descripcion: "Equipo de danza y adoración con panderos.",
    miembros: [
      {
        cargo: "Integrante de Pandero",
        nombre: "Adriana",
        genero: "mujer",
      },
      {
        cargo: "Líder de Pandero",
        nombre: "Carla",
        genero: "mujer",
      },
      {
        cargo: "Integrante de Pandero",
        nombre: "Rocío",
        genero: "mujer",
      },
      {
        cargo: "Integrante de Pandero",
        nombre: "Nicol",
        genero: "mujer",
      },
      {
        cargo: "Integrante de Pandero",
        nombre: "Mayte",
        genero: "mujer",
      },
      {
        cargo: "Integrante de Pandero",
        nombre: "Damaris",
        genero: "mujer",
      },
      {
        cargo: "Integrante de Pandero",
        nombre: "Areli",
        genero: "mujer",
      },
    ],
  },
];

function Avatar({ genero = "hombre", nombre = "", principal = false }) {
  const esMujer = genero === "mujer";
  const IconoAvatar = principal ? FaRegUserCircle : FaRegUser;

  return (
    <div
      className={`organigrama-avatar ${
        esMujer ? "organigrama-avatar-mujer" : "organigrama-avatar-hombre"
      } ${principal ? "organigrama-avatar-principal" : ""}`}
      role="img"
      aria-label={`Avatar de ${nombre}`}
    >
      <IconoAvatar className="organigrama-avatar-icono" aria-hidden="true" />
    </div>
  );
}

function Organigrama() {
  const pastorado = secciones.find((seccion) => seccion.tipo === "principal");
  const pastorPrincipal = pastorado?.miembros?.[0];

  const ministerios = secciones.filter(
    (seccion) => seccion.tipo !== "principal"
  );

  return (
    <section id="organigrama-page">
      <div className="organigrama-decoracion decoracion-uno"></div>
      <div className="organigrama-decoracion decoracion-dos"></div>

      <div className="organigrama-hero">
        <span className="organigrama-etiqueta">Estructura de liderazgo</span>

        <h1>Organigrama General</h1>

        <p>
          Conoce la organización de nuestra iglesia, sus áreas de servicio,
          ministerios y líderes encargados de apoyar la obra espiritual.
        </p>
      </div>

      {pastorado && pastorPrincipal && (
        <div className="organigrama-principal">
          <div className="organigrama-linea-superior"></div>

          <div className="organigrama-principal-card">
            <Avatar
              genero={pastorPrincipal.genero}
              nombre={pastorPrincipal.nombre}
              principal
            />

            <div className="organigrama-principal-info">
              <span>{pastorado.titulo}</span>
              <h2>{pastorPrincipal.cargo}</h2>
              <p>{pastorPrincipal.nombre}</p>
              <small>{pastorado.descripcion}</small>
            </div>
          </div>

          <div className="organigrama-linea-bajada"></div>
        </div>
      )}

      <div className="organigrama-ministerios">
        {ministerios.map((seccion, index) => (
          <div className="organigrama-seccion" key={seccion.titulo}>
            <div className="organigrama-seccion-header">
              <div className="organigrama-numero">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div>
                <h2>{seccion.titulo}</h2>
                <p>{seccion.descripcion}</p>

                <small className="organigrama-total">
                  {seccion.miembros.length} miembros
                </small>
              </div>
            </div>

            <div className="organigrama-grid">
              {seccion.miembros.map((miembro) => (
                <div
                  className="organigrama-card"
                  key={`${miembro.nombre}-${miembro.cargo}`}
                >
                  <Avatar genero={miembro.genero} nombre={miembro.nombre} />

                  <div className="organigrama-info">
                    <h3>{miembro.nombre}</h3>
                    <p>{miembro.cargo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Organigrama;