import React from "react";
import useTestimonioForm from "./useTestimonioForm";
import "./TestimonioForm.css";

export default function TestimonioForm() {
  const {
    formData,
    mascotas,
    errors,
    isSubmitting,
    submitSuccess,
    handleChange,
    handleImageChange,
    handleDrop,
    handleDragOver,
    handleSubmit,
    handleCancel,
  } = useTestimonioForm();

  return (
    <div className="">
      <div className="max-w-4xl mx-auto">
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

        {/* Mensaje de éxito */}
        {submitSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-8">
            <div className="flex items-center">
              <i className="fas fa-check-circle mr-2"></i>
              <span>
                ¡Testimonio enviado con éxito! Será publicado tras revisión.
              </span>
            </div>
          </div>
        )}

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-lg overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            {/* Autor */}
            <div className="mb-6">
              <label
                htmlFor="autor"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombre del Autor <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="autor"
                name="autor"
                value={formData.autor}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.autor ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                placeholder="Ej: María López"
              />
              {errors.autor && (
                <p className="mt-1 text-sm text-red-600">{errors.autor}</p>
              )}
            </div>

            {/* Comentario */}
            <div className="mb-6">
              <label
                htmlFor="comentario"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Comentario <span className="text-red-500">*</span>
              </label>
              <textarea
                id="comentario"
                name="comentario"
                value={formData.comentario}
                onChange={handleChange}
                rows="8"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.comentario
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Escribe tu experiencia detallada..."
              ></textarea>
              {errors.comentario && (
                <p className="mt-1 text-sm text-red-600">{errors.comentario}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                {formData.comentario.length}/50 caracteres mínimos
              </p>
            </div>

            {/* Estrellas */}
            <div className="mb-6 ">
              <label
                htmlFor="estrellas"
                className="block text-sm font-medium text-gray-700 mb-1 "
              >
                Calificación (1-5 estrellas){" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                id="estrellas"
                name="estrellas"
                value={formData.estrellas}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              {errors.estrellas && (
                <p className="mt-1 text-sm text-red-600">{errors.estrellas}</p>
              )}
            </div>

            {/* Mascota ID (opcional) */}
            <div className="mb-6">
              <label
                htmlFor="mascota_id"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mascota (opcional)
              </label>
              <select
                id="mascota_id"
                name="mascota_id"
                value={formData.mascota_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800"
              >
                <option value="">-- Seleccione una mascota --</option>
                {mascotas.map((mascota) => (
                  <option key={mascota.id} value={mascota.id}>
                    {mascota.nombre}
                  </option>
                ))}
              </select>
              {errors.mascota_id && (
                <p className="mt-1 text-sm text-red-600">{errors.mascota_id}</p>
              )}
            </div>

            {/* Opcional: mostrar nombre seleccionado afuera del select */}
            {formData.mascota_id && (
              <p className="mt-2 text-gray-600">
                Mascota seleccionada:{" "}
                {
                  mascotas.find((m) => m.id === Number(formData.mascota_id))
                    ?.nombre
                }
              </p>
            )}

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
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-lg text-white ${
                  isSubmitting
                    ? "bg-emerald-400"
                    : "bg-emerald-600 hover:bg-emerald-700"
                } transition-colors flex items-center`}
              >
                {isSubmitting ? (
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
                    <i className="fas fa-paper-plane mr-2"></i> Publicar
                    Testimonio
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

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
      </div>
    </div>
  );
}
