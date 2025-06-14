import { useEffect, useState } from "react";
import CardNoticia from "../../components/cardnoticia/CardNoticia";
import { obtenerNoticias } from "../../services/noticiaService";
import Carrousel from "../../components/carrousel/Carrousel";

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [busqueda, setBusqueda] = useState("");

  const noticiasPorPagina = 6;

  useEffect(() => {
    obtenerNoticias()
      .then((data) => {
        const noticiasDuplicadas = [...data, ...data, ...data];
        setNoticias(noticiasDuplicadas);
      })
      .catch(setError);
  }, []);

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
    setCurrentPage(1);
  };

  // Filtrar por búsqueda
  const noticiasFiltradas = noticias.filter((n) =>
    (n.titulo + n.contenido)
      .toLowerCase()
      .includes(busqueda.trim().toLowerCase())
  );

  const totalPaginas = Math.ceil(noticiasFiltradas.length / noticiasPorPagina);
  const indiceInicio = (currentPage - 1) * noticiasPorPagina;
  const indiceFin = indiceInicio + noticiasPorPagina;
  const noticiasActuales = noticiasFiltradas.slice(indiceInicio, indiceFin);

  const handlePageChange = (pagina) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setCurrentPage(pagina);
    }
  };

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
      {/* Carrousel Section */}
      <Carrousel />

      {/* Search Input */}
      <div className="container mx-auto flex justify-center px-4 py-6">
        <input
          type="text"
          value={busqueda}
          onChange={handleBusquedaChange}
          placeholder="Buscar noticias..."
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Blog Posts Section */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Últimas publicaciones
          </h2>

          {busqueda.trim() !== "" && (
            <p className="text-gray-600 mb-4">
              Resultados para:{" "}
              <span className="font-semibold">"{busqueda}"</span>
            </p>
          )}

          {noticiasFiltradas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {noticiasActuales.map((noticia) => (
                <CardNoticia
                  key={noticia.id + Math.random()}
                  noticia={noticia}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No hay noticias disponibles.</p>
          )}
        </div>
      </section>

      {/* Pagination */}
      {totalPaginas > 1 && (
        <div className="m-12 flex justify-center">{renderPagination()}</div>
      )}

    </>
  );
}
