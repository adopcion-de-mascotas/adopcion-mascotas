// src/components/CardMascota.jsx
import { React, useState } from "react";
import { Link } from "react-router-dom";
import './CardMascota.css';

export default function CardMascota({ mascota }) {

  const [mascotaGenero, setMascotaGenero] = useState(mascota.genero);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidde hover:shadow-md
    mb-4shadow-md hover:scale-105 transition-transform duration-300">
      <div className="relative">
        <img
          src={mascota.imagen_principal}
          alt={mascota.nombre}
          className="w-full h-48 object-cover"
        />
        <span className="absolute bottom-3 left-3 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full">
          {mascota.estado}
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
          {mascotaGenero === "Macho" ? (
            <i className="fas fa-mars mr-1"></i>
          ) : (
            < i className="fas fa-venus mr-1"></i>
          )}
          <span>{mascota.genero}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-1">{mascota.descripcion}</p>
        <div className="flex justify-between items-center">
          <Link
            to={`/mascotas/${mascota.id}`}
            className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            Conocer
          </Link>
        </div>
      </div>
    </div >
  );
}
