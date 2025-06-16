import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNoticiaFormEdit } from "./useNoticiaFormEdit";

export default function NoticiaFormEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    formData,
    mensaje,
    error,
    cargando,
    cargandoDatos,
    handleChange,
    handleSubmit,
  } = useNoticiaFormEdit(id);

  if (cargandoDatos) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Cargando noticia...
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Editar Noticia</h2>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const ok = await handleSubmit(e);
          if (ok) {
            navigate("/noticias");
          }
        }}
        className="space-y-5"
      >
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Título:
          </label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Texto:
          </label>
          <textarea
            name="texto"
            value={formData.texto}
            onChange={handleChange}
            rows={5}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            URL de la imagen:
          </label>
          <input
            type="url"
            name="foto"
            value={formData.foto}
            onChange={handleChange}
            placeholder="https://example.com/imagen.jpg"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Fecha:
          </label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={cargando}
          className={`w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700 transition duration-300 ${
            cargando ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {cargando ? "Actualizando..." : "Actualizar Noticia"}
        </button>

        {mensaje && (
          <p className="text-green-600 mt-4 text-center">{mensaje}</p>
        )}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
}
