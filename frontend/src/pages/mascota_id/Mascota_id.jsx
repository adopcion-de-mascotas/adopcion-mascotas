import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import mascotas from "../../data/mascotas"; 
import CardMascota from "../../components/cardmascota/CardMascota";

export default function Mascota_Id() {
  const { id } = useParams();
  const mascota = mascotas.find((m) => m.id === id);

  const [tab, setTab] = useState("sobre");

  if (!mascota) {
    return (
      <div className="text-center py-20 text-gray-600">
        <h2 className="text-2xl font-bold mb-4">Mascota no encontrada</h2>
        <Link to="/mascotas" className="text-yellow-500 hover:underline">
          Volver al listado
        </Link>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Botón Volver */}
      <div className="mb-6">
        <Link
          to="/mascotas"
          className="inline-flex items-center text-yellow-500 hover:text-yellow-600 font-medium"
        >
          <i className="fas fa-arrow-left mr-2"></i> Volver a mascotas
        </Link>
      </div>

      {/* Detalle Mascota */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Galería */}
          <div className="p-4">
            <img
              src={mascota.imagen}
              alt={mascota.nombre}
              className="w-full h-96 object-cover rounded-xl mb-4"
            />
            {mascota.galeria && (
              <div className="grid grid-cols-4 gap-2">
                {mascota.galeria.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`extra-${i}`}
                    className="h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Información */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {mascota.nombre}
                </h2>
                <div className="text-gray-600 mt-1 flex items-center">
                  <i className="fas fa-map-marker-alt mr-1"></i>
                  {mascota.ciudad}
                </div>
              </div>
              <button className="text-2xl text-gray-400 hover:text-red-500 transition">
                <i className="far fa-heart"></i>
              </button>
            </div>

            <div className="mb-6">
              <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                <i className="fas fa-home mr-1"></i> Disponible para adopción
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Raza</div>
                <div className="font-medium text-gray-800">{mascota.tipo}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Edad</div>
                <div className="font-medium text-gray-800">{mascota.edad}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Género</div>
                <div className="font-medium text-gray-800">
                  {mascota.genero}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500 text-sm mb-1">Tamaño</div>
                <div className="font-medium text-gray-800"> {mascota.tamaño} </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500 text-sm mb-1">Peso</div>
                <div className="font-medium text-gray-800"> {mascota.peso} </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500 text-sm mb-1">Esterilizado</div>
                <div className="font-medium text-gray-800">
                  {" "}
                  {mascota.esterelizado}{" "}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex space-x-8">
                <button
                  className={`pb-3 font-medium ${
                    tab === "sobre"
                      ? "text-yellow-600 border-b-2 border-yellow-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setTab("sobre")}
                >
                  Sobre
                </button>
                <button
                  className={`pb-3 font-medium ${
                    tab === "salud"
                      ? "text-yellow-600 border-b-2 border-yellow-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setTab("salud")}
                >
                  Salud
                </button>
                <button
                  className={`pb-3 font-medium ${
                    tab === "requisitos"
                      ? "text-yellow-600 border-b-2 border-yellow-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setTab("requisitos")}
                >
                  Requisitos
                </button>
              </div>
            </div>

            {/* Contenido de Tabs */}
            {tab === "sobre" && (
              <div>
                <p className="text-gray-700 mb-4">{mascota.descripcion}</p>
                <h3 className="font-bold text-gray-800 mb-2">Personalidad</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {mascota.personalidad?.map((item, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">
                      Comportamiento con
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <i className="fas fa-child feature-icon text-gray-600 mr-2"></i>
                        <div>
                          <div className="text-sm text-gray-500">Niños</div>
                          <div className="font-medium text-gray-800">Excelente</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-dog feature-icon text-gray-600 mr-2"></i>
                        <div>
                          <div className="text-sm text-gray-500">Otros perros</div>
                          <div className="font-medium text-gray-800">Bueno</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-cat feature-icon text-gray-600 mr-2"></i>
                        <div>
                          <div className="text-sm text-gray-500">Gatos</div>
                          <div className="font-medium text-gray-800">
                            No probado
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-home feature-icon text-gray-600 mr-2"></i>
                        <div>
                          <div className="text-sm text-gray-500">Apartamento</div>
                          <div className="font-medium text-gray-800">
                            Posible con ejercicio
                          </div>
                        </div>
                      </div>
                    </div>

                    <h3 className="font-bold text-gray-800 mb-2">Historia</h3>
                    <p className="text-gray-700">
                      Max fue encontrado abandonado en un parque cuando tenía
                      aproximadamente 1 año. Fue rescatado por una protectora
                      local donde recibió todas sus vacunas y fue esterilizado.
                      Lleva 6 meses en cuidado temporal esperando una familia
                      permanente.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {tab === "salud" && (
              <div>
                <h3 className="font-bold text-gray-800 mb-2">
                  Estado de salud
                </h3>
                <p className="text-gray-700 mb-2">
                  Sin problemas médicos conocidos.
                </p>
                <h3 className="font-bold text-gray-800 mb-2">Vacunas</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Rabia</li>
                  <li>Moquillo</li>
                  <li>Parvovirus</li>
                </ul>
                <div className="mb-4">
                  <h3 className="font-bold text-gray-800 mb-2">Tratamientos</h3>
                  <p className="text-gray-700">
                    Max está desparasitado internamente y externamente. Recibe
                    tratamiento preventivo contra pulgas y garrapatas
                    mensualmente.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-2">
                    Información veterinaria
                  </h3>
                  <p className="text-gray-700">
                    Max ha sido evaluado por nuestro veterinario asociado, Dr.
                    Martínez, quien confirma que está listo para la adopción. Se
                    entregará su historial médico completo al adoptante.
                  </p>
                </div>
              </div>
            )}

            {tab === "requisitos" && (
              <div>
                <h3 className="font-bold text-gray-800 mb-2">
                  Requisitos para adoptar
                </h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Compromiso con la esterilización si no lo está</li>
                  <li>Tiempo y dedicación para la mascota</li>
                  <li>No dejar sola más de 6 horas</li>
                </ul>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <i className="fas fa-info-circle text-yellow-400"></i>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Todos los adoptantes deben firmar un contrato de
                        adopción y permitir visitas de seguimiento para
                        verificar el bienestar de Max.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8">
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center">
                <i className="fas fa-home mr-2"></i> Solicitar adopción
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Refugio */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Sobre el refugio
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="flex items-start mb-4">
              <img
                src="/refugio.jpg"
                alt="Refugio"
                className="w-16 h-16 rounded-lg object-cover mr-4"
              />
              <div>
                <h4 className="font-bold text-gray-800">Patitas Felices</h4>
                <p className="text-gray-600 text-sm">
                  Refugio sin ánimo de lucro dedicado al rescate y
                  rehabilitación.
                </p>
              </div>
            </div>
            <p className="text-gray-700">
              Contamos con instalaciones amplias y un equipo comprometido en
              brindar cuidado, entrenamiento básico y mucho amor a cada mascota.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-3">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt text-gray-500 mr-3"></i>{" "}
                Calle Rescate 45, Madrid
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone text-gray-500 mr-3"></i> +34 911 234
                567
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope text-gray-500 mr-3"></i>{" "}
                info@patitasfelices.org
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* other Pets */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          Otras mascotas que te pueden gustar
        </h3>
        {/* Mostrar mascotas */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mascotas.slice(0, 4).map((m) => (
            <CardMascota key={m.id} mascota={m} />
          ))}
        </div>
      </div>
    </main>
  );
}
