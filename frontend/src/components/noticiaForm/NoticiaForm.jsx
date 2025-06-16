import React from "react";
import { useNoticiaForm } from "./useNoticiaForm";

export default function NoticiaForm() {
  const {
    formData,
    mensaje,
    error,
    cargando,
    handleChange,
    handleSubmit,
  } = useNoticiaForm();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Crear Nueva Noticia</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Título */}
        <div>
          <label htmlFor="titulo" className="block mb-2 font-semibold text-gray-700">
            Título *
          </label>
          <input
            id="titulo"
            name="titulo"
            type="text"
            value={formData.titulo}
            onChange={handleChange}
            required
            placeholder="Título de la noticia"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Texto */}
        <div>
          <label htmlFor="texto" className="block mb-2 font-semibold text-gray-700">
            Texto *
          </label>
          <textarea
            id="texto"
            name="texto"
            value={formData.texto}
            onChange={handleChange}
            required
            placeholder="Contenido de la noticia"
            rows={5}
            className="w-full border border-gray-300 rounded px-4 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Fecha */}
        <div>
          <label htmlFor="fecha" className="block mb-2 font-semibold text-gray-700">
            Fecha *
          </label>
          <input
            id="fecha"
            name="fecha"
            type="date"
            value={formData.fecha}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Foto */}
        <div>
          <label htmlFor="foto" className="block mb-2 font-semibold text-gray-700">
            URL de Foto
          </label>
          <input
            id="foto"
            name="foto"
            type="url"
            value={formData.foto}
            onChange={handleChange}
            placeholder="https://example.com/imagen.jpg"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          disabled={cargando}
          className={`w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700 transition duration-300 ${
            cargando ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {cargando ? "Creando..." : "Crear Noticia"}
        </button>

        {mensaje && <p className="text-green-600 mt-4 text-center">{mensaje}</p>}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
}
