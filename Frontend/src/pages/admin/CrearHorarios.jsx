import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PlusCircle, X } from "lucide-react";
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

import ListaAdmin from "../../components/admin/ListaAdmin";

import "../../styles/AdminCrudPage.css";
import "../../styles/horarios-seccion.css";
import "../../styles/HorariosAdmin.css";

const API_URL = "http://127.0.0.1:8000/api";

const opcionesIcono = {
  oracion: {
    label: "Oración",
    icono: <FaPrayingHands />,
  },
  ensenanza: {
    label: "Enseñanza",
    icono: <FaBookOpen />,
  },
  jovenes: {
    label: "Jóvenes",
    icono: <FaUserFriends />,
  },
  principal: {
    label: "Principal",
    icono: <FaHome />,
  },
  alabanza: {
    label: "Alabanza",
    icono: <FaMusic />,
  },
  adoracion: {
    label: "Adoración",
    icono: <FaHeart />,
  },
  ninos: {
    label: "Niños",
    icono: <FaChild />,
  },
  familias: {
    label: "Familias",
    icono: <FaUsers />,
  },
  servicio: {
    label: "Servicio",
    icono: <FaHandsHelping />,
  },
  ayuda: {
    label: "Ayuda",
    icono: <FaHandHoldingHeart />,
  },
  espiritu: {
    label: "Espíritu",
    icono: <FaDove />,
  },
  predica: {
    label: "Predicación",
    icono: <FaMicrophone />,
  },
  musica: {
    label: "Música",
    icono: <FaGuitar />,
  },
  bateria: {
    label: "Batería",
    icono: <FaDrum />,
  },
  crecimiento: {
    label: "Crecimiento",
    icono: <FaSeedling />,
  },
  comunion: {
    label: "Comunión",
    icono: <FaCoffee />,
  },
  cena: {
    label: "Cena",
    icono: <FaUtensils />,
  },
  especial: {
    label: "Especial",
    icono: <FaCalendarAlt />,
  },
  celebracion: {
    label: "Celebración",
    icono: <FaStar />,
  },
  manana: {
    label: "Mañana",
    icono: <FaSun />,
  },
  noche: {
    label: "Noche",
    icono: <FaMoon />,
  },
  ofrenda: {
    label: "Ofrenda",
    icono: <FaGift />,
  },
  aviso: {
    label: "Aviso",
    icono: <FaBell />,
  },
  apoyo: {
    label: "Apoyo",
    icono: <FaPeopleCarry />,
  },
  estudio: {
    label: "Estudio",
    icono: <FaGraduationCap />,
  },
  reflexion: {
    label: "Reflexión",
    icono: <FaLightbulb />,
  },
  vigilia: {
    label: "Vigilia",
    icono: <FaFire />,
  },
  naturaleza: {
    label: "Vida",
    icono: <FaLeaf />,
  },
  amistad: {
    label: "Amistad",
    icono: <FaHandshake />,
  },
  charla: {
    label: "Charla",
    icono: <FaCommentDots />,
  },
  evangelismo: {
    label: "Evangelismo",
    icono: <FaBullhorn />,
  },
  alegria: {
    label: "Alegría",
    icono: <FaSmile />,
  },
};

const diasSemana = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const HORAS = Array.from({ length: 24 }, (_, index) =>
  String(index).padStart(2, "0")
);

const MINUTOS = Array.from({ length: 12 }, (_, index) =>
  String(index * 5).padStart(2, "0")
);

const crearFormularioHorarioVacio = () => ({
  dia: "Lunes",
  actividad: "",
  hora: "--:--",
  iconoTipo: "principal",
  descripcion: "",
});

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

const normalizarHoraInput = (hora) => {
  if (!hora) return "";

  const horaLimpia = String(hora).trim();

  if (/^\d{2}:\d{2}$/.test(horaLimpia)) return horaLimpia;

  if (/^\d{2}:\d{2}:\d{2}$/.test(horaLimpia)) {
    return horaLimpia.slice(0, 5);
  }

  const match = horaLimpia.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i);

  if (!match) return "";

  let horas = Number(match[1]);
  const minutos = match[2];
  const periodo = match[3].toLowerCase();

  if (periodo === "pm" && horas < 12) horas += 12;
  if (periodo === "am" && horas === 12) horas = 0;

  return `${String(horas).padStart(2, "0")}:${minutos}`;
};

const obtenerToken = () => localStorage.getItem("token");

const convertirHorarioBackendAFrontend = (horario) => ({
  id: horario.id,
  dia: horario.dia || "",
  actividad: horario.actividad || "",
  hora: normalizarHoraInput(horario.hora),
  iconoTipo: horario.icono_tipo || "principal",
  descripcion: horario.descripcion || "",
  activo: horario.activo,
});

const CrearHorarios = () => {
  const diaBoxRef = useRef(null);
  const horaBoxRef = useRef(null);

  const [horariosAdmin, setHorariosAdmin] = useState([]);
  const [cargandoDatos, setCargandoDatos] = useState(true);
  const [guardandoHorario, setGuardandoHorario] = useState(false);
  const [eliminandoId, setEliminandoId] = useState(null);
  const [errorCarga, setErrorCarga] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("crear");
  const [panelActivo, setPanelActivo] = useState("formulario");
  const [horarioEditandoId, setHorarioEditandoId] = useState(null);
  const [formulario, setFormulario] = useState(crearFormularioHorarioVacio);
  const [errorFormulario, setErrorFormulario] = useState("");
  const [horarioActivoPreview, setHorarioActivoPreview] = useState("");

  const [diaAbierto, setDiaAbierto] = useState(false);
  const [horaAbierta, setHoraAbierta] = useState(false);
  const [horaTemporal, setHoraTemporal] = useState({
    hora: "19",
    minuto: "00",
  });

  const esModoVista = modoFormulario === "ver";

  const cargarDatos = useCallback(async () => {
    const token = obtenerToken();

    try {
      setCargandoDatos(true);
      setErrorCarga("");

      const response = await fetch(`${API_URL}/horarios`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "No se pudieron cargar los horarios."
        );
      }

      const listaHorarios = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setHorariosAdmin(
        listaHorarios.map(convertirHorarioBackendAFrontend)
      );
    } catch (error) {
      console.error("Error cargando horarios:", error);

      setErrorCarga(
        error.message || "No se pudieron cargar los horarios."
      );
    } finally {
      setCargandoDatos(false);
    }
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);


  useEffect(() => {
    if (!mensajeExito) return;

    const timeout = setTimeout(() => {
      setMensajeExito("");
    }, 2500);

    return () => clearTimeout(timeout);
  }, [mensajeExito]);

  const cerrarSelectores = useCallback(() => {
    setDiaAbierto(false);
    setHoraAbierta(false);
  }, []);

  const abrirDia = () => {
    setDiaAbierto((actual) => !actual);
    setHoraAbierta(false);
  };

  const abrirSelectorHora = () => {
    const horaActual = formulario.hora || "19:00";
    const [hora, minuto] = horaActual.split(":");

    setHoraTemporal({
      hora: hora || "19",
      minuto: minuto || "00",
    });

    setHoraAbierta((actual) => !actual);
    setDiaAbierto(false);
  };

  const seleccionarDia = (dia) => {
    setFormulario((actual) => ({
      ...actual,
      dia,
    }));

    setDiaAbierto(false);
    setErrorFormulario("");
  };

  const seleccionarHora = (hora) => {
    setHoraTemporal((actual) => ({
      ...actual,
      hora,
    }));
  };

  const seleccionarMinuto = (minuto) => {
    const horaFinal = `${horaTemporal.hora}:${minuto}`;

    setFormulario((actual) => ({
      ...actual,
      hora: horaFinal,
    }));

    setHoraTemporal((actual) => ({
      ...actual,
      minuto,
    }));

    setHoraAbierta(false);
    setErrorFormulario("");
  };

  const manejarTeclaCampo = (e, accion) => {
    if (e.key !== "Enter" && e.key !== " ") return;

    e.preventDefault();
    accion();
  };

  const horariosProcesados = useMemo(() => {
    return ordenarHorarios(horariosAdmin);
  }, [horariosAdmin]);

  const horarioVistaPrevia = {
    id: horarioEditandoId || "preview-horario",
    dia: formulario.dia || "Día",
    actividad: formulario.actividad || "Actividad del horario",
    hora: formulario.hora || "00:00",
    iconoTipo: formulario.iconoTipo || "principal",
    descripcion:
      formulario.descripcion ||
      "Aquí se mostrará la descripción del horario de reunión.",
  };

  const cerrarModal = useCallback(() => {
    setModalAbierto(false);
    setModoFormulario("crear");
    setPanelActivo("formulario");
    setHorarioEditandoId(null);
    setFormulario(crearFormularioHorarioVacio());
    setErrorFormulario("");
    setHorarioActivoPreview("");
    cerrarSelectores();
  }, [cerrarSelectores]);

  useEffect(() => {
    if (!modalAbierto) return;

    const cerrarAlHacerClickFuera = (e) => {
      const clickEnDia = diaBoxRef.current?.contains(e.target);
      const clickEnHora = horaBoxRef.current?.contains(e.target);

      if (!clickEnDia && !clickEnHora) {
        cerrarSelectores();
      }
    };

    document.addEventListener("mousedown", cerrarAlHacerClickFuera);

    return () => {
      document.removeEventListener("mousedown", cerrarAlHacerClickFuera);
    };
  }, [modalAbierto, cerrarSelectores]);

  useEffect(() => {
    if (!modalAbierto) return;

    const scrollY = window.scrollY;

    const body = document.body;
    const html = document.documentElement;

    const estilosAnteriores = {
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      htmlOverflow: html.style.overflow,
    };

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    html.style.overflow = "hidden";

    return () => {
      body.style.overflow = estilosAnteriores.bodyOverflow;
      body.style.position = estilosAnteriores.bodyPosition;
      body.style.top = estilosAnteriores.bodyTop;
      body.style.width = estilosAnteriores.bodyWidth;
      html.style.overflow = estilosAnteriores.htmlOverflow;

      window.scrollTo(0, scrollY);
    };
  }, [modalAbierto]);

  useEffect(() => {
    if (!modalAbierto) return;

    const cerrarConEscape = (e) => {
      if (e.key === "Escape") cerrarModal();
    };

    window.addEventListener("keydown", cerrarConEscape);

    return () => {
      window.removeEventListener("keydown", cerrarConEscape);
    };
  }, [modalAbierto, cerrarModal]);

  const columnasHorarios = [
    { key: "dia", label: "Día" },
    { key: "actividad", label: "Actividad" },
    { key: "hora", label: "Hora" },
    {
      key: "iconoTipo",
      label: "Icono",
      render: (horario) =>
        opcionesIcono[horario.iconoTipo]?.label || "Principal",
    },
    { key: "descripcion", label: "Descripción" },
  ];

  const actualizarCampo = (e) => {
    const { name, value } = e.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));

    setErrorFormulario("");
  };

  const seleccionarIcono = (iconoTipo) => {
    setFormulario((actual) => ({
      ...actual,
      iconoTipo,
    }));

    setErrorFormulario("");
  };

  const cargarFormularioHorario = (horario) => {
    setFormulario({
      dia: horario.dia || "Lunes",
      actividad: horario.actividad || "",
      hora: normalizarHoraInput(horario.hora) || "19:00",
      iconoTipo: horario.iconoTipo || "principal",
      descripcion: horario.descripcion || "",
    });
  };

  const abrirModalCrear = () => {
    setModoFormulario("crear");
    setPanelActivo("formulario");
    setHorarioEditandoId(null);
    setFormulario(crearFormularioHorarioVacio());
    setErrorFormulario("");
    setErrorCarga("");
    setMensajeExito("");
    setHorarioActivoPreview("");
    cerrarSelectores();
    setModalAbierto(true);
  };

  const validarFormulario = () => {
    if (!formulario.dia.trim()) return "El día es obligatorio.";
    if (!formulario.actividad.trim()) return "La actividad es obligatoria.";
    if (!formulario.hora.trim()) return "La hora es obligatoria.";
    if (!formulario.iconoTipo.trim()) return "El icono es obligatorio.";
    if (!formulario.descripcion.trim()) return "La descripción es obligatoria.";

    return "";
  };

  const guardarFormulario = async (e) => {
    e.preventDefault();

    const error = validarFormulario();

    if (error) {
      setErrorFormulario(error);
      setPanelActivo("formulario");
      return;
    }

    const token = obtenerToken();
    const esEdicion = modoFormulario === "editar";

    const datosHorario = {
      dia: formulario.dia.trim(),
      actividad: formulario.actividad.trim(),
      hora: formulario.hora.trim(),
      icono_tipo: formulario.iconoTipo.trim(),
      descripcion: formulario.descripcion.trim(),
      activo: true,
    };

    try {
      setGuardandoHorario(true);
      setErrorFormulario("");

      const url = esEdicion
        ? `${API_URL}/horarios/${horarioEditandoId}`
        : `${API_URL}/horarios`;

      const response = await fetch(url, {
        method: esEdicion ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(datosHorario),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const primerError = Object.values(data.errors)[0];

          setErrorFormulario(
            Array.isArray(primerError)
              ? primerError[0]
              : "Revisa los datos ingresados."
          );
        } else {
          setErrorFormulario(
            data.message || "No se pudo guardar el horario."
          );
        }

        setPanelActivo("formulario");
        return;
      }

      await cargarDatos();

      setMensajeExito(
        esEdicion
          ? "El horario se actualizó correctamente."
          : "El horario se creó correctamente."
      );

      cerrarModal();
    } catch (error) {
      console.error("Error guardando horario:", error);

      setErrorFormulario(
        "No se pudo conectar con el servidor."
      );
    } finally {
      setGuardandoHorario(false);
    }
  };

  const handleCrear = () => {
    abrirModalCrear();
  };

  const handleVer = (horario) => {
    setModoFormulario("ver");
    setPanelActivo("vista");
    setHorarioEditandoId(horario.id);
    cargarFormularioHorario(horario);
    setErrorFormulario("");
    setHorarioActivoPreview("");
    cerrarSelectores();
    setModalAbierto(true);
  };

  const handleEditar = (horario) => {
    setModoFormulario("editar");
    setPanelActivo("formulario");
    setHorarioEditandoId(horario.id);
    cargarFormularioHorario(horario);
    setErrorFormulario("");
    setHorarioActivoPreview("");
    cerrarSelectores();
    setModalAbierto(true);
  };

  const handleEliminar = async (horario) => {
    const confirmar = window.confirm(
      `¿Seguro que quieres eliminar el horario "${horario.actividad}"?`
    );

    if (!confirmar) return;

    const token = obtenerToken();

    try {
      setEliminandoId(horario.id);

      const response = await fetch(
        `${API_URL}/horarios/${horario.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let data = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(
          data?.message || "No se pudo eliminar el horario."
        );
      }

      setHorariosAdmin((actuales) =>
        actuales.filter((item) => item.id !== horario.id)
      );

      setErrorCarga("");
      setMensajeExito("El horario se eliminó correctamente.");
    } catch (error) {
      console.error("Error eliminando horario:", error);

      setMensajeExito("");
      setErrorCarga(
        error.message || "No se pudo eliminar el horario."
      );
    } finally {
      setEliminandoId(null);
    }
  };

  const alternarHorarioPreview = (id) => {
    setHorarioActivoPreview((actual) => (actual === id ? "" : id));
  };

  const renderSelectorHora = () => (
    <div className="admin-time-panel">
      <div className="admin-time-column">
        <strong>Hora</strong>

        <div>
          {HORAS.map((hora) => (
            <button
              type="button"
              className={horaTemporal.hora === hora ? "active" : ""}
              onClick={() => seleccionarHora(hora)}
              key={hora}
            >
              {hora}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-time-column">
        <strong>Minutos</strong>

        <div>
          {MINUTOS.map((minuto) => (
            <button
              type="button"
              className={horaTemporal.minuto === minuto ? "active" : ""}
              onClick={() => seleccionarMinuto(minuto)}
              key={minuto}
            >
              {minuto}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHorarioCard = (horario) => {
    const icono = opcionesIcono[horario.iconoTipo]?.icono || <FaHome />;

    return (
      <article
        className={`schedule-card ${
          horarioActivoPreview === horario.id ? "schedule-card-open" : ""
        }`}
        key={horario.id}
        onClick={() => alternarHorarioPreview(horario.id)}
      >
        <div className="schedule-card-top">
          <div className="schedule-icon">{icono}</div>

          <div className="schedule-day">
            <span>{horario.dia}</span>
          </div>

          <div className="schedule-mobile-main">
            <span>{horario.dia}</span>
            <strong>{horario.actividad}</strong>
          </div>

          <span className="schedule-mobile-time">{horario.hora}</span>

          <button
            type="button"
            className="schedule-accordion-toggle"
            onClick={(e) => {
              e.stopPropagation();
              alternarHorarioPreview(horario.id);
            }}
            aria-label={`Abrir horario de ${horario.dia}`}
            aria-expanded={horarioActivoPreview === horario.id}
          >
            <FaChevronDown />
          </button>
        </div>

        <div className="schedule-card-body">
          <h3>{horario.actividad}</h3>
          <p>{horario.descripcion}</p>
        </div>

        <div className="schedule-card-footer">
          <span className="time-label">Hora</span>
          <strong>{horario.hora}</strong>
        </div>
      </article>
    );
  };

  const renderHorarioPublico = () => (
    <section className="schedule admin-schedule-preview">
      <div className="schedule-bg schedule-bg-one"></div>
      <div className="schedule-bg schedule-bg-two"></div>
      <div className="schedule-bg schedule-bg-three"></div>

      <div className="schedule-container">
        <div className="section-title">
          <h2>Horarios de Reunión</h2>

          <p>
            Vista previa del horario tal como se mostrará en la sección pública
            de la iglesia.
          </p>
        </div>

        <div className="schedule-grid">
          {renderHorarioCard(horarioVistaPrevia)}
        </div>
      </div>
    </section>
  );

  const formularioHorarios = (
    <form
      className="admin-form"
      onSubmit={guardarFormulario}
      autoComplete="off"
    >
      {errorFormulario && (
        <div className="admin-form-error">{errorFormulario}</div>
      )}

      <div className="admin-form-grid">
        <label>
          <span>Día *</span>

          <div
            className={`admin-custom-select ${diaAbierto ? "is-open" : ""}`}
            ref={diaBoxRef}
          >
            <button
              type="button"
              className={`admin-custom-select-control ${
                formulario.dia ? "has-value" : ""
              }`}
              onClick={abrirDia}
              onKeyDown={(e) => manejarTeclaCampo(e, abrirDia)}
            >
              <span>{formulario.dia || "Selecciona un día"}</span>
            </button>

            {diaAbierto && (
              <div className="admin-custom-select-menu">
                {diasSemana.map((dia) => (
                  <button
                    type="button"
                    className={`admin-custom-select-option ${
                      formulario.dia === dia ? "active" : ""
                    }`}
                    onClick={() => seleccionarDia(dia)}
                    key={dia}
                  >
                    {dia}
                  </button>
                ))}
              </div>
            )}
          </div>
        </label>

        <label>
          <span>Actividad *</span>
          <input
            type="text"
            name="actividad"
            value={formulario.actividad}
            onChange={actualizarCampo}
            placeholder="Ej: Culto de Enseñanza"
            autoComplete="off"
          />
        </label>

        <label>
          <span>Hora *</span>

          <div
            className={`admin-picker-wrapper ${horaAbierta ? "is-open" : ""}`}
            ref={horaBoxRef}
          >
            <button
              type="button"
              className={`admin-picker-field ${
                formulario.hora ? "has-value" : ""
              }`}
              onClick={abrirSelectorHora}
              onKeyDown={(e) => manejarTeclaCampo(e, abrirSelectorHora)}
            >
              <span>{formulario.hora || "--:--"}</span>
            </button>

            {horaAbierta && renderSelectorHora()}
          </div>
        </label>
      </div>

      <div className="admin-icon-picker">
        <span>Icono *</span>

        <div className="admin-icon-picker-grid">
          {Object.entries(opcionesIcono).map(([key, opcion]) => (
            <button
              type="button"
              key={key}
              className={`admin-icon-option ${
                formulario.iconoTipo === key ? "active" : ""
              }`}
              onClick={() => seleccionarIcono(key)}
            >
              <span className="admin-icon-option-icon">{opcion.icono}</span>
              <small>{opcion.label}</small>
            </button>
          ))}
        </div>
      </div>

      <label>
        <span>Descripción *</span>
        <textarea
          name="descripcion"
          value={formulario.descripcion}
          onChange={actualizarCampo}
          placeholder="Ej: Un tiempo especial para buscar la presencia de Dios."
          rows="4"
          autoComplete="off"
        />
      </label>

      <div className="admin-form-actions">
        <button
          type="button"
          className="admin-form-cancel"
          onClick={cerrarModal}
          disabled={guardandoHorario}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="admin-form-save"
          disabled={guardandoHorario}
        >
          {guardandoHorario
            ? "Guardando..."
            : modoFormulario === "editar"
            ? "Guardar cambios"
            : "Crear horario"}
        </button>
      </div>
    </form>
  );

  const modalVistaUsuario = (
    <div
      className="admin-form-overlay admin-horario-preview-overlay"
      onClick={cerrarModal}
    >
      <div
        className="admin-public-preview-modal admin-horario-public-preview-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="admin-public-preview-close"
          onClick={cerrarModal}
          aria-label="Cerrar vista previa"
        >
          <X size={22} />
        </button>

        <div className="admin-public-preview-content">
          {renderHorarioPublico()}
        </div>
      </div>
    </div>
  );

  const modalFormulario = (
    <div className="admin-form-overlay" onClick={cerrarModal}>
      <div
        className="admin-form-modal admin-form-modal-wide"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-form-modal-header">
          <div>
            <span className="admin-crud-label">
              {modoFormulario === "editar"
                ? "Editar registro"
                : "Nuevo registro"}
            </span>

            <h2>
              {modoFormulario === "editar" ? "Editar horario" : "Crear horario"}
            </h2>
          </div>

          <button
            type="button"
            className="admin-form-close"
            onClick={cerrarModal}
            aria-label="Cerrar formulario"
          >
            <X size={22} />
          </button>
        </div>

        <div className="admin-editor-tabs">
          <button
            type="button"
            className={`admin-editor-tab ${
              panelActivo === "formulario" ? "active" : ""
            }`}
            onClick={() => setPanelActivo("formulario")}
          >
            Formulario
          </button>

          <button
            type="button"
            className={`admin-editor-tab ${
              panelActivo === "vista" ? "active" : ""
            }`}
            onClick={() => setPanelActivo("vista")}
          >
            Vista previa
          </button>
        </div>

        <div className="admin-editor-body">
          {panelActivo === "formulario" ? (
            <div className="admin-editor-form-wrap">{formularioHorarios}</div>
          ) : (
            <div className="admin-preview-page-shell">
              {renderHorarioPublico()}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="admin-crud-page">
      <div className="admin-crud-header">
        <div>
          <span className="admin-crud-label">Gestión administrativa</span>
          <h1>Horarios</h1>
          <p>
            Administra los horarios de reunión visibles en la página pública.
          </p>
        </div>

        <button
          type="button"
          className="admin-create-btn"
          onClick={handleCrear}
        >
          <PlusCircle size={20} />
          <span>Crear horario</span>
        </button>
      </div>

      {mensajeExito && (
        <div className="admin-horarios-success">
          {mensajeExito}
        </div>
      )}

      {errorCarga && (
        <div className="admin-form-error">
          {errorCarga}
        </div>
      )}

      {cargandoDatos && (
        <div className="admin-horarios-cargando">
          Cargando horarios...
        </div>
      )}

      <ListaAdmin
        columnas={columnasHorarios}
        datos={cargandoDatos ? [] : horariosProcesados}
        onVer={handleVer}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        mensajeVacio="No hay horarios registrados."
      />

      {modalAbierto &&
        createPortal(
          esModoVista ? modalVistaUsuario : modalFormulario,
          document.body
        )}
    </section>
  );
};

export default CrearHorarios;