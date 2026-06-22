import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

import ListaAdmin from "../../components/admin/ListaAdmin";
import { eventos } from "../../data/eventosData";
import "../../styles/AdminCrudPage.css";

const obtenerFechaActualInput = () => {
  const hoy = new Date();

  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
};

const crearFechaLocalDesdeInput = (fechaInput) => {
  const [anio, mes, dia] = fechaInput.split("-").map(Number);
  return new Date(anio, mes - 1, dia);
};

const obtenerNombreMes = (numeroMes) => {
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return meses[numeroMes];
};

const formatearFechaEvento = (fechaInput) => {
  const fecha = crearFechaLocalDesdeInput(fechaInput);

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = obtenerNombreMes(fecha.getMonth());
  const anio = fecha.getFullYear();

  return `${dia} ${mes} ${anio}`;
};

const formatearRangoFechaEvento = (fechaInicio, fechaFinal) => {
  const inicio = crearFechaLocalDesdeInput(fechaInicio);
  const final = crearFechaLocalDesdeInput(fechaFinal || fechaInicio);

  const mismoDia =
    inicio.getFullYear() === final.getFullYear() &&
    inicio.getMonth() === final.getMonth() &&
    inicio.getDate() === final.getDate();

  if (mismoDia) {
    return formatearFechaEvento(fechaInicio);
  }

  const mismoMes =
    inicio.getFullYear() === final.getFullYear() &&
    inicio.getMonth() === final.getMonth();

  if (mismoMes) {
    const diaInicio = String(inicio.getDate()).padStart(2, "0");
    const diaFinal = String(final.getDate()).padStart(2, "0");
    const mes = obtenerNombreMes(inicio.getMonth());
    const anio = inicio.getFullYear();

    return `${diaInicio} al ${diaFinal} ${mes} ${anio}`;
  }

  const mismoAnio = inicio.getFullYear() === final.getFullYear();

  if (mismoAnio) {
    const diaInicio = String(inicio.getDate()).padStart(2, "0");
    const mesInicio = obtenerNombreMes(inicio.getMonth());
    const diaFinal = String(final.getDate()).padStart(2, "0");
    const mesFinal = obtenerNombreMes(final.getMonth());
    const anio = inicio.getFullYear();

    return `${diaInicio} ${mesInicio} al ${diaFinal} ${mesFinal} ${anio}`;
  }

  return `${formatearFechaEvento(fechaInicio)} al ${formatearFechaEvento(
    fechaFinal
  )}`;
};

const obtenerEstadoEvento = (evento, fechaActual) => {
  const fechaInicio = evento.fechaInicio;
  const fechaFinal = evento.fechaFinal || evento.fechaInicio;

  if (fechaActual < fechaInicio) return "proximo";
  if (fechaActual > fechaFinal) return "pasado";

  return "enCurso";
};

const textoEstadoEvento = (estado) => {
  if (estado === "enCurso") return "En curso";
  if (estado === "pasado") return "Finalizado";
  return "Próximo";
};

const claseEstadoEvento = (estado) => {
  if (estado === "enCurso") return "en-curso";
  return estado;
};

const ordenarEventosAdmin = (lista) => {
  const prioridadEstado = {
    enCurso: 1,
    proximo: 2,
    pasado: 3,
  };

  return [...lista].sort((a, b) => {
    const diferenciaEstado =
      prioridadEstado[a.estado] - prioridadEstado[b.estado];

    if (diferenciaEstado !== 0) return diferenciaEstado;

    if (a.estado === "pasado") {
      return new Date(b.fechaInicio) - new Date(a.fechaInicio);
    }

    return new Date(a.fechaInicio) - new Date(b.fechaInicio);
  });
};

const CrearEventos = () => {
  const navigate = useNavigate();
  const [eventosEliminados, setEventosEliminados] = useState([]);

  const eventosAdmin = useMemo(() => {
    const fechaActual = obtenerFechaActualInput();

    const eventosConEstado = eventos.map((evento) => ({
      ...evento,
      fecha: formatearRangoFechaEvento(evento.fechaInicio, evento.fechaFinal),
      estado: obtenerEstadoEvento(evento, fechaActual),
    }));

    return ordenarEventosAdmin(eventosConEstado);
  }, []);

  const eventosVisibles = useMemo(() => {
    return eventosAdmin.filter(
      (evento) => !eventosEliminados.includes(evento.id)
    );
  }, [eventosAdmin, eventosEliminados]);

  const columnasEventos = [
    { key: "titulo", label: "Título" },
    { key: "ministerio", label: "Ministerio" },
    { key: "fecha", label: "Fecha" },
    { key: "hora", label: "Hora" },
    { key: "lugar", label: "Lugar" },
    {
      key: "estado",
      label: "Estado",
      render: (evento) => (
        <span className={`admin-status ${claseEstadoEvento(evento.estado)}`}>
          {textoEstadoEvento(evento.estado)}
        </span>
      ),
    },
  ];

  const handleCrear = () => {
    console.log("Crear nuevo evento");
  };

  const handleVer = (evento) => {
    navigate(`/ministerios/eventos/${evento.id}`);
  };

  const handleEditar = (evento) => {
    console.log("Editar evento:", evento);
  };

  const handleEliminar = (evento) => {
    const confirmar = window.confirm(
      `¿Seguro que quieres eliminar el evento "${evento.titulo}"?`
    );

    if (!confirmar) return;

    setEventosEliminados((actual) => [...actual, evento.id]);
  };

  return (
    <section className="admin-crud-page">
      <div className="admin-crud-header">
        <div>
          <span className="admin-crud-label">Gestión administrativa</span>
          <h1>Eventos</h1>
          <p>Administra los eventos registrados de la iglesia.</p>
        </div>

        <button type="button" className="admin-create-btn" onClick={handleCrear}>
          <PlusCircle size={20} />
          <span>Crear evento</span>
        </button>
      </div>

      <ListaAdmin
        columnas={columnasEventos}
        datos={eventosVisibles}
        onVer={handleVer}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        mensajeVacio="No hay eventos registrados."
      />
    </section>
  );
};

export default CrearEventos;