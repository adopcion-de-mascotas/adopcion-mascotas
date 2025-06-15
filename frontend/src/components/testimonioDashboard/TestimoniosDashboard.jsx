import React from "react";
import { Link } from "react-router-dom";
import { useTestimonios } from "./useTestimonios"; // Ajusta la ruta según tu estructura

export default function TestimonioDashboard() {
  const {
    testimonios,
    loading,
    search,
    setSearch,
    page,
    setPage,
    limit,
    setLimit,
    totalPages,
    eliminar,
  } = useTestimonios();

  const renderEstrellas = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < count ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard de Testimonios
        </h1>
        <Link
          to="/dashboard/testimonioForm"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Agregar Testimonio
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Buscar por autor o comentario..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-64"
        />
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="border border-gray-300 dark:bg-gray-400 dark:text-black rounded px-3 py-2"
        >
          <option value={5}>5 por página</option>
          <option value={10}>10 por página</option>
          <option value={20}>20 por página</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Cargando testimonios...</p>
      ) : (
        <div className="overflow-x-auto rounded shadow bg-white">
          <table className="min-w-full text-left border">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
              <tr>
                <th className="px-4 dark:text-black py-3 border">ID</th>
                <th className="px-4 dark:text-black py-3 border">Foto</th>
                <th className="px-4 dark:text-black py-3 border">Comentario</th>
                <th className="px-4 dark:text-black py-3 border">Autor</th>
                <th className="px-4 dark:text-black py-3 border">Fecha</th>
                <th className="px-4 dark:text-black py-3 border">Estrellas</th>
                <th className="px-4 dark:text-black py-3 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {testimonios.length > 0 ? (
                testimonios.map((testimonio) => (
                  <tr key={testimonio.id} className="hover:bg-gray-500">
                    <td className="px-4 py-3 border">{testimonio.id}</td>
                    <td className="px-4 py-3 border">
                      <img
                        src={testimonio.foto}
                        alt={testimonio.autor}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    </td>
                    <td className="px-4 py-3 border">
                      {testimonio.comentario}
                    </td>
                    <td className="px-4 py-3 border">{testimonio.autor}</td>
                    <td className="px-4 py-3 border">
                      {new Date(testimonio.fecha).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 border">
                      {renderEstrellas(testimonio.estrellas)}
                    </td>
                    <td className="px-4 py-3 border space-x-2">
                      <Link
                        to={`/dashboard/testimonios/${testimonio.id}`}
                        onClick={() =>
                          alert(`Editar testimonio ID ${testimonio.id}`)
                        }
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => eliminar(testimonio.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No hay testimonios para mostrar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded dark:text-black hover:bg-gray-300 disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-gray-700">
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded dark:text-black hover:bg-gray-300 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </main>
  );
}
