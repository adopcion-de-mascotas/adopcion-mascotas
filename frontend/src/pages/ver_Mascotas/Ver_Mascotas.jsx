import React, { useState } from "react";
import mascotas from "../../data/mascotas";
import CardMascota from "../../components/cardmascota/CardMascota";

export default function Ver_Mascotas() {
  // Estados para filtros
  const [tipo, setTipo] = useState("Todos");
  const [edad, setEdad] = useState("Todas");
  const [tamano, setTamano] = useState("Todos");
  const [genero, setGenero] = useState("Todos");

  // Estado para búsqueda por nombre (si quieres agregar búsqueda por texto)
  const [busqueda, setBusqueda] = useState("");

  // Estado para paginación (cantidad visible)
  const [visibleCount, setVisibleCount] = useState(8);

  // Función para filtrar mascotas según filtros y búsqueda
  const mascotasFiltradas = mascotas.filter((m) => {
    // Filtrar por tipo
    if (tipo !== "Todos" && m.tipo !== tipo) return false;

    // Filtrar por edad
    if (edad !== "Todas" && m.edad !== edad) return false;

    // Filtrar por tamaño
    if (tamano !== "Todos" && m.tamano !== tamano) return false;

    // Filtrar por género
    if (genero !== "Todos" && m.genero !== genero) return false;

    // Filtrar por búsqueda de nombre (opcional)
    if (
      busqueda.trim() !== "" &&
      !m.nombre.toLowerCase().includes(busqueda.trim().toLowerCase())
    )
      return false;

    return true;
  });

  // Mascotas que vamos a mostrar (paginación)
  const mascotasVisibles = mascotasFiltradas.slice(0, visibleCount);

  // Función para cargar más mascotas
  const cargarMas = () => {
    setVisibleCount((prev) => prev + 8);
  };

  // Función para aplicar filtros (se puede mejorar para usar botón)
  // Aquí puedes usarla para hacer algo cuando se hace click en "Aplicar filtros"
  const aplicarFiltros = () => {
    // Por ahora no hace nada porque ya el filtro se aplica al cambiar select
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Botón de volver al home */}
      <div className="mb-6">
        <a
          href="/"
          className="inline-flex items-center text-yellow-500 hover:text-yellow-600 font-medium"
        >
          <i className="fas fa-arrow-left mr-2"></i> Volver al Home
        </a>
      </div>
      {/* Título */}
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
          {/* Tipo */}
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
              <option>Perros</option>
              <option>Gatos</option>
              <option>Otros</option>
            </select>
          </div>

          {/* Edad */}
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

          {/* Tamaño */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tamaño
            </label>
            <select
              value={tamano}
              onChange={(e) => setTamano(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            >
              <option>Todos</option>
              <option>Pequeño</option>
              <option>Mediano</option>
              <option>Grande</option>
            </select>
          </div>

          {/* Género */}
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

      {/* Opcional: Buscador de texto */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
        />
      </div>

      {/* Filtros de iconos (puedes hacerlos funcionales igual, ejemplo para tipo) */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setTipo("Todos")}
          className={`filter-option px-4 py-2 rounded-full ${
            tipo === "Todos"
              ? "bg-yellow-400 text-white font-medium"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setTipo("Perros")}
          className={`filter-option px-4 py-2 rounded-full ${
            tipo === "Perros"
              ? "bg-yellow-400 text-white font-medium"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          <i className="fas fa-dog mr-2"></i> Perros
        </button>
        <button
          onClick={() => setTipo("Gatos")}
          className={`filter-option px-4 py-2 rounded-full ${
            tipo === "Gatos"
              ? "bg-yellow-400 text-white font-medium"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          <i className="fas fa-cat mr-2"></i> Gatos
        </button>
        <button
          onClick={() => setTipo("Aves")}
          className={`filter-option px-4 py-2 rounded-full ${
            tipo === "Aves"
              ? "bg-yellow-400 text-white font-medium"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          <i className="fas fa-kiwi-bird mr-2"></i> Aves
        </button>
        <button
          onClick={() => setTipo("Conejos")}
          className={`filter-option px-4 py-2 rounded-full ${
            tipo === "Conejos"
              ? "bg-yellow-400 text-white font-medium"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          <i className="fas fa-rabbit mr-2"></i> Conejos
        </button>
      </div>

      {/* Mostrar mascotas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mascotasVisibles.map((m) => (
          <CardMascota key={m.id} mascota={m} />
        ))}
      </div>

      {/* Cargar más */}
      {visibleCount < mascotasFiltradas.length && (
        <div className="text-center mb-8">
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
