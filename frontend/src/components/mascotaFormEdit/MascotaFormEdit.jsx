import { useMascotaFormEdit } from "./useMascotaFormEdit";
import { useParams } from "react-router-dom";

export function MascotaFormEdit() {
  const { id } = useParams();

  const {
    formData,
    mensaje,
    personalidadesDisponibles,
    refugiosDisponibles,
    vacunasDisponibles,
    fotoPreview,
    galeriaPreviews,
    errors,
    loading,
    error,
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
  } = useMascotaFormEdit(id);

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto bg-white p-8 shadow-lg rounded-lg mt-10"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Editar Mascota
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna izquierda */}
        <div className="space-y-6">
          <div>
            <label className="block font-semibold mb-1" htmlFor="nombre">
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
            {errors?.nombre && (
              <p className="text-red-600 text-sm">{errors.nombre}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1" htmlFor="edad">
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
            {errors?.edad && (
              <p className="text-red-600 text-sm">{errors.edad}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1" htmlFor="tipo">
              Tipo
            </label>
            <select
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Seleccionar</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
            </select>
            {errors?.tipo && (
              <p className="text-red-600 text-sm">{errors.tipo}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1" htmlFor="raza">
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
            {errors?.raza && (
              <p className="text-red-600 text-sm">{errors.raza}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1" htmlFor="genero">
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
            {errors?.genero && (
              <p className="text-red-600 text-sm">{errors.genero}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1" htmlFor="tamanio">
              Tamaño
            </label>
            <select
              name="tamanio"
              id="tamanio"
              onChange={handleChange}
              value={formData.tamanio}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Selecciona el tamaño</option>
              <option value={"Pequeño"}>Pequeño</option>
              <option value={"Mediano"}>Mediano</option>
              <option value={"Grande"}>Grande</option>
            </select>
            {errors?.tamanio && (
              <p className="text-red-600 text-sm">{errors.tamanio}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1" htmlFor="peso">
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
            {errors?.peso && (
              <p className="text-red-600 text-sm">{errors.peso}</p>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1" htmlFor="estado">
              Estado
            </label>
            <select
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Seleccionar estado</option>
              <option value="Disponible">Disponible</option>
              <option value="Adoptado">Adoptado</option>
            </select>
            {errors?.estado && (
              <p className="text-red-600 text-sm">{errors.estado}</p>
            )}
          </div>

          {/*          <div>
            <label className="block font-semibold mb-1" htmlFor="ciudad">
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
            {errors?.ciudad && (
              <p className="text-red-600 text-sm">{errors.ciudad}</p>
            )}
          </div> */}

          <div>
            <label className="block font-semibold mb-1" htmlFor="descripcion">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows={3}
            />
            {errors?.descripcion && (
              <p className="text-red-600 text-sm">{errors.descripcion}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1" htmlFor="historia">
              Historia
            </label>
            <textarea
              id="historia"
              name="historia"
              value={formData.historia}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows={3}
            />
            {errors?.historia && (
              <p className="text-red-600 text-sm">{errors.historia}</p>
            )}
          </div>

          {/* Esterelizado */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="esterelizado"
              name="esterelizado"
              checked={formData.esterelizado} // ojo que aquí había typo: 'esterelizado' => 'esterelizado'
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
              {personalidadesDisponibles?.map((p) => (
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
              className={`dropzone rounded-lg p-8 text-center cursor-pointer ${errors?.foto ? "border-red-500 bg-red-50" : ""
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
              {fotoPreview ? (
                <div className="flex flex-col items-center">
                  <img
                    src={fotoPreview}
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
              className={`dropzone rounded-lg p-8 text-center cursor-pointer ${errors?.galeria ? "border-red-500 bg-red-50" : ""
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
            <label className="block font-semibold mb-1" htmlFor="refugioId">
              Refugio
            </label>
            <select
              id="refugioId"
              name="refugioId"
              value={formData.refugioId?.toString() || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Seleccionar refugio</option>
              {(refugiosDisponibles || []).map((r) => (
                <option key={r.id} value={r.id.toString()}>
                  {r.nombre}
                </option>
              ))}
            </select>
            {errors?.refugioId && (
              <p className="text-red-600 text-sm">{errors.refugioId}</p>
            )}
          </div>

          {/* Comportamiento */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Comportamiento</h3>
            <div>
              <label
                className="block font-semibold mb-1"
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
              {errors?.comportamiento?.niños && (
                <p className="text-red-600 text-sm">
                  {errors.comportamiento.niños}
                </p>
              )}
            </div>

            <div>
              <label
                className="block font-semibold mb-1"
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
              {errors?.comportamiento?.perros && (
                <p className="text-red-600 text-sm">
                  {errors.comportamiento.perros}
                </p>
              )}
            </div>

            <div>
              <label
                className="block font-semibold mb-1"
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
              {errors?.comportamiento?.gatos && (
                <p className="text-red-600 text-sm">
                  {errors.comportamiento.gatos}
                </p>
              )}
            </div>

            <div>
              <label
                className="block font-semibold mb-1"
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
              {errors?.comportamiento?.apartamento && (
                <p className="text-red-600 text-sm">
                  {errors.comportamiento.apartamento}
                </p>
              )}
            </div>
          </div>

          {/* Salud */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Salud</h3>
            <div>
              <label
                className="block font-semibold mb-1"
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
              {errors?.salud?.estado && (
                <p className="text-red-600 text-sm">{errors.salud.estado}</p>
              )}
            </div>

            <div>
              <label
                className="block font-semibold mb-1"
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
              {errors?.salud?.tratamiento && (
                <p className="text-red-600 text-sm">
                  {errors.salud.tratamiento}
                </p>
              )}
            </div>

            <div>
              <label
                className="block font-semibold mb-1"
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
              {errors?.salud?.info_veterinaria && (
                <p className="text-red-600 text-sm">
                  {errors.salud.info_veterinaria}
                </p>
              )}
            </div>
          </div>

          {/* Vacunas */}
          <div>
            <label className="block font-semibold mb-1">Vacunas</label>
            <div className="flex flex-wrap gap-4">
              {vacunasDisponibles?.map((vacuna) => (
                <label key={vacuna.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="vacunas"
                    value={vacuna.id}
                    checked={formData.vacunas?.includes(vacuna.id) || false}
                    onChange={handleChange}
                    className="accent-green-600"
                  />
                  {vacuna.nombre}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-10 rounded-md"
        >
          Guardar cambios
        </button>
      </div>

      {mensaje && (
        <p className="mt-4 text-center text-green-600 font-semibold">
          {mensaje}
        </p>
      )}
    </form>
  );
}
