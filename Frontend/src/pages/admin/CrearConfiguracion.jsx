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

import "../../styles/AdminCrudPage.css";
import "../../styles/ConfiguracionAdmin.css";

const API_URL = "http://127.0.0.1:8000/api";

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
  const [perfil, setPerfil] = useState({
    nombreAdmin: "",
    iconoAdmin: "hombre-1",
  });

  const [perfilGuardado, setPerfilGuardado] = useState({
    nombreAdmin: "",
    iconoAdmin: "hombre-1",
  });

  const [passwordForm, setPasswordForm] = useState(passwordInicial);

  const [mensajePerfil, setMensajePerfil] = useState("");
  const [mensajePassword, setMensajePassword] = useState("");

  const [errorPerfil, setErrorPerfil] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [cargandoPerfil, setCargandoPerfil] = useState(true);
  const [guardandoPerfil, setGuardandoPerfil] = useState(false);
  const [guardandoPassword, setGuardandoPassword] = useState(false);

  const obtenerToken = () => localStorage.getItem("token");

  useEffect(() => {
    const cargarPerfil = async () => {
      const token = obtenerToken();

      try {
        setCargandoPerfil(true);
        setErrorPerfil("");

        const response = await fetch(`${API_URL}/user`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "No se pudo cargar el perfil del administrador."
          );
        }

        const perfilActual = {
          nombreAdmin: data.user?.name || "",
          iconoAdmin: data.user?.icono || "hombre-1",
        };

        setPerfil(perfilActual);
        setPerfilGuardado(perfilActual);
      } catch (error) {
        console.error("Error cargando perfil:", error);

        setErrorPerfil(
          error.message || "No se pudo cargar el perfil del administrador."
        );
      } finally {
        setCargandoPerfil(false);
      }
    };

    cargarPerfil();
  }, []);

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
    setErrorPerfil("");
  };

  const cambiarIcono = (iconoAdmin) => {
    setPerfil((actual) => ({
      ...actual,
      iconoAdmin,
    }));

    setMensajePerfil("");
    setErrorPerfil("");
  };

  const guardarPerfil = async (e) => {
    e.preventDefault();

    if (!perfil.nombreAdmin.trim()) {
      setErrorPerfil("El nombre del administrador es obligatorio.");
      return;
    }

    const token = obtenerToken();

    try {
      setGuardandoPerfil(true);
      setErrorPerfil("");
      setMensajePerfil("");

      const response = await fetch(`${API_URL}/perfil`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: perfil.nombreAdmin.trim(),
          icono: perfil.iconoAdmin || "hombre-1",
        }),
      });

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
          data.message || "No se pudo actualizar el perfil."
        );
      }

      const perfilActualizado = {
        nombreAdmin: data.user?.name || perfil.nombreAdmin.trim(),
        iconoAdmin: data.user?.icono || perfil.iconoAdmin,
      };

      setPerfil(perfilActualizado);
      setPerfilGuardado(perfilActualizado);

      if (data.user) {
        localStorage.setItem("usuario", JSON.stringify(data.user));
      }

      window.dispatchEvent(
        new CustomEvent("usuario-actualizado", {
          detail: data.user || null,
        })
      );

      setMensajePerfil("La configuración se guardó correctamente.");
    } catch (error) {
      console.error("Error actualizando perfil:", error);

      setErrorPerfil(
        error.message || "No se pudo actualizar el perfil."
      );
    } finally {
      setGuardandoPerfil(false);
    }
  };

  const descartarPerfil = () => {
    setPerfil(perfilGuardado);
    setMensajePerfil("");
    setErrorPerfil("");
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

  const guardarPassword = async (e) => {
    e.preventDefault();

    if (!passwordForm.passwordActual.trim()) {
      setErrorPassword("Debes escribir la contraseña actual.");
      return;
    }

    if (passwordForm.passwordNueva.length < 6) {
      setErrorPassword(
        "La nueva contraseña debe tener al menos 6 caracteres."
      );
      return;
    }

    if (passwordForm.passwordNueva !== passwordForm.passwordConfirmar) {
      setErrorPassword(
        "La confirmación no coincide con la nueva contraseña."
      );
      return;
    }

    const token = obtenerToken();

    try {
      setGuardandoPassword(true);
      setErrorPassword("");
      setMensajePassword("");

      const response = await fetch(`${API_URL}/cambiar-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password_actual: passwordForm.passwordActual,
          password_nueva: passwordForm.passwordNueva,
          password_nueva_confirmation: passwordForm.passwordConfirmar,
        }),
      });

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
          data.message || "No se pudo cambiar la contraseña."
        );
      }

      setPasswordForm(passwordInicial);
      setMensajePassword(
        data.message || "Contraseña actualizada correctamente."
      );
    } catch (error) {
      console.error("Error cambiando contraseña:", error);

      setErrorPassword(
        error.message || "No se pudo cambiar la contraseña."
      );
    } finally {
      setGuardandoPassword(false);
    }
  };

  return (
    <section className="admin-crud-page">
      <div className="admin-crud-header">
        <div>
          <span className="admin-crud-label">
            Gestión administrativa
          </span>

          <h1>Configuración</h1>

          <p>
            Personaliza el nombre del administrador, cambia el icono del perfil
            y actualiza la contraseña.
          </p>
        </div>
      </div>

      <div className="admin-config-layout">
        <form
          className="admin-config-card"
          onSubmit={guardarPerfil}
        >
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

          {errorPerfil && (
            <div className="admin-config-error">
              <span>{errorPerfil}</span>
            </div>
          )}

          {cargandoPerfil ? (
            <div className="admin-config-loading">
              Cargando perfil...
            </div>
          ) : (
            <>
              <div className="admin-form-grid single">
                <label>
                  <span>Nombre del administrador</span>

                  <input
                    type="text"
                    name="nombreAdmin"
                    value={perfil.nombreAdmin}
                    onChange={actualizarPerfil}
                    placeholder="Ej: Admin User"
                    disabled={guardandoPerfil}
                  />
                </label>
              </div>

              <div className="admin-config-icon-section">
                <div className="admin-config-section-title">
                  <h3>Icono del perfil</h3>
                  <p>
                    Selecciona un icono para mostrarlo en el sidebar.
                  </p>
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
                      disabled={guardandoPerfil}
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
                  disabled={guardandoPerfil}
                >
                  <RotateCcw size={18} />
                  Descartar
                </button>

                <button
                  type="submit"
                  className="admin-config-save"
                  disabled={guardandoPerfil}
                >
                  <Save size={18} />
                  {guardandoPerfil
                    ? "Guardando..."
                    : "Guardar configuración"}
                </button>
              </div>
            </>
          )}
        </form>

        <form
          className="admin-config-card"
          onSubmit={guardarPassword}
        >
          <div className="admin-config-card-header">
            <div className="admin-config-icon danger">
              <ShieldCheck size={24} />
            </div>

            <div>
              <h2>Cambio de contraseña</h2>
              <p>
                Escribe tu contraseña actual y luego establece una nueva.
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
                  disabled={guardandoPassword}
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
                  disabled={guardandoPassword}
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
                  disabled={guardandoPassword}
                />
              </div>
            </label>
          </div>

          <div className="admin-config-actions">
            <button
              type="submit"
              className="admin-config-save danger"
              disabled={guardandoPassword}
            >
              <Save size={18} />
              {guardandoPassword
                ? "Cambiando..."
                : "Cambiar contraseña"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CrearConfiguracion;
