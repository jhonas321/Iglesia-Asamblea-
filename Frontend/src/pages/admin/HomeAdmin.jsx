import {
  CalendarDays,
  Image,
  Clock,
  Users,
  Mail,
  TrendingUp,
  PlusCircle,
  Eye,
  Church,
} from "lucide-react";
import "../../styles/HomeAdmin.css";

const HomeAdmin = () => {
  const resumen = [
    {
      titulo: "Eventos",
      cantidad: "12",
      texto: "Eventos registrados",
      icono: <CalendarDays size={24} />,
    },
    {
      titulo: "Publicaciones",
      cantidad: "28",
      texto: "Fotos y recuerdos",
      icono: <Image size={24} />,
    },
    {
      titulo: "Horarios",
      cantidad: "4",
      texto: "Reuniones activas",
      icono: <Clock size={24} />,
    },
    {
      titulo: "Ministerios",
      cantidad: "6",
      texto: "Áreas disponibles",
      icono: <Users size={24} />,
    },
  ];

  const actividades = [
    {
      titulo: "Nuevo evento creado",
      detalle: "Ensayos de alabanza",
      fecha: "Hoy, 09:30",
    },
    {
      titulo: "Publicación actualizada",
      detalle: "Momentos compartidos",
      fecha: "Ayer, 18:45",
    },
    {
      titulo: "Horario modificado",
      detalle: "Culto general domingo",
      fecha: "Ayer, 14:20",
    },
    {
      titulo: "Mensaje recibido",
      detalle: "Consulta desde contacto",
      fecha: "Lunes, 11:00",
    },
  ];

  const eventos = [
    {
      nombre: "Ensayos de alabanza",
      ministerio: "Ministerio de Alabanza",
      estado: "En curso",
      fecha: "23 al 27 Mayo",
    },
    {
      nombre: "Culto de jóvenes",
      ministerio: "Ministerio Juvenil",
      estado: "Próximo",
      fecha: "Sábado 19:30",
    },
    {
      nombre: "Culto general",
      ministerio: "Iglesia Asamblea",
      estado: "Activo",
      fecha: "Domingo 19:00",
    },
  ];

  return (
    <main className="home-admin">
      <section className="home-admin-hero">
        <div>
          <span className="home-admin-tag">Panel Administrativo</span>
          <h1>Bienvenido, Administrador</h1>
          <p>
            Desde aquí puedes gestionar eventos, publicaciones, horarios,
            ministerios y la información principal de la iglesia.
          </p>
        </div>

        <div className="home-admin-hero-icon">
          <Church size={42} />
        </div>
      </section>

      <section className="home-admin-stats">
        {resumen.map((item, index) => (
          <article className="home-admin-card" key={index}>
            <div className="home-admin-card-icon">{item.icono}</div>

            <div>
              <h3>{item.cantidad}</h3>
              <h4>{item.titulo}</h4>
              <p>{item.texto}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="home-admin-content">
        <div className="home-admin-panel">
          <div className="home-admin-panel-header">
            <div>
              <h2>Eventos recientes</h2>
              <p>Vista rápida de los últimos eventos registrados.</p>
            </div>

            <button className="home-admin-btn">
              <PlusCircle size={18} />
              Nuevo evento
            </button>
          </div>

          <div className="home-admin-table">
            <table>
              <thead>
                <tr>
                  <th>Evento</th>
                  <th>Ministerio</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {eventos.map((evento, index) => (
                  <tr key={index}>
                    <td>{evento.nombre}</td>
                    <td>{evento.ministerio}</td>
                    <td>
                      <span className="home-admin-status">{evento.estado}</span>
                    </td>
                    <td>{evento.fecha}</td>
                    <td>
                      <button className="home-admin-icon-btn">
                        <Eye size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="home-admin-side">
          <div className="home-admin-mini-card">
            <div className="home-admin-mini-icon">
              <TrendingUp size={24} />
            </div>

            <h3>Resumen general</h3>
            <p>
              El panel está listo para probar el diseño junto al sidebar del
              administrador.
            </p>
          </div>

          <div className="home-admin-activity">
            <div className="home-admin-activity-header">
              <h3>Actividad reciente</h3>
              <Mail size={20} />
            </div>

            {actividades.map((item, index) => (
              <div className="home-admin-activity-item" key={index}>
                <div className="home-admin-dot"></div>

                <div>
                  <h4>{item.titulo}</h4>
                  <p>{item.detalle}</p>
                  <span>{item.fecha}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
};

export default HomeAdmin;
