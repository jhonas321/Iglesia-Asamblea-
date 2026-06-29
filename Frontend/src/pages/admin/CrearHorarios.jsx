import { useCallback, useEffect, useMemo, useState } from "react";
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
import {
  guardarHorarios,
  obtenerHorariosGuardados,
} from "../../data/adminStorage";

import "../../styles/AdminCrudPage.css";
import "../../styles/horarios-seccion.css";
import "../../styles/HorariosAdmin.css";

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

const crearFormularioHorarioVacio = () => ({
  dia: "Lunes",
  actividad: "",
  hora: "19:00",
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

const CrearHorarios = () => {
  const [horariosAdmin, setHorariosAdmin] = useState(() =>
    obtenerHorariosGuardados()
  );

  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("crear");
  const [panelActivo, setPanelActivo] = useState("formulario");
  const [horarioEditandoId, setHorarioEditandoId] = useState(null);
  const [formulario, setFormulario] = useState(crearFormularioHorarioVacio);
  const [errorFormulario, setErrorFormulario] = useState("");
  const [horarioActivoPreview, setHorarioActivoPreview] = useState("");

  const esModoVista = modoFormulario === "ver";

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
  }, []);

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
      hora: horario.hora || "19:00",
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
    setHorarioActivoPreview("");
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

  const guardarFormulario = (e) => {
    e.preventDefault();

    const error = validarFormulario();

    if (error) {
      setErrorFormulario(error);
      setPanelActivo("formulario");
      return;
    }

    const horarioNormalizado = {
      dia: formulario.dia.trim(),
      actividad: formulario.actividad.trim(),
      hora: formulario.hora.trim(),
      iconoTipo: formulario.iconoTipo.trim(),
      descripcion: formulario.descripcion.trim(),
    };

    let nuevaLista = [];

    if (modoFormulario === "editar") {
      nuevaLista = horariosAdmin.map((horario) =>
        horario.id === horarioEditandoId
          ? {
              ...horario,
              ...horarioNormalizado,
            }
          : horario
      );
    } else {
      const nuevoHorario = {
        id: Date.now(),
        ...horarioNormalizado,
      };

      nuevaLista = [...horariosAdmin, nuevoHorario];
    }

    setHorariosAdmin(nuevaLista);
    guardarHorarios(nuevaLista);
    cerrarModal();
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
    setModalAbierto(true);
  };

  const handleEditar = (horario) => {
    setModoFormulario("editar");
    setPanelActivo("formulario");
    setHorarioEditandoId(horario.id);
    cargarFormularioHorario(horario);
    setErrorFormulario("");
    setHorarioActivoPreview("");
    setModalAbierto(true);
  };

  const handleEliminar = (horario) => {
    const confirmar = window.confirm(
      `¿Seguro que quieres eliminar el horario "${horario.actividad}"?`
    );

    if (!confirmar) return;

    const nuevaLista = horariosAdmin.filter((item) => item.id !== horario.id);

    setHorariosAdmin(nuevaLista);
    guardarHorarios(nuevaLista);
  };

  const alternarHorarioPreview = (id) => {
    setHorarioActivoPreview((actual) => (actual === id ? "" : id));
  };

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
    <form className="admin-form" onSubmit={guardarFormulario}>
      {errorFormulario && (
        <div className="admin-form-error">{errorFormulario}</div>
      )}

      <div className="admin-form-grid">
        <label>
          <span>Día *</span>

          <div className="admin-select-wrap">
            <select
              name="dia"
              value={formulario.dia}
              onChange={actualizarCampo}
              className="admin-form-select"
            >
              {diasSemana.map((dia) => (
                <option value={dia} key={dia}>
                  {dia}
                </option>
              ))}
            </select>
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
          />
        </label>

        <label>
          <span>Hora *</span>
          <input
            type="time"
            name="hora"
            value={formulario.hora}
            onChange={actualizarCampo}
          />
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
        />
      </label>

      <div className="admin-form-actions">
        <button
          type="button"
          className="admin-form-cancel"
          onClick={cerrarModal}
        >
          Cancelar
        </button>

        <button type="submit" className="admin-form-save">
          {modoFormulario === "editar" ? "Guardar cambios" : "Crear horario"}
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

      <ListaAdmin
        columnas={columnasHorarios}
        datos={horariosProcesados}
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