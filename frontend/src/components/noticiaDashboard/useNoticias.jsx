/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { obtenerNoticias, eliminarNoticia } from "../../services/noticiaService";

export const useNoticias = () => {
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
      setTotalPages(1); // O ajustar si tu backend devuelve el total
    } catch (error) {
      console.error("Error al cargar noticias:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    if (confirm("¿Estás seguro de eliminar esta noticia?")) {
      try {
        await eliminarNoticia(id);
        cargarNoticias();
      } catch (error) {
        alert("No se pudo eliminar la noticia.");
      }
    }
  };

  useEffect(() => {
    cargarNoticias();
  }, [search, page, limit]);

  return {
    noticias,
    loading,
    search,
    setSearch,
    page,
    setPage,
    limit,
    setLimit,
    totalPages,
    handleEliminar,
  };
};
