import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { PlusCircle, X, Trash2, UserPlus } from "lucide-react";
import { FaRegUser, FaRegUserCircle } from "react-icons/fa";

import ListaAdmin from "../../components/admin/ListaAdmin";
import {
  guardarOrganigrama,
  obtenerOrganigramaGuardado,
} from "../../data/adminStorage";

import "../../styles/AdminCrudPage.css";
import "../../styles/organigrama.css";
import "../../styles/OrganigramaAdmin.css";

const crearMiembroVacio = () => ({
  id: `miembro-${Date.now()}`,
  cargo: "",
  nombre: "",
  genero: "hombre",
});

const crearFormularioOrganigramaVacio = () => ({
  titulo: "",
  descripcion: "",
  tipo: "normal",
  miembros: [crearMiembroVacio()],
});

function Avatar({ genero = "hombre", nombre = "", principal = false }) {
  const esMujer = genero === "mujer";
  const IconoAvatar = principal ? FaRegUserCircle : FaRegUser;

  return (
    <div
      className={`organigrama-avatar ${
        esMujer ? "organigrama-avatar-mujer" : "organigrama-avatar-hombre"
      } ${principal ? "organigrama-avatar-principal" : ""}`}
      role="img"
      aria-label={`Avatar de ${nombre}`}
    >
      <IconoAvatar className="organigrama-avatar-icono" aria-hidden="true" />
    </div>
  );
}

const CrearOrganigrama = () => {
  const [organigramaAdmin, setOrganigramaAdmin] = useState(() =>
    obtenerOrganigramaGuardado()
  );

  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("crear");
  const [panelActivo, setPanelActivo] = useState("formulario");
  const [seccionEditandoId, setSeccionEditandoId] = useState(null);
  const [formulario, setFormulario] = useState(
    crearFormularioOrganigramaVacio
  );
  const [errorFormulario, setErrorFormulario] = useState("");

  const esModoVista = modoFormulario === "ver";

  const organigramaProcesado = useMemo(() => {
    return [...organigramaAdmin].sort((a, b) => {
      if (a.tipo === "principal" && b.tipo !== "principal") return -1;
      if (a.tipo !== "principal" && b.tipo === "principal") return 1;
      return 0;
    });
  }, [organigramaAdmin]);

  const cerrarModal = useCallback(() => {
    setModalAbierto(false);
    setModoFormulario("crear");
    setPanelActivo("formulario");
    setSeccionEditandoId(null);
    setFormulario(crearFormularioOrganigramaVacio());
    setErrorFormulario("");
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

  const columnasOrganigrama = [
    { key: "titulo", label: "Sección" },
    { key: "descripcion", label: "Descripción" },
    {
      key: "tipo",
      label: "Tipo",
      render: (seccion) => (
        <span
          className={`admin-status ${
            seccion.tipo === "principal" ? "publicado" : "proximo"
          }`}
        >
          {seccion.tipo === "principal" ? "Principal" : "Normal"}
        </span>
      ),
    },
    {
      key: "miembros",
      label: "Miembros",
      render: (seccion) => `${seccion.miembros.length} miembros`,
    },
  ];

  const actualizarCampo = (e) => {
    const { name, value } = e.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));

    setErrorFormulario("");
  };

  const actualizarMiembro = (idMiembro, campo, valor) => {
    setFormulario((actual) => ({
      ...actual,
      miembros: actual.miembros.map((miembro) =>
        miembro.id === idMiembro
          ? {
              ...miembro,
              [campo]: valor,
            }
          : miembro
      ),
    }));

    setErrorFormulario("");
  };

  const agregarMiembro = () => {
    setFormulario((actual) => ({
      ...actual,
      miembros: [...actual.miembros, crearMiembroVacio()],
    }));

    setErrorFormulario("");
  };

  const eliminarMiembro = (idMiembro) => {
    setFormulario((actual) => {
      if (actual.miembros.length === 1) return actual;

      return {
        ...actual,
        miembros: actual.miembros.filter((miembro) => miembro.id !== idMiembro),
      };
    });
  };

  const cargarFormularioSeccion = (seccion) => {
    setFormulario({
      titulo: seccion.titulo || "",
      descripcion: seccion.descripcion || "",
      tipo: seccion.tipo || "normal",
      miembros:
        Array.isArray(seccion.miembros) && seccion.miembros.length > 0
          ? seccion.miembros
          : [crearMiembroVacio()],
    });
  };

  const validarFormulario = () => {
    if (!formulario.titulo.trim())
      return "El título de la sección es obligatorio.";

    if (!formulario.descripcion.trim())
      return "La descripción de la sección es obligatoria.";

    const miembrosValidos = formulario.miembros.filter(
      (miembro) => miembro.nombre.trim() && miembro.cargo.trim()
    );

    if (miembrosValidos.length === 0)
      return "Debes agregar al menos un miembro con nombre y cargo.";

    const hayMiembroIncompleto = formulario.miembros.some(
      (miembro) =>
        (miembro.nombre.trim() && !miembro.cargo.trim()) ||
        (!miembro.nombre.trim() && miembro.cargo.trim())
    );

    if (hayMiembroIncompleto)
      return "Todos los miembros agregados deben tener nombre y cargo.";

    if (formulario.tipo === "principal") {
      const yaExistePrincipal = organigramaAdmin.some(
        (seccion) =>
          seccion.tipo === "principal" && seccion.id !== seccionEditandoId
      );

      if (yaExistePrincipal)
        return "Solo puede existir una sección principal en el organigrama.";
    }

    return "";
  };

  const abrirModalCrear = () => {
    setModoFormulario("crear");
    setPanelActivo("formulario");
    setSeccionEditandoId(null);
    setFormulario(crearFormularioOrganigramaVacio());
    setErrorFormulario("");
    setModalAbierto(true);
  };

  const guardarFormulario = (e) => {
    e.preventDefault();

    const error = validarFormulario();

    if (error) {
      setErrorFormulario(error);
      setPanelActivo("formulario");
      return;
    }

    const miembrosNormalizados = formulario.miembros
      .filter((miembro) => miembro.nombre.trim() && miembro.cargo.trim())
      .map((miembro) => ({
        id: miembro.id || `miembro-${Date.now()}`,
        cargo: miembro.cargo.trim(),
        nombre: miembro.nombre.trim(),
        genero: miembro.genero === "mujer" ? "mujer" : "hombre",
      }));

    const seccionNormalizada = {
      titulo: formulario.titulo.trim(),
      descripcion: formulario.descripcion.trim(),
      tipo: formulario.tipo === "principal" ? "principal" : "normal",
      miembros: miembrosNormalizados,
    };

    let nuevaLista = [];

    if (modoFormulario === "editar") {
      nuevaLista = organigramaAdmin.map((seccion) =>
        seccion.id === seccionEditandoId
          ? {
              ...seccion,
              ...seccionNormalizada,
            }
          : seccion
      );
    } else {
      const nuevaSeccion = {
        id: Date.now(),
        ...seccionNormalizada,
      };

      nuevaLista =
        nuevaSeccion.tipo === "principal"
          ? [nuevaSeccion, ...organigramaAdmin]
          : [...organigramaAdmin, nuevaSeccion];
    }

    setOrganigramaAdmin(nuevaLista);
    guardarOrganigrama(nuevaLista);
    cerrarModal();
  };

  const handleCrear = () => {
    abrirModalCrear();
  };

  const handleVer = (seccion) => {
    setModoFormulario("ver");
    setPanelActivo("vista");
    setSeccionEditandoId(seccion.id);
    cargarFormularioSeccion(seccion);
    setErrorFormulario("");
    setModalAbierto(true);
  };

  const handleEditar = (seccion) => {
    setModoFormulario("editar");
    setPanelActivo("formulario");
    setSeccionEditandoId(seccion.id);
    cargarFormularioSeccion(seccion);
    setErrorFormulario("");
    setModalAbierto(true);
  };

  const handleEliminar = (seccion) => {
    const confirmar = window.confirm(
      `¿Seguro que quieres eliminar la sección "${seccion.titulo}"?`
    );

    if (!confirmar) return;

    const nuevaLista = organigramaAdmin.filter((item) => item.id !== seccion.id);

    setOrganigramaAdmin(nuevaLista);
    guardarOrganigrama(nuevaLista);
  };

  const obtenerSeccionesVistaPrevia = () => {
    const seccionPreview = {
      id: seccionEditandoId || "preview-organigrama",
      titulo: formulario.titulo || "Nueva sección",
      descripcion:
        formulario.descripcion || "Descripción de la sección del organigrama.",
      tipo: formulario.tipo || "normal",
      miembros: formulario.miembros.map((miembro, index) => ({
        id: miembro.id || `preview-miembro-${index}`,
        cargo: miembro.cargo || "Cargo",
        nombre: miembro.nombre || "Nombre del miembro",
        genero: miembro.genero || "hombre",
      })),
    };

    if (modoFormulario === "crear") {
      return [seccionPreview, ...organigramaProcesado];
    }

    return organigramaProcesado.map((seccion) =>
      seccion.id === seccionEditandoId ? seccionPreview : seccion
    );
  };

  const renderOrganigramaPublico = () => {
    const seccionesPreview = obtenerSeccionesVistaPrevia();

    const pastorado = seccionesPreview.find(
      (seccion) => seccion.tipo === "principal"
    );

    const pastorPrincipal = pastorado?.miembros?.[0];

    const ministerios = seccionesPreview.filter(
      (seccion) => seccion.tipo !== "principal"
    );

    return (
      <section id="organigrama-page" className="admin-organigrama-preview">
        <div className="organigrama-decoracion decoracion-uno"></div>
        <div className="organigrama-decoracion decoracion-dos"></div>

        <div className="organigrama-hero">
          <span className="organigrama-etiqueta">
            Estructura de liderazgo
          </span>

          <h1>Organigrama General</h1>

          <p>
            Vista previa del organigrama tal como se mostrará en la página
            pública.
          </p>
        </div>

        {pastorado && pastorPrincipal && (
          <div className="organigrama-principal">
            <div className="organigrama-linea-superior"></div>

            <div className="organigrama-principal-card">
              <Avatar
                genero={pastorPrincipal.genero}
                nombre={pastorPrincipal.nombre}
                principal
              />

              <div className="organigrama-principal-info">
                <span>{pastorado.titulo}</span>
                <h2>{pastorPrincipal.cargo}</h2>
                <p>{pastorPrincipal.nombre}</p>
                <small>{pastorado.descripcion}</small>
              </div>
            </div>

            <div className="organigrama-linea-bajada"></div>
          </div>
        )}

        <div className="organigrama-ministerios">
          {ministerios.map((seccion, index) => (
            <div className="organigrama-seccion" key={seccion.id}>
              <div className="organigrama-seccion-header">
                <div className="organigrama-numero">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <h2>{seccion.titulo}</h2>
                  <p>{seccion.descripcion}</p>

                  <small className="organigrama-total">
                    {seccion.miembros.length} miembros
                  </small>
                </div>
              </div>

              <div className="organigrama-grid">
                {seccion.miembros.map((miembro) => (
                  <div className="organigrama-card" key={miembro.id}>
                    <Avatar genero={miembro.genero} nombre={miembro.nombre} />

                    <div className="organigrama-info">
                      <h3>{miembro.nombre}</h3>
                      <p>{miembro.cargo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const formularioOrganigrama = (
    <form className="admin-form" onSubmit={guardarFormulario}>
      {errorFormulario && (
        <div className="admin-form-error">{errorFormulario}</div>
      )}

      <div className="admin-form-grid">
        <label>
          <span>Título de sección *</span>
          <input
            type="text"
            name="titulo"
            value={formulario.titulo}
            onChange={actualizarCampo}
            placeholder="Ej: Dorcas"
          />
        </label>

        <label>
          <span>Tipo *</span>

          <div className="admin-select-wrap">
            <select
              name="tipo"
              value={formulario.tipo}
              onChange={actualizarCampo}
              className="admin-form-select"
            >
              <option value="normal">Normal</option>
              <option value="principal">Principal</option>
            </select>
          </div>
        </label>
      </div>

      <label>
        <span>Descripción *</span>
        <textarea
          name="descripcion"
          value={formulario.descripcion}
          onChange={actualizarCampo}
          placeholder="Ej: Ministerio de mujeres al servicio de la iglesia."
          rows="4"
        />
      </label>

      <div className="admin-members-box">
        <div className="admin-members-header">
          <div>
            <h3>Miembros</h3>
            <p>Agrega los integrantes, cargos y género de cada persona.</p>
          </div>

          <button
            type="button"
            className="admin-member-add-btn"
            onClick={agregarMiembro}
          >
            <UserPlus size={18} />
            Agregar miembro
          </button>
        </div>

        <div className="admin-members-list">
          {formulario.miembros.map((miembro, index) => (
            <div className="admin-member-item" key={miembro.id}>
              <div className="admin-member-index">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="admin-member-fields">
                <label>
                  <span>Nombre *</span>
                  <input
                    type="text"
                    value={miembro.nombre}
                    onChange={(e) =>
                      actualizarMiembro(miembro.id, "nombre", e.target.value)
                    }
                    placeholder="Ej: Olga Quispe"
                  />
                </label>

                <label>
                  <span>Cargo *</span>
                  <input
                    type="text"
                    value={miembro.cargo}
                    onChange={(e) =>
                      actualizarMiembro(miembro.id, "cargo", e.target.value)
                    }
                    placeholder="Ej: Presidenta"
                  />
                </label>

                <label>
                  <span>Género *</span>

                  <div className="admin-select-wrap">
                    <select
                      value={miembro.genero}
                      onChange={(e) =>
                        actualizarMiembro(
                          miembro.id,
                          "genero",
                          e.target.value
                        )
                      }
                      className="admin-form-select"
                    >
                      <option value="hombre">Hombre</option>
                      <option value="mujer">Mujer</option>
                    </select>
                  </div>
                </label>
              </div>

              <button
                type="button"
                className="admin-member-delete-btn"
                onClick={() => eliminarMiembro(miembro.id)}
                disabled={formulario.miembros.length === 1}
                aria-label="Eliminar miembro"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-form-actions">
        <button
          type="button"
          className="admin-form-cancel"
          onClick={cerrarModal}
        >
          Cancelar
        </button>

        <button type="submit" className="admin-form-save">
          {modoFormulario === "editar" ? "Guardar cambios" : "Crear sección"}
        </button>
      </div>
    </form>
  );

  const modalVistaUsuario = (
    <div className="admin-form-overlay" onClick={cerrarModal}>
      <div
        className="admin-public-preview-modal admin-organigrama-public-preview-modal"
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
          {renderOrganigramaPublico()}
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
              {modoFormulario === "editar" ? "Editar registro" : "Nuevo registro"}
            </span>

            <h2>
              {modoFormulario === "editar"
                ? "Editar sección"
                : "Crear sección"}
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
            <div className="admin-editor-form-wrap">{formularioOrganigrama}</div>
          ) : (
            <div className="admin-preview-page-shell">
              {renderOrganigramaPublico()}
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
          <h1>Organigrama</h1>
          <p>
            Administra la estructura de liderazgo, secciones y miembros de la
            iglesia.
          </p>
        </div>

        <button type="button" className="admin-create-btn" onClick={handleCrear}>
          <PlusCircle size={20} />
          <span>Crear sección</span>
        </button>
      </div>

      <ListaAdmin
        columnas={columnasOrganigrama}
        datos={organigramaProcesado}
        onVer={handleVer}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        mensajeVacio="No hay secciones registradas."
      />

      {modalAbierto &&
        createPortal(
          esModoVista ? modalVistaUsuario : modalFormulario,
          document.body
        )}
    </section>
  );
};

export default CrearOrganigrama;