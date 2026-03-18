import { useEffect, useState } from "react";
import "../styles/heroe.css";

import hero1 from "/images/imagen1.jfif";
import hero2 from "/images/imagen2.jfif";
import hero3 from "/images/imagen3.jfif";
import hero4 from "/images/imagen4.jfif";

function Heroe() {
  const heroImages = [hero1, hero2, hero3, hero4];
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    if (heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <header className="hero-header" id="inicio">
      <div className="hero-slider-bg">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`hero-bg-image ${heroIndex === index ? "active" : ""}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="hero-overlay"></div>
      </div>

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
            Un lugar para adorar, crecer en la fe y compartir el amor de Cristo.
            Te invitamos a ser parte de nuestra comunidad y vivir una
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
  );
}

export default Heroe;