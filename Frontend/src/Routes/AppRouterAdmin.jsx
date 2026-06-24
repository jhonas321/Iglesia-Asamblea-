import { Routes, Route, Navigate } from "react-router-dom";

import HomeAdmin from "../pages/admin/HomeAdmin";
import CrearEventos from "../pages/admin/CrearEventos";
import CrearPublicacion from "../pages/admin/CrearPublicacion";
import CrearHorarios from "../pages/admin/CrearHorarios";
import CrearOrganigrama from "../pages/admin/CrearOrganigrama";

const AppRouterAdmin = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

      <Route path="/admin/dashboard" element={<HomeAdmin />} />
      <Route path="/admin/eventos" element={<CrearEventos />} />
      <Route path="/admin/publicaciones" element={<CrearPublicacion />} />
      <Route path="/admin/horarios" element={<CrearHorarios />} />
      <Route path="/admin/organigrama" element={<CrearOrganigrama />} />
    </Routes>
  );
};

export default AppRouterAdmin;