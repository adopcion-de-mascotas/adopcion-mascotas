import { useRegisterForm } from "./useRegisterForm";

export default function Register() {
  const { form, setForm, errors, handleSubmit } = useRegisterForm();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* VIDEO */}
        <div className="flex-1">
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/mlfzDp9rjos"
            title="Adopta un amigo"
            className="w-full h-full rounded-lg shadow-md"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        {/* FORMULARIO */}
        <div className="flex-1 bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-center">¡Crear cuenta!</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Ingrese aquí su nombre"
                data-test="nombre"
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
              )}
            </div>

            {/* Apellido */}
            <div>
              <label htmlFor="apellido" className="block text-sm font-medium">
                Apellido
              </label>
              <input
                type="text"
                id="apellido"
                value={form.apellido}
                onChange={(e) => setForm({ ...form, apellido: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Ingrese aquí su apellido"
                data-test="apellido"
              />
              {errors.apellido && (
                <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Ingrese aquí su email"
                data-test="email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="******************"
                data-test="password"
                autoComplete="new-password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              disabled={!form.email || !form.password}
              data-test="register-button"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
