import React from "react";
import { Link } from "react-router-dom";
import { useDireccionesDashboard } from "./useDireccionesDashboard";

export default function DireccionesDashboard() {
  const {
    direcciones,
    loading,
    search,
    setSearch,
    page,
    setPage,
    limit,
    setLimit,
    totalPages,
    eliminar,
  } = useDireccionesDashboard();

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard de Direcciones
        </h1>
        <Link
          to="/dashboard/direccionForm"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Agregar Dirección
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Buscar por calle, localidad o país..."
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
        <p className="text-center text-gray-500">Cargando direcciones...</p>
      ) : (
        <div className="overflow-x-auto rounded shadow bg-white">
          <table className="min-w-full text-left border">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
              <tr>
                <th className="px-4 py-3 border dark:text-black">ID</th>
                <th className="px-4 py-3 border dark:text-black">Calle</th>
                <th className="px-4 py-3 border dark:text-black">Localidad</th>
                <th className="px-4 py-3 border dark:text-black">Provincia</th>
                <th className="px-4 py-3 border dark:text-black">País</th>
                <th className="px-4 py-3 border dark:text-black">Código Postal</th>
                <th className="px-4 py-3 border dark:text-black">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {direcciones.length > 0 ? (
                direcciones.map((direccion) => (
                  <tr key={direccion.id} className="hover:bg-gray-500">
                    <td className="px-4 py-3 border">{direccion.id}</td>
                    <td className="px-4 py-3 border">{direccion.calle}</td>
                    <td className="px-4 py-3 border">{direccion.localidad}</td>
                    <td className="px-4 py-3 border">{direccion.provincia}</td>
                    <td className="px-4 py-3 border">{direccion.pais}</td>
                    <td className="px-4 py-3 border">{direccion.codigo_postal}</td>
                    <td className="px-4 py-3 border space-x-2">
                      <Link
                        to={`/dashboard/direcciones/${direccion.id}`}
                        className="inline-flex items-center justify-center bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => eliminar(direccion.id)}
                        className="inline-flex items-center justify-center bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 "
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500 ">
                    No hay direcciones para mostrar.
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
