import { useEffect, useMemo, useState } from "react";
import {
  ImagePlus,
  PlusCircle,
  RotateCcw,
  Save,
  Trash2,
  UploadCloud,
} from "lucide-react";

import "../../styles/AdminCrudPage.css";
import "../../styles/HeroFotosAdmin.css";

const API_URL = "http://127.0.0.1:8000/api";
const BACKEND_URL = "http://127.0.0.1:8000";

const MAX_FOTOS_HERO = 8;
const MIN_FOTOS_HERO = 1;

const obtenerToken = () => localStorage.getItem("token");

const obtenerUrlImagen = (imagen) => {
  if (!imagen) return "";

  const valor = String(imagen);

  if (
    valor.startsWith("http://") ||
    valor.startsWith("https://") ||
    valor.startsWith("blob:") ||
    valor.startsWith("data:") ||
    valor.startsWith("/")
  ) {
    return valor;
  }

  return `${BACKEND_URL}/storage/${valor}`;
};

const renumerarFotos = (lista) =>
  lista.map((foto, index) => ({
    ...foto,
    titulo: `Foto ${index + 1}`,
    orden: index + 1,
  }));

const convertirFotoBackendAFrontend = (foto) => ({
  id: foto.id,
  titulo: foto.titulo || "",
  imagen: obtenerUrlImagen(foto.imagen),
  imagenOriginal: foto.imagen || "",
  orden: foto.orden || 1,
  activo: foto.activo,
  archivo: null,
  esNueva: false,
});

const CrearHeroFotos = () => {
  const [fotos, setFotos] = useState([]);
  const [fotosOriginales, setFotosOriginales] = useState([]);

  const [guardado, setGuardado] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const hayCambios = useMemo(() => {
    if (fotos.length !== fotosOriginales.length) return true;

    return fotos.some((foto, index) => {
      const original = fotosOriginales[index];

      if (!original) return true;
      if (foto.esNueva) return true;
      if (foto.archivo) return true;
      if (foto.id !== original.id) return true;
      if (foto.orden !== original.orden) return true;

      return false;
    });
  }, [fotos, fotosOriginales]);

  const cargarFotos = async () => {
    const token = obtenerToken();

    try {
      setCargando(true);
      setError("");

      const response = await fetch(`${API_URL}/hero-fotos`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "No se pudieron cargar las fotos del inicio."
        );
      }

      const normalizadas = renumerarFotos(
        data.map(convertirFotoBackendAFrontend)
      );

      setFotos(normalizadas);
      setFotosOriginales(
        normalizadas.map((foto) => ({
          ...foto,
          archivo: null,
        }))
      );
    } catch (err) {
      console.error("Error cargando fotos del hero:", err);
      setError(err.message || "No se pudieron cargar las fotos del inicio.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarFotos();
  }, []);

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
      id: `nuevo-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      titulo: `Foto ${fotos.length + 1}`,
      imagen: "",
      imagenOriginal: "",
      orden: fotos.length + 1,
      activo: true,
      archivo: null,
      esNueva: true,
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

  const cambiarImagen = (idFoto, e) => {
    const archivo = e.target.files?.[0];

    if (!archivo) return;

    const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"];

    if (!tiposPermitidos.includes(archivo.type)) {
      setError("La imagen debe ser JPG, JPEG, PNG o WEBP.");
      e.target.value = "";
      return;
    }

    if (archivo.size > 5 * 1024 * 1024) {
      setError("La imagen no puede superar los 5 MB.");
      e.target.value = "";
      return;
    }

    const preview = URL.createObjectURL(archivo);

    setFotos((actual) =>
      renumerarFotos(
        actual.map((foto) =>
          foto.id === idFoto
            ? {
                ...foto,
                imagen: preview,
                archivo,
              }
            : foto
        )
      )
    );

    setError("");
    setGuardado(false);
  };

  const guardarFormulario = async (e) => {
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

    const token = obtenerToken();

    try {
      setGuardando(true);
      setError("");
      setGuardado(false);

      const idsActuales = fotos
        .filter((foto) => !foto.esNueva && Number.isInteger(foto.id))
        .map((foto) => foto.id);

      const eliminadas = fotosOriginales.filter(
        (foto) => !idsActuales.includes(foto.id)
      );

      for (const foto of eliminadas) {
        const response = await fetch(`${API_URL}/hero-fotos/${foto.id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            data.message || "No se pudo eliminar una de las fotos."
          );
        }
      }

      for (let index = 0; index < fotos.length; index += 1) {
        const foto = fotos[index];
        const orden = index + 1;

        if (foto.esNueva) {
          const formData = new FormData();

          formData.append("titulo", `Foto ${orden}`);
          formData.append("orden", String(orden));
          formData.append("activo", "1");

          if (foto.archivo) {
            formData.append("imagen", foto.archivo);
          }

          const response = await fetch(`${API_URL}/hero-fotos`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });

          const data = await response.json();

          if (!response.ok) {
            const primerError = data.errors
              ? Object.values(data.errors)[0]
              : null;

            throw new Error(
              Array.isArray(primerError)
                ? primerError[0]
                : data.message || "No se pudo crear una foto."
            );
          }

          continue;
        }

        const original = fotosOriginales.find((item) => item.id === foto.id);

        const requiereActualizar =
          Boolean(foto.archivo) ||
          !original ||
          original.orden !== orden ||
          original.titulo !== `Foto ${orden}`;

        if (!requiereActualizar) continue;

        const formData = new FormData();

        formData.append("_method", "PUT");
        formData.append("titulo", `Foto ${orden}`);
        formData.append("orden", String(orden));
        formData.append("activo", "1");

        if (foto.archivo) {
          formData.append("imagen", foto.archivo);
        }

        const response = await fetch(`${API_URL}/hero-fotos/${foto.id}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          const primerError = data.errors
            ? Object.values(data.errors)[0]
            : null;

          throw new Error(
            Array.isArray(primerError)
              ? primerError[0]
              : data.message || "No se pudo actualizar una foto."
          );
        }
      }

      await cargarFotos();
      setGuardado(true);
    } catch (err) {
      console.error("Error guardando fotos del hero:", err);
      setError(err.message || "No se pudieron guardar las fotos del inicio.");
    } finally {
      setGuardando(false);
    }
  };

  const descartarCambios = () => {
    if (!hayCambios) {
      setError("");
      return;
    }

    const confirmar = window.confirm(
      "¿Seguro que quieres descartar los cambios no guardados?"
    );

    if (!confirmar) return;

    setFotos(
      renumerarFotos(
        fotosOriginales.map((foto) => ({
          ...foto,
          archivo: null,
          esNueva: false,
        }))
      )
    );

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
          disabled={fotos.length >= MAX_FOTOS_HERO || cargando || guardando}
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

        {cargando ? (
          <div className="admin-hero-fotos-count">
            Cargando fotos del inicio...
          </div>
        ) : (
          <>
            <div className="admin-hero-fotos-count">
              <strong>{fotos.length}</strong> de {MAX_FOTOS_HERO} fotos
              agregadas
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

                    <p>
                      Esta imagen aparecerá en el fondo principal del inicio.
                    </p>
                  </div>

                  <div className="admin-hero-foto-actions">
                    <label className="admin-hero-foto-upload">
                      <UploadCloud size={20} />
                      <span>
                        {foto.imagen ? "Cambiar imagen" : "Subir imagen"}
                      </span>

                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => cambiarImagen(foto.id, e)}
                        disabled={guardando}
                      />
                    </label>

                    <button
                      type="button"
                      className="admin-hero-foto-delete"
                      onClick={() => eliminarFoto(foto.id)}
                      disabled={fotos.length <= MIN_FOTOS_HERO || guardando}
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
          </>
        )}

        <div className="admin-hero-actions">
          <button
            type="button"
            className="admin-hero-reset"
            onClick={descartarCambios}
            disabled={cargando || guardando}
          >
            <RotateCcw size={18} />
            Descartar cambios
          </button>

          <button
            type="submit"
            className="admin-hero-save"
            disabled={cargando || guardando}
          >
            <Save size={18} />
            {guardando ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CrearHeroFotos;
