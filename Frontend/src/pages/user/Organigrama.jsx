import { useMemo } from "react";
import { FaRegUser, FaRegUserCircle } from "react-icons/fa";
import "../../styles/organigrama.css";

import { obtenerOrganigramaGuardado } from "../../data/adminStorage";

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

function Organigrama() {
  const secciones = useMemo(() => {
    return obtenerOrganigramaGuardado();
  }, []);

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
}

export default Organigrama;