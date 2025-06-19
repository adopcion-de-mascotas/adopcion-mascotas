import React from "react";
import useDireccionesFormEdit from "./useDireccionesFormEdit";

export default function DireccionFormEdit() {
  const {
    formData,
    errors,
    refugios,
    isSubmitting,
    submitSuccess,
    isLoading,
    handleChange,
    handleSubmit,
    handleCancel,
  } = useDireccionesFormEdit();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 text-center py-10">
        <i className="fas fa-spinner fa-spin text-emerald-600 text-4xl"></i>
        <p className="mt-4 text-lg text-gray-700">Cargando datos de la dirección...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Encabezado */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-emerald-600 mb-2">
          <i className="fas fa-map-marker-alt mr-2"></i>Editar Dirección
        </h1>
        <p className="text-gray-500">Modifica los campos para actualizar la dirección</p>
      </div>

      {/* Éxito */}
      {submitSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-8">
          <div className="flex items-center">
            <i className="fas fa-check-circle mr-2"></i>
            <span>¡Dirección actualizada con éxito!</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-6 sm:p-8 space-y-6">
          {/* Refugio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Refugio <span className="text-red-500">*</span>
            </label>
            <select
              name="refugio_id"
              value={formData.refugio_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black dark:text-white focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option className="bg-gray-800" value="">-- Selecciona un refugio --</option>
              {refugios.map((r) => (
                <option className="hover:bg-gray-400 bg-gray-800" key={r.id} value={r.id}>
                  {r.nombre}
                </option>
              ))}
            </select>
            {errors.refugio_id && <p className="text-sm text-red-600">{errors.refugio_id}</p>}
          </div>

          {/* Calle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Calle <span className="text-red-500">*</span>
            </label>
            <input
              name="calle"
              value={formData.calle}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Ej: Av. Siempre Viva 123"
            />
            {errors.calle && <p className="text-sm text-red-600">{errors.calle}</p>}
          </div>

          {/* Barrio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Barrio</label>
            <input
              name="barrio"
              value={formData.barrio}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Ej: Centro"
            />
          </div>

          {/* Localidad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Localidad <span className="text-red-500">*</span>
            </label>
            <input
              name="localidad"
              value={formData.localidad}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            />
            {errors.localidad && <p className="text-sm text-red-600">{errors.localidad}</p>}
          </div>

          {/* Provincia */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Provincia <span className="text-red-500">*</span>
            </label>
            <input
              name="provincia"
              value={formData.provincia}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            />
            {errors.provincia && <p className="text-sm text-red-600">{errors.provincia}</p>}
          </div>

          {/* País */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              País <span className="text-red-500">*</span>
            </label>
            <input
              name="pais"
              value={formData.pais}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            />
            {errors.pais && <p className="text-sm text-red-600">{errors.pais}</p>}
          </div>

          {/* Código Postal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Código Postal <span className="text-red-500">*</span>
            </label>
            <input
              name="codigo_postal"
              value={formData.codigo_postal}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            />
            {errors.codigo_postal && <p className="text-sm text-red-600">{errors.codigo_postal}</p>}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Frente al parque, entrada lateral, etc."
            />
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
                isSubmitting ? "bg-emerald-400" : "bg-emerald-600 hover:bg-emerald-700"
              } transition-colors flex items-center`}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i> Guardando...
                </>
              ) : (
                <>
                  <i className="fas fa-save mr-2"></i> Guardar Cambios
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
