import { useEffect, useMemo, useState } from "react";
import {
  Edit,
  Layers,
  PlusCircle,
  Save,
  Search,
  Trash2,
  X,
} from "lucide-react";

import {
  guardarMinisterios,
  obtenerMinisteriosGuardados,
} from "../../data/adminStorage";

import "../../styles/AdminCrudPage.css";
import "../../styles/MinisteriosAdmin.css";

const formularioInicial = {
  nombre: "",
  descripcion: "",
};

const CrearMinisterios = () => {
  const [ministerios, setMinisterios] = useState(() =>
    obtenerMinisteriosGuardados()
  );

  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [ministerioEditando, setMinisterioEditando] = useState(null);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [error, setError] = useState("");
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    if (!guardado) return;

    const timeout = setTimeout(() => {
      setGuardado(false);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [guardado]);

  const ministeriosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    if (!texto) return ministerios;

    return ministerios.filter((ministerio) => {
      return (
        ministerio.nombre.toLowerCase().includes(texto) ||
        ministerio.descripcion.toLowerCase().includes(texto)
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
      nombre: ministerio.nombre,
      descripcion: ministerio.descripcion,
    });
    setError("");
    setModalAbierto(true);
  };

  const cerrarModal = () => {
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

  const guardarFormulario = (e) => {
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

      return mismoNombre && ministerio.id !== ministerioEditando.id;
    });

    if (nombreRepetido) {
      setError("Ya existe un ministerio con ese nombre.");
      return;
    }

    let nuevaLista = [];

    if (modoEdicion) {
      nuevaLista = ministerios.map((ministerio) =>
        ministerio.id === ministerioEditando.id
          ? {
              ...ministerio,
              nombre: nombreLimpio,
              descripcion: descripcionLimpia,
            }
          : ministerio
      );
    } else {
      const nuevoMinisterio = {
        id: `ministerio-${Date.now()}`,
        nombre: nombreLimpio,
        descripcion: descripcionLimpia,
      };

      nuevaLista = [nuevoMinisterio, ...ministerios];
    }

    setMinisterios(nuevaLista);
    guardarMinisterios(nuevaLista);
    setGuardado(true);
    cerrarModal();
  };

  const eliminarMinisterio = (idMinisterio) => {
    const confirmar = window.confirm(
      "¿Seguro que quieres eliminar este ministerio?"
    );

    if (!confirmar) return;

    const nuevaLista = ministerios.filter(
      (ministerio) => ministerio.id !== idMinisterio
    );

    setMinisterios(nuevaLista);
    guardarMinisterios(nuevaLista);
    setGuardado(true);
  };

  return (
    <section className="admin-crud-page">
      <div className="admin-crud-header">
        <div>
          <span className="admin-crud-label">Gestión administrativa</span>

          <h1>Ministerios</h1>

          <p>
            Crea y administra los ministerios que luego se usarán en eventos,
            publicaciones, organigrama y otras secciones.
          </p>
        </div>

        <button type="button" className="admin-create-btn" onClick={abrirCrear}>
          <PlusCircle size={20} />
          <span>Nuevo ministerio</span>
        </button>
      </div>

      {guardado && (
        <div className="admin-ministerios-success">
          Los cambios se guardaron correctamente.
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
        {ministeriosFiltrados.length > 0 ? (
          ministeriosFiltrados.map((ministerio) => (
            <article className="admin-ministerio-card" key={ministerio.id}>
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
                >
                  <Edit size={17} />
                </button>

                <button
                  type="button"
                  className="admin-table-btn delete"
                  onClick={() => eliminarMinisterio(ministerio.id)}
                  title="Eliminar ministerio"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="admin-empty-state">
            <h3>No hay ministerios encontrados</h3>
            <p>Prueba con otra búsqueda o crea un nuevo ministerio.</p>
          </div>
        )}
      </div>

      {modalAbierto && (
        <div className="admin-form-overlay">
          <form className="admin-form-modal" onSubmit={guardarFormulario}>
            <div className="admin-form-modal-header">
              <div>
                <span className="admin-crud-label">
                  {modoEdicion ? "Editar registro" : "Nuevo registro"}
                </span>

                <h2>
                  {modoEdicion ? "Editar ministerio" : "Crear ministerio"}
                </h2>
              </div>

              <button
                type="button"
                className="admin-form-close"
                onClick={cerrarModal}
                aria-label="Cerrar"
              >
                <X size={22} />
              </button>
            </div>

            {error && <div className="admin-form-error">{error}</div>}

            <div className="admin-form-grid single">
              <label>
                <span>Nombre del ministerio</span>

                <input
                  type="text"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={actualizarCampo}
                  placeholder="Ej: Jóvenes"
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
                />
              </label>
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
                <Save size={18} />
                Guardar ministerio
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default CrearMinisterios;