import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Lock,
  RotateCcw,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import {
  FaFemale,
  FaMale,
  FaRegUserCircle,
  FaUserGraduate,
  FaUserNurse,
  FaUserShield,
  FaUserTie,
} from "react-icons/fa";

import {
  cambiarPasswordAdmin,
  guardarConfiguracion,
  obtenerConfiguracionGuardada,
} from "../../data/adminStorage";

import "../../styles/AdminCrudPage.css";
import "../../styles/ConfiguracionAdmin.css";

const iconosDisponibles = [
  {
    id: "hombre-1",
    nombre: "Hombre 1",
    icono: <FaUserTie />,
  },
  {
    id: "hombre-2",
    nombre: "Hombre 2",
    icono: <FaMale />,
  },
  {
    id: "hombre-3",
    nombre: "Hombre 3",
    icono: <FaUserShield />,
  },
  {
    id: "mujer-1",
    nombre: "Mujer 1",
    icono: <FaFemale />,
  },
  {
    id: "mujer-2",
    nombre: "Mujer 2",
    icono: <FaUserNurse />,
  },
  {
    id: "mujer-3",
    nombre: "Mujer 3",
    icono: <FaUserGraduate />,
  },
];

const passwordInicial = {
  passwordActual: "",
  passwordNueva: "",
  passwordConfirmar: "",
};

const CrearConfiguracion = () => {
  const [perfil, setPerfil] = useState(() => {
    const config = obtenerConfiguracionGuardada();

    return {
      nombreAdmin: config.nombreAdmin,
      iconoAdmin: config.iconoAdmin,
    };
  });

  const [passwordForm, setPasswordForm] = useState(passwordInicial);
  const [mensajePerfil, setMensajePerfil] = useState("");
  const [mensajePassword, setMensajePassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  useEffect(() => {
    if (!mensajePerfil && !mensajePassword) return;

    const timeout = setTimeout(() => {
      setMensajePerfil("");
      setMensajePassword("");
    }, 2500);

    return () => clearTimeout(timeout);
  }, [mensajePerfil, mensajePassword]);

  const actualizarPerfil = (e) => {
    const { name, value } = e.target;

    setPerfil((actual) => ({
      ...actual,
      [name]: value,
    }));

    setMensajePerfil("");
  };

  const cambiarIcono = (iconoAdmin) => {
    setPerfil((actual) => ({
      ...actual,
      iconoAdmin,
    }));

    setMensajePerfil("");
  };

  const guardarPerfil = (e) => {
    e.preventDefault();

    const configActual = obtenerConfiguracionGuardada();

    guardarConfiguracion({
      ...configActual,
      nombreAdmin: perfil.nombreAdmin.trim() || "Admin User",
      iconoAdmin: perfil.iconoAdmin || "hombre-1",
    });

    setMensajePerfil("La configuración se guardó correctamente.");
  };

  const descartarPerfil = () => {
    const config = obtenerConfiguracionGuardada();

    setPerfil({
      nombreAdmin: config.nombreAdmin,
      iconoAdmin: config.iconoAdmin,
    });

    setMensajePerfil("");
  };

  const actualizarPassword = (e) => {
    const { name, value } = e.target;

    setPasswordForm((actual) => ({
      ...actual,
      [name]: value,
    }));

    setErrorPassword("");
    setMensajePassword("");
  };

  const guardarPassword = (e) => {
    e.preventDefault();

    if (!passwordForm.passwordActual.trim()) {
      setErrorPassword("Debes escribir la contraseña actual.");
      return;
    }

    if (passwordForm.passwordNueva.length < 6) {
      setErrorPassword("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (passwordForm.passwordNueva !== passwordForm.passwordConfirmar) {
      setErrorPassword("La confirmación no coincide con la nueva contraseña.");
      return;
    }

    const resultado = cambiarPasswordAdmin({
      passwordActual: passwordForm.passwordActual,
      passwordNueva: passwordForm.passwordNueva,
    });

    if (!resultado.ok) {
      setErrorPassword(resultado.mensaje);
      return;
    }

    setPasswordForm(passwordInicial);
    setErrorPassword("");
    setMensajePassword(resultado.mensaje);
  };

  return (
    <section className="admin-crud-page">
      <div className="admin-crud-header">
        <div>
          <span className="admin-crud-label">Gestión administrativa</span>

          <h1>Configuración</h1>

          <p>
            Personaliza el nombre del administrador, cambia el icono del perfil
            y actualiza la contraseña.
          </p>
        </div>
      </div>

      <div className="admin-config-layout">
        <form className="admin-config-card" onSubmit={guardarPerfil}>
          <div className="admin-config-card-header">
            <div className="admin-config-icon">
              <UserRound size={24} />
            </div>

            <div>
              <h2>Perfil del administrador</h2>
              <p>
                Estos datos se mostrarán en la información del usuario del
                sidebar.
              </p>
            </div>
          </div>

          {mensajePerfil && (
            <div className="admin-config-success">
              <CheckCircle2 size={18} />
              <span>{mensajePerfil}</span>
            </div>
          )}

          <div className="admin-form-grid single">
            <label>
              <span>Nombre del administrador</span>

              <input
                type="text"
                name="nombreAdmin"
                value={perfil.nombreAdmin}
                onChange={actualizarPerfil}
                placeholder="Ej: Admin User"
              />
            </label>
          </div>

          <div className="admin-config-icon-section">
            <div className="admin-config-section-title">
              <h3>Icono del perfil</h3>
              <p>Selecciona un icono para mostrarlo en el sidebar.</p>
            </div>

            <div className="admin-profile-icons">
              {iconosDisponibles.map((opcion) => (
                <button
                  type="button"
                  className={`admin-profile-icon-option ${
                    perfil.iconoAdmin === opcion.id ? "active" : ""
                  }`}
                  onClick={() => cambiarIcono(opcion.id)}
                  key={opcion.id}
                >
                  <span className="admin-profile-icon-circle">
                    {opcion.icono || <FaRegUserCircle />}
                  </span>

                  <small>{opcion.nombre}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="admin-config-actions">
            <button
              type="button"
              className="admin-config-reset"
              onClick={descartarPerfil}
            >
              <RotateCcw size={18} />
              Descartar
            </button>

            <button type="submit" className="admin-config-save">
              <Save size={18} />
              Guardar configuración
            </button>
          </div>
        </form>

        <form className="admin-config-card" onSubmit={guardarPassword}>
          <div className="admin-config-card-header">
            <div className="admin-config-icon danger">
              <ShieldCheck size={24} />
            </div>

            <div>
              <h2>Cambio de contraseña</h2>
              <p>
                La contraseña inicial es <strong>admin123</strong>, salvo que ya
                la hayas cambiado.
              </p>
            </div>
          </div>

          {mensajePassword && (
            <div className="admin-config-success">
              <CheckCircle2 size={18} />
              <span>{mensajePassword}</span>
            </div>
          )}

          {errorPassword && (
            <div className="admin-config-error">
              <span>{errorPassword}</span>
            </div>
          )}

          <div className="admin-form-grid single">
            <label>
              <span>Contraseña actual</span>

              <div className="admin-password-field">
                <Lock size={18} />

                <input
                  type="password"
                  name="passwordActual"
                  value={passwordForm.passwordActual}
                  onChange={actualizarPassword}
                  placeholder="Escribe tu contraseña actual"
                />
              </div>
            </label>

            <label>
              <span>Nueva contraseña</span>

              <div className="admin-password-field">
                <Lock size={18} />

                <input
                  type="password"
                  name="passwordNueva"
                  value={passwordForm.passwordNueva}
                  onChange={actualizarPassword}
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
            </label>

            <label>
              <span>Confirmar nueva contraseña</span>

              <div className="admin-password-field">
                <Lock size={18} />

                <input
                  type="password"
                  name="passwordConfirmar"
                  value={passwordForm.passwordConfirmar}
                  onChange={actualizarPassword}
                  placeholder="Repite la nueva contraseña"
                />
              </div>
            </label>
          </div>

          <div className="admin-config-actions">
            <button type="submit" className="admin-config-save danger">
              <Save size={18} />
              Cambiar contraseña
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CrearConfiguracion;