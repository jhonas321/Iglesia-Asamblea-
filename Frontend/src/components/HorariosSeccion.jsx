import "../styles/horarios-seccion.css";

function HorariosSeccion() {
  return (
    <section className="schedule" id="horarios">
      <div className="section-bg-decoration decoration-left"></div>
      <div className="section-bg-decoration decoration-right"></div>

      <div className="section-title">
        <h2>Horarios de Reunión</h2>
        <p>
          Te esperamos en nuestras reuniones semanales para compartir juntos la
          presencia de Dios.
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
  );
}

export default HorariosSeccion;