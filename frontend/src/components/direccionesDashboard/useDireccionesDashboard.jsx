/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { obtenerDirecciones, eliminarDireccion } from "../../services/direccionesService";

export function useDireccionesDashboard() {
  const [direcciones, setDirecciones] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const cargarDirecciones = async () => {
    setLoading(true);
    try {
      const response = await obtenerDirecciones({ search, page, limit });

      const formateadas = (response?.data ?? []).map((item) => ({
        id: item.id,
        calle: item.calle,
        barrio: item.barrio || "", // si no existe en la API, dejar en blanco
        localidad: item.localidad,
        provincia: item.provincia,
        pais: item.pais,
        codigo_postal: item.codigo_postal,
        descripcion: item.descripcion || "", // por si acaso no viene
      }));

      setDirecciones(formateadas);
      setTotalPages(1); // Si el backend devuelve totalPages, usalo acá
    } catch (error) {
      console.error("Error al cargar direcciones:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDirecciones();
  }, [search, page, limit]);

  const eliminar = async (id) => {
    if (confirm("¿Estás seguro de eliminar esta dirección?")) {
      try {
        await eliminarDireccion(id);
        cargarDirecciones();
      } catch (error) {
        alert("No se pudo eliminar la dirección.");
      }
    }
  };

  return {
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
  };
}
