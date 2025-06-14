/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  obtenerMascotas,
  eliminarMascota,
} from "../../services/mascotasService";
import { Link } from "react-router-dom";

export default function MascotaDashboard() {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtros y paginación
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const cargarMascotas = async () => {
    setLoading(true);
    try {
      const data = await obtenerMascotas({ search, page, limit });
      setMascotas(data);
      // Suponiendo que tu API devuelve metadata: totalPages
      // Si no, deberías ajustarlo desde el backend o manejarlo con `data.length`
      setTotalPages(5); // ⚠️ Simulado, ajustar con `json.meta.totalPages` si tu API lo da
    } catch (error) {
      console.error("Error al cargar mascotas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarMascotas();
  }, [search, page, limit]);

  const handleEliminar = async (id) => {
    if (confirm("¿Estás seguro de eliminar esta mascota?")) {
      try {
        await eliminarMascota(id);
        cargarMascotas();
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        alert("No se pudo eliminar la mascota.");
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Volver a página 1 al buscar
  };

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard de Mascotas
        </h1>
        <Link
          to="/dashboard/mascotaForm"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => alert("Abrir formulario de agregar")}
        >
          Agregar Mascota
        </Link>
      </div>

      {/* Buscador y Selector de cantidad */}
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
          className="border border-gray-300 rounded px-3 py-2"
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
                <th className="px-4 py-3 border">ID</th>
                <th className="px-4 py-3 border">Imagen</th>
                <th className="px-4 py-3 border">Nombre</th>
                <th className="px-4 py-3 border">Tipo</th>
                <th className="px-4 py-3 border">Raza</th>
                <th className="px-4 py-3 border">Tamaño</th>
                <th className="px-4 py-3 border">Refugio</th>
                <th className="px-4 py-3 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mascotas.map((mascota) => (
                <tr key={mascota.id} className="hover:bg-gray-50">
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
                    {mascota.refugio?.nombre || "-"}
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

      {/* Controles de paginación */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-gray-700">
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </main>
  );
}
