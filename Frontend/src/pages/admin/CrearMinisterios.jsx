import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  Edit,
  Layers,
  PlusCircle,
  Search,
  Trash2,
  X,
} from "lucide-react";

import "../../styles/AdminCrudPage.css";
import "../../styles/MinisteriosAdmin.css";

const API_URL = "http://127.0.0.1:8000/api";

const formularioInicial = {
  nombre: "",
  descripcion: "",
};

const CrearMinisterios = () => {
  const [ministerios, setMinisterios] = useState([]);

  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [ministerioEditando, setMinisterioEditando] = useState(null);
  const [formulario, setFormulario] = useState(formularioInicial);

  const [error, setError] = useState("");
  const [guardado, setGuardado] = useState(false);

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [eliminandoId, setEliminandoId] = useState(null);

  const obtenerToken = () => {
    return localStorage.getItem("token");
  };

  const cargarMinisterios = async () => {
    const token = obtenerToken();

    try {
      setCargando(true);
      setError("");

      const response = await fetch(`${API_URL}/ministerios`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "No se pudieron cargar los ministerios."
        );
      }

      const listaMinisterios = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setMinisterios(listaMinisterios);
    } catch (error) {
      console.error("Error al cargar ministerios:", error);

      setError(
        error.message || "No se pudieron cargar los ministerios."
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarMinisterios();
  }, []);

  useEffect(() => {
    if (!guardado) return;

    const timeout = setTimeout(() => {
      setGuardado(false);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [guardado]);

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
      if (e.key === "Escape") {
        cerrarModal();
      }
    };

    window.addEventListener("keydown", cerrarConEscape);

    return () => {
      window.removeEventListener("keydown", cerrarConEscape);
    };
  }, [modalAbierto]);

  const ministeriosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    if (!texto) return ministerios;

    return ministerios.filter((ministerio) => {
      return (
        String(ministerio.nombre || "").toLowerCase().includes(texto) ||
        String(ministerio.descripcion || "").toLowerCase().includes(texto)
      );
    });
  }, [busqueda, ministerios]);

  const abrirCrear = () => {
    setModoEdicion(false);
    setMinisterioEditando(null);
    setFormulario(formularioInicial);
    setError("");
    setModalAbierto(true);
  };

  const abrirEditar = (ministerio) => {
    setModoEdicion(true);
    setMinisterioEditando(ministerio);

    setFormulario({
      nombre: ministerio.nombre || "",
      descripcion: ministerio.descripcion || "",
    });

    setError("");
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    if (guardando) return;

    setModalAbierto(false);
    setModoEdicion(false);
    setMinisterioEditando(null);
    setFormulario(formularioInicial);
    setError("");
  };

  const actualizarCampo = (e) => {
    const { name, value } = e.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));

    setError("");
  };

  const guardarFormulario = async (e) => {
    e.preventDefault();

    const nombreLimpio = formulario.nombre.trim();
    const descripcionLimpia = formulario.descripcion.trim();

    if (!nombreLimpio) {
      setError("El nombre del ministerio es obligatorio.");
      return;
    }

    if (!descripcionLimpia) {
      setError("La descripción del ministerio es obligatoria.");
      return;
    }

    const nombreRepetido = ministerios.some((ministerio) => {
      const mismoNombre =
        ministerio.nombre.trim().toLowerCase() ===
        nombreLimpio.toLowerCase();

      if (!modoEdicion) return mismoNombre;

      return (
        mismoNombre &&
        ministerio.id !== ministerioEditando.id
      );
    });

    if (nombreRepetido) {
      setError("Ya existe un ministerio con ese nombre.");
      return;
    }

    const token = obtenerToken();

    try {
      setGuardando(true);
      setError("");

      const url = modoEdicion
        ? `${API_URL}/ministerios/${ministerioEditando.id}`
        : `${API_URL}/ministerios`;

      const metodo = modoEdicion ? "PUT" : "POST";

      const response = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: nombreLimpio,
          descripcion: descripcionLimpia,
          activo: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors?.nombre) {
          setError(data.errors.nombre[0]);
        } else if (data.errors?.descripcion) {
          setError(data.errors.descripcion[0]);
        } else {
          setError(
            data.message || "No se pudo guardar el ministerio."
          );
        }

        return;
      }

      await cargarMinisterios();

      setGuardado(true);
      setModalAbierto(false);
      setModoEdicion(false);
      setMinisterioEditando(null);
      setFormulario(formularioInicial);
      setError("");
    } catch (error) {
      console.error("Error al guardar ministerio:", error);

      setError(
        "No se pudo conectar con el servidor."
      );
    } finally {
      setGuardando(false);
    }
  };

  const eliminarMinisterio = async (idMinisterio) => {
    const confirmar = window.confirm(
      "¿Seguro que quieres eliminar este ministerio?"
    );

    if (!confirmar) return;

    const token = obtenerToken();

    try {
      setEliminandoId(idMinisterio);
      setError("");

      const response = await fetch(
        `${API_URL}/ministerios/${idMinisterio}`,
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
          data?.message || "No se pudo eliminar el ministerio."
        );
      }

      setMinisterios((actuales) =>
        actuales.filter(
          (ministerio) => ministerio.id !== idMinisterio
        )
      );

      setGuardado(true);
    } catch (error) {
      console.error("Error al eliminar ministerio:", error);

      setError(
        error.message || "No se pudo eliminar el ministerio."
      );
    } finally {
      setEliminandoId(null);
    }
  };

  const modalMinisterios = (
    <div
      className="admin-form-overlay admin-ministerios-overlay"
      onClick={cerrarModal}
    >
      <form
        className="admin-form-modal admin-ministerios-modal"
        onSubmit={guardarFormulario}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-form-modal-header">
          <div>
            <span className="admin-crud-label">
              {modoEdicion ? "Editar registro" : "Nuevo registro"}
            </span>

            <h2>
              {modoEdicion
                ? "Editar ministerio"
                : "Crear ministerio"}
            </h2>
          </div>

          <button
            type="button"
            className="admin-form-close"
            onClick={cerrarModal}
            aria-label="Cerrar"
            disabled={guardando}
          >
            <X size={22} />
          </button>
        </div>

        {error && (
          <div className="admin-form-error">
            {error}
          </div>
        )}

        <div className="admin-form-grid single">
          <label>
            <span>Nombre del ministerio</span>

            <input
              type="text"
              name="nombre"
              value={formulario.nombre}
              onChange={actualizarCampo}
              placeholder="Ej: Jóvenes"
              disabled={guardando}
            />
          </label>

          <label>
            <span>Descripción</span>

            <textarea
              name="descripcion"
              value={formulario.descripcion}
              onChange={actualizarCampo}
              placeholder="Describe brevemente este ministerio..."
              rows="5"
              disabled={guardando}
            />
          </label>
        </div>

        <div className="admin-form-actions">
          <button
            type="button"
            className="admin-form-cancel"
            onClick={cerrarModal}
            disabled={guardando}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="admin-form-save"
            disabled={guardando}
          >
            {guardando
              ? "Guardando..."
              : modoEdicion
              ? "Guardar cambios"
              : "Guardar ministerio"}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <section className="admin-crud-page">
      <div className="admin-crud-header">
        <div>
          <span className="admin-crud-label">
            Gestión administrativa
          </span>

          <h1>Ministerios</h1>

          <p>
            Crea y administra los ministerios que luego se usarán en
            eventos, publicaciones, organigrama y otras secciones.
          </p>
        </div>

        <button
          type="button"
          className="admin-create-btn"
          onClick={abrirCrear}
        >
          <PlusCircle size={20} />
          <span>Nuevo ministerio</span>
        </button>
      </div>

      {guardado && (
        <div className="admin-ministerios-success">
          Los cambios se guardaron correctamente.
        </div>
      )}

      {!modalAbierto && error && (
        <div className="admin-form-error">
          {error}
        </div>
      )}

      <div className="admin-crud-toolbar">
        <div className="admin-search-box">
          <Search size={18} />

          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar ministerio..."
          />
        </div>
      </div>

      <div className="admin-ministerios-grid">
        {cargando ? (
          <div className="admin-empty-state">
            <h3>Cargando ministerios...</h3>
            <p>Obteniendo información del servidor.</p>
          </div>
        ) : ministeriosFiltrados.length > 0 ? (
          ministeriosFiltrados.map((ministerio) => (
            <article
              className="admin-ministerio-card"
              key={ministerio.id}
            >
              <div className="admin-ministerio-icon">
                <Layers size={24} />
              </div>

              <div className="admin-ministerio-content">
                <h3>{ministerio.nombre}</h3>
                <p>{ministerio.descripcion}</p>
              </div>

              <div className="admin-ministerio-actions">
                <button
                  type="button"
                  className="admin-table-btn edit"
                  onClick={() => abrirEditar(ministerio)}
                  title="Editar ministerio"
                  disabled={eliminandoId === ministerio.id}
                >
                  <Edit size={17} />
                </button>

                <button
                  type="button"
                  className="admin-table-btn delete"
                  onClick={() =>
                    eliminarMinisterio(ministerio.id)
                  }
                  title="Eliminar ministerio"
                  disabled={eliminandoId === ministerio.id}
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="admin-empty-state">
            <h3>No hay ministerios encontrados</h3>

            <p>
              Prueba con otra búsqueda o crea un nuevo ministerio.
            </p>
          </div>
        )}
      </div>

      {modalAbierto &&
        createPortal(modalMinisterios, document.body)}
    </section>
  );
};

export default CrearMinisterios;