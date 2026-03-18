import "../styles/organigrama.css";

function Organigrama() {
  const secciones = [
    {
      titulo: "Pastorado",
      descripcion: "Dirección espiritual de la iglesia.",
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
      descripcion: "Ministerio de mujeres.",
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
      descripcion: "Equipo de liderazgo apostólico.",
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
      titulo: "Ministerio de Niños",
      descripcion: "Formación espiritual y enseñanza de los niños.",
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

  return (
    <section id="organigrama-page">
      <div className="organigrama-hero">
        <h1>Organigrama General</h1>
        <p>
          Conoce la estructura de liderazgo, ministerios y equipos de servicio
          de nuestra iglesia.
        </p>
      </div>

      <div className="organigrama-container">
        {secciones.map((seccion, index) => (
          <div className="organigrama-seccion" key={index}>
            <div className="organigrama-seccion-header">
              <h2>{seccion.titulo}</h2>
              <p>{seccion.descripcion}</p>
            </div>

            <div className="organigrama-grid">
              {seccion.miembros.map((miembro, i) => (
                <div className="organigrama-card" key={i}>
                  <div className="organigrama-foto">
                    <img src={miembro.foto} alt={miembro.nombre} />
                  </div>

                  <div className="organigrama-info">
                    <h3>{miembro.cargo}</h3>
                    <p>{miembro.nombre}</p>
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