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
} from "react-icons/fa6";

function MinNiños() {
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

            <div className="minninos-hero-buttons">
              <a href="#actividades" className="btn-primary-kids">
                Ver actividades
              </a>
              <a href="#galeria" className="btn-secondary-kids">
                Explorar galería
              </a>
            </div>
          </div>

          <div className="minninos-hero-image">
            <img src={ministryData.heroImage} alt={ministryData.title} />
          </div>
        </div>
      </section>

      <section className="minninos-highlights">
        <div className="minninos-container minninos-highlights-grid">
          <article className="highlight-card">
            <div className="highlight-icon">
              <FaHeart />
            </div>
            <h3>Ambiente seguro</h3>
            <p>Un lugar lleno de amor, cuidado y atención para cada niño.</p>
          </article>

          <article className="highlight-card">
            <div className="highlight-icon">
              <FaBookBible />
            </div>
            <h3>Aprendizaje bíblico</h3>
            <p>Lecciones dinámicas para formar valores y fortalecer la fe.</p>
          </article>

          <article className="highlight-card">
            <div className="highlight-icon">
              <FaPuzzlePiece />
            </div>
            <h3>Diversión con propósito</h3>
            <p>Juegos, cantos y actividades para aprender disfrutando.</p>
          </article>
        </div>
      </section>

      <section className="minninos-about">
        <div className="minninos-container minninos-about-grid">
          <div className="minninos-about-image">
            <img src={ministryData.aboutImage} alt="Niños en el ministerio" />
          </div>

          <div className="minninos-about-content">
            <span className="section-chip">Sobre este ministerio</span>
            <h2>Creciendo con alegría, fe y amor</h2>
            <p>{ministryData.description}</p>

            <div className="verse-box">
              <FaHeart className="verse-icon" />
              <p>{ministryData.verse}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="minninos-activities" id="actividades">
        <div className="minninos-container">
          <div className="section-heading-center">
            <span className="section-chip">Actividades</span>
            <h2>¿Qué hacemos en el Ministerio de Niños?</h2>
            {/* <p>
              Estas tarjetas pueden convertirse a futuro en contenido dinámico
              desde el panel de administración.
            </p> */}
          </div>

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
      </section>

      <section className="minninos-schedule">
        <div className="minninos-container">
          <div className="section-heading-center">
            <span className="section-chip">Horarios</span>
            <h2>Días y encuentros</h2>
          </div>

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
      </section>

      <section className="minninos-gallery" id="galeria">
        <div className="minninos-container">
          <div className="section-heading-center">
            <span className="section-chip">Galería</span>
            <h2>Momentos especiales</h2>
            <p>
              Esta sección a futuro puede cargar imágenes desde la base de datos
              o desde el panel admin.
            </p>
          </div>

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
      </section>

      <section className="minninos-editable-preview">
        <div className="minninos-container">
          <div className="section-heading-center">
            <span className="section-chip">Base editable a futuro</span>
            <h2>Estructura pensada para administración</h2>
          </div>

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
      </section>

      <section className="minninos-contact">
        <div className="minninos-container minninos-contact-box">
          <div>
            <span className="section-chip">Contacto</span>
            <h2>¿Deseas que tu niño forme parte?</h2>
            <p>
              Estamos listos para recibir a cada pequeño con mucho amor, cuidado
              y enseñanza.
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
      </section>
    </main>
  );
}

export default MinNiños;
