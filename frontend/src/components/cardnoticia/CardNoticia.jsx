import React from "react";
import { Link } from "react-router-dom";

export default function CardNoticia({ noticia }) {
  return (
    <>
      <div
        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow 
         overflow-hidde mb-4shadow-md hover:scale-105 duration-300"
      >
        <div className="relative overflow-hidden h-48">
          <img
            src={noticia.foto}
            alt={noticia.alt}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4sEG5g9GFcy4SUxbzWNzUTf1jMISTDZrTw&s";
            }}
          />
          <span className="absolute top-4 left-4 bg-white text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold">
            {noticia.categoria}
          </span>
        </div>
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span>
              <i className="far fa-calendar mr-1"></i>{" "}
              {new Date(noticia.fecha).toLocaleDateString("es-AR")}
            </span>
            <span className="mx-2">•</span>
            <span>
              <i className="far fa-clock mr-1"></i> {noticia.lectura}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            {noticia.titulo}
          </h3>
          <p className="text-gray-600 mb-4">{noticia.descripcion}</p>
          <Link
            to={`/noticias/${noticia.id}`}
            className="inline-block px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md font-medium hover:bg-indigo-600 hover:text-white"
          >
            Ver noticia completo
          </Link>
        </div>
      </div>
    </>
  );
}
