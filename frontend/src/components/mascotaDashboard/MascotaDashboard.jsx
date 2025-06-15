/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { useMascotasDashboard } from "./useMascotasDashboard";

export default function MascotaDashboard() {
  const {
    mascotas,
    refugios,
    loading,
    search,
    page,
    limit,
    totalPages,
    setLimit,
    setPage,
    handleEliminar,
    handleSearchChange,
    obtenerNombreRefugio
  } = useMascotasDashboard();

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard de Mascotas
        </h1>
        <Link
          to="/dashboard/mascotaForm"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Agregar Mascota
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-64"
        />
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="border border-gray-300 rounded dark:bg-gray-400 dark:text-black px-3 py-2"
        >
          <option value={5}>5 por página</option>
          <option value={10}>10 por página</option>
          <option value={20}>20 por página</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Cargando mascotas...</p>
      ) : (
        <div className="overflow-x-auto rounded shadow bg-white">
          <table className="min-w-full text-left border">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
              <tr>
                <th className="px-4 py-3 dark:text-black border">ID</th>
                <th className="px-4 py-3 dark:text-black border">Imagen</th>
                <th className="px-4 py-3 dark:text-black border">Nombre</th>
                <th className="px-4 py-3 dark:text-black border">Tipo</th>
                <th className="px-4 py-3 dark:text-black border">Raza</th>
                <th className="px-4 py-3 dark:text-black border">Tamaño</th>
                <th className="px-4 py-3 dark:text-black border">Refugio</th>
                <th className="px-4 py-3 dark:text-black border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mascotas.map((mascota) => (
                <tr key={mascota.id} className="hover:bg-gray-500">
                  <td className="px-4 py-3 border">{mascota.id}</td>
                  <td className="px-4 py-3 border">
                    <img
                      src={
                        mascota.imagen_principal_url || mascota.imagen_principal
                      }
                      alt={mascota.nombre}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3 border">{mascota.nombre}</td>
                  <td className="px-4 py-3 border">{mascota.tipo}</td>
                  <td className="px-4 py-3 border">{mascota.raza}</td>
                  <td className="px-4 py-3 border">{mascota.tamanio}</td>
                  <td className="px-4 py-3 border">
                    {obtenerNombreRefugio(mascota.refugioId)}
                  </td>
                  <td className="px-4 py-3 border space-x-2">
                    <button
                      onClick={() => alert(`Editar mascota ID ${mascota.id}`)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(mascota.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {mascotas.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    No hay mascotas para mostrar.
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
