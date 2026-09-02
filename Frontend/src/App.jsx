import "./App.css";
import AppUsuario from "./AppUsuario";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      <div className="content">
        <Routes>
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/*"
            element={<AppUsuario />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;