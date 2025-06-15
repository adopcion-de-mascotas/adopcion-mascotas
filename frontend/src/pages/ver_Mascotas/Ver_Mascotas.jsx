import React from "react";
import CardMascota from "../../components/cardmascota/CardMascota";
import Carrousel from "../../components/carrousel/Carrousel";
import UseMascotas  from './UseMascotas';


export default function Ver_Mascotas() {
const {
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
  } = UseMascotas();

  if (error) return <p className="text-red-600">Error al cargar mascotas.</p>;

  const renderPagination = () => {
    const botones = [];

    for (let i = 1; i <= totalPaginas; i++) {
      botones.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-md border ${
            currentPage === i
              ? "bg-yellow-400 text-white"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <nav className="flex items-center justify-center space-x-2 m-12">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        {botones}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPaginas}
          className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </nav>
    );
  };

  return (
    <>
      <Carrousel />
      <main className="container mx-auto px-4 py-8">
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
                <option>Perro</option>
                <option>Gato</option>
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
                <option>6 meses</option>
                <option>1 año</option>
                <option>2 años</option>
                <option>3 años</option>
                <option>4 años</option>
              </select>
            </div>

            {/* Tamaño */}
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

            {/* Botón aplicar */}
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
              aplicarFiltros();
            }}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
          />
        </div>

        {/* Filtros rápidos */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["Todos", "Perro", "Gato"].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTipo(t);
                aplicarFiltros();
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

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mascotasVisibles.length > 0 ? (
            mascotasVisibles.map((mascota) => (
              <CardMascota key={mascota.id} mascota={mascota} />
            ))
          ) : (
            <p>No hay mascotas que coincidan con los filtros.</p>
          )}
        </div>

        {/* Paginador */}
        {totalPaginas > 1 && renderPagination()}
      </main>
    </>
  );
}