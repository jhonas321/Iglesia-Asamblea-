import { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MinJovenes.css";
import {
  FaUsers,
  FaCalendarDays,
  FaClock,
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaYoutube,
  FaLocationDot,
  FaHeart,
  FaShieldHeart,
} from "react-icons/fa6";

function MinJovenes() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [activeTab, setActiveTab] = useState("acerca");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMenuOpen(false);
  };

  const ministryData = {
    title: "Ministerio de Jóvenes",
    subtitle:
      "Un espacio para crecer en fe, amistad y propósito, viviendo a Cristo con alegría y autenticidad.",
    heroImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",

    about: {
      text: "El Ministerio de Jóvenes está pensado para acompañar a cada joven en su crecimiento espiritual, emocional y social. Aquí compartimos tiempos de adoración, enseñanzas bíblicas, actividades dinámicas y momentos de compañerismo donde cada persona puede sentirse parte de una familia.",
      verse:
        "Ninguno tenga en poco tu juventud, sino sé ejemplo de los creyentes. - 1 Timoteo 4:12",
      points: [
        "Ambiente sano y seguro",
        "Enseñanza bíblica para la vida diaria",
        "Espacios de amistad y apoyo",
        "Formación de liderazgo y servicio",
      ],
    },

    activities: [
      {
        image:
          "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
        title: "Noche de cine",
        description:
          "Una noche especial de convivencia, reflexión y amistad para compartir en comunidad.",
        date: "Viernes 06 de marzo",
        hour: "19:00",
        place: "Salón juvenil",
        mapEmbed:
          "https://www.google.com/maps?q=Iglesia+Asamblea+Apostolica+de+la+Fe+en+Cristo+Jesus+Sacaba&z=16&output=embed",
        status: "terminado",
      },
      {
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
        title: "Evangelismo",
        description:
          "Salida especial para compartir el mensaje de esperanza con otros jóvenes y familias.",
        date: "Domingo 15 de marzo",
        hour: "16:00",
        place: "Plaza principal",
        mapEmbed:
          "https://www.google.com/maps?q=Iglesia+Asamblea+Apostolica+de+la+Fe+en+Cristo+Jesus+Sacaba&z=16&output=embed",
        status: "por-llegar",
      },
      {
        image:
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
        title: "Culto unido",
        description:
          "Encuentro de adoración, mensaje y comunión junto a toda la congregación juvenil.",
        date: "Viernes 13 de marzo",
        hour: "19:30",
        place: "Templo central",
        mapEmbed:
          "https://www.google.com/maps?q=Iglesia+Asamblea+Apostolica+de+la+Fe+en+Cristo+Jesus+Sacaba&z=16&output=embed",
        status: "en-curso",
      },
      {
        image:
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
        title: "Campamento juvenil",
        description:
          "Tiempo especial de retiro, enseñanza, dinámicas y fortalecimiento espiritual.",
        date: "10 al 12 de abril",
        hour: "08:30",
        place: "Casa campestre",
        mapEmbed:
          "https://www.google.com/maps?q=Iglesia+Asamblea+Apostolica+de+la+Fe+en+Cristo+Jesus+Sacaba&z=16&output=embed",
        status: "por-llegar",
      },
      {
        image:
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
        title: "Día de río",
        description:
          "Actividad recreativa para fortalecer la amistad, la unidad y el compañerismo juvenil.",
        date: "Sábado 20 de marzo",
        hour: "08:00",
        place: "Ribera comunitaria",
        mapEmbed:
          "https://www.google.com/maps?q=Iglesia+Asamblea+Apostolica+de+la+Fe+en+Cristo+Jesus+Sacaba&z=16&output=embed",
        status: "por-llegar",
      },
      {
        image:
          "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80",
        title: "Campamento militar",
        description:
          "Jornada intensa de formación, disciplina, servicio y crecimiento espiritual.",
        date: "27 al 29 de marzo",
        hour: "07:00",
        place: "Centro de retiros",
        mapEmbed:
          "https://www.google.com/maps?q=Iglesia+Asamblea+Apostolica+de+la+Fe+en+Cristo+Jesus+Sacaba&z=16&output=embed",
        status: "por-llegar",
      },
    ],

    regulations: [
      {
        icon: <FaShieldHeart />,
        title: "Respeto y compañerismo",
        text: "Cada joven debe mantener una actitud de respeto, empatía y buen trato con los demás participantes y líderes.",
      },
      {
        icon: <FaShieldHeart />,
        title: "Participación con orden",
        text: "En reuniones, actividades y dinámicas se debe seguir la orientación de los líderes para mantener un ambiente organizado.",
      },
      {
        icon: <FaShieldHeart />,
        title: "Testimonio cristiano",
        text: "Se espera una conducta acorde a los valores cristianos dentro y fuera de las actividades del ministerio.",
      },
      {
        icon: <FaShieldHeart />,
        title: "Cuidado de instalaciones",
        text: "Todos deben cuidar los espacios, equipos, materiales y recursos utilizados en cada encuentro juvenil.",
      },
    ],

    leaders: [
      {
        name: "Samuel Rocha",
        role: "Líder Juvenil",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80",
      },
      {
        name: "Daniela Vargas",
        role: "Coordinadora",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80",
      },
      {
        name: "Marcos Pérez",
        role: "Discipulador",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80",
      },
      {
        name: "Esther Molina",
        role: "Apoyo Juvenil",
        image:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80",
      },
    ],

    galleryAlbums: [
      {
        id: 1,
        title: "Campamento Juvenil",
        cover:
          "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=80",
        description:
          "Momentos especiales de convivencia, enseñanza y diversión.",
        photos: [
          "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1000&q=80",
        ],
      },
      {
        id: 2,
        title: "Noche de Cine",
        cover:
          "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80",
        description: "Una noche de amistad, reflexión y alegría.",
        photos: [
          "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1000&q=80",
        ],
      },
      {
        id: 3,
        title: "Evangelismo",
        cover:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
        description: "Salidas para compartir el mensaje de esperanza.",
        photos: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80",
        ],
      },
    ],

    schedules: [
      {
        day: "Viernes",
        hour: "19:30 - 21:00",
        activity: "Reunión juvenil principal",
      },
      {
        day: "Sábado",
        hour: "17:00 - 18:30",
        activity: "Dinámicas / ensayo / liderazgo",
      },
      {
        day: "Domingo",
        hour: "16:30 - 18:00",
        activity: "Discipulado juvenil",
      },
    ],

    social: {
      text: "Síguenos en nuestras redes para enterarte de reuniones, actividades especiales, anuncios y contenido juvenil.",
      instagram: "@asamblea.jovenes",
      facebook: "Ministerio de Jóvenes Asamblea",
      tiktok: "@jovenesasamblea",
      youtube: "Jóvenes Asamblea TV",
      location: "Asamblea de Dios - Área Juvenil",
    },
  };

  const tabs = [
    { id: "acerca", label: "Acerca de" },
    { id: "actividades", label: "Actividades" },
    { id: "reglamentos", label: "Reglamentos" },
    { id: "liderazgo", label: "Liderazgo" },
    { id: "galeria", label: "Galería" },
    { id: "horario", label: "Horario" },
    { id: "redes", label: "Redes sociales" },
  ];

  return (
    <main className="yt-page yt-page-enter">
      <section className="yt-hero">
        <div className="yt-glow yt-glow-1"></div>
        <div className="yt-glow yt-glow-2"></div>

        <div className="yt-container yt-hero-grid">
          <button
            type="button"
            className="yt-back-btn"
            onClick={() => navigate(-1)}
          >
            ← Atrás
          </button>

          <div className="yt-hero-text">
            <span className="yt-badge">
              <FaUsers /> Generación con propósito
            </span>

            <h1>{ministryData.title}</h1>
            <p>{ministryData.subtitle}</p>
          </div>

          <div className="yt-hero-image">
            <img src={ministryData.heroImage} alt={ministryData.title} />
          </div>
        </div>
      </section>

      <section className="yt-tabs-section">
        <div className="yt-container">
          <div className="yt-tabs-desktop">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`yt-tab-btn ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="yt-menu-mobile">
            <div className="yt-menu-wrapper">
              <button
                className={`yt-menu-btn ${menuOpen ? "open" : ""}`}
                onClick={toggleMenu}
                type="button"
                aria-label="Abrir menú"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

              <span className="yt-current-tab">
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </span>

              {menuOpen && (
                <div className="yt-dropdown">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`yt-dropdown-item ${
                        activeTab === tab.id ? "active" : ""
                      }`}
                      onClick={() => handleTabClick(tab.id)}
                      type="button"
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="yt-tab-content">
            {activeTab === "acerca" && (
              <div className="yt-panel">
                <div className="yt-panel-header">
                  <span className="yt-chip">Acerca de</span>
                  <h2>Un ministerio juvenil moderno y con propósito</h2>
                </div>

                <div className="yt-about-grid">
                  <div className="yt-about-card">
                    <p>{ministryData.about.text}</p>

                    <div className="yt-verse-box">
                      <FaHeart className="yt-verse-icon" />
                      <p>{ministryData.about.verse}</p>
                    </div>
                  </div>

                  <div className="yt-about-list-card">
                    <h3>Lo que encontrarás aquí</h3>
                    <ul>
                      {ministryData.about.points.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "actividades" && (
              <div className="yt-panel">
                <div className="yt-panel-header">
                  <span className="yt-chip">Actividades</span>
                  <h2>Actividades del ministerio juvenil</h2>
                  <p className="yt-activities-intro">
                    Conoce las actividades, encuentros y eventos especiales del
                    ministerio juvenil.
                  </p>
                </div>

                <div className="yt-activity-cards-grid">
                  {ministryData.activities.map((item, index) => (
                    <article
                      className="yt-activity-event-card"
                      key={index}
                      onClick={() => setSelectedActivity(item)}
                    >
                      <div className="yt-activity-event-image">
                        <img src={item.image} alt={item.title} />

                        <span
                          className={`yt-activity-status yt-activity-status-${item.status}`}
                        >
                          {item.status === "en-curso" && "En curso"}
                          {item.status === "por-llegar" && "Por llegar"}
                          {item.status === "terminado" && "Terminado"}
                        </span>
                      </div>

                      <div className="yt-activity-event-body">
                        <h3>{item.title}</h3>

                        <div className="yt-activity-event-meta">
                          <p>
                            <FaCalendarDays /> {item.date}
                          </p>
                        </div>

                        <button
                          type="button"
                          className="yt-activity-details-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedActivity(item);
                          }}
                        >
                          Ver detalles
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reglamentos" && (
              <div className="yt-panel">
                <div className="yt-panel-header">
                  <span className="yt-chip">Reglamentos</span>
                  <h2>Normas para una convivencia sana y edificante</h2>
                  <p className="yt-activities-intro">
                    Estos lineamientos ayudan a mantener un ambiente de respeto,
                    orden y crecimiento dentro del ministerio juvenil.
                  </p>
                </div>

                <div className="yt-regulations-grid">
                  {ministryData.regulations.map((item, index) => (
                    <article className="yt-regulation-card" key={index}>
                      <div className="yt-regulation-icon">{item.icon}</div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "liderazgo" && (
              <div className="yt-panel">
                <div className="yt-panel-header">
                  <span className="yt-chip">Liderazgo</span>
                  <h2>Equipo que guía a la juventud</h2>
                  <p className="yt-activities-intro">
                    Conoce a los líderes y encargados que acompañan, orientan y
                    sirven dentro del ministerio juvenil.
                  </p>
                </div>

                <div className="yt-leaders-grid">
                  {ministryData.leaders.map((leader, index) => (
                    <article className="yt-leader-card" key={index}>
                      <div className="yt-leader-image">
                        <img src={leader.image} alt={leader.name} />
                      </div>

                      <div className="yt-leader-info">
                        <h3>{leader.name}</h3>
                        <p>{leader.role}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "galeria" && (
              <div className="yt-panel">
                <div className="yt-panel-header">
                  <span className="yt-chip">Galería</span>
                  <h2>Álbumes del ministerio</h2>
                  <p>
                    Explora los momentos especiales del ministerio organizados
                    por álbumes.
                  </p>
                </div>

                {!selectedAlbum ? (
                  <div className="yt-albums-grid">
                    {ministryData.galleryAlbums.map((album) => (
                      <article
                        key={album.id}
                        className="yt-album-card"
                        onClick={() => setSelectedAlbum(album)}
                      >
                        <div className="yt-album-image">
                          <img src={album.cover} alt={album.title} />
                        </div>

                        <div className="yt-album-content">
                          <h3>{album.title}</h3>
                          <p>{album.description}</p>
                          <span>{album.photos.length} fotos</span>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="yt-selected-album">
                    <div className="yt-selected-album-top">
                      <div>
                        <h3>{selectedAlbum.title}</h3>
                        <p>{selectedAlbum.description}</p>
                      </div>

                      <button
                        className="yt-back-albums-btn"
                        onClick={() => setSelectedAlbum(null)}
                        type="button"
                      >
                        Volver a álbumes
                      </button>
                    </div>

                    <div className="yt-gallery-grid">
                      {selectedAlbum.photos.map((image, index) => (
                        <div className="yt-gallery-item" key={index}>
                          <img
                            src={image}
                            alt={`${selectedAlbum.title} ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "horario" && (
              <div className="yt-panel">
                <div className="yt-panel-header">
                  <span className="yt-chip">Horario</span>
                  <h2>Reuniones y encuentros</h2>
                </div>

                <div className="yt-schedule-grid">
                  {ministryData.schedules.map((item, index) => (
                    <article className="yt-schedule-card" key={index}>
                      <div className="yt-schedule-top">
                        <FaCalendarDays />
                        <h3>{item.day}</h3>
                      </div>

                      <div className="yt-schedule-info">
                        <p>
                          <FaClock /> {item.hour}
                        </p>
                        <p>{item.activity}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "redes" && (
              <div className="yt-panel">
                <div className="yt-panel-header">
                  <span className="yt-chip">Redes sociales</span>
                  <h2>Conéctate con nosotros</h2>
                </div>

                <div className="yt-social-wrapper">
                  <div className="yt-social-text-card">
                    <p>{ministryData.social.text}</p>

                    <div className="yt-social-location">
                      <FaLocationDot />
                      <span>{ministryData.social.location}</span>
                    </div>
                  </div>

                  <div className="yt-social-grid">
                    <a href="#" className="yt-social-card">
                      <div className="yt-social-icon">
                        <FaInstagram />
                      </div>
                      <h3>Instagram</h3>
                      <p>{ministryData.social.instagram}</p>
                    </a>

                    <a href="#" className="yt-social-card">
                      <div className="yt-social-icon">
                        <FaFacebookF />
                      </div>
                      <h3>Facebook</h3>
                      <p>{ministryData.social.facebook}</p>
                    </a>

                    <a href="#" className="yt-social-card">
                      <div className="yt-social-icon">
                        <FaTiktok />
                      </div>
                      <h3>TikTok</h3>
                      <p>{ministryData.social.tiktok}</p>
                    </a>

                    <a href="#" className="yt-social-card">
                      <div className="yt-social-icon">
                        <FaYoutube />
                      </div>
                      <h3>YouTube</h3>
                      <p>{ministryData.social.youtube}</p>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedActivity && (
        <div
          className="yt-activity-modal-overlay"
          onClick={() => setSelectedActivity(null)}
        >
          <div
            className="yt-activity-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="yt-activity-modal-close"
              onClick={() => setSelectedActivity(null)}
            >
              ×
            </button>

            <div className="yt-activity-modal-image">
              <img src={selectedActivity.image} alt={selectedActivity.title} />
            </div>

            <div className="yt-activity-modal-body">
              <span
                className={`yt-activity-status yt-activity-status-${selectedActivity.status}`}
              >
                {selectedActivity.status === "en-curso" && "En curso"}
                {selectedActivity.status === "por-llegar" && "Por llegar"}
                {selectedActivity.status === "terminado" && "Terminado"}
              </span>

              <h3>{selectedActivity.title}</h3>

              <p className="yt-activity-modal-description">
                {selectedActivity.description}
              </p>

              <div className="yt-activity-modal-meta">
                <p>
                  <FaCalendarDays /> {selectedActivity.date}
                </p>
                <p>
                  <FaClock /> {selectedActivity.hour}
                </p>
                <p>
                  <FaLocationDot /> {selectedActivity.place}
                </p>
              </div>

              <div className="yt-activity-map-wrapper">
                <iframe
                  src={selectedActivity.mapEmbed}
                  title={`Mapa de ${selectedActivity.title}`}
                  className="yt-activity-map-iframe"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default MinJovenes;