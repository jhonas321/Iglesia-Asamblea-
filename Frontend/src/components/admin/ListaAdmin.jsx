import { Edit3, Trash2, Eye } from "lucide-react";
import "../../styles/ListaAdmin.css";

const ListaAdmin = ({
  columnas = [],
  datos = [],
  onVer,
  onEditar,
  onEliminar,
  mensajeVacio = "No hay registros para mostrar.",
}) => {
  const tieneAcciones = onVer || onEditar || onEliminar;

  return (
    <div className="lista-admin">
      <div className="lista-admin-table-wrapper">
        <table className="lista-admin-table">
          <thead>
            <tr>
              {columnas.map((columna) => (
                <th key={columna.key}>{columna.label}</th>
              ))}

              {tieneAcciones && (
                <th className="lista-admin-actions-th">Acciones</th>
              )}
            </tr>
          </thead>

          <tbody>
            {datos.length > 0 ? (
              datos.map((item, index) => (
                <tr key={item.id || index}>
                  {columnas.map((columna) => (
                    <td key={columna.key} data-label={columna.label}>
                      {columna.render
                        ? columna.render(item)
                        : item[columna.key] || "-"}
                    </td>
                  ))}

                  {tieneAcciones && (
                    <td data-label="Acciones">
                      <div className="lista-admin-actions">
                        {onVer && (
                          <button
                            type="button"
                            className="lista-admin-btn view"
                            onClick={() => onVer(item)}
                            aria-label="Ver"
                          >
                            <Eye size={17} />
                          </button>
                        )}

                        {onEditar && (
                          <button
                            type="button"
                            className="lista-admin-btn edit"
                            onClick={() => onEditar(item)}
                            aria-label="Editar"
                          >
                            <Edit3 size={17} />
                          </button>
                        )}

                        {onEliminar && (
                          <button
                            type="button"
                            className="lista-admin-btn delete"
                            onClick={() => onEliminar(item)}
                            aria-label="Eliminar"
                          >
                            <Trash2 size={17} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={tieneAcciones ? columnas.length + 1 : columnas.length}
                  className="lista-admin-empty"
                >
                  {mensajeVacio}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaAdmin;