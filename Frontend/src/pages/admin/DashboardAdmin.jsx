import Sidebar from "../../components/Sidebar";
import AppRouterAdmin from "../../Routes/AppRouterAdmin";
import "../../styles/DashboardAdmin.css";

const DashboardAdmin = () => {
  return (
    <div className="dashboard-admin">
      <Sidebar />

      <main className="dashboard-admin-content">
        <AppRouterAdmin />
      </main>
    </div>
  );
};

export default DashboardAdmin;