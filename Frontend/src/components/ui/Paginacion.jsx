import "../../styles/Paginacion.css";

function Paginacion({
  paginaActual,
  totalElementos,
  elementosPorPagina,
  onCambiarPagina,
  scrollAlCambiar = false,
}) {
  const totalPaginas = Math.ceil(totalElementos / elementosPorPagina);

  if (totalPaginas <= 1) return null;

  const paginas = Array.from({ length: totalPaginas }, (_, index) => index + 1);

  const hacerScrollArriba = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const irAPagina = (pagina) => {
    if (pagina < 1 || pagina > totalPaginas || pagina === paginaActual) return;

    if (scrollAlCambiar) {
      hacerScrollArriba();

      setTimeout(() => {
        onCambiarPagina(pagina);
      }, 280);

      return;
    }

    onCambiarPagina(pagina);
  };

  return (
    <nav className="paginacion-reutilizable" aria-label="Paginación">
      <button
        type="button"
        className="paginacion-control"
        onClick={() => irAPagina(paginaActual - 1)}
        disabled={paginaActual === 1}
        aria-label="Página anterior"
      >
        ‹
      </button>

      <div className="paginacion-numeros">
        {paginas.map((pagina) => (
          <button
            type="button"
            key={pagina}
            className={`paginacion-numero ${
              paginaActual === pagina ? "activo" : ""
            }`}
            onClick={() => irAPagina(pagina)}
            aria-current={paginaActual === pagina ? "page" : undefined}
          >
            {pagina}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="paginacion-control"
        onClick={() => irAPagina(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
        aria-label="Página siguiente"
      >
        ›
      </button>
    </nav>
  );
}

export default Paginacion;