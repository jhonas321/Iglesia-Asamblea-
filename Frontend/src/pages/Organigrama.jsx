import "../styles/organigrama.css";

function Organigrama() {
  const secciones = [
    {
      titulo: "Pastorado",
      descripcion: "Dirección espiritual y guía principal de la iglesia.",
      tipo: "principal",
      miembros: [
        {
          cargo: "Pastor General",
          nombre: "Pastor Mario",
          foto: "https://randomuser.me/api/portraits/men/32.jpg",
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
          foto: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
          cargo: "Vicepresidenta",
          nombre: "Francisca Choque",
          foto: "https://randomuser.me/api/portraits/women/52.jpg",
        },
        {
          cargo: "Tesorera",
          nombre: "Rebeca Rodríguez",
          foto: "https://randomuser.me/api/portraits/women/63.jpg",
        },
        {
          cargo: "Sub Tesorera",
          nombre: "Natividad Alejandro",
          foto: "https://randomuser.me/api/portraits/women/28.jpg",
        },
        {
          cargo: "Secretaria",
          nombre: "Flora Sotori",
          foto: "https://randomuser.me/api/portraits/women/68.jpg",
        },
        {
          cargo: "Sub Secretaria",
          nombre: "Victoria Bustamante",
          foto: "https://randomuser.me/api/portraits/women/39.jpg",
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
          foto: "https://randomuser.me/api/portraits/men/45.jpg",
        },
        {
          cargo: "Vicepresidente",
          nombre: "Felix Romero",
          foto: "https://randomuser.me/api/portraits/men/51.jpg",
        },
        {
          cargo: "Tesorero",
          nombre: "Fabián Saliz",
          foto: "https://randomuser.me/api/portraits/men/66.jpg",
        },
        {
          cargo: "Secretario",
          nombre: "Ariel Sánchez",
          foto: "https://randomuser.me/api/portraits/men/29.jpg",
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
          foto: "https://randomuser.me/api/portraits/men/36.jpg",
        },
        {
          cargo: "Vocalista",
          nombre: "Ana Quispe",
          foto: "https://randomuser.me/api/portraits/women/35.jpg",
        },
        {
          cargo: "Guitarrista",
          nombre: "Carlos Rojas",
          foto: "https://randomuser.me/api/portraits/men/41.jpg",
        },
        {
          cargo: "Baterista",
          nombre: "Luis Fernández",
          foto: "https://randomuser.me/api/portraits/men/22.jpg",
        },
        {
          cargo: "Tecladista",
          nombre: "María López",
          foto: "https://randomuser.me/api/portraits/women/49.jpg",
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
          foto: "https://randomuser.me/api/portraits/women/22.jpg",
        },
        {
          cargo: "Maestra Encargada",
          nombre: "Adriana Torrez",
          foto: "https://randomuser.me/api/portraits/women/31.jpg",
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
          foto: "https://randomuser.me/api/portraits/women/14.jpg",
        },
        {
          cargo: "Líder de Pandero",
          nombre: "Carla",
          foto: "https://randomuser.me/api/portraits/women/57.jpg",
        },
        {
          cargo: "Integrante de Pandero",
          nombre: "Rocío",
          foto: "https://randomuser.me/api/portraits/women/33.jpg",
        },
        {
          cargo: "Integrante de Pandero",
          nombre: "Nicol",
          foto: "https://randomuser.me/api/portraits/women/47.jpg",
        },
        {
          cargo: "Integrante de Pandero",
          nombre: "Mayte",
          foto: "https://randomuser.me/api/portraits/women/18.jpg",
        },
        {
          cargo: "Integrante de Pandero",
          nombre: "Damaris",
          foto: "https://randomuser.me/api/portraits/women/60.jpg",
        },
        {
          cargo: "Integrante de Pandero",
          nombre: "Areli",
          foto: "https://randomuser.me/api/portraits/women/25.jpg",
        },
      ],
    },
  ];

  const pastorado = secciones.find((seccion) => seccion.tipo === "principal");
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

      {pastorado && (
        <div className="organigrama-principal">
          <div className="organigrama-linea-superior"></div>

          <div className="organigrama-principal-card">
            <div className="organigrama-principal-foto">
              <img
                src={pastorado.miembros[0].foto}
                alt={pastorado.miembros[0].nombre}
              />
            </div>

            <div className="organigrama-principal-info">
              <span>{pastorado.titulo}</span>
              <h2>{pastorado.miembros[0].cargo}</h2>
              <p>{pastorado.miembros[0].nombre}</p>
              <small>{pastorado.descripcion}</small>
            </div>
          </div>

          <div className="organigrama-linea-bajada"></div>
        </div>
      )}

      <div className="organigrama-ministerios">
        {ministerios.map((seccion, index) => (
          <div className="organigrama-seccion" key={index}>
            <div className="organigrama-seccion-header">
              <div className="organigrama-numero">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div>
                <h2>{seccion.titulo}</h2>
                <p>{seccion.descripcion}</p>
              </div>
            </div>

            <div className="organigrama-grid">
              {seccion.miembros.map((miembro, i) => (
                <div className="organigrama-card" key={i}>
                  <div className="organigrama-foto">
                    <img src={miembro.foto} alt={miembro.nombre} />
                  </div>

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