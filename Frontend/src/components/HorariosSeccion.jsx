import { useState } from "react";
import "../styles/horarios-seccion.css";

import {
  FaPrayingHands,
  FaBookOpen,
  FaUserFriends,
  FaHome,
  FaChevronDown,
} from "react-icons/fa";

function HorariosSeccion() {
  const [horarioActivo, setHorarioActivo] = useState("");

  const horarios = [
    {
      id: "lunes",
      dia: "Lunes",
      actividad: "Oración",
      hora: "19:00",
      icono: <FaPrayingHands />,
      descripcion: "Un tiempo especial para buscar la presencia de Dios.",
    },
    {
      id: "viernes",
      dia: "Viernes",
      actividad: "Culto de Enseñanza",
      hora: "19:30",
      icono: <FaBookOpen />,
      descripcion: "Aprendemos juntos la palabra de Dios con fe y propósito.",
    },
    {
      id: "sabado",
      dia: "Sábado",
      actividad: "Reunión de Jóvenes",
      hora: "19:30",
      icono: <FaUserFriends />,
      descripcion: "Un espacio para jóvenes con alabanza, amistad y reflexión.",
    },
    {
      id: "domingo",
      dia: "Domingo",
      actividad: "Culto General",
      hora: "19:00",
      icono: <FaHome />,
      descripcion: "Celebramos juntos como familia en la presencia de Dios.",
    },
  ];

  const alternarHorario = (id) => {
    setHorarioActivo((actual) => (actual === id ? "" : id));
  };

  return (
    <section className="schedule" id="horarios">
      <div className="schedule-bg schedule-bg-one"></div>
      <div className="schedule-bg schedule-bg-two"></div>
      <div className="schedule-bg schedule-bg-three"></div>

      <div className="schedule-container">
        <div className="section-title">
          <h2>Horarios de Reunión</h2>

          <p>
            Te esperamos en nuestras reuniones semanales para compartir juntos
            la presencia de Dios, aprender su palabra y crecer como familia.
          </p>
        </div>

        <div className="schedule-grid">
          {horarios.map((item) => (
            <article
              className={`schedule-card ${
                horarioActivo === item.id ? "schedule-card-open" : ""
              }`}
              key={item.id}
              onClick={() => alternarHorario(item.id)}
            >
              <div className="schedule-card-top">
                <div className="schedule-icon">{item.icono}</div>

                <div className="schedule-day">
                  <span>{item.dia}</span>
                </div>

                <div className="schedule-mobile-main">
                  <span>{item.dia}</span>
                  <strong>{item.actividad}</strong>
                </div>

                <span className="schedule-mobile-time">{item.hora}</span>

                <button
                  type="button"
                  className="schedule-accordion-toggle"
                  onClick={(e) => {
                    e.stopPropagation();
                    alternarHorario(item.id);
                  }}
                  aria-label={`Abrir horario de ${item.dia}`}
                  aria-expanded={horarioActivo === item.id}
                >
                  <FaChevronDown />
                </button>
              </div>

              <div className="schedule-card-body">
                <h3>{item.actividad}</h3>
                <p>{item.descripcion}</p>
              </div>

              <div className="schedule-card-footer">
                <span className="time-label">Hora</span>
                <strong>{item.hora}</strong>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HorariosSeccion;