import React from "react";
import { Link } from "react-router-dom";

import Carrousel from "../../components/carrousel/Carrousel";
import About from "../../components/about/About";
import Contact from "../../components/contact/Contact";

import CardMascota from "../../components/cardmascota/CardMascota";
import Testimonio from "../../components/testimonio/Testimonio";
import CardNoticia from "../../components/cardnoticia/CardNoticia";

import { useHomeData } from "./useHomeData";

export const Home = () => {
  const { mascotas, noticias, testimonials, error } = useHomeData();

  if (error) {
    return <p className="text-red-600">Error al cargar datos.</p>;
  }

  return (
    <>
      <Carrousel />

      <section id="pets" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Mascotas en Adopción
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estos adorables compañeros están buscando un hogar amoroso. Cada
              uno tiene su propia personalidad y necesidades especiales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mascotas.length > 0 ? (
              mascotas.slice(0, 4).map((mascota) => (
                <CardMascota key={mascota.id} mascota={mascota} />
              ))
            ) : (
              <p>No hay mascotas disponibles</p>
            )}
          </div>

          <div className="text-center mt-12">
            <a
              href="/mascotas"
              className="px-6 py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50"
            >
              Ver más mascotas
            </a>
          </div>
        </div>
      </section>

      <About />

      {/* (resto del JSX igual) */}

      <section id="blog" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Consejos y Noticias
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Aprende sobre cuidado de mascotas, historias de adopción y
              nuestras últimas noticias.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {noticias.length > 0 ? (
              noticias.slice(0, 3).map((noticia) => (
                <CardNoticia key={noticia.id} noticia={noticia} />
              ))
            ) : (
              <p>No hay noticias disponibles</p>
            )}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/noticias"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
            >
              Ver más artículos
            </Link>
          </div>
        </div>
      </section>

      <Testimonio testimonials={testimonials} />

      {/* Resto del JSX */}
      {/* ... */}

      <Contact />
    </>
  );
};
