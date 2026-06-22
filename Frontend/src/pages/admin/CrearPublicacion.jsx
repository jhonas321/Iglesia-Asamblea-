import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

import ListaAdmin from "../../components/admin/ListaAdmin";
import { publicacionesBase } from "../../data/publicacionesData";
import "../../styles/AdminCrudPage.css";

const meses = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  setiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
};

const limpiarTexto = (texto) => {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const crearFechaLocal = (anio, mes, dia) => {
  return new Date(Number(anio), Number(mes), Number(dia), 0, 0, 0, 0);
};

const crearFechaDesdeTexto = (dia, mesTexto, anio) => {
  const mes = meses[limpiarTexto(mesTexto)];

  if (mes === undefined) return null;

  return crearFechaLocal(anio, mes, dia);
};

const obtenerRangoFecha = (fechaTexto) => {
  const fechaLimpia = limpiarTexto(fechaTexto.trim());

  const rango = fechaLimpia.match(
    /(\d{1,2})\s+al\s+(\d{1,2})\s+([a-zñ]+)\s+(\d{4})/
  );

  if (rango) {
    return {
      inicio: crearFechaDesdeTexto(rango[1], rango[3], rango[4]),
      fin: crearFechaDesdeTexto(rango[2], rango[3], rango[4]),
    };
  }

  const fechaSimple = fechaLimpia.match(/(\d{1,2})\s+([a-zñ]+)\s+(\d{4})/);

  if (fechaSimple) {
    const fecha = crearFechaDesdeTexto(
      fechaSimple[1],
      fechaSimple[2],
      fechaSimple[3]
    );

    return {
      inicio: fecha,
      fin: fecha,
    };
  }

  return {
    inicio: null,
    fin: null,
  };
};

const obtenerFechaOrden = (fechaTexto) => {
  const { fin } = obtenerRangoFecha(fechaTexto);

  return fin ? fin.getTime() : 0;
};

const CrearPublicacion = () => {
  const navigate = useNavigate();
  const [publicacionesEliminadas, setPublicacionesEliminadas] = useState([]);

  const publicacionesAdmin = useMemo(() => {
    return [...publicacionesBase].sort(
      (a, b) => obtenerFechaOrden(b.fecha) - obtenerFechaOrden(a.fecha)
    );
  }, []);

  const publicacionesVisibles = useMemo(() => {
    return publicacionesAdmin.filter(
      (publicacion) => !publicacionesEliminadas.includes(publicacion.id)
    );
  }, [publicacionesAdmin, publicacionesEliminadas]);

  const columnasPublicaciones = [
    { key: "titulo", label: "Título" },
    { key: "ministerio", label: "Ministerio" },
    { key: "fecha", label: "Fecha" },
    { key: "hora", label: "Hora" },
    { key: "lugar", label: "Lugar" },
    { key: "categoria", label: "Categoría" },
    {
      key: "estado",
      label: "Estado",
      render: () => <span className="admin-status publicado">Publicado</span>,
    },
  ];

  const handleCrear = () => {
    console.log("Crear nueva publicación");
  };

  const handleVer = (publicacion) => {
    navigate(`/ministerios/publicaciones/${publicacion.id}`);
  };

  const handleEditar = (publicacion) => {
    console.log("Editar publicación:", publicacion);
  };

  const handleEliminar = (publicacion) => {
    const confirmar = window.confirm(
      `¿Seguro que quieres eliminar la publicación "${publicacion.titulo}"?`
    );

    if (!confirmar) return;

    setPublicacionesEliminadas((actual) => [...actual, publicacion.id]);
  };

  return (
    <section className="admin-crud-page">
      <div className="admin-crud-header">
        <div>
          <span className="admin-crud-label">Gestión administrativa</span>
          <h1>Publicaciones</h1>
          <p>Administra las publicaciones visibles en la página principal.</p>
        </div>

        <button type="button" className="admin-create-btn" onClick={handleCrear}>
          <PlusCircle size={20} />
          <span>Crear publicación</span>
        </button>
      </div>

      <ListaAdmin
        columnas={columnasPublicaciones}
        datos={publicacionesVisibles}
        onVer={handleVer}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        mensajeVacio="No hay publicaciones registradas."
      />
    </section>
  );
};

export default CrearPublicacion;