import React from "react";
import { testimonials } from "../../data/testimonio";

export default function Testimonio() {
  return (
    <section className="py-16 bg-indigo-600 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Historias de Éxito</h2>
          <p className="max-w-2xl mx-auto opacity-90">
            Lo que dicen nuestros clientes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(
            ({ nombre, cargo, mensaje, estrellas, imagen }, index) => {
              const fullStars = Math.floor(estrellas);
              const halfStar = estrellas % 1 >= 0.5;

              return (
                <div
                  key={index}
                  className="bg-white bg-opacity-10 p-8 rounded-xl text-black"
                >
                  <div className="flex items-center mb-4 text-yellow-400 text-xl">
                    {Array(fullStars)
                      .fill(0)
                      .map((_, i) => (
                        <i key={i} className="fas fa-star mr-1"></i>
                      ))}
                    {halfStar && <i className="fas fa-star-half-alt"></i>}
                  </div>

                  <p className="opacity-90 mb-6">"{mensaje}"</p>

                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={imagen}
                        alt={nombre}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{nombre}</h4>
                      <p className="text-sm opacity-80">{cargo}</p>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
