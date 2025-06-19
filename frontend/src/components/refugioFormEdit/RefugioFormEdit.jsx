import React from "react";
import useRefugioFormEdit from "./useRefugioFormEdit";

export default function RefugioFormEdit() {
  const {
    formData,
    errors,
    isSubmitting,
    submitSuccess,
    handleChange,
    handleImageChange,
    handleDrop,
    handleDragOver,
    handleSubmit,
  } = useRefugioFormEdit();

  const resetImagen = (e) => {
    e.stopPropagation();
    handleChange({ target: { name: "imagen", value: null } });
    handleChange({ target: { name: "imagenPreview", value: null } });
  };

  return (
    <div className="">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-emerald-600 mb-2">
            <i className="fas fa-paw mr-3"></i>Happy Paw
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700">Editar Refugio</h2>
          <p className="text-gray-500 mt-2">
            Modificá los datos del refugio y guardá los cambios.
          </p>
        </div>

        {submitSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-8">
            <div className="flex items-center">
              <i className="fas fa-check-circle mr-2"></i>
              <span>¡Refugio actualizado con éxito!</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Refugio <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.nombre ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                placeholder="Ej: Refugio Patitas Felices"
              />
              {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción <span className="text-red-500">*</span>
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="6"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.descripcion ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                placeholder="Describe brevemente el refugio"
              ></textarea>
              {errors.descripcion && (
                <p className="mt-1 text-sm text-red-600">{errors.descripcion}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="info" className="block text-sm font-medium text-gray-700 mb-1">
                Información adicional
              </label>
              <textarea
                id="info"
                name="info"
                value={formData.info}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Detalles extra como horarios, condiciones, etc."
              ></textarea>
              {errors.info && <p className="mt-1 text-sm text-red-600">{errors.info}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["calle", "barrio", "localidad", "provincia", "pais", "codigo_postal"].map(
                  (field) => (
                    <input
                      key={field}
                      type="text"
                      name={`direccion.${field}`}
                      placeholder={field.replace("_", " ").toUpperCase()}
                      value={formData.direccion[field]}
                      onChange={handleChange}
                      className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                        errors[`direccion.${field}`]
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      }`}
                    />
                  )
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Imagen del Refugio <span className="text-red-500">*</span>
              </label>
              <div
                className={`dropzone rounded-lg p-8 text-center cursor-pointer border ${
                  errors.imagen ? "border-red-500 bg-red-50" : "border-gray-300"
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
                {formData.imagenPreview ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={formData.imagenPreview}
                      alt="Preview"
                      className="max-h-48 max-w-full mb-4 rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={resetImagen}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-trash mr-1"></i> Cambiar imagen
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <i className="fas fa-cloud-upload-alt text-3xl text-emerald-400"></i>
                    <p className="text-sm font-medium text-gray-700">
                      Arrastrá una imagen o hacé clic para seleccionar
                    </p>
                    <p className="text-xs text-gray-500">
                      Formatos soportados: JPG, PNG, GIF (Máx. 5MB)
                    </p>
                  </div>
                )}
              </div>
              {errors.imagen && (
                <p className="mt-1 text-sm text-red-600">{errors.imagen}</p>
              )}
            </div>

            <fieldset className="mb-6">
              <legend className="text-sm font-medium text-gray-700 mb-3">
                Datos de Contacto
              </legend>
              {["nombre", "telefono", "email", "web"].map((field) => (
                <div key={field} className="mb-4">
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                    {field[0].toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    id={field}
                    name={`contacto.${field}`}
                    value={formData.contacto[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder={field === "web" ? "https://mi-refugio.com" : field}
                  />
                  {errors[`contacto.${field}`] && (
                    <p className="text-sm text-red-600 mt-1">{errors[`contacto.${field}`]}</p>
                  )}
                </div>
              ))}
            </fieldset>

            <div className="flex justify-end pt-6 border-t border-gray-200">
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
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    Guardando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save mr-2"></i> Actualizar Refugio
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Recordá que los cambios serán revisados antes de publicarse.
          </p>
        </div>
      </div>
    </div>
  );
}
