/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import CardMascota from "../../components/cardmascota/CardMascota";
import { obtenerMascotas } from "../../services/mascotasService";

export default function Ver_Mascotas() {
  const [mascotas, setMascotas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerMascotas().then(setMascotas).catch(setError);
  }, []);

  if (error) {
    return <p className="text-red-600">Error al cargar mascotas.</p>;
  }

  // Estados para filtros
  const [tipo, setTipo] = useState("Todos");
  const [edad, setEdad] = useState("Todas");
  const [tamanio, setTamanio] = useState("Todos");
  const [genero, setGenero] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  // Filtrado completo
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

  // Aplicar paginación después de filtrar
  const mascotasVisibles = mascotasFiltradas.slice(0, visibleCount);

  const cargarMas = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const aplicarFiltros = () => {
    setVisibleCount(8); // Reiniciar paginación al aplicar filtros
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <a
          href="/"
          className="inline-flex items-center text-yellow-500 hover:text-yellow-600 font-medium"
        >
          <i className="fas fa-arrow-left mr-2"></i> Volver al Home
        </a>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Encuentra a tu compañero perfecto
        </h2>
        <p className="text-gray-600">
          Explora nuestra lista de mascotas disponibles para adopción.
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de mascota
            </label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            >
              <option>Todos</option>
              <option>Perro</option>
              <option>Gato</option>

            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Edad
            </label>
            <select
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            >
              <option>Todas</option>
              <option>Cachorro</option>
              <option>Joven</option>
              <option>Adulto</option>
              <option>Senior</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tamaño
            </label>
            <select
              value={tamanio}
              onChange={(e) => setTamanio(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            >
              <option>Todos</option>
              <option>Pequeño</option>
              <option>Mediano</option>
              <option>Grande</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Género
            </label>
            <select
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            >
              <option>Todos</option>
              <option>Macho</option>
              <option>Hembra</option>
            </select>
          </div>

          <button
            onClick={aplicarFiltros}
            className="self-end bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
          >
            Aplicar filtros
          </button>
        </div>
      </div>

      {/* Buscador */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setVisibleCount(8);
          }}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
        />
      </div>

      {/* Filtros rápidos por iconos */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["Todos", "Perro", "Gato"].map((t) => (
          <button
            key={t}
            onClick={() => {
              setTipo(t);
              setVisibleCount(8);
            }}
            className={`filter-option px-4 py-2 rounded-full ${
              tipo === t
                ? "bg-yellow-400 text-white font-medium"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {t === "Perro" && <i className="fas fa-dog mr-2"></i>}
            {t === "Gato" && <i className="fas fa-cat mr-2"></i>}
            {t}
          </button>
        ))}
      </div>

      {/* Mostrar tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mascotasVisibles.length > 0 ? (
          mascotasVisibles.map((mascota) => (
            <CardMascota key={mascota.id} mascota={mascota} />
          ))
        ) : (
          <p>No hay mascotas que coincidan con los filtros.</p>
        )}
      </div>

      {/* Botón cargar más */}
      {visibleCount < mascotasFiltradas.length && (
        <div className="text-center mt-8">
          <button
            id="loadMoreBtn"
            onClick={cargarMas}
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition duration-300 inline-flex items-center"
          >
            <span>Cargar más mascotas</span>
            <i className="fas fa-chevron-down ml-2"></i>
          </button>
        </div>
      )}
    </main>
  );
}
