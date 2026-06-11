import "../styles/secciones-generales.css";

import Heroe from "../components/Heroe";
import MisionVision from "../components/MisionVision";
import HorariosSeccion from "../components/HorariosSeccion";
import UbicacionSeccion from "../components/UbicacionSeccion";
import ContactoSeccion from "../components/ContactoSeccion";
import MinisteriosPreview from "../components/MinisteriosPreview";

function Inicio() {
  return (
    <>
      <Heroe />
      <HorariosSeccion />
      <MinisteriosPreview />
      
      <UbicacionSeccion />
      <MisionVision />
      <ContactoSeccion />
    </>
  );
}

export default Inicio;