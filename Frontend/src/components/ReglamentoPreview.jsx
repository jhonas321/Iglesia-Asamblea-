import { useNavigate } from "react-router-dom";
import "../styles/reglamento-preview.css";

function ReglamentoPreview() {
  const navigate = useNavigate();

  return (
    <div id="reglamento" className="reglamento-section">
      <div className="reglamento-box">
        <div className="reglamento-text">
          <span className="reglamento-badge">Normas y convivencia</span>

          <h3>Reglamento General</h3>

          <p>
            Nuestro reglamento establece las normas y principios que guían la
            convivencia, el respeto y el crecimiento espiritual dentro de la
            iglesia.
          </p>

          <p>
            Está diseñado para mantener el orden, la unidad y el compromiso de
            todos los miembros en cada área de servicio y participación.
          </p>

          <button
            id="btn-reglamento"
            className="btn-reglamento"
            onClick={() => navigate("/reglamento")}
          >
            Ver reglamento completo →
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReglamentoPreview;
