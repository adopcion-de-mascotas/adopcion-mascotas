import React from "react";

export default function Testimonio({ testimonials }) {
  return (
    <section className="py-16 bg-indigo-600 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Historias de Éxito</h2>
          <p className="max-w-2xl mx-auto opacity-90">
            Lo que dicen nuestros clientes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {testimonials
            ?.slice(0, 3)
            .map(({ autor, fecha, comentario, foto }, index) => {
              return (
                <div
                  key={index}
                  className="bg-white bg-opacity-10 p-8 rounded-xl text-black
                  mb-4shadow-md hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center mb-4 text-yellow-400 text-xl"></div>

                  <p className="opacity-90 mb-6">"{comentario}"</p>

                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={foto}
                        alt={autor}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{autor}</h4>
                      <p className="text-sm opacity-80">
                        {new Date(fecha).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
