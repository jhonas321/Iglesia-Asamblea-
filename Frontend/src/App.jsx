import "./App.css";
import AppUsuario from "./AppUsuario";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      <div className="content">
        <Routes>
          <Route path="/*" element={<DashboardAdmin />} />
        </Routes>
        {/* <AppUsuario /> */}
      </div>
    </div>
  );
};

export default App;
