import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "../styles/calendario-personalizado.css";

const crearFechaLocal = (anio, mes, dia) => {
  return new Date(Number(anio), Number(mes), Number(dia), 0, 0, 0, 0);
};

const convertirFechaInput = (valor) => {
  if (!valor) return null;

  const [anio, mes, dia] = valor.split("-").map(Number);

  if (!anio || !mes || !dia) return null;

  return crearFechaLocal(anio, mes - 1, dia);
};

const convertirDateAInput = (fecha) => {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
};

const obtenerFechaHoyInput = () => {
  return convertirDateAInput(new Date());
};

const formatearFechaInput = (valor) => {
  const fecha = convertirFechaInput(valor);

  if (!fecha) return "";

  return fecha.toLocaleDateString("es-BO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const obtenerNombreMes = (fecha) => {
  const mes = fecha.toLocaleDateString("es-BO", {
    month: "long",
  });

  const anio = fecha.getFullYear();

  return `${mes} ${anio}`;
};

const obtenerDiasCalendario = (fechaBase) => {
  const anio = fechaBase.getFullYear();
  const mes = fechaBase.getMonth();

  const primerDiaMes = new Date(anio, mes, 1);
  const ultimoDiaMes = new Date(anio, mes + 1, 0);

  const diaSemanaInicio =
    primerDiaMes.getDay() === 0 ? 6 : primerDiaMes.getDay() - 1;

  const dias = [];

  for (let i = diaSemanaInicio; i > 0; i--) {
    dias.push({
      fecha: new Date(anio, mes, 1 - i),
      esMesActual: false,
    });
  }

  for (let dia = 1; dia <= ultimoDiaMes.getDate(); dia++) {
    dias.push({
      fecha: new Date(anio, mes, dia),
      esMesActual: true,
    });
  }

  while (dias.length % 7 !== 0) {
    const ultimo = dias[dias.length - 1].fecha;

    dias.push({
      fecha: new Date(
        ultimo.getFullYear(),
        ultimo.getMonth(),
        ultimo.getDate() + 1
      ),
      esMesActual: false,
    });
  }

  return dias;
};

function CalendarioPersonalizado({
  valor,
  onChange,
  ejemplo,
  label,
  abierto,
  onAbrir,
  onCerrar,
}) {
  const fechaInicial = convertirFechaInput(valor) || new Date();

  const [calendarioInternoAbierto, setCalendarioInternoAbierto] =
    useState(false);

  const [mesCalendario, setMesCalendario] = useState(
    new Date(fechaInicial.getFullYear(), fechaInicial.getMonth(), 1)
  );

  const estaControlado = typeof abierto === "boolean";

  const calendarioAbierto = estaControlado
    ? abierto
    : calendarioInternoAbierto;

  useEffect(() => {
    const fechaSeleccionada = convertirFechaInput(valor);

    if (!fechaSeleccionada) return;

    setMesCalendario(
      new Date(
        fechaSeleccionada.getFullYear(),
        fechaSeleccionada.getMonth(),
        1
      )
    );
  }, [valor]);

  const cambiarMesCalendario = (cantidad) => {
    setMesCalendario((actual) => {
      return new Date(
        actual.getFullYear(),
        actual.getMonth() + cantidad,
        1
      );
    });
  };

  const abrirOCerrarCalendario = () => {
    if (estaControlado) {
      if (calendarioAbierto) {
        if (onCerrar) onCerrar();
      } else {
        if (onAbrir) onAbrir();
      }

      return;
    }

    setCalendarioInternoAbierto((actual) => !actual);
  };

  const cerrarCalendario = () => {
    if (estaControlado) {
      if (onCerrar) onCerrar();
    } else {
      setCalendarioInternoAbierto(false);
    }
  };

  const seleccionarFecha = (fecha) => {
    if (onChange) {
      onChange(convertirDateAInput(fecha));
    }

    cerrarCalendario();
  };

  const seleccionarHoy = () => {
    const hoy = new Date();

    setMesCalendario(
      new Date(hoy.getFullYear(), hoy.getMonth(), 1)
    );

    if (onChange) {
      onChange(obtenerFechaHoyInput());
    }

    cerrarCalendario();
  };

  return (
    <div className="calendario-reutilizable">
      <button
        type="button"
        className={`custom-date-input custom-date-button ${
          valor ? "has-value" : ""
        }`}
        onClick={abrirOCerrarCalendario}
        aria-label={label || "Seleccionar fecha"}
      >
        <span>
          {valor
            ? formatearFechaInput(valor)
            : ejemplo || "Seleccionar fecha"}
        </span>

        <FaCalendarAlt
          className="date-input-icon"
          aria-hidden="true"
        />
      </button>

      {calendarioAbierto && (
        <div className="calendario-popup">
          <div className="calendario-popup-header">
            <button
              type="button"
              onClick={() => cambiarMesCalendario(-1)}
              aria-label="Mes anterior"
            >
              <FaChevronLeft />
            </button>

            <strong>{obtenerNombreMes(mesCalendario)}</strong>

            <button
              type="button"
              onClick={() => cambiarMesCalendario(1)}
              aria-label="Mes siguiente"
            >
              <FaChevronRight />
            </button>
          </div>

          <div className="calendario-popup-dias-semana">
            <span>Lun</span>
            <span>Mar</span>
            <span>Mié</span>
            <span>Jue</span>
            <span>Vie</span>
            <span>Sáb</span>
            <span>Dom</span>
          </div>

          <div className="calendario-popup-grid">
            {obtenerDiasCalendario(mesCalendario).map((diaInfo) => {
              const valorDia = convertirDateAInput(diaInfo.fecha);
              const esSeleccionado = valor === valorDia;
              const esHoy = obtenerFechaHoyInput() === valorDia;

              return (
                <button
                  type="button"
                  key={valorDia}
                  className={`
                    ${!diaInfo.esMesActual ? "otro-mes" : ""}
                    ${esSeleccionado ? "seleccionado" : ""}
                    ${esHoy ? "hoy" : ""}
                  `}
                  onClick={() => seleccionarFecha(diaInfo.fecha)}
                >
                  {diaInfo.fecha.getDate()}
                </button>
              );
            })}
          </div>

          <div className="calendario-popup-footer">
            <button type="button" onClick={seleccionarHoy}>
              Hoy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarioPersonalizado;