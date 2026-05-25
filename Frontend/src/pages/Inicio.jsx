import "../styles/secciones-generales.css";

import Heroe from "../components/Heroe";
import MisionVision from "../components/MisionVision";
import HorariosSeccion from "../components/HorariosSeccion";
import UbicacionSeccion from "../components/UbicacionSeccion";
import ContactoSeccion from "../components/ContactoSeccion";
import ReglamentoPreview from "../components/ReglamentoPreview";
import MinisteriosPreview from "../components/MinisteriosPreview";

function Inicio() {
  return (
    <>
      <Heroe />
      <HorariosSeccion />
      <MinisteriosPreview />
      <ReglamentoPreview />
      <MisionVision />
      <UbicacionSeccion />
      <ContactoSeccion />
    </>
  );
}

export default Inicio;