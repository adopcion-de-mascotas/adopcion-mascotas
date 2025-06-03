// src/components/CardMascota.jsx
import React from "react";
import { Link } from "react-router-dom";
import './CardMascota.css'; 

export default function CardMascota({ mascota }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition duration-300 hover:shadow-md">
      <div className="relative">
        <img
          src={mascota.imagen_principal}
          alt={mascota.nombre}
          className="w-full h-48 object-cover"
        />
        <span className="absolute bottom-3 left-3 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full">
          Adopción
        </span>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{mascota.nombre}</h3>
          <span className="text-sm text-gray-500">{mascota.edad}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <i className="fas fa-dog mr-1"></i>
          <span className="mr-3">{mascota.tipo}</span>
          <i className="fas fa-venus-mars mr-1"></i>
          <span>{mascota.genero}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{mascota.descripcion}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">
            <i className="fas fa-map-marker-alt mr-1"></i> {mascota.ciudad}
          </span>
          <Link
            to={`/mascotas/${mascota.id}`}
            className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            Conocer
          </Link>
        </div>
      </div>
    </div>
  );
}
