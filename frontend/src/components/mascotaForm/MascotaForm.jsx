import { useMascotaForm } from "./useMascotaForm";

export default function MascotaForm() {
  const {
    formData,
    mensaje,
    personalidadesDisponibles,
    handleChange,
    handleSubmit,
  } = useMascotaForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg mt-10"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Agregar Mascota
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Nombre" name="nombre" onChange={handleChange} />
        <Input label="Edad" name="edad" onChange={handleChange} />
        <Input label="Tipo" name="tipo" onChange={handleChange} />
        <Input label="Raza" name="raza" onChange={handleChange} />
        <Select
          label="Género"
          name="genero"
          onChange={handleChange}
          options={[
            { value: "", label: "Seleccionar" },
            { value: "Macho", label: "Macho" },
            { value: "Hembra", label: "Hembra" },
          ]}
        />
        <Input label="Tamaño" name="tamanio" onChange={handleChange} />
        <Input label="Peso" name="peso" type="number" onChange={handleChange} />
        <Input label="Estado" name="estado" onChange={handleChange} />
        <Input label="Ciudad" name="ciudad" onChange={handleChange} />
        <Textarea label="Descripción" name="descripcion" onChange={handleChange} />
        <Textarea label="Historia" name="historia" onChange={handleChange} />

        <div className="col-span-1 md:col-span-2">
          <label className="block font-semibold text-gray-700 mb-2">
            Imagen Principal
          </label>
          <input
            type="file"
            name="imagen_principal"
            onChange={handleChange}
            accept="image/*"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="esterilizado"
            onChange={handleChange}
            className="accent-blue-600"
            id="esterilizado"
          />
          <label htmlFor="esterilizado" className="text-gray-700">
            ¿Está esterilizado?
          </label>
        </div>

        <div className="col-span-1 md:col-span-2">
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

function Input({ label, name, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}

function Select({ label, name, onChange, options }) {
  return (
    <div>
      <label className="block text-gray-700 mb-1">{label}</label>
      <select
        name={name}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Textarea({ label, name, onChange }) {
  return (
    <div className="col-span-1 md:col-span-2">
      <label className="block text-gray-700 mb-1">{label}</label>
      <textarea
        name={name}
        onChange={onChange}
        rows={3}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      ></textarea>
    </div>
  );
}
