import { useEffect, useMemo, useState } from "react";
import "../styles/inicio.css";
import Ministries from "../components/Ministries";

import img1 from "/images/img1.jfif";
import img2 from "/images/img2.jfif";
import img3 from "/images/descarga.jfif";

function Inicio() {
  const aboutImages = [img1, img2, img3];

  const sliderImages = useMemo(() => {
    if (aboutImages.length === 0) return [];
    return [...aboutImages, aboutImages[0]];
  }, [aboutImages]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [noTransition, setNoTransition] = useState(false);

  useEffect(() => {
    if (isPaused || aboutImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, aboutImages.length]);

  useEffect(() => {
    if (aboutImages.length <= 1) return;

    if (currentIndex === aboutImages.length) {
      const timeout = setTimeout(() => {
        setNoTransition(true);
        setCurrentIndex(0);
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, aboutImages.length]);

  useEffect(() => {
    if (!noTransition) return;

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setNoTransition(false);
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [noTransition]);

  const goToPrev = () => {
    if (aboutImages.length <= 1) return;

    if (currentIndex === 0) {
      setNoTransition(true);
      setCurrentIndex(aboutImages.length - 1);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setNoTransition(false);
        });
      });
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const goToNext = () => {
    if (aboutImages.length <= 1) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const activeDotIndex =
    currentIndex === aboutImages.length ? 0 : currentIndex;

  return (
    <>
      {/* HERO */}
      <header className="hero-header" id="inicio">
        <div className="hero-bg-shape shape-1"></div>
        <div className="hero-bg-shape shape-2"></div>
        <div className="hero-bg-shape shape-3"></div>

        <div className="hero">
          <div className="hero-content">
            <span className="hero-tag">Bienvenidos a nuestra congregación</span>

            <h1>Bienvenidos a nuestra iglesia</h1>

            <h2 className="hero-church-name">
              Asamblea Apostólica de la Fe en Cristo Jesús
            </h2>

            <p>
              Un lugar para adorar, crecer en la fe y compartir el amor de
              Cristo. Te invitamos a ser parte de nuestra comunidad y vivir una
              experiencia espiritual transformadora.
            </p>

            <div className="btn-group">
              <a href="#contacto" className="btn btn-primary">
                Contáctanos
              </a>

              <a href="#horarios" className="btn btn-secondary">
                Ver Horarios
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* SOBRE NOSOTROS */}
      <section id="nosotros" className="light-section about-section">
        <div className="section-bg-decoration decoration-left"></div>
        <div className="section-bg-decoration decoration-right"></div>

        <div className="section-title">
          <h2>Sobre Nosotros</h2>
          <p>
            Somos una iglesia cristiana dedicada a predicar la Palabra de Dios,
            fortalecer la fe y servir a nuestra comunidad.
          </p>
        </div>

        <div className="about">
          <div
            className="about-slider"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className={`about-track ${noTransition ? "no-transition" : ""}`}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {sliderImages.map((image, index) => (
                <div className="about-slide" key={index}>
                  <img src={image} alt={`Imagen iglesia ${index + 1}`} />
                </div>
              ))}
            </div>

            {aboutImages.length > 1 && (
              <>
                <button
                  className="about-arrow about-arrow-left"
                  onClick={goToPrev}
                  aria-label="Imagen anterior"
                  type="button"
                >
                  ‹
                </button>

                <button
                  className="about-arrow about-arrow-right"
                  onClick={goToNext}
                  aria-label="Imagen siguiente"
                  type="button"
                >
                  ›
                </button>
              </>
            )}

            <div className="about-dots">
              {aboutImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`about-dot ${
                    activeDotIndex === index ? "active" : ""
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Ir a la imagen ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>

          <div className="about-text">
            <h3>Una familia de fe y esperanza</h3>

            <p>
              En la iglesia creemos en el poder de la oración, en la enseñanza
              de la Biblia y en la importancia de vivir una vida guiada por el
              amor, la gracia y la verdad de Jesucristo.
            </p>

            <p>
              Nuestro propósito es acompañar a cada persona en su crecimiento
              espiritual, brindando espacios de adoración, enseñanza, servicio y
              comunión.
            </p>

            <p>
              Aquí encontrarás una iglesia abierta para todos, con un ambiente
              cálido, espiritual y lleno de propósito.
            </p>
          </div>
        </div>
      </section>

      {/* MISIÓN Y VISIÓN */}
      <section className="mission">
        <div className="section-bg-decoration decoration-center"></div>

        <div className="section-title">
          <h2>Misión y Visión</h2>
        </div>

        <div className="mission-container">
          <div className="mission-card">
            <div className="mission-icon">✦</div>
            <h3>Misión</h3>
            <p>
              Predicar el evangelio de Jesucristo, fortalecer la fe de los
              creyentes y servir a nuestra comunidad con amor.
            </p>
          </div>

          <div className="mission-card">
            <div className="mission-icon">✦</div>
            <h3>Visión</h3>
            <p>
              Ser una iglesia que impacte vidas, forme discípulos comprometidos
              y lleve esperanza a nuestra ciudad.
            </p>
          </div>
        </div>
      </section>

      <Ministries />

      {/* HORARIOS */}
      <section className="schedule" id="horarios">
        <div className="section-bg-decoration decoration-left"></div>
        <div className="section-bg-decoration decoration-right"></div>

        <div className="section-title">
          <h2>Horarios de Reunión</h2>
          <p>
            Te esperamos en nuestras reuniones semanales para compartir juntos
            la presencia de Dios.
          </p>
        </div>

        <div className="schedule-table">
          <table>
            <thead>
              <tr>
                <th>Día</th>
                <th>Actividad</th>
                <th>Hora</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Lunes</td>
                <td>Oración</td>
                <td>19:00</td>
              </tr>
              <tr>
                <td>Sábado</td>
                <td>Reunión de Jóvenes</td>
                <td>19:30</td>
              </tr>
              <tr>
                <td>Domingo</td>
                <td>Culto General</td>
                <td>19:00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* UBICACIÓN */}
      <section className="location light-section">
        <div className="section-title">
          <h2>Ubicación</h2>
          <p>
            Visítanos y comparte con nosotros un tiempo especial en la presencia
            de Dios.
          </p>
        </div>

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d565.9212292574731!2d-66.03366457115301!3d-17.409432894819446!2m3!1f0!2f0!3f0!2m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e37b53a494b22d%3A0xca10c01eae063aa0!2sIglesia%20Asamblea%20Apostolica%20De%20La%20Fe%20En%20Cristo%20Jesus-Sacaba!5e0!3m2!1ses-419!2sbo!4v1773023623560!5m2!1ses-419!2sbo"
            loading="lazy"
            title="Ubicación Iglesia"
          ></iframe>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="contact light-section" id="contacto">
        <div className="section-bg-decoration decoration-left"></div>
        <div className="section-bg-decoration decoration-right"></div>

        <div className="section-title">
          <h2>Contáctanos</h2>
          <p>
            Estamos para ayudarte, orar contigo y darte la bienvenida a nuestra
            congregación.
          </p>
        </div>

        <div className="contact-container">
          <div className="contact-info">
            <h3>Información de la Iglesia</h3>

            <p>
              <strong>Nombre:</strong> Asamblea Apostólica de la Fe en Cristo
              Jesús
            </p>

            <p>
              <strong>Dirección:</strong> Calle Santa Cruz entre Calama
            </p>

            <p>
              <strong>Teléfono:</strong> +591 70000000
            </p>

            <p>
              <strong>Email:</strong> contacto@asamblea.com
            </p>
          </div>

          <div className="contact-form">
            <h3>Envíanos un mensaje</h3>

            <form>
              <input type="text" placeholder="Tu nombre" required />
              <input
                type="email"
                placeholder="Tu correo electrónico"
                required
              />
              <textarea
                placeholder="Escribe tu mensaje aquí..."
                required
              ></textarea>
              <button type="submit">Enviar mensaje</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Inicio;