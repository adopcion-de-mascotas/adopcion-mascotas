/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { obtenerTestimonios, eliminarTestimonio } from "../../services/testimonioService";

export function useTestimonios() {
  const [testimonios, setTestimonios] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const cargarTestimonios = async () => {
    setLoading(true);
    try {
      const data = await obtenerTestimonios({ search, page, limit });
      setTestimonios(data.data || []);
      // Si la API devuelve total, úsalo. Sino calcula totalPages con total items
      setTotalPages(1); // Puedes cambiar esto según la respuesta
    } catch (error) {
      console.error("Error al cargar testimonios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTestimonios();
  }, [search, page, limit]);

  const eliminar = async (id) => {
    if (confirm("¿Estás seguro de eliminar este testimonio?")) {
      try {
        await eliminarTestimonio(id);
        cargarTestimonios();
      } catch (error) {
        alert("No se pudo eliminar el testimonio.");
      }
    }
  };

  return {
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
  };
}
