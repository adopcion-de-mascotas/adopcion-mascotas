import React from "react";
import { Link } from "react-router-dom";
import mascotas from "../../data/mascotas"; // ajustá el path si cambia la ubicación

export default function Ver_Mascotas() {


  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Encuentra a tu compañero perfecto
        </h2>
        <p className="text-gray-600">
          Explora nuestra lista de mascotas disponibles para adopción.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mascotas.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden transition duration-300 hover:shadow-md"
          >
            <div className="relative">
              <img
                src={m.imagen}
                alt={m.nombre}
                className="w-full h-48 object-cover"
              />
              <span className="absolute bottom-3 left-3 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                Adopción
              </span>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-800">{m.nombre}</h3>
                <span className="text-sm text-gray-500">{m.edad}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm mb-3">
                <i className="fas fa-dog mr-1"></i>
                <span className="mr-3">{m.tipo}</span>
                <i className="fas fa-venus-mars mr-1"></i>
                <span>{m.genero}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{m.descripcion}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  <i className="fas fa-map-marker-alt mr-1"></i> {m.ciudad}
                </span>
                <Link
                  to={`/mascotas/${m.id}`}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-300"
                >
                  Conocer
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
