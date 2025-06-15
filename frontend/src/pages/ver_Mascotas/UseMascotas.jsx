/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { obtenerMascotas2 } from "../../services/mascotasService";

export default function UseMascotas() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = parseInt(searchParams.get("page")) || 1;

  const [mascotas, setMascotas] = useState([]);
  const [error, setError] = useState(null);

  // Filtros
  const [tipo, setTipo] = useState("Todos");
  const [edad, setEdad] = useState("Todas");
  const [tamanio, setTamanio] = useState("Todos");
  const [genero, setGenero] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  // Paginación
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [mascotasPorPagina, setMascotasPorPagina] = useState(8);

  useEffect(() => {
    setCurrentPage(pageParam); // 🔄 Sincroniza cuando cambia la URL
  }, [pageParam]);

  useEffect(() => {
    const filtros = {
      page: currentPage,
      limit: mascotasPorPagina,
      tipo: tipo !== "Todos" ? tipo : undefined,
      edad: edad !== "Todas" ? edad : undefined,
      tamanio: tamanio !== "Todos" ? tamanio : undefined,
      genero: genero !== "Todos" ? genero : undefined,
      search: busqueda.trim() !== "" ? busqueda.trim() : undefined,
    };

    obtenerMascotas2(filtros)
      .then((respuesta) => {
        if (respuesta.status && respuesta.data) {
          setMascotas(respuesta.data.items);
          setTotalPaginas(respuesta.data.pagination.pages);
          setMascotasPorPagina(respuesta.data.pagination.limit);
          setError(null);
        } else {
          setError("No se pudo obtener la lista de mascotas.");
          setMascotas([]);
          setTotalPaginas(1);
        }
      })
      .catch((err) => {
        setError(err.message || "Error al obtener mascotas");
        setMascotas([]);
        setTotalPaginas(1);
      });
  }, [currentPage, tipo, edad, tamanio, genero, busqueda]);

  const handlePageChange = (pagina) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set("page", pagina);
        return newParams;
      });
    }
  };

  const aplicarFiltros = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", 1); // Reinicia a página 1
      return newParams;
    });
  };

  return {
    mascotas,
    tipo,
    setTipo,
    edad,
    setEdad,
    tamanio,
    setTamanio,
    genero,
    setGenero,
    busqueda,
    setBusqueda,
    currentPage,
    handlePageChange,
    totalPaginas,
    error,
    aplicarFiltros,
  };
}
