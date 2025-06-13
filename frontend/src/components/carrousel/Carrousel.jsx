// Carrousel.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import "./Carrousel.css"; // Asegurate de que este CSS esté presente

export default function Carrousel() {
  const location = useLocation();

  let contenido;

  if (location.pathname === "/mascotas") {
    contenido = (
      <>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Mascotas en adopción
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Conoce a las mascotas que buscan un hogar. ¡Tu próximo mejor amigo te
          espera!
        </p>
      </>
    );
  } else if (location.pathname === "/noticias") {
    contenido = (
      <>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Últimas Noticias
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Enterate de las novedades y eventos más recientes relacionados con
          nuestras mascotas.
        </p>
      </>
    );
  } else if (location.pathname === "/about") {
    contenido = (
      <>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Sobre el team 10
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Enterate de quienes formaron el equipo, relacionados con nuestra web
          de mascotas.
        </p>
      </>
    );
  } else {
    contenido = (
      <>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Encuentra a tu compañero perfecto
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Miles de mascotas esperan un hogar lleno de amor. ¡Adopta y cambia una
          vida para siempre!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/mascotas"
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
      </>
    );
  }

  return (
    <section
      id="home"
      className="hero min-h-[500px] flex items-center justify-center text-center text-white"
    >
      <div className="container mx-auto px-4">{contenido}</div>
    </section>
  );
}
