import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Image,
  Clock,
  Users,
  Mail,
  Settings,
  LogOut,
  Church,
} from "lucide-react";
import { FaRegUserCircle } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      id: "eventos",
      label: "Eventos",
      path: "/admin/eventos",
      icon: <CalendarDays size={20} />,
    },
    {
      id: "publicaciones",
      label: "Publicaciones",
      path: "/admin/publicaciones",
      icon: <Image size={20} />,
    },
    {
      id: "horarios",
      label: "Horarios",
      path: "/admin/horarios",
      icon: <Clock size={20} />,
    },
    {
      id: "organigrama",
      label: "Organigrama",
      path: "/admin/organigrama",
      icon: <Users size={20} />,
    },
    {
      id: "contactos",
      label: "Contactos",
      path: "/admin/contactos",
      icon: <Mail size={20} />,
    },
    {
      id: "configuracion",
      label: "Configuración",
      path: "/admin/configuracion",
      icon: <Settings size={20} />,
    },
  ];

  const isActive = (path) => {
    if (path === "/admin/dashboard") {
      return currentPath === "/admin" || currentPath === "/admin/dashboard";
    }

    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Church size={23} />
        </div>

        <div className="sidebar-brand">
          <h2>Asamblea</h2>
          <span>Panel Administrativo</span>
        </div>
      </div>

      <div className="sidebar-user">
        <div className="sidebar-user-icon">
          <FaRegUserCircle size={26} />
        </div>

        <div className="sidebar-user-info">
          <h3>Admin User</h3>
          <p>Administrador</p>
        </div>
      </div>

      <nav className="sidebar-menu">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className={`sidebar-link ${
                  isActive(item.path) ? "active" : ""
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <Link to="/" className="sidebar-logout" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Cerrar sesión</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;