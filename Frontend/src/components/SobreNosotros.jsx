import { useEffect, useMemo, useState } from "react";
import "../styles/sobre-nosotros.css";

import img1 from "/images/img1.jfif";
import img2 from "/images/img2.jfif";
import img3 from "/images/descarga.jfif";

function SobreNosotros() {
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
                className={`about-dot ${activeDotIndex === index ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Ir a la imagen ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

        <div className="about-text">
          <h3>Una familia de fe y esperanza</h3>

          <p>
            En la iglesia creemos en el poder de la oración, en la enseñanza de
            la Biblia y en la importancia de vivir una vida guiada por el amor,
            la gracia y la verdad de Jesucristo.
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
  );
}

export default SobreNosotros;