import { Send, Eye } from "lucide-react";
import "../styles/mision-vision.css";

function MisionVision() {
  return (
    <section id="mision-vision" className="mission">
      <div className="section-bg-decoration decoration-center"></div>

      <div className="section-title">
        <h2>Misión y Visión</h2>
      </div>

      <div className="mission-container">
        <div className="mission-card">
          <div className="mission-icon">
            <Send size={34} strokeWidth={2.4} />
          </div>

          <h3>Misión</h3>

          <p>
            Predicar el evangelio de Jesucristo, fortalecer la fe de los
            creyentes y servir a nuestra comunidad con amor.
          </p>
        </div>

        <div className="mission-card">
          <div className="mission-icon">
            <Eye size={36} strokeWidth={2.4} />
          </div>

          <h3>Visión</h3>

          <p>
            Ser una iglesia que impacte vidas, forme discípulos comprometidos y
            lleve esperanza a nuestra ciudad.
          </p>
        </div>
      </div>
    </section>
  );
}

export default MisionVision;