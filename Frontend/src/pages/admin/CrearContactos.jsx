import { useEffect, useState } from "react";
import { Edit, RotateCcw, Save, X } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import "../../styles/AdminCrudPage.css";
import "../../styles/ContactosAdmin.css";

const API_URL = "http://127.0.0.1:8000/api";

const crearContactoVacio = () => ({
  id: null,
  nombreIglesia: "",
  direccion: "",
  telefono: "",
  whatsappNumero: "",
  footerUbicacion: "",
  footerTelefono: "",
  footerCorreo: "",
  facebookUrl: "",
  youtubeUrl: "",
  instagramUrl: "",
  tiktokUrl: "",
  twitterUrl: "",
  telegramUrl: "",
});

const convertirContactoBackendAFrontend = (contacto) => {
  if (!contacto) return crearContactoVacio();

  return {
    id: contacto.id ?? null,
    nombreIglesia: contacto.nombre_iglesia || "",
    direccion: contacto.direccion || "",
    telefono: normalizarTelefonoInternacional(contacto.telefono),
    whatsappNumero: normalizarTelefonoInternacional(contacto.whatsapp_numero),
    footerUbicacion: contacto.footer_ubicacion || "",
    footerTelefono: normalizarTelefonoInternacional(contacto.footer_telefono),
    footerCorreo: contacto.footer_correo || "",
    facebookUrl: contacto.facebook_url || "",
    youtubeUrl: contacto.youtube_url || "",
    instagramUrl: contacto.instagram_url || "",
    tiktokUrl: contacto.tiktok_url || "",
    twitterUrl: contacto.twitter_url || "",
    telegramUrl: contacto.telegram_url || "",
  };
};

const convertirContactoFrontendABackend = (formulario) => ({
  nombre_iglesia: formulario.nombreIglesia.trim(),
  direccion: formulario.direccion.trim(),
  telefono: formulario.telefono.trim() || null,
  whatsapp_numero: formulario.whatsappNumero.trim() || null,
  footer_ubicacion: formulario.footerUbicacion.trim() || null,
  footer_telefono: formulario.footerTelefono.trim() || null,
  footer_correo: formulario.footerCorreo.trim() || null,
  facebook_url: formulario.facebookUrl.trim() || null,
  youtube_url: formulario.youtubeUrl.trim() || null,
  instagram_url: formulario.instagramUrl.trim() || null,
  tiktok_url: formulario.tiktokUrl.trim() || null,
  twitter_url: formulario.twitterUrl.trim() || null,
  telegram_url: formulario.telegramUrl.trim() || null,
});

const obtenerToken = () => localStorage.getItem("token");

const limpiarNumeroTelefono = (numero) => {
  return String(numero || "").replace(/\D/g, "");
};

const normalizarTelefonoInternacional = (valor) => {
  const texto = String(valor || "").trim();

  if (!texto) return "";

  const numeroLimpio = limpiarNumeroTelefono(texto);

  if (!numeroLimpio) return "";

  // Los datos antiguos del proyecto estaban guardados como números locales
  // de Bolivia (por ejemplo 4250000). Los convertimos a formato internacional.
  if (!texto.startsWith("+") && !numeroLimpio.startsWith("591")) {
    return `+591${numeroLimpio}`;
  }

  return `+${numeroLimpio}`;
};

const formatearTelefono = (valor) => {
  const numeroLimpio = limpiarNumeroTelefono(valor);

  if (!numeroLimpio) return "No registrado";

  if (numeroLimpio.startsWith("591") && numeroLimpio.length > 3) {
    return `+591 ${numeroLimpio.slice(3)}`;
  }

  return `+${numeroLimpio}`;
};

const mostrarValor = (valor) => {
  const texto = String(valor || "").trim();
  return texto || "No registrado";
};

const CrearContactos = () => {
  const [formulario, setFormulario] = useState(crearContactoVacio);
  const [contactoGuardado, setContactoGuardado] = useState(crearContactoVacio);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [paisTelefono, setPaisTelefono] = useState({
    telefono: "bo",
    whatsappNumero: "bo",
    footerTelefono: "bo",
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    const cargarContacto = async () => {
      const token = obtenerToken();

      try {
        setCargando(true);
        setError("");

        const response = await fetch(`${API_URL}/contactos`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "No se pudieron cargar los datos de contacto."
          );
        }

        const contacto = convertirContactoBackendAFrontend(data);

        setFormulario(contacto);
        setContactoGuardado(contacto);
      } catch (err) {
        console.error("Error cargando contacto:", err);
        setError(
          err.message || "No se pudieron cargar los datos de contacto."
        );
      } finally {
        setCargando(false);
      }
    };

    cargarContacto();
  }, []);

  useEffect(() => {
    if (!guardado) return;

    const timeout = setTimeout(() => {
      setGuardado(false);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [guardado]);

  const actualizarCampo = (e) => {
    const { name, value } = e.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));

    setGuardado(false);
  };

  const actualizarTelefono = ({ name, value }) => {
    const numeroLimpio = limpiarNumeroTelefono(value);

    setFormulario((actual) => ({
      ...actual,
      [name]: numeroLimpio ? `+${numeroLimpio}` : "",
    }));

    setGuardado(false);
    setError("");
  };

  const activarEdicion = () => {
    setModoEdicion(true);
    setGuardado(false);
  };

  const cancelarEdicion = () => {
    const confirmar = window.confirm(
      "¿Seguro que quieres cancelar la edición? Los cambios no guardados se perderán."
    );

    if (!confirmar) return;

    setFormulario(contactoGuardado);
    setModoEdicion(false);
    setGuardado(false);
  };

  const guardarFormulario = async (e) => {
    e.preventDefault();

    if (!formulario.nombreIglesia.trim()) {
      setError("El nombre de la iglesia es obligatorio.");
      return;
    }

    if (!formulario.direccion.trim()) {
      setError("La dirección es obligatoria.");
      return;
    }

    const token = obtenerToken();
    const datos = convertirContactoFrontendABackend(formulario);
    const esEdicion = Boolean(formulario.id);

    try {
      setGuardando(true);
      setError("");
      setGuardado(false);

      const response = await fetch(
        esEdicion
          ? `${API_URL}/contactos/${formulario.id}`
          : `${API_URL}/contactos`,
        {
          method: esEdicion ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(datos),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const primerError = Object.values(data.errors)[0];

          throw new Error(
            Array.isArray(primerError)
              ? primerError[0]
              : "Revisa los datos ingresados."
          );
        }

        throw new Error(
          data.message || "No se pudieron guardar los datos de contacto."
        );
      }

      const contactoActualizado = convertirContactoBackendAFrontend(
        data.contacto
      );

      setFormulario(contactoActualizado);
      setContactoGuardado(contactoActualizado);
      setGuardado(true);
      setModoEdicion(false);
    } catch (err) {
      console.error("Error guardando contacto:", err);
      setError(
        err.message || "No se pudieron guardar los datos de contacto."
      );
    } finally {
      setGuardando(false);
    }
  };

  const restaurarDatos = () => {
    const confirmar = window.confirm(
      "¿Seguro que quieres descartar los cambios no guardados?"
    );

    if (!confirmar) return;

    setFormulario(contactoGuardado);
    setGuardado(false);
    setModoEdicion(false);
  };

  const renderCampoTexto = ({
    label,
    name,
    value,
    placeholder,
    type = "text",
  }) => {
    if (!modoEdicion) {
      return (
        <div className="admin-contact-view-item">
          <span>{label}</span>

          <p className={!String(value || "").trim() ? "admin-contact-empty" : ""}>
            {mostrarValor(value)}
          </p>
        </div>
      );
    }

    return (
      <label>
        <span>{label}</span>

        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={actualizarCampo}
          placeholder={placeholder}
          autoComplete="off"
        />
      </label>
    );
  };

  const renderCampoTelefono = ({
    label,
    name,
    value,
  }) => {
    const numeroLimpio = limpiarNumeroTelefono(value);

    if (!modoEdicion) {
      return (
        <div className="admin-contact-view-item">
          <span>{label}</span>

          <p className={!numeroLimpio ? "admin-contact-empty" : ""}>
            {formatearTelefono(value)}
          </p>
        </div>
      );
    }

    return (
      <label className="admin-contact-phone-label">
        <span>{label}</span>

        <div className="admin-contact-phone-wrapper">
          <PhoneInput
            country={paisTelefono[name] || "bo"}
            value={numeroLimpio}
            onChange={(valor, pais) => {
              if (pais?.countryCode) {
                setPaisTelefono((actual) => ({
                  ...actual,
                  [name]: pais.countryCode,
                }));
              }

              actualizarTelefono({
                name,
                value: valor,
              });
            }}
            enableSearch={true}
            countryCodeEditable={false}
            specialLabel=""
            placeholder="Ej: 79386322"
            inputProps={{
              name,
              autoComplete: "off",
            }}
            containerClass="admin-contact-phone-container"
            inputClass="admin-contact-phone-field"
            buttonClass="admin-contact-phone-button"
            dropdownClass="admin-contact-phone-dropdown"
            disabled={guardando}
          />
        </div>
      </label>
    );
  };

  return (
    <section className="admin-crud-page">
      <div className="admin-crud-header">
        <div>
          <span className="admin-crud-label">Gestión administrativa</span>

          <h1>Contactos</h1>

          <p>
            Visualiza y modifica los datos de la sección contacto, WhatsApp,
            footer y redes sociales.
          </p>
        </div>
      </div>

      <div className="admin-contact-layout">
        <form className="admin-contact-card" onSubmit={guardarFormulario}>
          <div className="admin-contact-card-top">
            <div>
              <span className="admin-crud-label">
                {modoEdicion ? "Modo edición" : "Modo visualización"}
              </span>

              <h2>
                {modoEdicion
                  ? "Editando datos de contacto"
                  : "Datos actuales de contacto"}
              </h2>
            </div>

            {!modoEdicion ? (
              <button
                type="button"
                className="admin-create-btn admin-contact-edit-main"
                onClick={activarEdicion}
                disabled={cargando || guardando}
              >
                <Edit size={18} />
                <span>Editar</span>
              </button>
            ) : (
              <button
                type="button"
                className="admin-contact-close-edit"
                onClick={cancelarEdicion}
                disabled={guardando}
                aria-label="Cancelar edición"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {guardado && (
            <div className="admin-contact-success">
              Los datos se guardaron correctamente.
            </div>
          )}

          {error && (
            <div className="admin-contact-error">{error}</div>
          )}

          {cargando && (
            <div className="admin-contact-loading">
              Cargando datos de contacto...
            </div>
          )}

          <div className="admin-contact-section">
            <span className="admin-crud-label">Sección Contáctanos</span>
            <h2>Datos que aparecen dentro de las tarjetas</h2>

            <div
              className={
                modoEdicion ? "admin-form-grid" : "admin-contact-view-grid"
              }
            >
              {renderCampoTexto({
                label: "Nombre",
                name: "nombreIglesia",
                value: formulario.nombreIglesia,
                placeholder: "Ej: Asamblea Apostólica de la Fe en Cristo Jesús",
              })}

              {renderCampoTexto({
                label: "Dirección",
                name: "direccion",
                value: formulario.direccion,
                placeholder: "Ej: Calle Santa Cruz entre Calama",
              })}

              {renderCampoTelefono({
                label: "Teléfono",
                name: "telefono",
                value: formulario.telefono,
              })}
            </div>
          </div>

          <div className="admin-contact-section">
            <span className="admin-crud-label">WhatsApp flotante</span>
            <h2>Número del botón flotante</h2>

            <div
              className={
                modoEdicion ? "admin-form-grid" : "admin-contact-view-grid"
              }
            >
              {renderCampoTelefono({
                label: "Número de WhatsApp",
                name: "whatsappNumero",
                value: formulario.whatsappNumero,
              })}
            </div>
          </div>

          <div className="admin-contact-section admin-contact-footer-section">
            <span className="admin-crud-label">Footer</span>
            <h2>Datos de contacto del footer</h2>

            <div
              className={
                modoEdicion
                  ? "admin-form-grid admin-contact-footer-grid"
                  : "admin-contact-view-grid admin-contact-footer-grid"
              }
            >
              {renderCampoTexto({
                label: "Ubicación",
                name: "footerUbicacion",
                value: formulario.footerUbicacion,
                placeholder: "Ej: Cochabamba, Bolivia",
              })}

              {renderCampoTelefono({
                label: "Teléfono",
                name: "footerTelefono",
                value: formulario.footerTelefono,
              })}

              {renderCampoTexto({
                label: "Correo",
                name: "footerCorreo",
                value: formulario.footerCorreo,
                placeholder: "Ej: contacto@asamblea.com",
                type: "email",
              })}
            </div>
          </div>

          <div className="admin-contact-section">
            <span className="admin-crud-label">Redes sociales</span>
            <h2>Enlaces del footer</h2>

            <div
              className={
                modoEdicion ? "admin-form-grid" : "admin-contact-view-grid"
              }
            >
              {renderCampoTexto({
                label: "Facebook URL",
                name: "facebookUrl",
                value: formulario.facebookUrl,
                placeholder: "https://facebook.com/...",
              })}

              {renderCampoTexto({
                label: "YouTube URL",
                name: "youtubeUrl",
                value: formulario.youtubeUrl,
                placeholder: "https://youtube.com/...",
              })}

              {renderCampoTexto({
                label: "Instagram URL",
                name: "instagramUrl",
                value: formulario.instagramUrl,
                placeholder: "https://instagram.com/...",
              })}

              {renderCampoTexto({
                label: "TikTok URL",
                name: "tiktokUrl",
                value: formulario.tiktokUrl,
                placeholder: "https://tiktok.com/...",
              })}

              {renderCampoTexto({
                label: "Twitter / X URL",
                name: "twitterUrl",
                value: formulario.twitterUrl,
                placeholder: "https://x.com/...",
              })}

              {renderCampoTexto({
                label: "Telegram URL",
                name: "telegramUrl",
                value: formulario.telegramUrl,
                placeholder: "https://t.me/...",
              })}
            </div>
          </div>

          {modoEdicion && (
            <div className="admin-contact-actions">
              <button
                type="button"
                className="admin-contact-reset"
                onClick={restaurarDatos}
                disabled={guardando}
              >
                <RotateCcw size={18} />
                Descartar cambios
              </button>

              <button
                type="submit"
                className="admin-contact-save"
                disabled={guardando}
              >
                <Save size={18} />
                {guardando ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default CrearContactos;