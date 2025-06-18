/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { obtenerMascotas, eliminarMascota } from "../../services/mascotasService";
import { obtenerRefugios } from "../../services/refugioService";


export function useMascotasDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;

  const [mascotas, setMascotas] = useState([]);
  const [refugios, setRefugios] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(initialPage);
  const [total, setTotal] = useState(18)
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const cargarMascotas = async () => {
    setLoading(true);
    try {
      const mascotasData = await obtenerMascotas({ search, page, total, limit });
      setMascotas(mascotasData.data.items);
      setTotal(total)
      setTotalPages(Math.ceil(total / limit));
    } catch (error) {
      console.error("Error al cargar mascotas:", error);
    } finally {
      setLoading(false);
    }
  };

  const cargarRefugios = async () => {
    try {
      const respuesta = await obtenerRefugios();
      setRefugios(respuesta);
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
  if (!Array.isArray(refugios)) return "-";
  const refugio = refugios.find((r) => r.id === refugioId);
  return refugio ? refugio.nombre : "-";
};


  useEffect(() => {
    cargarRefugios();
  }, []);

  useEffect(() => {
    cargarMascotas();
  }, [search, page, limit]);

  useEffect(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", page);
      return newParams;
    });
  }, [page]);

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
    obtenerNombreRefugio,
  };
}
