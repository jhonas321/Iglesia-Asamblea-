import { useMemo, useRef, useState } from "react";
import "../styles/MinJovenes.css";
import {
  FaUsers,
  FaBookBible,
  FaMusic,
  FaFire,
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
  const [activityView, setActivityView] = useState("activas");

  const tabsRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    if (!tabsRef.current) return;
    isDown.current = true;
    startX.current = e.pageX - tabsRef.current.offsetLeft;
    scrollLeft.current = tabsRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current || !tabsRef.current) return;
    e.preventDefault();
    const x = e.pageX - tabsRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    tabsRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const youthActivities = [
    {
      title: "Noche de cine",
      date: "2026-03-06",
      endDate: "2026-03-06",
      time: "19:00",
      place: "Salón juvenil",
      status: "terminado",
    },
    {
      title: "Día de río",
      date: "2026-03-20",
      endDate: "2026-03-20",
      time: "08:00",
      place: "Ribera comunitaria",
      status: "por-llegar",
    },
    {
      title: "Evangelismo",
      date: "2026-03-15",
      endDate: "2026-03-15",
      time: "16:00",
      place: "Plaza principal",
      status: "por-llegar",
    },
    {
      title: "Culto unido",
      date: "2026-03-13",
      endDate: "2026-03-13",
      time: "19:30",
      place: "Templo central",
      status: "en-curso",
    },
    {
      title: "Campamento militar",
      date: "2026-03-27",
      endDate: "2026-03-29",
      time: "07:00",
      place: "Centro de retiros",
      status: "por-llegar",
    },
    {
      title: "Campamento juvenil",
      date: "2026-04-10",
      endDate: "2026-04-12",
      time: "08:30",
      place: "Casa campestre",
      status: "por-llegar",
    },
  ];

  const calendarMonth = 2;
  const calendarYear = 2026;
  const monthLabel = "Marzo 2026";

  const calendarDays = useMemo(() => {
    const firstDay = new Date(calendarYear, calendarMonth, 1);
    const lastDay = new Date(calendarYear, calendarMonth + 1, 0);

    const startWeekDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const cells = [];

    for (let i = 0; i < startWeekDay; i++) {
      cells.push({ empty: true, key: `empty-${i}` });
    }

    for (let day = 1; day <= totalDays; day++) {
      const currentDate = `${calendarYear}-${String(calendarMonth + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;

      const matchedActivities = youthActivities.filter((activity) => {
        const start = new Date(activity.date);
        const end = new Date(activity.endDate || activity.date);
        const current = new Date(currentDate);
        return current >= start && current <= end;
      });

      let statusClass = "";
      if (matchedActivities.some((a) => a.status === "en-curso")) {
        statusClass = "yt-cal-day--current";
      } else if (matchedActivities.some((a) => a.status === "por-llegar")) {
        statusClass = "yt-cal-day--upcoming";
      } else if (matchedActivities.some((a) => a.status === "terminado")) {
        statusClass = "yt-cal-day--finished";
      }

      cells.push({
        empty: false,
        day,
        date: currentDate,
        activities: matchedActivities,
        statusClass,
        key: currentDate,
      });
    }

    return cells;
  }, []);

  const currentActivities = youthActivities.filter(
    (item) => item.status === "en-curso"
  );

  const upcomingActivities = youthActivities.filter(
    (item) => item.status === "por-llegar"
  );

  const finishedActivities = youthActivities.filter(
    (item) => item.status === "terminado"
  );

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
        icon: <FaBookBible />,
        title: "Estudios bíblicos",
        text: "Aprendemos la Palabra de Dios de forma práctica, clara y cercana a la vida juvenil.",
      },
      {
        icon: <FaMusic />,
        title: "Noches de alabanza",
        text: "Momentos especiales para adorar a Dios con música, pasión y entrega.",
      },
      {
        icon: <FaFire />,
        title: "Encuentros juveniles",
        text: "Reuniones dinámicas con mensajes, juegos, integración y reflexiones.",
      },
      {
        icon: <FaUsers />,
        title: "Comunidad",
        text: "Creamos amistades sanas que ayudan a crecer, servir y mantenerse firmes en la fe.",
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

  return (
    <main className="yt-page">
      <section className="yt-hero">
        <div className="yt-glow yt-glow-1"></div>
        <div className="yt-glow yt-glow-2"></div>

        <div className="yt-container yt-hero-grid">
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
          <div
            className="yt-tabs"
            ref={tabsRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            <button
              className={`yt-tab-btn ${activeTab === "acerca" ? "active" : ""}`}
              onClick={() => setActiveTab("acerca")}
              type="button"
            >
              Acerca de
            </button>

            <button
              className={`yt-tab-btn ${
                activeTab === "actividades" ? "active" : ""
              }`}
              onClick={() => setActiveTab("actividades")}
              type="button"
            >
              Actividades
            </button>

            <button
              className={`yt-tab-btn ${
                activeTab === "reglamentos" ? "active" : ""
              }`}
              onClick={() => setActiveTab("reglamentos")}
              type="button"
            >
              Reglamentos
            </button>

            <button
              className={`yt-tab-btn ${
                activeTab === "liderazgo" ? "active" : ""
              }`}
              onClick={() => setActiveTab("liderazgo")}
              type="button"
            >
              Liderazgo
            </button>

            <button
              className={`yt-tab-btn ${activeTab === "galeria" ? "active" : ""}`}
              onClick={() => setActiveTab("galeria")}
              type="button"
            >
              Galería
            </button>

            <button
              className={`yt-tab-btn ${activeTab === "horario" ? "active" : ""}`}
              onClick={() => setActiveTab("horario")}
              type="button"
            >
              Horario
            </button>

            <button
              className={`yt-tab-btn ${activeTab === "redes" ? "active" : ""}`}
              onClick={() => setActiveTab("redes")}
              type="button"
            >
              Redes sociales
            </button>
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
                  <h2>Calendario de actividades juveniles</h2>
                  <p className="yt-activities-intro">
                    Aquí puedes ver lo que ya pasó, lo que está en curso y lo
                    que se viene próximamente dentro del ministerio.
                  </p>
                </div>

                <div className="yt-activity-subtabs">
                  <button
                    className={`yt-activity-subtab ${
                      activityView === "activas" ? "active" : ""
                    }`}
                    onClick={() => setActivityView("activas")}
                    type="button"
                  >
                    En curso y por llegar
                  </button>

                  <button
                    className={`yt-activity-subtab ${
                      activityView === "terminadas" ? "active" : ""
                    }`}
                    onClick={() => setActivityView("terminadas")}
                    type="button"
                  >
                    Terminadas
                  </button>
                </div>

                {activityView === "activas" && (
                  <>
                    <div className="yt-calendar-wrap">
                      <div className="yt-calendar-header">
                        <h3>{monthLabel}</h3>

                        <div className="yt-calendar-legend">
                          <span className="yt-legend-item">
                            <i className="yt-legend-dot yt-dot-current"></i> En
                            curso
                          </span>
                          <span className="yt-legend-item">
                            <i className="yt-legend-dot yt-dot-upcoming"></i>{" "}
                            Por llegar
                          </span>
                          <span className="yt-legend-item">
                            <i className="yt-legend-dot yt-dot-finished"></i>{" "}
                            Terminado
                          </span>
                        </div>
                      </div>

                      <div className="yt-calendar-weekdays">
                        <span>Dom</span>
                        <span>Lun</span>
                        <span>Mar</span>
                        <span>Mié</span>
                        <span>Jue</span>
                        <span>Vie</span>
                        <span>Sáb</span>
                      </div>

                      <div className="yt-calendar-grid">
                        {calendarDays.map((cell) =>
                          cell.empty ? (
                            <div
                              className="yt-calendar-day yt-calendar-day--empty"
                              key={cell.key}
                            ></div>
                          ) : (
                            <div
                              className={`yt-calendar-day ${cell.statusClass}`}
                              key={cell.key}
                            >
                              <div className="yt-calendar-day-number">
                                {cell.day}
                              </div>

                              <div className="yt-calendar-events-mini">
                                {cell.activities.length > 0 ? (
                                  cell.activities.map((activity, index) => (
                                    <div
                                      key={`${activity.title}-${index}`}
                                      className={`yt-calendar-event-card yt-mini-${activity.status}`}
                                    >
                                      <strong className="yt-calendar-event-title">
                                        {activity.title}
                                      </strong>
                                      <span className="yt-calendar-event-time">
                                        {activity.time}
                                      </span>
                                      <small className="yt-calendar-event-place">
                                        {activity.place}
                                      </small>
                                    </div>
                                  ))
                                ) : (
                                  <span className="yt-calendar-no-event">
                                    Sin actividad
                                  </span>
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="yt-live-lists">
                      <div className="yt-live-box">
                        <div className="yt-live-box-title">
                          <h3>Actividades en curso</h3>
                          <span>{currentActivities.length}</span>
                        </div>

                        <div className="yt-live-list">
                          {currentActivities.length > 0 ? (
                            currentActivities.map((activity, index) => (
                              <article
                                className="yt-live-item yt-live-item-current"
                                key={index}
                              >
                                <div>
                                  <h4>{activity.title}</h4>
                                  <p>
                                    {activity.date} · {activity.time}
                                  </p>
                                  <small>{activity.place}</small>
                                </div>
                                <span className="yt-status-badge yt-status-current">
                                  En curso
                                </span>
                              </article>
                            ))
                          ) : (
                            <p className="yt-empty-text">
                              No hay actividades en curso.
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="yt-live-box">
                        <div className="yt-live-box-title">
                          <h3>Próximas actividades</h3>
                          <span>{upcomingActivities.length}</span>
                        </div>

                        <div className="yt-live-list">
                          {upcomingActivities.length > 0 ? (
                            upcomingActivities.map((activity, index) => (
                              <article
                                className="yt-live-item yt-live-item-upcoming"
                                key={index}
                              >
                                <div>
                                  <h4>{activity.title}</h4>
                                  <p>
                                    {activity.date}
                                    {activity.endDate !== activity.date
                                      ? ` al ${activity.endDate}`
                                      : ""}{" "}
                                    · {activity.time}
                                  </p>
                                  <small>{activity.place}</small>
                                </div>
                                <span className="yt-status-badge yt-status-upcoming">
                                  Por llegar
                                </span>
                              </article>
                            ))
                          ) : (
                            <p className="yt-empty-text">
                              No hay actividades próximas.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activityView === "terminadas" && (
                  <div className="yt-finished-wrapper">
                    <div className="yt-finished-header">
                      <h3>Actividades terminadas</h3>
                      <p>
                        Historial de actividades ya realizadas por el
                        ministerio.
                      </p>
                    </div>

                    <div className="yt-finished-list">
                      {finishedActivities.map((activity, index) => (
                        <article className="yt-finished-item" key={index}>
                          <div>
                            <h4>{activity.title}</h4>
                            <p>
                              {activity.date}
                              {activity.endDate !== activity.date
                                ? ` al ${activity.endDate}`
                                : ""}{" "}
                              · {activity.time}
                            </p>
                            <small>{activity.place}</small>
                          </div>

                          <span className="yt-status-badge yt-status-finished">
                            Terminado
                          </span>
                        </article>
                      ))}
                    </div>
                  </div>
                )}
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
    </main>
  );
}

export default MinJovenes;