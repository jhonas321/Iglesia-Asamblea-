import "../styles/horarios-seccion.css";

import {
  FaPrayingHands,
  FaBookOpen,
  FaUserFriends,
  FaHome
} from "react-icons/fa";

function HorariosSeccion() {
  const horarios = [
    {
      dia: "Lunes",
      actividad: "Oración",
      hora: "19:00",
      icono: <FaPrayingHands />,
      descripcion: "Un tiempo especial para buscar la presencia de Dios.",
    },
    {
      dia: "Viernes",
      actividad: "Culto de Enseñanza",
      hora: "19:30",
      icono: <FaBookOpen />,
      descripcion: "Aprendemos juntos la palabra de Dios con fe y propósito.",
    },
    {
      dia: "Sábado",
      actividad: "Reunión de Jóvenes",
      hora: "19:30",
      icono: <FaUserFriends />,
      descripcion: "Un espacio para jóvenes con alabanza, amistad y reflexión.",
    },
    {
      dia: "Domingo",
      actividad: "Culto General",
      hora: "19:00",
      icono: <FaHome />,
      descripcion: "Celebramos juntos como familia en la presencia de Dios.",
    },
  ];

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
          {horarios.map((item, index) => (
            <article className="schedule-card" key={index}>
              <div className="schedule-card-top">
                <div className="schedule-icon">{item.icono}</div>

                <div className="schedule-day">
                  <span>{item.dia}</span>
                </div>
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