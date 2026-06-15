import Sidebar from "../../components/Sidebar";
import AppRouterAdmin from "../../Routes/AppRouterAdmin";

const DashboardAdmin = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <AppRouterAdmin />
    </div>
  );
};

export default DashboardAdmin;
