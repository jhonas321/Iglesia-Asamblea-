import { useEffect, useState } from "react";
import "../styles/MinAlabanza.css";
import {
  FaMusic,
  FaClock,
  FaLocationDot,
  FaCalendarDays,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaPlay,
  FaChevronLeft,
  FaChevronRight,
  FaShieldHeart,
} from "react-icons/fa6";

function MinAlabanza() {
  const [activeTab, setActiveTab] = useState("acerca");
  const [heroIndex, setHeroIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
    setMenuOpen(false);
  };

  const ministryData = {
    badge: "Adoración con propósito",
    title: "Ministerio de Alabanza",
    subtitle:
      "Adoramos a Dios con excelencia, pasión y reverencia a través de la música, guiando a la iglesia a una atmósfera de entrega y comunión.",
    heroImages: [
      "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2000&auto=format&fit=crop",
    ],
    stats: [
      { number: "25+", label: "Integrantes activos" },
      { number: "4", label: "Áreas de servicio" },
      { number: "10+", label: "Eventos especiales" },
    ],
    tabs: {
      acerca: {
        label: "Acerca de",
        title: "Un ministerio musical que sirve con excelencia",
        description:
          "El Ministerio de Alabanza está conformado por músicos, cantantes y servidores comprometidos con glorificar a Dios a través del talento, la disciplina y la sensibilidad espiritual. Más que interpretar canciones, buscamos preparar corazones para la presencia de Dios.",
        highlight:
          "“Cantad alegres a Dios, habitantes de toda la tierra.” — Salmos 100:1",
        points: [
          "Ambiente de servicio y crecimiento espiritual",
          "Ensayos enfocados en excelencia y unidad",
          "Espacios para desarrollar dones musicales",
          "Participación en cultos, vigilias y eventos especiales",
        ],
      },
      actividades: {
        label: "Actividades",
        title: "Nuestras actividades y participación",
        items: [
          {
            title: "Ensayo general",
            day: "Viernes",
            time: "19:00 - 21:00",
            place: "Templo principal",
          },
          {
            title: "Culto dominical",
            day: "Domingo",
            time: "08:30 - 12:00",
            place: "Auditorio central",
          },
          {
            title: "Noche de adoración",
            day: "Último sábado del mes",
            time: "19:30",
            place: "Salón principal",
          },
          {
            title: "Capacitación musical",
            day: "Segundo jueves del mes",
            time: "20:00",
            place: "Sala de ensayo",
          },
        ],
      },
      reglamentos: {
        label: "Reglamentos",
        title: "Normas para servir con orden, unidad y reverencia",
        items: [
          {
            icon: <FaShieldHeart />,
            title: "Puntualidad y compromiso",
            text: "Cada integrante debe asistir puntualmente a ensayos, cultos y actividades programadas, mostrando responsabilidad en su servicio.",
          },
          {
            icon: <FaShieldHeart />,
            title: "Respeto y unidad",
            text: "Se debe mantener una actitud de respeto hacia líderes, compañeros y congregación, fomentando la armonía dentro del equipo.",
          },
          {
            icon: <FaShieldHeart />,
            title: "Preparación espiritual y musical",
            text: "Los miembros deben cultivar su vida espiritual y prepararse musicalmente para ministrar con excelencia.",
          },
          {
            icon: <FaShieldHeart />,
            title: "Cuidado de instrumentos y espacios",
            text: "Todo integrante debe cuidar los instrumentos, equipos de sonido, micrófonos y áreas de ensayo o ministración.",
          },
        ],
      },
      galeria: {
        label: "Galería",
        images: [
          "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop",
        ],
      },
      horario: {
        label: "Horario",
        schedule: [
          {
            icon: <FaCalendarDays />,
            title: "Ensayos semanales",
            text: "Todos los viernes a las 19:00",
          },
          {
            icon: <FaClock />,
            title: "Tiempo de oración",
            text: "Domingos 30 minutos antes del culto",
          },
          {
            icon: <FaLocationDot />,
            title: "Lugar de reunión",
            text: "Sala de ensayo / Auditorio principal",
          },
        ],
      },
      equipo: {
        label: "Equipo",
        members: [
          {
            name: "Daniel Rocha",
            role: "Director musical",
            image:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80",
          },
          {
            name: "Esther Molina",
            role: "Vocalista principal",
            image:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80",
          },
          {
            name: "Samuel Vargas",
            role: "Instrumentista",
            image:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80",
          },
          {
            name: "Carla Méndez",
            role: "Percusión y ritmo",
            image:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80",
          },
        ],
      },
    },
    social: [
      { icon: <FaInstagram />, name: "Instagram", link: "#" },
      { icon: <FaFacebookF />, name: "Facebook", link: "#" },
      { icon: <FaYoutube />, name: "YouTube", link: "#" },
    ],
  };

  const tabKeys = Object.keys(ministryData.tabs);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % ministryData.heroImages.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [ministryData.heroImages.length]);

  const nextHero = () => {
    setHeroIndex((prev) => (prev + 1) % ministryData.heroImages.length);
  };

  const prevHero = () => {
    setHeroIndex((prev) =>
      prev === 0 ? ministryData.heroImages.length - 1 : prev - 1
    );
  };

  const renderTabContent = () => {
    const current = ministryData.tabs[activeTab];

    if (activeTab === "acerca") {
      return (
        <div className="maalabanza-content-grid">
          <div className="maalabanza-info-card">
            <span className="maalabanza-section-badge">{current.label}</span>
            <h2>{current.title}</h2>
            <p>{current.description}</p>

            <div className="maalabanza-verse-box">
              <FaMusic className="maalabanza-verse-icon" />
              <p>{current.highlight}</p>
            </div>
          </div>

          <div className="maalabanza-side-card">
            <h3>Lo que encontrarás aquí</h3>
            <ul>
              {current.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    if (activeTab === "actividades") {
      return (
        <div className="maalabanza-activities-grid">
          {current.items.map((item, index) => (
            <div className="maalabanza-activity-card" key={index}>
              <div className="maalabanza-activity-icon">
                <FaPlay />
              </div>
              <h3>{item.title}</h3>
              <p>
                <strong>Día:</strong> {item.day}
              </p>
              <p>
                <strong>Hora:</strong> {item.time}
              </p>
              <p>
                <strong>Lugar:</strong> {item.place}
              </p>
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === "reglamentos") {
      return (
        <div className="maalabanza-regulations-wrap">
          <div className="maalabanza-regulations-header">
            <span className="maalabanza-section-badge">{current.label}</span>
            <h2>{current.title}</h2>
          </div>

          <div className="maalabanza-regulations-grid">
            {current.items.map((item, index) => (
              <div className="maalabanza-regulation-card" key={index}>
                <div className="maalabanza-regulation-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === "galeria") {
      return (
        <div className="maalabanza-gallery-grid">
          {current.images.map((image, index) => (
            <div className="maalabanza-gallery-card" key={index}>
              <img src={image} alt={`Galería ${index + 1}`} />
              <div className="maalabanza-gallery-overlay">
                <span>Momento de adoración</span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === "horario") {
      return (
        <div className="maalabanza-schedule-grid">
          {current.schedule.map((item, index) => (
            <div className="maalabanza-schedule-card" key={index}>
              <div className="maalabanza-schedule-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === "equipo") {
      return (
        <div className="maalabanza-team-grid">
          {current.members.map((member, index) => (
            <div className="maalabanza-team-card" key={index}>
              <div className="maalabanza-team-image">
                <img src={member.image} alt={member.name} />
              </div>

              <div className="maalabanza-team-body">
                <h3>{member.name}</h3>
                <span className="maalabanza-team-role">{member.role}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <section className="maalabanza-page">
      <div className="maalabanza-bg-orb maalabanza-orb-1"></div>
      <div className="maalabanza-bg-orb maalabanza-orb-2"></div>
      <div className="maalabanza-bg-orb maalabanza-orb-3"></div>

      <div className="maalabanza-music-note maalabanza-note-1">♪</div>
      <div className="maalabanza-music-note maalabanza-note-2">♫</div>
      <div className="maalabanza-music-note maalabanza-note-3">♬</div>

      <div className="maalabanza-container">
        <div className="maalabanza-hero">
          <div className="maalabanza-hero-left">
            <span className="maalabanza-badge">
              <FaMusic />
              {ministryData.badge}
            </span>

            <h1>{ministryData.title}</h1>
            <p>{ministryData.subtitle}</p>

            <div className="maalabanza-stats">
              {ministryData.stats.map((stat, index) => (
                <div className="maalabanza-stat-box" key={index}>
                  <h3>{stat.number}</h3>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="maalabanza-socials">
              {ministryData.social.map((item, index) => (
                <a key={index} href={item.link} aria-label={item.name}>
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="maalabanza-hero-right">
            <div className="maalabanza-hero-image-frame">
              {ministryData.heroImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Ministerio de alabanza ${index + 1}`}
                  className={`maalabanza-hero-slide ${
                    index === heroIndex ? "active" : ""
                  }`}
                />
              ))}

              <button
                type="button"
                className="maalabanza-hero-nav maalabanza-hero-nav-left"
                onClick={prevHero}
              >
                <FaChevronLeft />
              </button>

              <button
                type="button"
                className="maalabanza-hero-nav maalabanza-hero-nav-right"
                onClick={nextHero}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>

        <div className="maalabanza-menu-wrapper">
          <button
            type="button"
            className={`maalabanza-menu-btn ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label="Abrir menú"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <span className="maalabanza-current-tab">
            {ministryData.tabs[activeTab].label}
          </span>

          {menuOpen && (
            <div className="maalabanza-dropdown">
              {tabKeys.map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`maalabanza-dropdown-item ${
                    activeTab === key ? "active" : ""
                  }`}
                  onClick={() => handleTabClick(key)}
                >
                  {ministryData.tabs[key].label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="maalabanza-content">{renderTabContent()}</div>
      </div>
    </section>
  );
}

export default MinAlabanza;
