import CardNoticia from "../../components/cardnoticia/CardNoticia";
import Carrousel from "../../components/carrousel/Carrousel";
import { useNoticias } from "./useNoticias";

export default function Noticias() {
  const {
    error,
    busqueda,
    noticiasActuales,
    noticiasFiltradas,
    currentPage,
    totalPaginas,
    handleBusquedaChange,
    handlePageChange,
  } = useNoticias();

  const renderPagination = () => {
    const botones = [];
    for (let i = 1; i <= totalPaginas; i++) {
      botones.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-md border ${
            currentPage === i
              ? "bg-indigo-600 text-white"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <nav className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        {botones}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPaginas}
          className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </nav>
    );
  };

  if (error) {
    return <p className="text-red-600">Error al cargar noticias.</p>;
  }

  return (
    <>
      <Carrousel />

      <div className="container mx-auto flex justify-center px-4 py-6">
        <input
          type="text"
          value={busqueda}
          onChange={handleBusquedaChange}
          placeholder="Buscar noticias..."
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <section className="py-4">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Últimas publicaciones</h2>

          {busqueda.trim() !== "" && (
            <p className="text-gray-600 mb-4">
              Resultados para: <span className="font-semibold">"{busqueda}"</span>
            </p>
          )}

          {noticiasFiltradas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {noticiasActuales.map((noticia) => (
                <CardNoticia key={noticia.id + Math.random()} noticia={noticia} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No hay noticias disponibles.</p>
          )}
        </div>
      </section>

      {totalPaginas > 1 && <div className="m-12 flex justify-center">{renderPagination()}</div>}
    </>
  );
}
