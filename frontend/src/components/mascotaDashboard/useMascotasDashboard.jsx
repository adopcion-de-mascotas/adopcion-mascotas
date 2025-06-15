/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  obtenerMascotas,
  eliminarMascota,
  obtenerRefugios
} from "../../services/mascotasService";

export function useMascotasDashboard() {
  const [mascotas, setMascotas] = useState([]);
  const [refugios, setRefugios] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const cargarMascotas = async () => {
    setLoading(true);
    try {
      const mascotasData = await obtenerMascotas({ search, page, limit });
      setMascotas(mascotasData);
      setTotalPages(5); // TODO: reemplazar con valor real cuando esté disponible en la respuesta
    } catch (error) {
      console.error("Error al cargar mascotas:", error);
    } finally {
      setLoading(false);
    }
  };

  const cargarRefugios = async () => {
    try {
      const respuesta = await obtenerRefugios();
      setRefugios(respuesta.data);
    } catch (error) {
      console.error("Error al cargar refugios:", error);
    }
  };

  const handleEliminar = async (id) => {
    if (confirm("¿Estás seguro de eliminar esta mascota?")) {
      try {
        await eliminarMascota(id);
        cargarMascotas();
      } catch (error) {
        alert("No se pudo eliminar la mascota.");
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const obtenerNombreRefugio = (refugioId) => {
    const refugio = refugios.find((r) => r.id === refugioId);
    return refugio ? refugio.nombre : "-";
  };

  useEffect(() => {
    cargarRefugios();
  }, []);

  useEffect(() => {
    cargarMascotas();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page, limit]);

  return {
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
  };
}
