import { useEffect, useState } from "react";
import { Edit, RotateCcw, Save, X } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import {
  guardarContacto,
  obtenerContactoGuardado,
} from "../../data/adminStorage";

import "../../styles/AdminCrudPage.css";
import "../../styles/ContactosAdmin.css";

const limpiarNumeroTelefono = (numero) => {
  return String(numero || "").replace(/\D/g, "");
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
  const [formulario, setFormulario] = useState(() => obtenerContactoGuardado());
  const [modoEdicion, setModoEdicion] = useState(false);
  const [guardado, setGuardado] = useState(false);

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

  const actualizarTelefono = ({ name, value, guardarConPlus = false }) => {
    const numeroLimpio = limpiarNumeroTelefono(value);

    setFormulario((actual) => ({
      ...actual,
      [name]: numeroLimpio
        ? guardarConPlus
          ? `+${numeroLimpio}`
          : numeroLimpio
        : "",
    }));

    setGuardado(false);
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

    setFormulario(obtenerContactoGuardado());
    setModoEdicion(false);
    setGuardado(false);
  };

  const guardarFormulario = (e) => {
    e.preventDefault();

    guardarContacto(formulario);
    setGuardado(true);
    setModoEdicion(false);
  };

  const restaurarDatos = () => {
    const confirmar = window.confirm(
      "¿Seguro que quieres descartar los cambios no guardados?"
    );

    if (!confirmar) return;

    setFormulario(obtenerContactoGuardado());
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
    guardarConPlus = false,
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
            country="bo"
            value={numeroLimpio}
            onChange={(valor) =>
              actualizarTelefono({
                name,
                value: valor,
                guardarConPlus,
              })
            }
            enableSearch={false}
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
              >
                <Edit size={18} />
                <span>Editar</span>
              </button>
            ) : (
              <button
                type="button"
                className="admin-contact-close-edit"
                onClick={cancelarEdicion}
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
                guardarConPlus: true,
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
                guardarConPlus: false,
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
                guardarConPlus: true,
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
              >
                <RotateCcw size={18} />
                Descartar cambios
              </button>

              <button type="submit" className="admin-contact-save">
                <Save size={18} />
                Guardar cambios
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default CrearContactos;