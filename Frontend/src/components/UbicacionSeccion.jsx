import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import "../styles/ubicacion-seccion.css";

const API_URL = "http://127.0.0.1:8000/api";

function UbicacionSeccion() {
  const [contacto, setContacto] = useState({
    nombreIglesia: "",
    direccion: "",
  });

  useEffect(() => {
    let activo = true;

    const cargarContacto = async () => {
      try {
        const response = await fetch(`${API_URL}/contactos`, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Contactos: ${response.status}`);
        }

        const data = await response.json();

        if (!activo) return;

        const registro = data?.data || data || {};

        setContacto({
          nombreIglesia: registro.nombre_iglesia || "",
          direccion:
            registro.direccion ||
            registro.footer_ubicacion ||
            "",
        });
      } catch (error) {
        console.error(
          "Error cargando ubicación pública:",
          error
        );

        if (activo) {
          setContacto({
            nombreIglesia: "",
            direccion: "",
          });
        }
      }
    };

    cargarContacto();

    return () => {
      activo = false;
    };
  }, []);

  return (
    <section id="ubicacion" className="location">
      <div className="location-bg location-bg-one"></div>
      <div className="location-bg location-bg-two"></div>
      <div className="location-bg location-bg-three"></div>

      <div className="location-container">
        <div className="section-title">
          <h2>Ubicación</h2>

          <p>
            Visítanos y comparte con nosotros un tiempo especial en la presencia
            de Dios. Estamos felices de recibirte en nuestra iglesia.
          </p>
        </div>

        <div className="location-content">
          <div className="location-info-card">
            <div className="location-icon">
              <MapPin size={34} strokeWidth={2.4} />
            </div>

            <div>
              <span>Estamos en</span>
              <h3>{contacto.nombreIglesia}</h3>
              <p>{contacto.direccion}</p>
            </div>
          </div>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d565.9212292574731!2d-66.03366457115301!3d-17.409432894819446!2m3!1f0!2f0!3f0!2m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e37b53a494b22d%3A0xca10c01eae063aa0!2sIglesia%20Asamblea%20Apostolica%20De%20La%20Fe%20En%20Cristo%20Jesus-Sacaba!5e0!3m2!1ses-419!2sbo!4v1773023623560!5m2!1ses-419!2sbo"
              loading="lazy"
              title="Ubicación Iglesia"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UbicacionSeccion;
