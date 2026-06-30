import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Image,
  Images,
  Clock,
  Users,
  Mail,
  Settings,
  LogOut,
  Layers,
} from "lucide-react";

import {
  FaFemale,
  FaMale,
  FaRegUserCircle,
  FaUserGraduate,
  FaUserNurse,
  FaUserShield,
  FaUserTie,
} from "react-icons/fa";

import { obtenerConfiguracionGuardada } from "../data/adminStorage";

import "../styles/Sidebar.css";

const obtenerIconoAdmin = (iconoAdmin) => {
  const iconos = {
    "hombre-1": <FaUserTie size={26} />,
    "hombre-2": <FaMale size={26} />,
    "hombre-3": <FaUserShield size={26} />,
    "mujer-1": <FaFemale size={26} />,
    "mujer-2": <FaUserNurse size={26} />,
    "mujer-3": <FaUserGraduate size={26} />,
  };

  return iconos[iconoAdmin] || <FaRegUserCircle size={26} />;
};

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [configuracion, setConfiguracion] = useState(() =>
    obtenerConfiguracionGuardada()
  );

  useEffect(() => {
    const cargarConfiguracion = () => {
      const config = obtenerConfiguracionGuardada();
      setConfiguracion(config);
    };

    cargarConfiguracion();

    window.addEventListener("admin-config-updated", cargarConfiguracion);

    return () => {
      window.removeEventListener("admin-config-updated", cargarConfiguracion);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const adminContent = document.querySelector(".dashboard-admin-content");

    if (adminContent) {
      adminContent.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    }
  }, [currentPath]);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      id: "ministerios",
      label: "Ministerios",
      path: "/admin/ministerios",
      icon: <Layers size={20} />,
    },
    {
      id: "fotos-inicio",
      label: "Fotos Inicio",
      path: "/admin/fotos-inicio",
      icon: <Images size={20} />,
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
        <div className="sidebar-logo sidebar-logo-image">
          <img src="/images/logo.jpg" alt="Logo Asamblea" />
        </div>

        <div className="sidebar-brand">
          <h2>Asamblea</h2>
          <span>Panel Administrativo</span>
        </div>
      </div>

      <div className="sidebar-user">
        <div className="sidebar-user-icon">
          {obtenerIconoAdmin(configuracion.iconoAdmin)}
        </div>

        <div className="sidebar-user-info">
          <h3>{configuracion.nombreAdmin}</h3>
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