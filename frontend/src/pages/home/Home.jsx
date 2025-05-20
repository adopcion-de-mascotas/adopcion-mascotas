import React from "react";
import Contact from "../../components/contact/Contact";
import Testimonio from "../../components/testimonio/Testimonio";
import Carrousel from "../../components/carrousel/Carrousel";
import Blog from "../../components/blog/Blog";
import About from "../../components/about/About";
import mascotas from "../../data/mascotas";
import CardMascota from "../../components/cardmascota/CardMascota";

export const Home = () => {
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
            {mascotas.slice(0, 4).map((m) => (
              <CardMascota key={m.id} mascota={m} />
            ))}
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
      <section class="proceso_adopcion py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-4">
              Proceso de Adopción
            </h2>
            <p class="text-gray-600 max-w-2xl mx-auto">
              Seguimos un proceso cuidadoso para asegurar que cada mascota
              encuentre el hogar perfecto.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="flex flex-col items-center text-center">
              <div class="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <span class="text-indigo-600 font-bold text-2xl">1</span>
              </div>
              <h3 class="text-lg font-bold text-gray-800 mb-2">
                Conoce a la mascota
              </h3>
              <p class="text-gray-600">
                Visita nuestro refugio o agenda una cita para conocer a la
                mascota que te interesa.
              </p>
            </div>

            <div class="flex flex-col items-center text-center">
              <div class="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <span class="text-indigo-600 font-bold text-2xl">2</span>
              </div>
              <h3 class="text-lg font-bold text-gray-800 mb-2">
                Completa la solicitud
              </h3>
              <p class="text-gray-600">
                Llena nuestro formulario de adopción con tus datos y
                preferencias.
              </p>
            </div>

            <div class="flex flex-col items-center text-center">
              <div class="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <span class="text-indigo-600 font-bold text-2xl">3</span>
              </div>
              <h3 class="text-lg font-bold text-gray-800 mb-2">
                Entrevista y visita
              </h3>
              <p class="text-gray-600">
                Realizamos una entrevista y visitamos tu hogar para asegurar que
                es adecuado.
              </p>
            </div>

            <div class="flex flex-col items-center text-center">
              <div class="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <span class="text-indigo-600 font-bold text-2xl">4</span>
              </div>
              <h3 class="text-lg font-bold text-gray-800 mb-2">
                Firma de contrato
              </h3>
              <p class="text-gray-600">
                Firmas el contrato de adopción y te llevas a tu nueva mascota a
                casa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <Blog />

      {/* Success Stories Section */}
      <Testimonio />

      {/* Call to Action Section */}
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="bg-indigo-600 rounded-xl p-8 md:p-12 text-center text-white">
            <h2 class="text-2xl md:text-3xl font-bold mb-4">
              ¿Listo para adoptar?
            </h2>
            <p class="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Comienza tu proceso de adopción hoy mismo y dale a una mascota la
              oportunidad de una vida mejor.
            </p>
            <div class="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#pets"
                class="px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100"
              >
                Ver Mascotas
              </a>
              <a
                href="#contact"
                class="px-8 py-3 bg-indigo-700 text-white rounded-lg font-medium hover:bg-indigo-800"
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
