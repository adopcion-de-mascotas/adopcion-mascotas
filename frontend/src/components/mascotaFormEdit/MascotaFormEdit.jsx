import { useMascotaFormEdit } from "./useMascotaFormEdit";

export function MascotaFormEdit({ mascotaId }) {
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
    Input,
    Select,
    Textarea,
  } = useMascotaFormEdit(mascotaId);

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
          <Input
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          <Input
            label="Edad"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
          />
          <Input
            label="Tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
          />
          <Input
            label="Raza"
            name="raza"
            value={formData.raza}
            onChange={handleChange}
          />
          <Select
            label="Género"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            options={[
              { value: "", label: "Seleccionar" },
              { value: "Macho", label: "Macho" },
              { value: "Hembra", label: "Hembra" },
            ]}
          />
          <Input
            label="Tamaño"
            name="tamanio"
            value={formData.tamanio}
            onChange={handleChange}
          />
          <Input
            label="Peso"
            type="number"
            name="peso"
            value={formData.peso}
            onChange={handleChange}
          />
          <Input
            label="Estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
          />
          <Input
            label="Ciudad"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
          />
          <Textarea
            label="Descripción"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
          <Textarea
            label="Historia"
            name="historia"
            value={formData.historia}
            onChange={handleChange}
          />

          {/* Esterilizado */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="esterilizado"
              checked={formData.esterelizado}
              onChange={handleChange}
              className="accent-blue-600"
              id="esterilizado"
            />
            <label htmlFor="esterilizado" className="text-gray-700">
              ¿Está esterilizado?
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
                    Arrastra y suelta una imagen aquí <br />
                    o haz clic para seleccionar
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
              onClick={() => document.getElementById("fileInputGaleria").click()}
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
                    Arrastra y suelta imágenes aquí <br />
                    o haz clic para seleccionar
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
          <Select
            label="Refugio"
            name="refugioId"
            value={formData.refugioId?.toString() || ""}
            onChange={handleChange}
            options={[
              { value: "", label: "Seleccionar refugio" },
              ...(refugiosDisponibles || []).map((r) => ({
                value: r.id.toString(),
                label: r.nombre,
              })),
            ]}
          />

          {/* Comportamiento */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Comportamiento</h3>
            <Input
              label="Niños"
              name="comportamiento.niños"
              value={formData.comportamiento.niños}
              onChange={handleChange}
            />
            <Input
              label="Perros"
              name="comportamiento.perros"
              value={formData.comportamiento.perros}
              onChange={handleChange}
            />
            <Input
              label="Gatos"
              name="comportamiento.gatos"
              value={formData.comportamiento.gatos}
              onChange={handleChange}
            />
            <Input
              label="Apartamento"
              name="comportamiento.apartamento"
              value={formData.comportamiento.apartamento}
              onChange={handleChange}
            />
          </div>

          {/* Salud */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Salud</h3>
            <Input
              label="Estado"
              name="salud.estado"
              value={formData.salud.estado}
              onChange={handleChange}
            />
            <Input
              label="Tratamiento"
              name="salud.tratamiento"
              value={formData.salud.tratamiento}
              onChange={handleChange}
            />
            <Input
              label="Info Veterinaria"
              name="salud.info_veterinaria"
              value={formData.salud.info_veterinaria}
              onChange={handleChange}
            />
          </div>

          {/* Vacunas */}
          <div>
            <label className="font-semibold text-gray-700 mb-2 block">Vacunas:</label>
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
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Guardar Mascota
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
