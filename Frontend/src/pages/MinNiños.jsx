import { useRef, useState } from "react";
import "../styles/MinNiños.css";
import {
  FaChildren,
  FaHeart,
  FaBookBible,
  FaPuzzlePiece,
  FaMusic,
  FaPaintbrush,
  FaCalendarDays,
  FaClock,
  FaLocationDot,
  FaPhone,
  FaImage,
  FaPenToSquare,
  FaStar,
  FaShieldHeart,
} from "react-icons/fa6";

function MinNiños() {
  const [activeTab, setActiveTab] = useState("about");

  const tabsRef = useRef(null);
  const isDown = useRef(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    if (!tabsRef.current) return;
    isDown.current = true;
    isDragging.current = false;
    startX.current = e.pageX - tabsRef.current.offsetLeft;
    scrollLeft.current = tabsRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;

    setTimeout(() => {
      isDragging.current = false;
    }, 0);
  };

  const handleMouseMove = (e) => {
    if (!isDown.current || !tabsRef.current) return;

    e.preventDefault();

    const x = e.pageX - tabsRef.current.offsetLeft;
    const walk = x - startX.current;

    if (Math.abs(walk) > 6) {
      isDragging.current = true;
    }

    tabsRef.current.scrollLeft = scrollLeft.current - walk * 1.2;
  };

  const handleTabClick = (tabId) => {
    if (isDragging.current) return;
    setActiveTab(tabId);
  };

  const ministryData = {
    title: "Ministerio de Niños",
    subtitle:
      "Un espacio lleno de amor, aprendizaje y alegría donde los más pequeños pueden conocer a Jesús mientras crecen en valores y fe.",
    heroImage:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1400&q=80",
    aboutImage:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80",
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
        icon: <FaBookBible />,
        title: "Historias bíblicas",
        text: "Enseñanzas adaptadas a la edad de los niños, con dinámicas visuales y participativas.",
      },
      {
        icon: <FaPuzzlePiece />,
        title: "Juegos y dinámicas",
        text: "Actividades recreativas que fortalecen valores, compañerismo y trabajo en equipo.",
      },
      {
        icon: <FaMusic />,
        title: "Alabanza infantil",
        text: "Canciones alegres y momentos de adoración para aprender a amar a Dios desde pequeños.",
      },
      {
        icon: <FaPaintbrush />,
        title: "Manualidades creativas",
        text: "Espacios para crear, dibujar y expresar enseñanzas bíblicas de forma divertida.",
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
    editableBlocks: [
      {
        icon: <FaImage />,
        title: "Portada editable",
        text: "Aquí a futuro el admin podrá cambiar imagen principal, título, subtítulo y botones.",
      },
      {
        icon: <FaPenToSquare />,
        title: "Contenido editable",
        text: "Se podrá modificar descripción, versículo, actividades, horarios y toda la información del ministerio.",
      },
      {
        icon: <FaStar />,
        title: "Galería dinámica",
        text: "El admin podrá subir nuevas fotos, eliminar imágenes antiguas y destacar eventos importantes.",
      },
    ],
  };

  const tabs = [
    { id: "about", label: "Acerca de" },
    { id: "activities", label: "Actividades" },
    { id: "regulations", label: "Reglamentos" },
    { id: "leaders", label: "Encargados" },
    { id: "schedule", label: "Horario" },
    { id: "gallery", label: "Galería" },
    { id: "editable", label: "Editable" },
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
                  <div className="activity-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
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

      case "editable":
        return (
          <div className="tab-fade">
            <div className="tab-chip">Editable</div>
            <h2 className="tab-main-title">
              Estructura pensada para administración
            </h2>

            <div className="editable-grid">
              {ministryData.editableBlocks.map((item, index) => (
                <article className="editable-card" key={index}>
                  <div className="editable-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
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
          <div
            className="minninos-tabs-nav"
            ref={tabsRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`minninos-tab-btn ${
                  activeTab === tab.id ? "active" : ""
                }`}
                onClick={() => handleTabClick(tab.id)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="minninos-tab-panel">{renderTabContent()}</div>
        </div>
      </section>
    </main>
  );
}

export default MinNiños;