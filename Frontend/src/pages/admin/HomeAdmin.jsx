import { Link } from "react-router-dom";
import {
  CalendarDays,
  Image,
  Clock,
  Users,
  Mail,
  TrendingUp,
  PlusCircle,
  Eye,
  Layers,
  Images,
  Settings,
  UserRound,
  Phone,
  MapPin,
  ArrowRight,
  Building2,
} from "lucide-react";

import {
  obtenerContactoGuardado,
  obtenerEventosGuardados,
  obtenerHeroFotosGuardadas,
  obtenerHorariosGuardados,
  obtenerMinisteriosGuardados,
  obtenerOrganigramaGuardado,
  obtenerPublicacionesGuardadas,
} from "../../data/adminStorage";

import "../../styles/HomeAdmin.css";

const obtenerFechaActualInput = () => {
  const hoy = new Date();

  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
};

const crearFechaLocalDesdeInput = (fechaInput) => {
  if (!fechaInput) return null;

  const [anio, mes, dia] = String(fechaInput).split("-").map(Number);

  if (!anio || !mes || !dia) return null;

  return new Date(anio, mes - 1, dia);
};

const nombresMeses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const formatearFecha = (fechaInput) => {
  const fecha = crearFechaLocalDesdeInput(fechaInput);

  if (!fecha) return "Sin fecha";

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = nombresMeses[fecha.getMonth()];
  const anio = fecha.getFullYear();

  return `${dia} ${mes} ${anio}`;
};

const formatearRangoFecha = (fechaInicio, fechaFinal) => {
  if (!fechaInicio) return "Sin fecha";

  if (!fechaFinal || fechaInicio === fechaFinal) {
    return formatearFecha(fechaInicio);
  }

  const inicio = crearFechaLocalDesdeInput(fechaInicio);
  const final = crearFechaLocalDesdeInput(fechaFinal);

  if (!inicio || !final) return formatearFecha(fechaInicio);

  const mismoMes =
    inicio.getFullYear() === final.getFullYear() &&
    inicio.getMonth() === final.getMonth();

  if (mismoMes) {
    const diaInicio = String(inicio.getDate()).padStart(2, "0");
    const diaFinal = String(final.getDate()).padStart(2, "0");
    const mes = nombresMeses[inicio.getMonth()];
    const anio = inicio.getFullYear();

    return `${diaInicio} al ${diaFinal} ${mes} ${anio}`;
  }

  return `${formatearFecha(fechaInicio)} al ${formatearFecha(fechaFinal)}`;
};

const obtenerEstadoEvento = (evento) => {
  const fechaActual = obtenerFechaActualInput();

  const fechaInicio = evento.fechaInicio;
  const fechaFinal = evento.fechaFinal || evento.fechaInicio;

  if (!fechaInicio) return "Sin fecha";
  if (fechaActual < fechaInicio) return "Próximo";
  if (fechaActual > fechaFinal) return "Finalizado";

  return "En curso";
};

const ordenarPorFechaDesc = (lista) => {
  return [...lista].sort((a, b) => {
    const fechaA = new Date(a.fechaInicio || a.fechaFinal || 0).getTime();
    const fechaB = new Date(b.fechaInicio || b.fechaFinal || 0).getTime();

    return fechaB - fechaA;
  });
};

const obtenerCantidadMiembros = (organigrama) => {
  return organigrama.reduce((total, seccion) => {
    if (!Array.isArray(seccion.miembros)) return total;
    return total + seccion.miembros.length;
  }, 0);
};

const mostrarDato = (valor) => {
  const texto = String(valor || "").trim();
  return texto || "No registrado";
};

const HomeAdmin = () => {
  const eventos = obtenerEventosGuardados();
  const publicaciones = obtenerPublicacionesGuardadas();
  const horarios = obtenerHorariosGuardados();
  const ministerios = obtenerMinisteriosGuardados();
  const fotosInicio = obtenerHeroFotosGuardadas();
  const organigrama = obtenerOrganigramaGuardado();
  const contacto = obtenerContactoGuardado();

  const eventosRecientes = ordenarPorFechaDesc(eventos).slice(0, 5);
  const publicacionesRecientes = ordenarPorFechaDesc(publicaciones).slice(0, 4);
  const horariosOrdenados = [...horarios].slice(0, 5);
  const ministeriosRecientes = [...ministerios].slice(0, 6);

  const resumen = [
    {
      titulo: "Eventos",
      cantidad: eventos.length,
      texto: "Eventos registrados",
      icono: <CalendarDays size={23} />,
      ruta: "/admin/eventos",
    },
    {
      titulo: "Publicaciones",
      cantidad: publicaciones.length,
      texto: "Fotos y recuerdos",
      icono: <Image size={23} />,
      ruta: "/admin/publicaciones",
    },
    {
      titulo: "Horarios",
      cantidad: horarios.length,
      texto: "Reuniones activas",
      icono: <Clock size={23} />,
      ruta: "/admin/horarios",
    },
    {
      titulo: "Ministerios",
      cantidad: ministerios.length,
      texto: "Áreas disponibles",
      icono: <Users size={23} />,
      ruta: "/admin/ministerios",
    },
    {
      titulo: "Fotos inicio",
      cantidad: fotosInicio.length,
      texto: "Imágenes del inicio",
      icono: <Images size={23} />,
      ruta: "/admin/fotos-inicio",
    },
    {
      titulo: "Organigrama",
      cantidad: obtenerCantidadMiembros(organigrama),
      texto: "Miembros registrados",
      icono: <UserRound size={23} />,
      ruta: "/admin/organigrama",
    },
  ];

  return (
    <main className="home-admin">
      <section className="home-admin-hero">
        <div>
          <span className="home-admin-tag">Panel Administrativo</span>

          <h1>Bienvenido, Administrador</h1>

          <p>
            Desde aquí puedes revisar el resumen general de eventos,
            publicaciones, horarios, ministerios, contactos y organigrama de la
            iglesia.
          </p>

          <div className="home-admin-hero-actions">
            <Link to="/admin/eventos" className="home-admin-primary-btn">
              <PlusCircle size={18} />
              Nuevo evento
            </Link>

            <Link to="/" className="home-admin-secondary-btn">
              <Eye size={18} />
              Ver sitio público
            </Link>
          </div>
        </div>

        <div className="home-admin-hero-icon home-admin-hero-logo">
          <img src="/images/logo.jpg" alt="Logo Asamblea" />
        </div>
      </section>

      <section className="home-admin-stats">
        {resumen.map((item) => (
          <Link to={item.ruta} className="home-admin-card" key={item.titulo}>
            <div className="home-admin-card-icon">{item.icono}</div>

            <div>
              <h3>{item.cantidad}</h3>
              <h4>{item.titulo}</h4>
              <p>{item.texto}</p>
            </div>

            <ArrowRight className="home-admin-card-arrow" size={18} />
          </Link>
        ))}
      </section>

      <section className="home-admin-content">
        <div className="home-admin-main-column">
          <div className="home-admin-panel">
            <div className="home-admin-panel-header">
              <div>
                <h2>Eventos recientes</h2>
                <p>Últimos eventos registrados dentro del panel.</p>
              </div>

              <Link to="/admin/eventos" className="home-admin-btn">
                Gestionar eventos
              </Link>
            </div>

            <div className="home-admin-table">
              <table>
                <thead>
                  <tr>
                    <th>Evento</th>
                    <th>Ministerio</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                  </tr>
                </thead>

                <tbody>
                  {eventosRecientes.length > 0 ? (
                    eventosRecientes.map((evento) => (
                      <tr key={evento.id}>
                        <td>{evento.titulo || "Sin título"}</td>
                        <td>{evento.ministerio || "Sin ministerio"}</td>
                        <td>
                          <span className="home-admin-status">
                            {obtenerEstadoEvento(evento)}
                          </span>
                        </td>
                        <td>
                          {formatearRangoFecha(
                            evento.fechaInicio,
                            evento.fechaFinal
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="home-admin-empty">
                        No hay eventos registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="home-admin-grid-two">
            <div className="home-admin-panel">
              <div className="home-admin-panel-header">
                <div>
                  <h2>Publicaciones recientes</h2>
                  <p>Galerías y recuerdos publicados.</p>
                </div>

                <Link to="/admin/publicaciones" className="home-admin-small-link">
                  Ver todo
                </Link>
              </div>

              <div className="home-admin-list">
                {publicacionesRecientes.length > 0 ? (
                  publicacionesRecientes.map((publicacion) => (
                    <article
                      className="home-admin-list-item"
                      key={publicacion.id}
                    >
                      <div className="home-admin-list-img">
                        {publicacion.imagen ? (
                          <img
                            src={publicacion.imagen}
                            alt={publicacion.titulo}
                          />
                        ) : (
                          <Image size={20} />
                        )}
                      </div>

                      <div>
                        <h3>{publicacion.titulo || "Sin título"}</h3>
                        <p>{publicacion.ministerio || "Sin ministerio"}</p>
                        <span>
                          {publicacion.fecha ||
                            formatearRangoFecha(
                              publicacion.fechaInicio,
                              publicacion.fechaFinal
                            )}
                        </span>
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="home-admin-empty-text">
                    No hay publicaciones registradas.
                  </p>
                )}
              </div>
            </div>

            <div className="home-admin-panel">
              <div className="home-admin-panel-header">
                <div>
                  <h2>Horarios</h2>
                  <p>Reuniones visibles en la página pública.</p>
                </div>

                <Link to="/admin/horarios" className="home-admin-small-link">
                  Ver todo
                </Link>
              </div>

              <div className="home-admin-schedule-list">
                {horariosOrdenados.length > 0 ? (
                  horariosOrdenados.map((horario) => (
                    <article className="home-admin-schedule" key={horario.id}>
                      <div>
                        <strong>{horario.dia}</strong>
                        <p>{horario.actividad}</p>
                      </div>

                      <span>{horario.hora}</span>
                    </article>
                  ))
                ) : (
                  <p className="home-admin-empty-text">
                    No hay horarios registrados.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <aside className="home-admin-side">
          <div className="home-admin-mini-card">
            <div className="home-admin-mini-icon">
              <TrendingUp size={24} />
            </div>

            <h3>Resumen general</h3>

            <p>
              El panel está conectado con tus datos guardados. Cada módulo
              muestra información real registrada desde el administrador.
            </p>

            <div className="home-admin-progress-list">
              <div>
                <span>Eventos</span>
                <strong>{eventos.length}</strong>
              </div>

              <div>
                <span>Publicaciones</span>
                <strong>{publicaciones.length}</strong>
              </div>

              <div>
                <span>Ministerios</span>
                <strong>{ministerios.length}</strong>
              </div>

              <div>
                <span>Miembros</span>
                <strong>{obtenerCantidadMiembros(organigrama)}</strong>
              </div>
            </div>
          </div>

          <div className="home-admin-mini-card">
            <div className="home-admin-side-title">
              <h3>Ministerios</h3>
              <Layers size={20} />
            </div>

            <div className="home-admin-tags">
              {ministeriosRecientes.length > 0 ? (
                ministeriosRecientes.map((ministerio) => (
                  <span key={ministerio.id}>{ministerio.nombre}</span>
                ))
              ) : (
                <p className="home-admin-empty-text">
                  No hay ministerios registrados.
                </p>
              )}
            </div>
          </div>

          <div className="home-admin-mini-card">
            <div className="home-admin-side-title">
              <h3>Contacto rápido</h3>
              <Mail size={20} />
            </div>

            <div className="home-admin-contact-list">
              <p>
                <Building2 size={16} />
                {mostrarDato(contacto.nombreIglesia)}
              </p>

              <p>
                <MapPin size={16} />
                {mostrarDato(contacto.direccion)}
              </p>

              <p>
                <Phone size={16} />
                {mostrarDato(contacto.telefono)}
              </p>

              <p>
                <Mail size={16} />
                {mostrarDato(contacto.footerCorreo)}
              </p>
            </div>

            <Link to="/admin/contactos" className="home-admin-contact-btn">
              Editar contactos
            </Link>
          </div>

          <div className="home-admin-quick-actions">
            <Link to="/admin/configuracion">
              <Settings size={18} />
              Configuración
            </Link>

            <Link to="/admin/ministerios">
              <Layers size={18} />
              Ministerios
            </Link>

            <Link to="/admin/fotos-inicio">
              <Images size={18} />
              Fotos inicio
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default HomeAdmin;