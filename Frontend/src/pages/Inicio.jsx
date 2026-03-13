import "../styles/secciones-generales.css";

import Heroe from "../components/Heroe";
import Ministries from "../components/Ministries";
import SobreNosotros from "../components/SobreNosotros";
import MisionVision from "../components/MisionVision";
import HorariosSeccion from "../components/HorariosSeccion";
import UbicacionSeccion from "../components/UbicacionSeccion";
import ContactoSeccion from "../components/ContactoSeccion";

function Inicio() {
  return (
    <>
      <Heroe />
      <Ministries />
      <SobreNosotros />
      <MisionVision />
      <HorariosSeccion />
      <UbicacionSeccion />
      <ContactoSeccion />
    </>
  );
}

export default Inicio;