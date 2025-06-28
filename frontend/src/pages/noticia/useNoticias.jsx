import { useEffect, useState } from "react";
import { obtenerNoticias } from "../../services/noticiaService";

export function useNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [busqueda, setBusqueda] = useState("");

  const noticiasPorPagina = 6;

  useEffect(() => {
    obtenerNoticias()
      .then((data) => {
        // Si necesitas duplicar los datos como antes
        const noticiasDuplicadas = [...data];
        setNoticias(noticiasDuplicadas);
      })
      .catch(setError);
  }, []);

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
    setCurrentPage(1);
  };

  // Filtrar noticias según búsqueda
  const noticiasFiltradas = noticias.filter((n) =>
    (n.titulo + n.contenido).toLowerCase().includes(busqueda.trim().toLowerCase())
  );

  const totalPaginas = Math.ceil(noticiasFiltradas.length / noticiasPorPagina);
  const indiceInicio = (currentPage - 1) * noticiasPorPagina;
  const indiceFin = indiceInicio + noticiasPorPagina;
  const noticiasActuales = noticiasFiltradas.slice(indiceInicio, indiceFin);

  const handlePageChange = (pagina) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setCurrentPage(pagina);
    }
  };

  return {
    error,
    busqueda,
    noticiasActuales,
    noticiasFiltradas,
    currentPage,
    totalPaginas,
    handleBusquedaChange,
    handlePageChange,
  };
}
