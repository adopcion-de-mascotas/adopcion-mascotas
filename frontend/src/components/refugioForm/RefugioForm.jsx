import React from "react";
import useRefugioForm from "./useRefugioForm";

export default function RefugioForm() {
  const {
    formData,
    direcciones,
    errors,
    isSubmitting,
    submitSuccess,
    handleChange,
    handleImageChange,
    handleDrop,
    handleDragOver,
    handleSubmit,
    handleCancel,
  } = useRefugioForm();

  return (
    <div className="">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-emerald-600 mb-2">
            <i className="fas fa-paw mr-3"></i>Happy Paw
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700">
            Cargar Nuevo Refugio
          </h2>
          <p className="text-gray-500 mt-2">
            ¡Agrega un refugio para que más personas puedan conocerlo!
          </p>
        </div>

        {/* Mensaje de éxito */}
        {submitSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-8">
            <div className="flex items-center">
              <i className="fas fa-check-circle mr-2"></i>
              <span>
                ¡Refugio enviado con éxito! Será publicado tras revisión.
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
            {/* Nombre */}
            <div className="mb-6">
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              {errors.nombre && (
                <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
              )}
            </div>

            {/* Descripción */}
            <div className="mb-6">
              <label
                htmlFor="descripcion"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Descripción <span className="text-red-500">*</span>
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="6"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.descripcion
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Describe brevemente el refugio"
              ></textarea>
              {errors.descripcion && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.descripcion}
                </p>
              )}
            </div>

            {/* Info */}
            <div className="mb-6">
              <label
                htmlFor="info"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
            </div>

            {/* Dirección */}
            <div className="mb-6">
              <label
                htmlFor="direccion_id"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Dirección <span className="text-red-500">*</span>
              </label>
              <select
                id="direccion_id"
                name="direccion_id"
                value={formData.direccion_id}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.direccion_id
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
              >
                <option className="text-black" value="">
                  -- Seleccione una dirección --
                </option>
                {(direcciones || []).map((dir) => (
                  <option key={dir.id} value={dir.id}>
                    {`${dir.calle}, ${dir.localidad}, ${dir.provincia}, ${dir.pais}`}
                  </option>
                ))}
              </select>
              {errors.direccion_id && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.direccion_id}
                </p>
              )}
            </div>

            {/* Imagen */}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancel();
                      }}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-trash mr-1"></i> Cambiar imagen
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
              {errors.imagen && (
                <p className="mt-1 text-sm text-red-600">{errors.imagen}</p>
              )}
            </div>

            {/* Contacto */}
            <fieldset className="mb-6">
              <legend className="text-sm font-medium text-gray-700 mb-3">
                Datos de Contacto (opcional)
              </legend>

              {/* Nombre */}
              <div className="mb-4">
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="contacto.nombre"
                  value={formData.contacto.nombre || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="nombre"
                />
              </div>

              {/* Teléfono */}
              <div className="mb-4">
                <label
                  htmlFor="telefono"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Teléfono
                </label>
                <input
                  type="text"
                  id="telefono"
                  name="contacto.telefono"
                  value={formData.contacto.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Ej: +54 9 11 1234 5678"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="contacto.email"
                  value={formData.contacto.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="ejemplo@email.com"
                />
              </div>

              {/* Web */}
              <div>
                <label
                  htmlFor="web"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Página Web
                </label>
                <input
                  type="url"
                  id="web"
                  name="contacto.web"
                  value={formData.contacto.web}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="https://mi-refugio.com"
                />
              </div>
            </fieldset>

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
                    <i className="fas fa-paper-plane mr-2"></i> Publicar Refugio
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Nota */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Todos los refugios son revisados por nuestro equipo antes de ser
            publicados.
          </p>
          <p className="mt-1">¡Gracias por ayudar a los peluditos!</p>
        </div>
      </div>
    </div>
  );
}
