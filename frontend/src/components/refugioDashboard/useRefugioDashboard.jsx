/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { obtenerRefugios, eliminarRefugio } from "../../services/mascotasService";

export function useRefugioDashboard() {
  const [refugios, setRefugios] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const cargarRefugios = async () => {
    setLoading(true);
    try {
      const data = await obtenerRefugios({ search, page, limit });
      setRefugios(data || []);
      // Si la API devuelve total, úsalo. Sino calcula totalPages con total items
      setTotalPages(1); // Puedes cambiar esto según la respuesta
    } catch (error) {
      console.error("Error al cargar refugios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarRefugios();
  }, [search, page, limit]);

  const eliminar = async (id) => {
    if (confirm("¿Estás seguro de eliminar este testimonio?")) {
      try {
        await eliminarRefugio(id);
        cargarRefugios();
      } catch (error) {
        alert("No se pudo eliminar el testimonio.");
      }
    }
  };

  return {
    refugios,
    loading,
    search,
    setSearch,
    page,
    setPage,
    limit,
    setLimit,
    totalPages,
    eliminar,
  };
}
