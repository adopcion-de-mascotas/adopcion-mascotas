import React from "react";
import { useNoticiaForm } from "./useNoticiaForm";

export default function NoticiaForm() {
  const {
    formData,
    mensaje,
    error,
    errors,
    cargando,
    handleChange,
    handleSubmit,
    handleImageChange,
    handleDrop,
    handleDragOver,
    handleCancel,
  } = useNoticiaForm();

  return (
    <>
      {/* Encabezado */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-emerald-600 mb-2">
          <i className="fas fa-paw mr-3"></i>Happy Paw
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700">
          Cargar Nuevo Testimonio
        </h2>
        <p className="text-gray-500 mt-2">
          ¡Comparte tu experiencia con nuestra comunidad!
        </p>
      </div>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Crear Nueva Noticia
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Título */}
          <div>
            <label
              htmlFor="titulo"
              className="block mb-2 font-semibold text-gray-700"
            >
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
            <label
              htmlFor="texto"
              className="block mb-2 font-semibold text-gray-700"
            >
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

          {/* Foto */}

          {/* Foto */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Foto del Autor <span className="text-red-500">*</span>
            </label>
            <div
              className={`dropzone rounded-lg p-8 text-center cursor-pointer ${
                errors.foto ? "border-red-500 bg-red-50" : ""
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById("fileInput").click()}
            >
              <input
                type="file"
                id="fileInput"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />

              {formData.fotoPreview ? (
                <div className="flex flex-col items-center">
                  <img
                    src={formData.fotoPreview}
                    alt="Preview"
                    className="max-h-48 max-w-full mb-4 rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Resetear foto
                      handleCancel();
                    }}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    <i className="fas fa-trash mr-1"></i> Cambiar foto
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <i className="fas fa-cloud-upload-alt text-3xl text-emerald-400"></i>
                  <p className="text-sm font-medium text-gray-700">
                    Arrastra y suelta una imagen aquí <br />o haz clic para
                    seleccionar
                  </p>
                  <p className="text-xs text-gray-500">
                    Formatos soportados: JPG, PNG, GIF (Máx. 5MB)
                  </p>
                </div>
              )}
            </div>
            {errors.foto && (
              <p className="mt-1 text-sm text-red-600">{errors.foto}</p>
            )}
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={cargando}
              className={`px-6 py-2 rounded-lg text-white ${
                cargando
                  ? "bg-emerald-400"
                  : "bg-emerald-600 hover:bg-emerald-700"
              } transition-colors flex items-center`}
            >
              {cargando ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane mr-2"></i> Publicar Noticia
                </>
              )}
            </button>
          </div>

          {mensaje && (
            <p className="text-green-600 mt-4 text-center">{mensaje}</p>
          )}
          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        </form>
      </div>
      {/* Nota */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          Todos los testimonios son revisados por nuestro equipo antes de ser
          publicados.
        </p>
        <p className="mt-1">
          ¡Gracias por compartir tu experiencia en Happy Paw!
        </p>
      </div>
    </>
  );
}
