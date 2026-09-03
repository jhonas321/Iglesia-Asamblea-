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
      {/* /admin */}
      <Route
        index
        element={<Navigate to="dashboard" replace />}
      />

      {/* /admin/dashboard */}
      <Route
        path="dashboard"
        element={<HomeAdmin />}
      />

      {/* /admin/ministerios */}
      <Route
        path="ministerios"
        element={<CrearMinisterios />}
      />

      {/* /admin/fotos-inicio */}
      <Route
        path="fotos-inicio"
        element={<CrearHeroFotos />}
      />

      {/* /admin/eventos */}
      <Route
        path="eventos"
        element={<CrearEventos />}
      />

      {/* /admin/publicaciones */}
      <Route
        path="publicaciones"
        element={<CrearPublicacion />}
      />

      {/* /admin/horarios */}
      <Route
        path="horarios"
        element={<CrearHorarios />}
      />

      {/* /admin/organigrama */}
      <Route
        path="organigrama"
        element={<CrearOrganigrama />}
      />

      {/* /admin/contactos */}
      <Route
        path="contactos"
        element={<CrearContactos />}
      />

      {/* /admin/configuracion */}
      <Route
        path="configuracion"
        element={<CrearConfiguracion />}
      />

      {/* Ruta admin inexistente */}
      <Route
        path="*"
        element={<Navigate to="dashboard" replace />}
      />
    </Routes>
  );
};

export default AppRouterAdmin;