import { Routes, Route } from "react-router-dom";
import HomeAdmin from "../pages/admin/HomeAdmin";
// import PublicacionesMinisterios from "../pages/user/PublicacionesMinisterios";

const AppRouterAdmin = () => {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<HomeAdmin />} />
      {/* <Route path="/admin/publicaciones" element={<PublicacionesMinisterios />} /> */}
    </Routes>
  );
};

export default AppRouterAdmin;
