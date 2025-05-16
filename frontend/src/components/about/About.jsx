import React from "react";

export default function About() {
  return (
    <>
      <section id="about" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Nuestra Misión
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Trabajamos para encontrar hogares amorosos para mascotas
              abandonadas y promover la adopción responsable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-home text-indigo-600 dark:text-indigo-200 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                Hogares Seguros
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Hemos encontrado hogares para más de 5,000 mascotas desde
                nuestra fundación en 2010.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-heart text-indigo-600 dark:text-indigo-200 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                Cuidado Integral
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Todas nuestras mascotas reciben atención veterinaria, vacunas y
                esterilización antes de la adopción.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-hand-holding-heart text-indigo-600 dark:text-indigo-200 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                Seguimiento
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Realizamos seguimiento post-adopción para asegurar el bienestar
                de cada mascota.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  Nuestra Historia
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Happy Paws nació en 2010 cuando un grupo de amigos rescató a
                  un perro abandonado en la calle. Lo que comenzó como un acto
                  de bondad se convirtió en una misión de vida.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Hoy somos una organización sin fines de lucro con un refugio
                  que alberga hasta 100 mascotas simultáneamente, un equipo de
                  15 voluntarios dedicados y una red de hogares temporales.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-indigo-600 dark:text-indigo-300 mr-2"></i>
                    <span className="text-gray-700 dark:text-gray-200">
                      Certificados por la Asociación Protectora de Animales
                    </span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-indigo-600 dark:text-indigo-300 mr-2"></i>
                    <span className="text-gray-700 dark:text-gray-200">
                      Premio Nacional al Bienestar Animal 2022
                    </span>
                    <a
                      href="http://localhost:5173/about"
                      className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                    >
                      Sobre nosotros los voluntarios
                    </a>
                  </div>
                </div>
              </div>
              <div className="h-64 lg:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1636&q=80"
                  alt="Voluntarios con mascotas"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
