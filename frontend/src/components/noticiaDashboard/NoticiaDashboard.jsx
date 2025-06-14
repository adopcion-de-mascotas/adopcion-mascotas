/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  obtenerNoticias,
  eliminarNoticia,
} from "../../services/noticiaService";
import { Link } from "react-router-dom";

export default function NoticiasDashboard() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const cargarNoticias = async () => {
    setLoading(true);
    try {
      const noticiasData = await obtenerNoticias({ search, page, limit });
      setNoticias(noticiasData || []);
      setTotalPages(1); // Si no tienes meta, poner 1 o calcularlo en backend
    } catch (error) {
      console.error("Error al cargar noticias:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarNoticias();
  }, [search, page, limit]);

  const handleEliminar = async (id) => {
    if (confirm("¿Estás seguro de eliminar esta noticia?")) {
      try {
        await eliminarNoticia(id);
        cargarNoticias();
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        alert("No se pudo eliminar la noticia.");
      }
    }
  };

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard de Noticias
        </h1>
        <Link
          to="/dashboard/noticiaForm"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Agregar Noticia
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Buscar por título..."
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
        <p className="text-center text-gray-500">Cargando noticias...</p>
      ) : (
        <div className="overflow-x-auto rounded shadow bg-white">
          <table className="min-w-full text-left border">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
              <tr>
                <th className="px-4 py-3 dark:text-black border">ID</th>
                <th className="px-4 py-3 dark:text-black border">Imagen</th>
                <th className="px-4 py-3 dark:text-black border">Título</th>
                <th className="px-4 py-3 dark:text-black border">Fecha</th>
                <th className="px-4 py-3 dark:text-black border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {noticias.length > 0 ? (
                noticias.map((noticia) => (
                  <tr key={noticia.id} className="hover:bg-gray-500">
                    <td className="px-4 py-3 border">{noticia.id}</td>
                    <td className="px-4 py-3 border">
                      <img
                        src={noticia.foto}
                        alt={noticia.titulo}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4sEG5g9GFcy4SUxbzWNzUTf1jMISTDZrTw&s";
                        }}
                      />
                    </td>
                    <td className="px-4 py-3 border">{noticia.titulo}</td>
                    <td className="px-4 py-3 border">
                      {new Date(noticia.fecha).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 border space-x-2">
                      <button
                        onClick={() => alert(`Editar noticia ID ${noticia.id}`)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleEliminar(noticia.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No hay noticias para mostrar.
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
