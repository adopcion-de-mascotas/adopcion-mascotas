import Carrousel from "../../components/carrousel/Carrousel";
import { useLoginForm } from "./UseLoginForm";

export default function Login() {
  const { form, errors, setForm, handleSubmit } = useLoginForm();

  return (
    <>
      <Carrousel />
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
            <h3 className="text-2xl font-bold mb-6 text-center">¡Iniciar Sesión!</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input
                  type="text"
                  id="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="Ingrese aquí su email"
                  data-test="email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Contraseña */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="******************"
                  data-test="password"
                  autoComplete="current-password"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Recordar */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={form.rememberMe}
                  onChange={(e) => setForm({ ...form, rememberMe: e.target.checked })}
                  className="mr-2"
                  data-test="remember-button"
                />
                <label htmlFor="remember" className="text-sm">Recordar</label>
              </div>

              {/* Botón */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                disabled={!form.email || !form.password}
                data-test="login-button"
              >
                Iniciar sesión
              </button>

              <hr className="my-4" />

              {/* Enlaces */}
              <div className="flex justify-between text-sm text-blue-600">
                <a href="#">¿Has olvidado tu contraseña?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
