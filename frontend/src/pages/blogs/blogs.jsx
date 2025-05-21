import blogs from "../../data/blogs";
import Blog from "./../../components/blog/Blog";

export default function Blogs() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-pattern bg-indigo-900 bg-opacity-70 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Blog Happy Paw</h2>
          <p className="text-xl max-w-2xl mx-auto">
            Aprende sobre cuidado de mascotas, historias de adopción y nuestras
            últimas noticias
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <div className="bg-indigo-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium">
              Todos
            </button>
            <button className="px-4 py-2 bg-white text-indigo-600 rounded-full text-sm font-medium hover:bg-indigo-100">
              Consejos
            </button>
            <button className="px-4 py-2 bg-white text-indigo-600 rounded-full text-sm font-medium hover:bg-indigo-100">
              Noticias
            </button>
            <button className="px-4 py-2 bg-white text-indigo-600 rounded-full text-sm font-medium hover:bg-indigo-100">
              Historias
            </button>
            <button className="px-4 py-2 bg-white text-indigo-600 rounded-full text-sm font-medium hover:bg-indigo-100">
              Cuidados
            </button>
          </div>
        </div>
      </div>

      {/* Blog Posts Section */}

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Últimas publicaciones
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.slice(0, 6).map((m) => (
              <Blog key={m.id} blog={m} />
            ))}
          </div>
        </div>
      </section>

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <nav className="flex items-center space-x-2">
          <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="px-3 py-1 rounded-md bg-indigo-600 text-white">
            1
          </button>
          <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
            3
          </button>
          <span className="px-2 text-gray-500">...</span>
          <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
            8
          </button>
          <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
            <i className="fas fa-chevron-right"></i>
          </button>
        </nav>
      </div>
      {/* Newsletter Section */}
      <section className="bg-indigo-50 py-12">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Suscríbete a nuestro boletín
          </h2>
          <p className="text-gray-600 mb-6">
            Recibe consejos, historias inspiradoras y noticias sobre adopciones
            directamente en tu correo.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 justify-center">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="px-4 py-3 rounded-md border border-gray-300 flex-grow max-w-md"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors"
            >
              Suscribirse
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
