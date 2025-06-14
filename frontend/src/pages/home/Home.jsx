import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Carrousel from "../../components/carrousel/Carrousel";
import About from "../../components/about/About";
import Contact from "../../components/contact/Contact";

import CardMascota from "../../components/cardmascota/CardMascota";
import { obtenerMascotas } from "../../services/mascotasService";

import Testimonio from "../../components/testimonio/Testimonio";
import { obtenerTestimonios } from "../../services/testimonioService";

import CardNoticia from "../../components/cardnoticia/CardNoticia";
import { obtenerNoticias } from "../../services/noticiaService";


export const Home = () => {
  const [mascotas, setMascotas] = useState([]);
  const [noticias, setNoticias] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerMascotas().then(setMascotas).catch(setError);
  }, []);

useEffect(() => {
  obtenerTestimonios()
    .then((res) => setTestimonials(res.data)) // solo guardás el array
    .catch(setError);
}, []);

  useEffect(() => {
    obtenerNoticias().then(setNoticias).catch(setError);
  }, []);


  if (error) {
    return <p className="text-red-600">Error al cargar datos.</p>;
  }

  return (
    <>
      {/* Carrousel Section */}
      <Carrousel />

      {/* Features Pets Section */}
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
            {mascotas && mascotas.length > 0 ? (
              mascotas
                .slice(0, 4)
                .map((mascota) => (
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

      {/* About Section */}
      <About />

      {/* Adoption Process Section */}
      <section className="proceso_adopcion py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Proceso de Adopción
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Seguimos un proceso cuidadoso para asegurar que cada mascota
              encuentre el hogar perfecto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-indigo-600 font-bold text-2xl">1</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Conoce a la mascota
              </h3>
              <p className="text-gray-600">
                Visita nuestro refugio o agenda una cita para conocer a la
                mascota que te interesa.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-indigo-600 font-bold text-2xl">2</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Completa la solicitud
              </h3>
              <p className="text-gray-600">
                Llena nuestro formulario de adopción con tus datos y
                preferencias.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-indigo-600 font-bold text-2xl">3</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Entrevista y visita
              </h3>
              <p className="text-gray-600">
                Realizamos una entrevista y visitamos tu hogar para asegurar que
                es adecuado.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-indigo-600 font-bold text-2xl">4</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Firma de contrato
              </h3>
              <p className="text-gray-600">
                Firmas el contrato de adopción y te llevas a tu nueva mascota a
                casa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}

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

          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Últimas publicaciones
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {noticias && noticias.length > 0 ? (
                  noticias
                    .slice(0, 3)
                    .map((noticia) => (
                      <CardNoticia key={noticia.id} noticia={noticia} />
                    ))
                ) : (
                  <p>No hay noticias disponibles</p>
                )}
              </div>
            </div>
          </section>

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

      {/* Success Stories Section */}
      <Testimonio testimonials={testimonials} />

      {/* Call to Action Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-indigo-600 rounded-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              ¿Listo para adoptar?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Comienza tu proceso de adopción hoy mismo y dale a una mascota la
              oportunidad de una vida mejor.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#pets"
                className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100"
              >
                Ver Mascotas
              </a>
              <a
                href="#contact"
                className="px-8 py-3 bg-indigo-700 text-white rounded-lg font-medium hover:bg-indigo-800"
              >
                Contáctanos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />
    </>
  );
};
