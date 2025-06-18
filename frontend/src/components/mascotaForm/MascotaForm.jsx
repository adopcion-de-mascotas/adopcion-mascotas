import { useMascotaForm } from "./useMascotaForm";

export default function MascotaForm() {
  const {
    formData,
    mensaje,
    personalidadesDisponibles,
    refugiosDisponibles,
    vacunasDisponibles,
    galeriaPreviews,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    handleCancelImagen,
    handleClearGaleria,
    handleRemoveImagenGaleria,
    handleDrop,
    handleDragOver,
    handleImageChange,
    handleDropGaleria,
    handleDragOverGaleria,
    handleImageChangeGaleria,
  } = useMascotaForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto bg-white p-8 shadow-lg rounded-lg mt-10"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Agregar Mascota
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna izquierda */}
        <div className="space-y-6">
          {/* Nombre */}
          <div>
            <label
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="nombre"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Edad */}
          <div>
            <label
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="edad"
            >
              Edad
            </label>
            <input
              type="text"
              id="edad"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Tipo */}
          <div>
            <label
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="tipo"
            >
              Tipo
            </label>
            <input
              type="text"
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Raza */}
          <div>
            <label
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="raza"
            >
              Raza
            </label>
            <input
              type="text"
              id="raza"
              name="raza"
              value={formData.raza}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Género */}
          <div>
            <label
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="genero"
            >
              Género
            </label>
            <select
              id="genero"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Seleccionar</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
          </div>

          {/* Tamaño */}
          <div>
            <label
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="tamanio"
            >
              Tamaño
            </label>
            <input
              type="text"
              id="tamanio"
              name="tamanio"
              value={formData.tamanio}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Peso */}
          <div>
            <label
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="peso"
            >
              Peso
            </label>
            <input
              type="number"
              id="peso"
              name="peso"
              value={formData.peso}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Estado */}
          <div>
            <label
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="estado"
            >
              Estado
            </label>
            <input
              type="text"
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Ciudad */}
          <div>
            <label
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="ciudad"
            >
              Ciudad
            </label>
            <input
              type="text"
              id="ciudad"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Descripción */}
          <div>
            <label
              htmlFor="descripcion"
              className="block mb-1 font-semibold text-gray-700"
            >
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Historia */}
          <div>
            <label
              htmlFor="historia"
              className="block mb-1 font-semibold text-gray-700"
            >
              Historia
            </label>
            <textarea
              id="historia"
              name="historia"
              value={formData.historia}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Esterilizado */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="esterelizado"
              name="esterelizado"
              checked={formData.esterelizado}
              onChange={handleChange}
              className="accent-blue-600"
            />
            <label htmlFor="esterelizado" className="text-gray-700">
              ¿Está esterelizado?
            </label>
          </div>

          {/* Personalidades */}
          <div>
            <label className="font-semibold text-gray-700 mb-2 block">
              Personalidad:
            </label>
            <div className="flex flex-wrap gap-4">
              {personalidadesDisponibles.map((p) => (
                <label key={p.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="personalidad"
                    value={p.id}
                    checked={formData.personalidad.includes(p.id)}
                    onChange={handleChange}
                    className="accent-purple-600"
                  />
                  {p.nombre}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="space-y-6">
          {/* Imagen Principal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagen Principal <span className="text-red-500">*</span>
            </label>
            <div
              className={`dropzone rounded-lg p-8 text-center cursor-pointer ${
                errors?.foto ? "border-red-500 bg-red-50" : ""
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById("fileInputFoto").click()}
            >
              <input
                type="file"
                id="fileInputFoto"
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
                      handleCancelImagen();
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
                    Formatos: JPG, PNG, GIF (Máx. 5MB)
                  </p>
                </div>
              )}
            </div>
            {errors?.foto && (
              <p className="mt-1 text-sm text-red-600">{errors.foto}</p>
            )}
          </div>

          {/* Galería */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Galería de imágenes <span className="text-red-500">*</span>
            </label>
            <div
              className={`dropzone rounded-lg p-8 text-center cursor-pointer ${
                errors?.galeria ? "border-red-500 bg-red-50" : ""
              }`}
              onDrop={handleDropGaleria}
              onDragOver={handleDragOverGaleria}
              onClick={() =>
                document.getElementById("fileInputGaleria").click()
              }
            >
              <input
                type="file"
                id="fileInputGaleria"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleImageChangeGaleria}
              />
              {galeriaPreviews?.length > 0 ? (
                <div className="flex flex-wrap gap-2 justify-center">
                  {galeriaPreviews.map((src, i) => (
                    <div key={i} className="relative">
                      <img
                        src={src}
                        alt={`Galería ${i}`}
                        className="max-h-24 rounded-lg object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImagenGaleria(i);
                        }}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearGaleria();
                    }}
                    className="text-sm text-red-500 hover:text-red-700 mt-2"
                  >
                    Limpiar galería
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <i className="fas fa-cloud-upload-alt text-3xl text-emerald-400"></i>
                  <p className="text-sm font-medium text-gray-700">
                    Arrastra y suelta imágenes aquí <br />o haz clic para
                    seleccionar
                  </p>
                  <p className="text-xs text-gray-500">
                    Formatos: JPG, PNG, GIF (Máx. 5MB cada uno)
                  </p>
                </div>
              )}
            </div>
            {errors?.galeria && (
              <p className="mt-1 text-sm text-red-600">{errors.galeria}</p>
            )}
          </div>

          {/* Refugio */}
          <div>
            <label
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="refugioId"
            >
              Refugio
            </label>
            <select
              id="refugioId"
              name="refugioId"
              value={formData.refugioId}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Seleccionar refugio</option>
              {(Array.isArray(refugiosDisponibles)
                ? refugiosDisponibles
                : []
              ).map((refugio) => (
                <option key={refugio.id} value={refugio.id}>
                  {refugio.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Comportamiento */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Comportamiento</h3>
            <div>
              <label
                className="block mb-1 font-semibold text-gray-700"
                htmlFor="comportamiento.niños"
              >
                Niños
              </label>
              <input
                type="text"
                id="comportamiento.niños"
                name="comportamiento.niños"
                value={formData.comportamiento.niños}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label
                className="block mb-1 font-semibold text-gray-700"
                htmlFor="comportamiento.perros"
              >
                Perros
              </label>
              <input
                type="text"
                id="comportamiento.perros"
                name="comportamiento.perros"
                value={formData.comportamiento.perros}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label
                className="block mb-1 font-semibold text-gray-700"
                htmlFor="comportamiento.gatos"
              >
                Gatos
              </label>
              <input
                type="text"
                id="comportamiento.gatos"
                name="comportamiento.gatos"
                value={formData.comportamiento.gatos}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label
                className="block mb-1 font-semibold text-gray-700"
                htmlFor="comportamiento.apartamento"
              >
                Apartamento
              </label>
              <input
                type="text"
                id="comportamiento.apartamento"
                name="comportamiento.apartamento"
                value={formData.comportamiento.apartamento}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Salud */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Salud</h3>
            <div>
              <label
                className="block mb-1 font-semibold text-gray-700"
                htmlFor="salud.estado"
              >
                Estado
              </label>
              <input
                type="text"
                id="salud.estado"
                name="salud.estado"
                value={formData.salud.estado}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label
                className="block mb-1 font-semibold text-gray-700"
                htmlFor="salud.tratamiento"
              >
                Tratamiento
              </label>
              <input
                type="text"
                id="salud.tratamiento"
                name="salud.tratamiento"
                value={formData.salud.tratamiento}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label
                className="block mb-1 font-semibold text-gray-700"
                htmlFor="salud.info_veterinaria"
              >
                Info Veterinaria
              </label>
              <input
                type="text"
                id="salud.info_veterinaria"
                name="salud.info_veterinaria"
                value={formData.salud.info_veterinaria}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Vacunas */}
          <div>
            <label className="font-semibold text-gray-700 mb-2 block">
              Vacunas:
            </label>
            <div className="flex flex-wrap gap-4">
              {(vacunasDisponibles || []).map((v) => (
                <label key={v.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="vacunas"
                    value={v.id}
                    checked={formData.vacunas?.includes(v.id)}
                    onChange={handleChange}
                    className="accent-green-600"
                  />
                  {v.nombre}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="mt-8 text-center">
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-purple-600 text-white px-6 py-2 rounded-lg transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
          }`}
        >
          {isLoading ? "Guardando..." : "Guardar Mascota"}
        </button>
        {mensaje && (
          <p className="mt-4 text-sm text-center font-medium text-green-600">
            {mensaje}
          </p>
        )}
      </div>
    </form>
  );
}
