import { useState } from "react";
import "../styles/reglamento.css";

function Reglamento() {
  const [activo, setActivo] = useState(null);

  const reglas = [
    {
      titulo: "Respeto y conducta",
      contenido:
        "Todos los miembros deben mantener una conducta respetuosa dentro y fuera de la iglesia, promoviendo valores cristianos como el amor, la humildad y la paz.",
    },
    {
      titulo: "Participación en actividades",
      contenido:
        "Se espera que los miembros participen activamente en cultos, reuniones y actividades programadas por la iglesia.",
    },
    {
      titulo: "Responsabilidad en ministerios",
      contenido:
        "Los líderes y miembros de ministerios deben cumplir con sus responsabilidades con compromiso, puntualidad y dedicación.",
    },
    {
      titulo: "Uso de instalaciones",
      contenido:
        "Las instalaciones de la iglesia deben ser utilizadas con respeto, orden y cuidado, evitando daños o mal uso.",
    },
    {
      titulo: "Vestimenta adecuada",
      contenido:
        "Se recomienda una vestimenta adecuada y respetuosa durante las reuniones y actividades de la iglesia.",
    },
    {
      titulo: "Unidad y convivencia",
      contenido:
        "Se debe fomentar la unidad entre los miembros, evitando conflictos y promoviendo la reconciliación y el diálogo.",
    },
  ];

  const toggle = (index) => {
    setActivo(activo === index ? null : index);
  };

  return (
    <section id="reglamento-page">
      <div className="reglamento-hero">
        <h1>Reglamento General</h1>
        <p>
          Normas y lineamientos que guían la convivencia y el funcionamiento
          dentro de nuestra iglesia.
        </p>
      </div>

      <div className="reglamento-container">
        {reglas.map((regla, index) => (
          <div className="regla-item" key={index}>
            <div
              className="regla-titulo"
              onClick={() => toggle(index)}
            >
              <h3>{regla.titulo}</h3>
              <span>{activo === index ? "−" : "+"}</span>
            </div>

            <div
              className={`regla-contenido ${
                activo === index ? "activo" : ""
              }`}
            >
              <p>{regla.contenido}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Reglamento;