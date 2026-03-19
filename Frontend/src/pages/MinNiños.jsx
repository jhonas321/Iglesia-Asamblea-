import { useState } from "react";
import "../styles/MinNiños.css";
import {
  FaChildren,
  FaHeart,
  FaCalendarDays,
  FaClock,
  FaLocationDot,
  FaPhone,
  FaShieldHeart,
} from "react-icons/fa6";

function MinNiños() {
  const [activeTab, setActiveTab] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMenuOpen(false);
  };

  const ministryData = {
    title: "Ministerio de Niños",
    subtitle:
      "Un espacio lleno de amor, aprendizaje y alegría donde los más pequeños pueden conocer a Jesús mientras crecen en valores y fe.",
    heroImage:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1400&q=80",
    verse: "Dejad a los niños venir a mí, y no se lo impidáis. - Marcos 10:14",
    description:
      "Nuestro Ministerio de Niños está diseñado para acompañar a cada pequeño en su desarrollo espiritual, emocional y social, mediante enseñanzas bíblicas dinámicas, juegos, música, actividades creativas y momentos especiales de oración.",
    contactPhone: "+591 70000000",
    location: "Asamblea de Dios - Área Infantil",

    schedules: [
      {
        day: "Domingo",
        hour: "09:00 - 11:00",
        activity: "Escuela bíblica infantil",
      },
      {
        day: "Sábado",
        hour: "15:00 - 17:00",
        activity: "Taller creativo y dinámicas",
      },
      {
        day: "Viernes",
        hour: "18:30 - 19:30",
        activity: "Ensayo especial y cantos",
      },
    ],

    activities: [
      {
        image:
          "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80",
        title: "Historias bíblicas",
        description:
          "Enseñanzas adaptadas a la edad de los niños, con dinámicas visuales y aprendizaje divertido.",
        date: "Lunes 02 de marzo",
        hour: "09:00 - 10:00",
        place: "Sala infantil 1",
        status: "en-curso",
      },
      {
        image:
          "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?auto=format&fit=crop&w=900&q=80",
        title: "Juegos y dinámicas",
        description:
          "Actividades recreativas que fortalecen valores y compañerismo.",
        date: "Domingo 21 de abril",
        hour: "10:15 - 11:00",
        place: "Patio infantil",
        status: "por-llegar",
      },
      {
        image:
          "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=900&q=80",
        title: "Alabanza infantil",
        description:
          "Canciones alegres y momentos de adoración para aprender a amar a Dios.",
        date: "Domingo 21 de abril",
        hour: "11:15 - 12:00",
        place: "Salón principal infantil",
        status: "terminado",
      },
      {
        image:
          "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80",
        title: "Manualidades creativas",
        description:
          "Espacios para crear, dibujar y expresar enseñanzas bíblicas.",
        date: "Domingo 21 de abril",
        hour: "15:00 - 16:00",
        place: "Aula creativa",
        status: "por-llegar",
      },
    ],

    regulations: [
      {
        icon: <FaShieldHeart />,
        title: "Respeto y buen trato",
        text: "Todos los niños deben tratar con respeto a sus compañeros, maestros y encargados dentro de cada actividad.",
      },
      {
        icon: <FaShieldHeart />,
        title: "Cuidado del espacio",
        text: "Se debe mantener el orden y cuidar los materiales, juguetes, útiles y áreas asignadas al ministerio.",
      },
      {
        icon: <FaShieldHeart />,
        title: "Participación con obediencia",
        text: "Los niños deben seguir las instrucciones de los maestros para realizar cada dinámica de forma segura y organizada.",
      },
      {
        icon: <FaShieldHeart />,
        title: "Ingreso y salida responsable",
        text: "El ingreso y la salida de los niños debe realizarse con acompañamiento y autorización de sus padres o responsables.",
      },
    ],

    leaders: [
      {
        name: "Ana Martínez",
        role: "Líder de Niños",
        image:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80",
      },
      {
        name: "Luis Fernández",
        role: "Maestro Bíblico",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80",
      },
      {
        name: "Carla Gómez",
        role: "Apoyo Infantil",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80",
      },
      {
        name: "Pedro Rojas",
        role: "Coordinador",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
      },
    ],

    gallery: [
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?auto=format&fit=crop&w=1000&q=80",
    ],
  };

  const tabs = [
    { id: "about", label: "Acerca de" },
    { id: "activities", label: "Actividades" },
    { id: "regulations", label: "Reglamentos" },
    { id: "leaders", label: "Encargados" },
    { id: "schedule", label: "Horario" },
    { id: "gallery", label: "Galería" },
    { id: "contact", label: "Contacto" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <div className="tab-fade">
            <div className="tab-chip">Acerca de</div>
            <h2 className="tab-main-title">
              Un ministerio lleno de amor, alegría y aprendizaje
            </h2>

            <div className="about-tab-grid">
              <div className="about-main-card">
                <p>{ministryData.description}</p>

                <div className="verse-box">
                  <FaHeart className="verse-icon" />
                  <p>{ministryData.verse}</p>
                </div>
              </div>

              <div className="about-side-card">
                <h3>Lo que encontrarás aquí</h3>
                <ul>
                  <li>Ambiente seguro y lleno de amor</li>
                  <li>Enseñanza bíblica adaptada a niños</li>
                  <li>Juegos, cantos y dinámicas</li>
                  <li>Espacios creativos y participativos</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case "activities":
        return (
          <div className="tab-fade">
            <div className="tab-chip">Actividades</div>
            <h2 className="tab-main-title">
              ¿Qué hacemos en el Ministerio de Niños?
            </h2>

            <div className="activities-grid">
              {ministryData.activities.map((item, index) => (
                <article className="activity-card" key={index}>
                  <div className="activity-image">
                    <img src={item.image} alt={item.title} />

                    <span
                      className={`activity-status activity-status-${item.status}`}
                    >
                      {item.status === "en-curso" && "En curso"}
                      {item.status === "por-llegar" && "Por llegar"}
                      {item.status === "terminado" && "Terminado"}
                    </span>
                  </div>

                  <div className="activity-body">
                    <h3>{item.title}</h3>
                    <p className="activity-description">{item.description}</p>

                    <div className="activity-meta">
                      <p>
                        <FaCalendarDays /> {item.date}
                      </p>
                      <p>
                        <FaClock /> {item.hour}
                      </p>
                      <p>
                        <FaLocationDot /> {item.place}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        );

      case "regulations":
        return (
          <div className="tab-fade">
            <div className="tab-chip">Reglamentos</div>
            <h2 className="tab-main-title">
              Normas para un espacio seguro y ordenado
            </h2>

            <div className="regulations-grid">
              {ministryData.regulations.map((item, index) => (
                <article className="regulation-card" key={index}>
                  <div className="regulation-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        );

      case "leaders":
        return (
          <div className="tab-fade">
            <div className="tab-chip">Encargados</div>
            <h2 className="tab-main-title">Equipo que guía a nuestros niños</h2>

            <div className="leaders-grid">
              {ministryData.leaders.map((leader, index) => (
                <article className="leader-card" key={index}>
                  <div className="leader-image">
                    <img src={leader.image} alt={leader.name} />
                  </div>

                  <div className="leader-info">
                    <h3>{leader.name}</h3>
                    <p>{leader.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        );

      case "schedule":
        return (
          <div className="tab-fade">
            <div className="tab-chip">Horario</div>
            <h2 className="tab-main-title">Días y encuentros</h2>

            <div className="schedule-grid">
              {ministryData.schedules.map((item, index) => (
                <article className="schedule-card" key={index}>
                  <div className="schedule-top">
                    <FaCalendarDays />
                    <h3>{item.day}</h3>
                  </div>

                  <div className="schedule-info">
                    <p>
                      <FaClock /> {item.hour}
                    </p>
                    <p>{item.activity}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        );

      case "gallery":
        return (
          <div className="tab-fade">
            <div className="tab-chip">Galería</div>
            <h2 className="tab-main-title">Momentos especiales</h2>

            <div className="gallery-grid">
              {ministryData.gallery.map((image, index) => (
                <div
                  className={`gallery-item gallery-item-${index + 1}`}
                  key={index}
                >
                  <img src={image} alt={`Galería ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="tab-fade">
            <div className="tab-chip">Contacto</div>
            <h2 className="tab-main-title">¿Deseas que tu niño forme parte?</h2>

            <div className="contact-tab-card">
              <div className="contact-text">
                <p>
                  Estamos listos para recibir a cada pequeño con mucho amor,
                  cuidado y enseñanza.
                </p>
              </div>

              <div className="contact-details">
                <p>
                  <FaLocationDot /> {ministryData.location}
                </p>
                <p>
                  <FaPhone /> {ministryData.contactPhone}
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="minninos-page">
      <section className="minninos-hero">
        <div className="minninos-hero-overlay"></div>

        <div className="minninos-floating shape-1"></div>
        <div className="minninos-floating shape-2"></div>
        <div className="minninos-floating shape-3"></div>

        <div className="minninos-container minninos-hero-content">
          <div className="minninos-hero-text">
            <span className="minninos-badge">
              <FaChildren /> Espacio especial para los más pequeños
            </span>

            <h1>{ministryData.title}</h1>
            <p>{ministryData.subtitle}</p>
          </div>

          <div className="minninos-hero-image">
            <img src={ministryData.heroImage} alt={ministryData.title} />
          </div>
        </div>
      </section>

      <section className="minninos-tabs-section">
        <div className="minninos-container">
          <div className="minninos-tabs-desktop">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`minninos-tab-btn ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="minninos-menu-mobile">
            <div className="minninos-menu-wrapper">
              <button
                className={`minninos-menu-btn ${menuOpen ? "open" : ""}`}
                onClick={toggleMenu}
                type="button"
                aria-label="Abrir menú"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

              <span className="minninos-current-tab">
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </span>

              {menuOpen && (
                <div className="minninos-dropdown">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`minninos-dropdown-item ${
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

          <div className="minninos-tab-panel">{renderTabContent()}</div>
        </div>
      </section>
    </main>
  );
}

export default MinNiños;