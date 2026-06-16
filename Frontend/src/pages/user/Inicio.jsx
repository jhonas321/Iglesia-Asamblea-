import "../../styles/secciones-generales.css";

import Heroe from "../../components/Heroe";
import MisionVision from "../../components/MisionVision";
import HorariosSeccion from "../../components/HorariosSeccion";
import UbicacionSeccion from "../../components/UbicacionSeccion";
import ContactoSeccion from "../../components/ContactoSeccion";
import MinisteriosPreview from "../../components/MinisteriosPreview";

function Inicio() {
  return (
    <>
      <div id="inicio">
        <Heroe />
      </div>

      <div id="horarios">
        <HorariosSeccion />
      </div>

      <div id="ministerios">
        <MinisteriosPreview />
      </div>

      <div id="ubicacion">
        <UbicacionSeccion />
      </div>

      <div id="mision-vision">
        <MisionVision />
      </div>

      <div id="contacto">
        <ContactoSeccion />
      </div>
    </>
  );
}
export default Inicio;
