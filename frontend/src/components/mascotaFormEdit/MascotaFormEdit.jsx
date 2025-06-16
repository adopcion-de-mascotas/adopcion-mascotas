import React from "react";
import { useMascotaFormEdit } from "./useMascotaFormEdit";

export default function MascotaFormEdit() {
  const {
    formData,
    handleChange,
    handleSubmit,
    handlePersonalidadChange,
    mensaje,
    error,
    cargando,
  } = useMascotaFormEdit();

  const opcionesPersonalidad = [
    "Amigable",
    "Juguetón",
    "Tranquilo",
    "Activo",
    "Cariñoso",
  ];
  const opcionesTamanio = ["Pequeño", "Mediano", "Grande"];
  const opcionesGenero = ["Macho", "Hembra"];

  if (cargando)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-48 h-1 bg-gray-300 rounded overflow-hidden">
          <div className="animate-pulse w-full h-full bg-green-500"></div>
        </div>
      </div>
    );

  if (error)
    return (
      <p className="text-red-600 text-center font-semibold mt-8">{error}</p>
    );

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800 border-b pb-4">
        Editar Mascota
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre */}
        <div>
          <label htmlFor="nombre" className="block text-gray-700 font-semibold mb-2">Nombre</label>
          <input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required className="input-style" placeholder="Nombre de la mascota" />
        </div>

        {/* Edad */}
        <div>
          <label htmlFor="edad" className="block text-gray-700 font-semibold mb-2">Edad</label>
          <input id="edad" name="edad" type="number" min="0" value={formData.edad} onChange={handleChange} required className="input-style" placeholder="Edad en años" />
        </div>

        {/* Tipo */}
        <div>
          <label htmlFor="tipo" className="block text-gray-700 font-semibold mb-2">Tipo</label>
          <input id="tipo" name="tipo" value={formData.tipo} onChange={handleChange} required className="input-style" placeholder="Ej: Perro, Gato" />
        </div>

        {/* Raza */}
        <div>
          <label htmlFor="raza" className="block text-gray-700 font-semibold mb-2">Raza</label>
          <input id="raza" name="raza" value={formData.raza} onChange={handleChange} className="input-style" placeholder="Raza de la mascota" />
        </div>

        {/* Género */}
        <div>
          <label htmlFor="genero" className="block text-gray-700 font-semibold mb-2">Género</label>
          <select id="genero" name="genero" value={formData.genero} onChange={handleChange} className="input-style">
            <option value="">Selecciona género</option>
            {opcionesGenero.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        {/* Tamaño */}
        <div>
          <label htmlFor="tamanio" className="block text-gray-700 font-semibold mb-2">Tamaño</label>
          <select id="tamanio" name="tamanio" value={formData.tamanio} onChange={handleChange} className="input-style">
            <option value="">Selecciona tamaño</option>
            {opcionesTamanio.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Peso */}
        <div>
          <label htmlFor="peso" className="block text-gray-700 font-semibold mb-2">Peso (kg)</label>
          <input id="peso" name="peso" type="number" min="0" step="0.1" value={formData.peso} onChange={handleChange} className="input-style" placeholder="Peso aproximado en kilogramos" />
        </div>

        {/* Esterilizado */}
        <div>
          <label className="inline-flex items-center cursor-pointer select-none">
            <input type="checkbox" name="esterilizado" checked={formData.esterilizado} onChange={handleChange} className="mr-3 h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500" />
            <span className="text-gray-700 font-semibold">Esterilizado/a</span>
          </label>
        </div>

        {/* Estado */}
        <div>
          <label htmlFor="estado" className="block text-gray-700 font-semibold mb-2">Estado</label>
          <input id="estado" name="estado" value={formData.estado} onChange={handleChange} className="input-style" placeholder="Estado donde se encuentra" />
        </div>

        {/* Ciudad */}
        <div>
          <label htmlFor="ciudad" className="block text-gray-700 font-semibold mb-2">Ciudad</label>
          <input id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} className="input-style" placeholder="Ciudad donde se encuentra" />
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="descripcion" className="block text-gray-700 font-semibold mb-2">Descripción</label>
          <textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} className="input-style resize-y" placeholder="Descripción breve de la mascota" rows={3} />
        </div>

        {/* Historia */}
        <div>
          <label htmlFor="historia" className="block text-gray-700 font-semibold mb-2">Historia</label>
          <textarea id="historia" name="historia" value={formData.historia} onChange={handleChange} className="input-style resize-y" placeholder="Historia o antecedentes de la mascota" rows={4} />
        </div>

        {/* Personalidad */}
        <fieldset className="border border-gray-300 rounded-lg p-4">
          <legend className="text-gray-800 font-semibold mb-3 px-2">Personalidad</legend>
          <div className="flex flex-wrap gap-6">
            {opcionesPersonalidad.map((item) => (
              <label key={item} className="inline-flex items-center cursor-pointer select-none">
                <input type="checkbox" value={item} checked={formData.personalidad.includes(item)} onChange={handlePersonalidadChange} className="mr-3 h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                <span className="text-gray-700 font-medium">{item}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition duration-300 shadow-md focus:outline-none focus:ring-4 focus:ring-green-400">
          Guardar cambios
        </button>

        {mensaje && <p className="text-green-700 text-center font-semibold mt-4">{mensaje}</p>}
        {error && <p className="text-red-600 text-center font-semibold mt-4">{error}</p>}
      </form>
    </div>
  );
}
