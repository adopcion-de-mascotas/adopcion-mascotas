import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import CardMascota from "../../components/cardmascota/CardMascota";
import { useMascota } from "./useMascota";

export default function Mascota_Id() {
  const { id } = useParams();
  const [tab, setTab] = useState("sobre");
  const { mascota, mascotas, error, loading, handleLike } = useMascota(id);

  if (loading)
    return <div className="text-center py-20 text-gray-600">Cargando mascota...</div>;

  if (error)
    return (
      <div className="text-center py-20 text-red-600">
        <h2 className="text-2xl font-bold mb-4">{error}</h2>
        <Link to="/mascotas" className="text-yellow-500 hover:underline">
          Volver al listado
        </Link>
      </div>
    );

  const datos = [
    { label: "Raza", value: mascota.raza },
    { label: "Edad", value: mascota.edad },
    { label: "Género", value: mascota.genero },
    { label: "Tamaño", value: mascota.tamanio },
    { label: "Peso", value: mascota.peso },
    { label: "Esterilizado", value: mascota.esterelizado ? "Sí" : "No" },
  ];

  const comportamiento = [
    { icon: "fa-child", label: "Niños", value: mascota.comportamiento?.niños },
    { icon: "fa-dog", label: "Otros perros", value: mascota.comportamiento?.perros },
    { icon: "fa-cat", label: "Gatos", value: mascota.comportamiento?.gatos },
    { icon: "fa-home", label: "Apartamento", value: mascota.comportamiento?.apartamento },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-4">
            <img
              src={mascota.imagen_principal}
              alt={mascota.nombre}
              className="w-full h-96 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300 mb-4"
            />
            {mascota.galeria?.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {mascota.galeria.map((img, i) => (
                  <img
                    key={i}
                    src={img.foto}
                    alt={`extra-${i}`}
                    className="w-full h-28 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{mascota.nombre}</h2>
                <div className="text-gray-600 mt-1 flex items-center">
                  <i className="fas fa-map-marker-alt mr-1" />
                  {mascota.ciudad}
                </div>
              </div>
              <button onClick={handleLike} className={`text-2xl transition ${mascota.liked ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}>
                <i className={mascota.liked ? "fas fa-heart" : "far fa-heart"} />
                <span> {mascota.likes} </span>
              </button>
            </div>

            <div className="mb-6">
              <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                <i className="fas fa-home mr-1" /> {mascota.estado}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {datos.map(({ label, value }, i) => (
                <div key={i} className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1 dark:text-black">{label}</div>
                  <div className="font-medium dark:text-black">{value}</div>
                </div>
              ))}
            </div>

            <div className="border-b border-gray-200 mb-6">
              <div className="flex space-x-8">
                {["sobre", "salud", "requisitos"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`pb-3 font-medium ${tab === t ? "text-yellow-600 border-b-2 border-yellow-500" : "text-gray-500"}`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {tab === "sobre" && (
              <div>
                <p className="text-gray-700 mb-4">{mascota.descripcion}</p>

                <h3 className="font-bold text-gray-800 mb-2">Personalidad</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {mascota.personalidad?.map((item, i) => (
                    <span key={i} className="bg-gray-100 px-2 py-1 rounded text-sm dark:text-black">{item.nombre}</span>
                  ))}
                </div>

                <h3 className="font-bold text-gray-800 mb-2">Comportamiento con {mascota.nombre}</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {comportamiento.map(({ icon, label, value }, i) => (
                    <div key={i} className="flex items-center">
                      <i className={`fas ${icon} text-gray-600 mr-2`} />
                      <div>
                        <div className="text-sm text-gray-500">{label}</div>
                        <div className="font-medium text-gray-800">{value ?? "No especificado"}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="font-bold text-gray-800 mb-2">Historia</h3>
                <p className="text-gray-700">{mascota.historia}</p>
              </div>
            )}

            {tab === "salud" && (
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Estado de salud</h3>
                <p className="text-gray-700 mb-2">{mascota.salud?.estado ?? "No especificado"}</p>

                <h3 className="font-bold text-gray-800 mb-2">Vacunas</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  {mascota.salud?.vacunas?.map((v) => (
                    <li key={v.id}>{v.nombre}</li>
                  ))}
                </ul>

                <h3 className="font-bold text-gray-800 mt-4 mb-2">Tratamientos</h3>
                <p className="text-gray-700">{mascota.salud?.tratamiento ?? "No especificado"}</p>

                <h3 className="font-bold text-gray-800 mt-4 mb-2">Información veterinaria</h3>
                <p className="text-gray-700">{mascota.salud?.info_veterinaria ?? "No especificado"}</p>
              </div>
            )}

            {tab === "requisitos" && (
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Requisitos para adoptar</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-4">
                  <li>Compromiso con la esterilización si no lo está</li>
                  <li>Tiempo y dedicación para la mascota</li>
                  <li>No dejar sola más de 6 horas</li>
                </ul>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <i className="fas fa-info-circle text-yellow-400 mr-3" />
                    <p className="text-sm text-yellow-700">
                      Todos los adoptantes deben firmar un contrato de adopción y permitir visitas de seguimiento para verificar el bienestar de {mascota.nombre}.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Refugio */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Sobre el refugio</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 flex items-start mb-4">
            <img
              src={mascota.refugio?.imagen ?? ""}
              alt="Refugio"
              className="w-16 h-16 rounded-lg object-cover mr-4"
            />
            <div>
              <h4 className="font-bold text-gray-800">{mascota.refugio?.nombre ?? "No especificado"}</h4>
              <p className="text-gray-600 text-sm">{mascota.refugio?.descripcion ?? "No especificado"}</p>
              <p className="text-gray-700 mt-2">{mascota.refugio?.info ?? "No especificado"}</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-3">Contacto</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center"><i className="fas fa-map-marker-alt mr-3" />{mascota.refugio.direccion?.calle ?? "No especificado"}</li>
              <li className="flex items-center"><i className="fas fa-phone mr-3" />{mascota.refugio.contacto?.telefono ?? "No especificado"}</li>
              <li className="flex items-center"><i className="fas fa-envelope mr-3" />{mascota.refugio.contacto?.email ?? "No especificado"}</li>
              <li className="flex items-center"><i className="fas fa-globe mr-3" />{mascota.refugio.contacto?.web ?? "No especificado"}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Otras mascotas */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Otras mascotas que te pueden gustar</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mascotas?.filter((m) => m.id !== mascota.id).slice(0, 4).map((m) => (
            <CardMascota key={m.id} mascota={m} />
          ))}
        </div>
      </div>
    </main>
  );
}
