import { useEffect, useState } from "react";
import { obtenerMascotas } from "../../services/mascotasService";

export default function UseMascotas() {
  const [mascotas, setMascotas] = useState([]);
  const [error, setError] = useState(null);

  // Filtros
  const [tipo, setTipo] = useState("Todos");
  const [edad, setEdad] = useState("Todas");
  const [tamanio, setTamanio] = useState("Todos");
  const [genero, setGenero] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const mascotasPorPagina = 8;

  useEffect(() => {
    obtenerMascotas().then(setMascotas).catch(setError);
  }, []);

  const aplicarFiltros = () => setCurrentPage(1);

  const mascotasFiltradas = mascotas.filter((m) => {
    if (tipo !== "Todos" && m.tipo !== tipo) return false;
    if (edad !== "Todas" && m.edad !== edad) return false;
    if (tamanio !== "Todos" && m.tamanio !== tamanio) return false;
    if (genero !== "Todos" && m.genero !== genero) return false;
    if (
      busqueda.trim() !== "" &&
      !m.nombre.toLowerCase().includes(busqueda.trim().toLowerCase())
    )
      return false;
    return true;
  });

  const totalPaginas = Math.ceil(mascotasFiltradas.length / mascotasPorPagina);
  const indiceInicio = (currentPage - 1) * mascotasPorPagina;
  const mascotasVisibles = mascotasFiltradas.slice(
    indiceInicio,
    indiceInicio + mascotasPorPagina
  );

  const handlePageChange = (pagina) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setCurrentPage(pagina);
    }
  };

  return {
    mascotasVisibles,
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
    aplicarFiltros,
    currentPage,
    handlePageChange,
    totalPaginas,
    error,
  };
}