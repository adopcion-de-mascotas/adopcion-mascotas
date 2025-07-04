import React from "react";
import { Link, useParams } from "react-router-dom";
import useNoticiaPorId from "./useNoticiaPorId";
import CardNoticia from "../../components/cardnoticia/CardNoticia";

export default function Noticia_id() {
  const { id } = useParams();
  const { noticia, loading, error, noticias } = useNoticiaPorId(id);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600">
        Cargando noticias...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600">
        <h2 className="text-2xl font-bold mb-4">{error}</h2>
        <Link to="/mascotas" className="text-yellow-500 hover:underline">
          Volver al listado
        </Link>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 animate-fadeIn">
      <article className="news-article max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-wrap justify-between items-start">
            <div>
              {/* <div className="flex flex-wrap gap-2 mb-3">
                <span className="tag bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">Mascotas</span>
                <span className="tag bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Salud</span>
                <span className="tag bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Cuidados</span>
              </div> */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {noticia.titulo}
              </h1>
              <div className="flex items-center text-gray-500 text-sm space-x-4">
                <span>
                  <i className="far fa-calendar-alt mr-1"></i>{" "}
                  {new Date(noticia.fecha).toLocaleDateString("es-AR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="social-share bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button className="social-share bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-full">
                <i className="fab fa-twitter"></i>
              </button>
              <button className="social-share bg-red-500 hover:bg-red-600 text-white p-2 rounded-full">
                <i className="fab fa-pinterest-p"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Imagen */}
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img
            src={noticia.foto}
            alt="Imagen de la noticia"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4sEG5g9GFcy4SUxbzWNzUTf1jMISTDZrTw&s";
            }}
          />
        </div>

        {/* Contenido */}
        <div className="p-6 md:p-8">
          <div className="prose max-w-none">
            <h1 className="text-2x1 md:text-2xl font-bold text-gray-900 mb-2">Cuerpo de la noticia</h1>
            <p className="text-lg text-gray-700 mb-6">{noticia.texto}</p>
            {/* <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
              <div className="flex">
                <div className="flex-shrink-0 text-yellow-600 mt-1">
                  <i className="fas fa-exclamation-circle"></i>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">¡Precaución!</h3>
                  <div className="mt-1 text-sm text-yellow-700">
                    <p>
                      No todos los alimentos humanos son seguros para mascotas. Evita cebolla, ajo,
                      chocolate, uvas, nueces de macadamia, edulcorantes artificiales y alcohol.
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          {/* Footer */}
          {/* <div className="border-t border-gray-200 pt-6 mt-8">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://randomuser.me/api/portraits/women/65.jpg"
                  alt="Autora"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{noticia.admin_id}</p>
                  <p className="text-sm text-gray-500">
                    Veterinaria especialista en nutrición animal
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </article>

      {/* Más noticias (comentado por ahora) */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Otras noticias que te pueden gustar</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {noticias?.filter((m) => m.id !== noticia.id).slice(0, 4).map((m) => (
            <CardNoticia key={m.id} noticia={m} />
          ))}
        </div>
      </div>
    </main>
  );
}
