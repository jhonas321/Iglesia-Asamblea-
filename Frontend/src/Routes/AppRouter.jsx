import { Routes, Route } from "react-router-dom";

import WhatsAppButton from "../components/WhatsAppButton";
import ScrollToTop from "../components/ScrollToTop";

import Inicio from "../pages/user/Inicio";
import Organigrama from "../pages/user/Organigrama";
import Login from "../pages/user/Login";

import EventosMinisterios from "../pages/user/EventosMinisterios";
import PublicacionesMinisterios from "../pages/user/PublicacionesMinisterios";

function AppRouter() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/organigrama" element={<Organigrama />} />

        <Route path="/ministerios/eventos" element={<EventosMinisterios />} />
        <Route path="/ministerios/eventos/:id" element={<EventosMinisterios />} />

        <Route
          path="/ministerios/publicaciones"
          element={<PublicacionesMinisterios />}
        />
        <Route
          path="/ministerios/publicaciones/:id"
          element={<PublicacionesMinisterios />}
        />
      </Routes>

      <WhatsAppButton />
    </>
  );
}

export default AppRouter;