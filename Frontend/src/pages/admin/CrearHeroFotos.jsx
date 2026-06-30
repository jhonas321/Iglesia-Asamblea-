import { useEffect, useState } from "react";
import {
  ImagePlus,
  PlusCircle,
  RotateCcw,
  Save,
  Trash2,
  UploadCloud,
} from "lucide-react";

import {
  guardarHeroFotos,
  obtenerHeroFotosGuardadas,
} from "../../data/adminStorage";

import "../../styles/AdminCrudPage.css";
import "../../styles/HeroFotosAdmin.css";

const MAX_FOTOS_HERO = 8;
const MIN_FOTOS_HERO = 1;

const convertirArchivoABase64 = (archivo) => {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();

    lector.onload = () => resolve(lector.result);
    lector.onerror = () => reject(new Error("No se pudo leer la imagen."));
    lector.readAsDataURL(archivo);
  });
};

const renumerarFotos = (lista) => {
  return lista.map((foto, index) => ({
    ...foto,
    titulo: `Foto ${index + 1}`,
  }));
};

const CrearHeroFotos = () => {
  const [fotos, setFotos] = useState(() =>
    renumerarFotos(obtenerHeroFotosGuardadas())
  );

  const [guardado, setGuardado] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!guardado) return;

    const timeout = setTimeout(() => {
      setGuardado(false);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [guardado]);

  const agregarFoto = () => {
    if (fotos.length >= MAX_FOTOS_HERO) {
      setError(`Solo puedes agregar hasta ${MAX_FOTOS_HERO} fotos.`);
      return;
    }

    const nuevaFoto = {
      id: `hero-${Date.now()}`,
      titulo: `Foto ${fotos.length + 1}`,
      imagen: "",
    };

    setFotos((actual) => renumerarFotos([...actual, nuevaFoto]));
    setError("");
    setGuardado(false);
  };

  const eliminarFoto = (idFoto) => {
    if (fotos.length <= MIN_FOTOS_HERO) {
      setError("Debe quedar al menos una foto en el inicio.");
      return;
    }

    const confirmar = window.confirm("¿Seguro que quieres eliminar esta foto?");

    if (!confirmar) return;

    setFotos((actual) =>
      renumerarFotos(actual.filter((foto) => foto.id !== idFoto))
    );

    setError("");
    setGuardado(false);
  };

  const cambiarImagen = async (idFoto, e) => {
    const archivo = e.target.files?.[0];

    if (!archivo) return;

    if (!archivo.type.startsWith("image/")) {
      setError("Debes seleccionar una imagen válida.");
      return;
    }

    try {
      const imagenBase64 = await convertirArchivoABase64(archivo);

      setFotos((actual) =>
        renumerarFotos(
          actual.map((foto) =>
            foto.id === idFoto
              ? {
                  ...foto,
                  imagen: imagenBase64,
                }
              : foto
          )
        )
      );

      setError("");
      setGuardado(false);
    } catch (error) {
      setError("No se pudo cargar la imagen.");
    }
  };

  const guardarFormulario = (e) => {
    e.preventDefault();

    if (fotos.length < MIN_FOTOS_HERO) {
      setError("Debe existir al menos una foto.");
      return;
    }

    if (fotos.length > MAX_FOTOS_HERO) {
      setError(`Solo puedes guardar hasta ${MAX_FOTOS_HERO} fotos.`);
      return;
    }

    const hayFotoVacia = fotos.some((foto) => !foto.imagen);

    if (hayFotoVacia) {
      setError("Todas las fotos deben tener una imagen antes de guardar.");
      return;
    }

    guardarHeroFotos(renumerarFotos(fotos));
    setGuardado(true);
    setError("");
  };

  const descartarCambios = () => {
    const confirmar = window.confirm(
      "¿Seguro que quieres descartar los cambios no guardados?"
    );

    if (!confirmar) return;

    setFotos(renumerarFotos(obtenerHeroFotosGuardadas()));
    setGuardado(false);
    setError("");
  };

  return (
    <section className="admin-crud-page">
      <div className="admin-crud-header">
        <div>
          <span className="admin-crud-label">Gestión administrativa</span>

          <h1>Fotos Inicio</h1>

          <p>
            Cambia solamente las fotos principales del inicio. Puedes manejar
            mínimo {MIN_FOTOS_HERO} foto y máximo {MAX_FOTOS_HERO} fotos.
          </p>
        </div>

        <button
          type="button"
          className="admin-create-btn admin-hero-add-btn"
          onClick={agregarFoto}
          disabled={fotos.length >= MAX_FOTOS_HERO}
        >
          <PlusCircle size={20} />
          <span>Agregar foto</span>
        </button>
      </div>

      <form className="admin-hero-fotos-card" onSubmit={guardarFormulario}>
        {guardado && (
          <div className="admin-hero-success">
            Las fotos del inicio se guardaron correctamente.
          </div>
        )}

        {error && <div className="admin-hero-error">{error}</div>}

        <div className="admin-hero-fotos-count">
          <strong>{fotos.length}</strong> de {MAX_FOTOS_HERO} fotos agregadas
        </div>

        <div className="admin-hero-fotos-grid">
          {fotos.map((foto, index) => (
            <div className="admin-hero-foto-item" key={foto.id}>
              <div className="admin-hero-foto-preview">
                {foto.imagen ? (
                  <img src={foto.imagen} alt={`Foto ${index + 1}`} />
                ) : (
                  <div className="admin-hero-foto-empty">
                    <ImagePlus size={34} />
                    <span>Sin imagen</span>
                  </div>
                )}

                <span className="admin-hero-foto-badge">
                  Foto {index + 1}
                </span>
              </div>

              <div className="admin-hero-foto-info">
                <h3>Foto {index + 1}</h3>

                <p>Esta imagen aparecerá en el fondo principal del inicio.</p>
              </div>

              <div className="admin-hero-foto-actions">
                <label className="admin-hero-foto-upload">
                  <UploadCloud size={20} />
                  <span>Cambiar imagen</span>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => cambiarImagen(foto.id, e)}
                  />
                </label>

                <button
                  type="button"
                  className="admin-hero-foto-delete"
                  onClick={() => eliminarFoto(foto.id)}
                  disabled={fotos.length <= MIN_FOTOS_HERO}
                  title={
                    fotos.length <= MIN_FOTOS_HERO
                      ? "Debe quedar al menos una foto"
                      : "Eliminar foto"
                  }
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="admin-hero-actions">
          <button
            type="button"
            className="admin-hero-reset"
            onClick={descartarCambios}
          >
            <RotateCcw size={18} />
            Descartar cambios
          </button>

          <button type="submit" className="admin-hero-save">
            <Save size={18} />
            Guardar cambios
          </button>
        </div>
      </form>
    </section>
  );
};

export default CrearHeroFotos;