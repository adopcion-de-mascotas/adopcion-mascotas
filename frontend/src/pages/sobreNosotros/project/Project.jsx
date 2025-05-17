import React from 'react'

export default function Project() {
  return (
    <section id="project" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestra Misión</h2>
          <div className="w-20 h-1 bg-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Trabajamos para encontrar hogares amorosos para mascotas abandonadas y promover la adopción responsable.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">¿Qué hacemos?</h3>
              <ul className="space-y-4">
                {[
                  {
                    title: 'Hogares Seguros',
                    desc: 'Hemos encontrado hogares para más de 5,000 mascotas desde nuestra fundación en 2010.',
                  },
                  {
                    title: 'Cuidado Integral',
                    desc: 'Todas nuestras mascotas reciben atención veterinaria, vacunas y esterilización antes de la adopción.',
                  },
                  {
                    title: 'Seguimiento',
                    desc: 'Realizamos seguimiento post-adopción para asegurar el bienestar de cada mascota.',
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <i className="fas fa-paw text-purple-500 mt-1 mr-3"></i>
                    <span className="text-gray-700">
                      <strong>{item.title}:</strong> {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-1 rounded-xl shadow-xl">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Nuestra Historia</h3>
                <p className="text-gray-700 mb-6">
                  Happy Paws nació en 2010 cuando un grupo de amigos rescató a un perro abandonado en la calle. 
                  Lo que comenzó como un acto de bondad se convirtió en una misión de vida.
                </p>
                <p className="text-gray-700 mb-6">
                  Hoy somos una organización sin fines de lucro con un refugio que alberga hasta 100 mascotas simultáneamente, 
                  un equipo de 15 voluntarios dedicados y una red de hogares temporales.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <i className="fas fa-certificate text-purple-600 text-2xl mb-2"></i>
                    <p className="font-semibold">Certificados por APA</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <i className="fas fa-award text-blue-600 text-2xl mb-2"></i>
                    <p className="font-semibold">Premio Bienestar Animal 2022</p>
                  </div>
                </div>
                <a
                  href="#"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition font-semibold"
                >
                  Conocer más <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
