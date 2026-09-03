import { useEffect, useState } from "react";
import "../styles/whatsapp.css";
import { FaWhatsapp } from "react-icons/fa";

const API_URL = "http://127.0.0.1:8000/api";

const limpiarNumeroWhatsApp = (numero) => {
  return String(numero || "").replace(/\D/g, "");
};

function WhatsAppButton() {
  const [numeroWhatsApp, setNumeroWhatsApp] = useState("");

  useEffect(() => {
    let activo = true;

    const cargarWhatsApp = async () => {
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

        const contacto = data?.data || data || {};

        setNumeroWhatsApp(
          limpiarNumeroWhatsApp(contacto.whatsapp_numero)
        );
      } catch (error) {
        console.error("Error cargando número de WhatsApp:", error);

        if (activo) {
          setNumeroWhatsApp("");
        }
      }
    };

    cargarWhatsApp();

    return () => {
      activo = false;
    };
  }, []);

  if (!numeroWhatsApp) return null;

  return (
    <a
      href={`https://wa.me/${numeroWhatsApp}`}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
}

export default WhatsAppButton;
