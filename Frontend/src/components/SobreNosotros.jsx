import { useState } from "react";
import "../styles/sobre-nosotros.css";

import img1 from "/images/117397.jpg";
import img2 from "/images/img1.jfif";
import img3 from "/images/img2.jfif";
import img4 from "/images/descarga.jfif";

function SobreNosotros() {

  const images = [img1, img2, img3, img4];

  const [activeImage, setActiveImage] = useState(0);

  return (
    <section id="nosotros" className="light-section about-section">

      <div className="section-title">
        <h2>Sobre Nosotros</h2>
        <p>
          Somos una iglesia cristiana dedicada a predicar la Palabra de Dios,
          fortalecer la fe y servir a nuestra comunidad.
        </p>
      </div>

      <div className="about">

        <div className="about-gallery">

          <div className="about-main-image">
            <img src={images[activeImage]} alt="Iglesia" />
          </div>

          <div className="about-thumbnails">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="preview"
                className={activeImage === index ? "active" : ""}
                onClick={() => setActiveImage(index)}
              />
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