import { Routes, Route, Navigate } from "react-router-dom";

import HomeAdmin from "../pages/admin/HomeAdmin";
import CrearMinisterios from "../pages/admin/CrearMinisterios";
import CrearHeroFotos from "../pages/admin/CrearHeroFotos";
import CrearEventos from "../pages/admin/CrearEventos";
import CrearPublicacion from "../pages/admin/CrearPublicacion";
import CrearHorarios from "../pages/admin/CrearHorarios";
import CrearOrganigrama from "../pages/admin/CrearOrganigrama";
import CrearContactos from "../pages/admin/CrearContactos";
import CrearConfiguracion from "../pages/admin/CrearConfiguracion";

const AppRouterAdmin = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

      <Route path="/admin/dashboard" element={<HomeAdmin />} />
      <Route path="/admin/ministerios" element={<CrearMinisterios />} />
      <Route path="/admin/fotos-inicio" element={<CrearHeroFotos />} />
      <Route path="/admin/eventos" element={<CrearEventos />} />
      <Route path="/admin/publicaciones" element={<CrearPublicacion />} />
      <Route path="/admin/horarios" element={<CrearHorarios />} />
      <Route path="/admin/organigrama" element={<CrearOrganigrama />} />
      <Route path="/admin/contactos" element={<CrearContactos />} />
      <Route path="/admin/configuracion" element={<CrearConfiguracion />} />
    </Routes>
  );
};

export default AppRouterAdmin;