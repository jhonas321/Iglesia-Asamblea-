import { useEffect, useMemo, useState } from "react";
import { FaRegUser, FaRegUserCircle } from "react-icons/fa";
import "../../styles/organigrama.css";

const API_URL = "http://127.0.0.1:8000/api";

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

const normalizarSeccion = (seccion) => ({
  id: Number(seccion?.id),
  titulo: seccion?.titulo || "",
  descripcion: seccion?.descripcion || "",
  tipo: seccion?.tipo || "",
  orden: Number(seccion?.orden ?? 0),
  miembros: [],
});

const normalizarMiembro = (miembro) => ({
  id: Number(miembro?.id),
  seccionId: Number(
    miembro?.seccion_organigrama_id ??
      miembro?.seccion_id ??
      miembro?.seccionId ??
      0
  ),
  nombre: miembro?.nombre || "",
  cargo: miembro?.cargo || "",
  genero: miembro?.genero || "hombre",
  orden: Number(miembro?.orden ?? 0),
});

function Organigrama() {
  const [seccionesApi, setSeccionesApi] = useState([]);
  const [miembrosApi, setMiembrosApi] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;

    const cargarOrganigrama = async () => {
      try {
        setCargando(true);

        const [respuestaSecciones, respuestaMiembros] = await Promise.all([
          fetch(`${API_URL}/secciones-organigrama`, {
            headers: {
              Accept: "application/json",
            },
          }),
          fetch(`${API_URL}/miembros-organigrama`, {
            headers: {
              Accept: "application/json",
            },
          }),
        ]);

        if (!respuestaSecciones.ok) {
          throw new Error(
            `Secciones organigrama: ${respuestaSecciones.status}`
          );
        }

        if (!respuestaMiembros.ok) {
          throw new Error(
            `Miembros organigrama: ${respuestaMiembros.status}`
          );
        }

        const datosSecciones = await respuestaSecciones.json();
        const datosMiembros = await respuestaMiembros.json();

        if (!activo) return;

        const listaSecciones = Array.isArray(datosSecciones)
          ? datosSecciones
          : Array.isArray(datosSecciones?.data)
          ? datosSecciones.data
          : [];

        const listaMiembros = Array.isArray(datosMiembros)
          ? datosMiembros
          : Array.isArray(datosMiembros?.data)
          ? datosMiembros.data
          : [];

        setSeccionesApi(listaSecciones.map(normalizarSeccion));
        setMiembrosApi(listaMiembros.map(normalizarMiembro));
      } catch (error) {
        console.error("Error cargando organigrama público:", error);

        if (activo) {
          setSeccionesApi([]);
          setMiembrosApi([]);
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    cargarOrganigrama();

    return () => {
      activo = false;
    };
  }, []);

  const secciones = useMemo(() => {
    return [...seccionesApi]
      .sort((a, b) => a.orden - b.orden)
      .map((seccion) => ({
        ...seccion,
        miembros: miembrosApi
          .filter((miembro) => miembro.seccionId === seccion.id)
          .sort((a, b) => a.orden - b.orden),
      }));
  }, [seccionesApi, miembrosApi]);

  const pastorado = secciones.find((seccion) => seccion.tipo === "principal");
  const pastorPrincipal = pastorado?.miembros?.[0];

  const ministerios = secciones.filter(
    (seccion) => seccion.tipo !== "principal"
  );

  return (
    <section id="organigrama-page">
      <div className="organigrama-decoracion decoracion-uno"></div>
      <div className="organigrama-decoracion decoracion-dos"></div>

      <div className="organigrama-hero">
        <span className="organigrama-etiqueta">Estructura de liderazgo</span>

        <h1>Organigrama General</h1>

        <p>
          Conoce la organización de nuestra iglesia, sus áreas de servicio,
          ministerios y líderes encargados de apoyar la obra espiritual.
        </p>
      </div>

      {cargando && (
        <div className="organigrama-ministerios">
          <div className="organigrama-seccion">
            <div className="organigrama-seccion-header">
              <div>
                <h2>Cargando organigrama...</h2>
              </div>
            </div>
          </div>
        </div>
      )}

      {!cargando && pastorado && pastorPrincipal && (
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

      {!cargando && (
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
      )}
    </section>
  );
}

export default Organigrama;
