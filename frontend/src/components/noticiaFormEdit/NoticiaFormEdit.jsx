import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNoticiaFormEdit } from "./useNoticiaFormEdit";

export default function NoticiaFormEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    formData,
    errors,
    isSubmitting,
    isLoading,
    submitSuccess,
    handleChange,
    handleSubmit,
    handleImageChange,
    handleDrop,
    handleDragOver,
    handleCancel,
  } = useNoticiaFormEdit(id);

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-gray-600">Cargando noticia...</p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Editar Noticia</h2>

      <form
        onSubmit={async (e) => {
          const ok = await handleSubmit(e);
          if (ok) {
            navigate("/noticias");
          }
        }}
        className="space-y-5"
      >
        {/* Título */}
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
            className={`w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 ${
              errors.titulo
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.titulo && (
            <p className="text-red-600 text-sm mt-1">{errors.titulo}</p>
          )}
        </div>

        {/* Texto */}
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
            className={`w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 ${
              errors.texto
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.texto && (
            <p className="text-red-600 text-sm mt-1">{errors.texto}</p>
          )}
        </div>

        {/* Foto */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Foto del Autor
          </label>
          <div
            className={`dropzone rounded-lg p-8 text-center cursor-pointer border ${
              errors.foto ? "border-red-500 bg-red-50" : "border-gray-300"
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
                    handleCancel(); // resetea todo, también podrías hacer solo foto si querés
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

        {/* Botón */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700 transition duration-300 ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Actualizando..." : "Actualizar Noticia"}
        </button>

        {/* Mensajes */}
        {submitSuccess && (
          <p className="text-green-600 mt-4 text-center">
            Noticia actualizada con éxito.
          </p>
        )}
        {errors.general && (
          <p className="text-red-600 mt-4 text-center">{errors.general}</p>
        )}
      </form>
    </div>
  );
}
