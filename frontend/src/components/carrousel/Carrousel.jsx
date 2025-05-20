import React from "react";
import "./Carrousel.css";
export default function Carrousel() {
  return (
    <>
      <section
        id="home"
        className="hero min-h-[500px] flex items-center justify-center text-center text-white"
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Encuentra a tu compañero perfecto
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Miles de mascotas esperan un hogar lleno de amor. ¡Adopta y cambia
            una vida para siempre!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#pets"
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium text-lg"
            >
              Ver Mascotas
            </a>
            <a
              href="#about"
              className="px-8 py-3 bg-white hover:bg-gray-100 text-indigo-600 rounded-lg font-medium text-lg"
            >
              Conócenos
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
