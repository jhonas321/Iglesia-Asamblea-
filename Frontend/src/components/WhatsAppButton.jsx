import "../styles/whatsapp.css";
import { FaWhatsapp } from "react-icons/fa";
import { obtenerContactoGuardado } from "../data/adminStorage";

const limpiarNumeroWhatsApp = (numero) => {
  return String(numero || "").replace(/\D/g, "");
};

function WhatsAppButton() {
  const contacto = obtenerContactoGuardado();
  const numeroWhatsApp = limpiarNumeroWhatsApp(contacto.whatsappNumero);

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