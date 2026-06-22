import { Routes, Route, Navigate } from "react-router-dom";

import HomeAdmin from "../pages/admin/HomeAdmin";
import CrearEventos from "../pages/admin/CrearEventos";
import CrearPublicacion from "../pages/admin/CrearPublicacion";

const AppRouterAdmin = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

      <Route path="/admin/dashboard" element={<HomeAdmin />} />
      <Route path="/admin/eventos" element={<CrearEventos />} />
      <Route path="/admin/publicaciones" element={<CrearPublicacion />} />
    </Routes>
  );
};

export default AppRouterAdmin;