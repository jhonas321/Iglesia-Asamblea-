import { useEffect, useMemo, useState } from "react";
import "../styles/horarios-seccion.css";

import {
  FaPrayingHands,
  FaBookOpen,
  FaUserFriends,
  FaHome,
  FaChevronDown,
  FaMusic,
  FaChild,
  FaUsers,
  FaHandsHelping,
  FaHandHoldingHeart,
  FaDove,
  FaHeart,
  FaMicrophone,
  FaGuitar,
  FaDrum,
  FaSeedling,
  FaCoffee,
  FaUtensils,
  FaCalendarAlt,
  FaStar,
  FaSun,
  FaMoon,
  FaGift,
  FaBell,
  FaPeopleCarry,
  FaGraduationCap,
  FaLightbulb,
  FaFire,
  FaLeaf,
  FaHandshake,
  FaCommentDots,
  FaBullhorn,
  FaSmile,
} from "react-icons/fa";

const API_URL = "http://127.0.0.1:8000/api";

const iconosHorario = {
  oracion: <FaPrayingHands />,
  ensenanza: <FaBookOpen />,
  jovenes: <FaUserFriends />,
  principal: <FaHome />,
  alabanza: <FaMusic />,
  adoracion: <FaHeart />,
  ninos: <FaChild />,
  familias: <FaUsers />,
  servicio: <FaHandsHelping />,
  ayuda: <FaHandHoldingHeart />,
  espiritu: <FaDove />,
  predica: <FaMicrophone />,
  musica: <FaGuitar />,
  bateria: <FaDrum />,
  crecimiento: <FaSeedling />,
  comunion: <FaCoffee />,
  cena: <FaUtensils />,
  especial: <FaCalendarAlt />,
  celebracion: <FaStar />,
  manana: <FaSun />,
  noche: <FaMoon />,
  ofrenda: <FaGift />,
  aviso: <FaBell />,
  apoyo: <FaPeopleCarry />,
  estudio: <FaGraduationCap />,
  reflexion: <FaLightbulb />,
  vigilia: <FaFire />,
  naturaleza: <FaLeaf />,
  amistad: <FaHandshake />,
  charla: <FaCommentDots />,
  evangelismo: <FaBullhorn />,
  alegria: <FaSmile />,
};

const ordenarHorarios = (horarios) => {
  const ordenDias = {
    Lunes: 1,
    Martes: 2,
    Miércoles: 3,
    Jueves: 4,
    Viernes: 5,
    Sábado: 6,
    Domingo: 7,
  };

  return [...horarios].sort((a, b) => {
    const ordenA = ordenDias[a.dia] || 99;
    const ordenB = ordenDias[b.dia] || 99;

    if (ordenA !== ordenB) return ordenA - ordenB;

    return String(a.hora || "").localeCompare(String(b.hora || ""));
  });
};

const normalizarHora = (hora) => {
  if (!hora) return "";

  const valor = String(hora).trim();

  if (/^\d{2}:\d{2}:\d{2}$/.test(valor)) {
    return valor.slice(0, 5);
  }

  return valor;
};

const convertirHorarioApi = (horario) => ({
  id: horario.id,
  dia: horario.dia || "",
  actividad: horario.actividad || "",
  descripcion: horario.descripcion || "",
  hora: normalizarHora(horario.hora),
  iconoTipo: horario.icono_tipo || horario.iconoTipo || "principal",
  activo: typeof horario.activo === "boolean" ? horario.activo : true,
});

function HorariosSeccion() {
  const [horarioActivo, setHorarioActivo] = useState("");
  const [horariosApi, setHorariosApi] = useState([]);

  useEffect(() => {
    let activo = true;

    const extraerLista = (data) => {
      if (Array.isArray(data)) return data;
      if (Array.isArray(data?.data)) return data.data;
      return [];
    };

    const cargarHorarios = async () => {
      try {
        const response = await fetch(`${API_URL}/horarios`, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Horarios: ${response.status}`);
        }

        const data = await response.json();

        if (!activo) return;

        setHorariosApi(
          extraerLista(data)
            .map(convertirHorarioApi)
            .filter((horario) => horario.activo !== false)
        );
      } catch (error) {
        console.error("Error cargando horarios públicos:", error);

        if (activo) {
          setHorariosApi([]);
        }
      }
    };

    cargarHorarios();

    return () => {
      activo = false;
    };
  }, []);

  const horarios = useMemo(() => {
    return ordenarHorarios(horariosApi);
  }, [horariosApi]);

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
                <div className="schedule-icon">
                  {iconosHorario[item.iconoTipo] || <FaHome />}
                </div>

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
