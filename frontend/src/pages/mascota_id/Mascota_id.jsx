import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CardMascota from "../../components/cardmascota/CardMascota";
import { obtenerMascotaPorId } from "../../services/mascotasService";
import { obtenerMascotas } from "../../services/mascotasService";

export default function Mascota_Id() {
  const { id } = useParams();
  const [tab, setTab] = useState("sobre");

  // Estado para listado de mascotaId
  const [mascota, setMascota] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Estado para listado de mascotas
  const [mascotas, setMascotas] = useState([]);

  const handleLike = () => {
    const isLiked = mascota.liked;
    setMascota({
      ...mascota,
      liked: !isLiked,
      likes: isLiked ? mascota.likes - 1 : mascota.likes + 1,
    });
    fetch("/api/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ mascotaId: mascota.id, like: !isLiked }),
    });
  };
  // Cargar mascota Id
  useEffect(() => {
    setLoading(true);
    setError(null);
    obtenerMascotaPorId(id)
      .then((data) => {
        setMascota(data);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudo cargar la mascota.");
        setLoading(false);
      });
  }, [id]);

  // Cargar listado de mascotas
  useEffect(() => {
    obtenerMascotas()
      .then((data) => {
        setMascotas(data);
      })
      .catch(() => { });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600">Cargando mascota...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600">
        <h2 className="text-2xl font-bold mb-4">{error}</h2>
        <Link to="/mascotas" className="text-yellow-500 hover:underline">
          Volver al listado
        </Link>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Detalle Mascota */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Galería */}
          <div className="p-4">
            <img
              src={mascota.imagen_principal}
              alt={mascota.nombre}
              className="w-full h-96 mb-3 object-cover rounded-xl mb-4shadow-md hover:scale-105 transition-transform duration-300"
            />
            {mascota.galeria && (
              <div className="grid grid-cols-3 gap-3 ">
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
              <button
                onClick={handleLike}
                className={`text-2xl transition ${mascota.liked
                    ? "text-red-500"
                    : "text-gray-400 hover:text-red-500"
                  }`}
              >
                <i
                  className={mascota.liked ? "fas fa-heart" : "far fa-heart"}
                ></i>
                <span> {mascota.likes} </span>
              </button>
            </div>

            <div className="mb-6">
              <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                <i className="fas fa-home mr-1"></i> {mascota.estado}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500 mb-1 dark:text-black">
                  Raza
                </div>
                <div className="font-medium dark:text-black">
                  {mascota.raza}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500 mb-1 dark:text-black">
                  Edad
                </div>
                <div className="font-medium dark:text-black">
                  {mascota.edad}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500 mb-1 dark:text-black">
                  Género
                </div>
                <div className="font-medium dark:text-black">
                  {mascota.genero}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500 text-sm mb-1 dark:text-black ">
                  Tamaño
                </div>
                <div className="font-medium dark:text-black">
                  {" "}
                  {mascota.tamanio}{" "}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500 text-sm mb-1 dark:text-black">
                  Peso
                </div>
                <div className="font-medium dark:text-black">
                  {" "}
                  {mascota.peso}{" "}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500 text-sm mb-1 dark:text-black">
                  Esterilizado
                </div>
                <div className="font-medium  dark:text-black">
                  {" "}
                  {mascota.esterelizado ? "Sí" : "No"}{" "}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex space-x-8">
                <button
                  className={`pb-3 font-medium ${tab === "sobre"
                      ? "text-yellow-600 border-b-2 border-yellow-500"
                      : "text-gray-500"
                    }`}
                  onClick={() => setTab("sobre")}
                >
                  Sobre
                </button>
                <button
                  className={`pb-3 font-medium ${tab === "salud"
                      ? "text-yellow-600 border-b-2 border-yellow-500"
                      : "text-gray-500"
                    }`}
                  onClick={() => setTab("salud")}
                >
                  Salud
                </button>
                <button
                  className={`pb-3 font-medium ${tab === "requisitos"
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

                <div className="flex flex-wrap dark:text-black">
                  <h3 className="font-bold text-gray-800">Personalidad</h3>

                  <div className="flex flex-wrap gap-2">
                    {mascota.personalidad?.map((item, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 ml-1 px-1 py-1 rounded text-sm dark:text-black"
                      >
                        {item.nombre}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">
                      Comportamiento con {mascota.nombre}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <i className="fas fa-child feature-icon text-gray-600 mr-2"></i>
                        <div>
                          <div className="text-sm text-gray-500">Niños</div>
                          <div className="font-medium text-gray-800">
                            {mascota.comportamiento?.niños ?? "No especificado"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-dog feature-icon text-gray-600 mr-2"></i>
                        <div>
                          <div className="text-sm text-gray-500">
                            Otros perros
                          </div>
                          <div className="font-medium text-gray-800">
                            {" "}
                            {mascota.comportamiento?.perros ??
                              "No especificado"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-cat feature-icon text-gray-600 mr-2"></i>
                        <div>
                          <div className="text-sm text-gray-500">Gatos</div>
                          <div className="font-medium text-gray-800">
                            {mascota.comportamiento?.gatos ?? "No especificado"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-home feature-icon text-gray-600 mr-2"></i>
                        <div>
                          <div className="text-sm text-gray-500">
                            Apartamento
                          </div>
                          <div className="font-medium text-gray-800">
                            {mascota.comportamiento?.apartamento ??
                              "No especificado"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <h3 className="font-bold text-gray-800 mb-2">Historia</h3>
                    <p className="text-gray-700">{mascota.historia}</p>
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
                  {mascota.salud?.estado ?? "No especificado"}
                </p>
                <h3 className="font-bold text-gray-800 mb-2">Vacunas</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  {mascota.salud.vacunas.map((vacuna) => (
                    <li key={vacuna.id}>{vacuna.nombre}</li>
                  ))}
                </ul>
                <div className="mb-4">
                  <h3 className="font-bold text-gray-800 mb-2">Tratamientos</h3>
                  <p className="text-gray-700">
                    {mascota.salud?.tratamiento ?? "No especificado"}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-2">
                    Información veterinaria
                  </h3>
                  <p className="text-gray-700">
                    {mascota.salud?.info_veterinaria ?? "No especificado"}
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
                src={mascota.refugio?.imagen ?? "No especificado"}
                alt="Refugio"
                className="w-16 h-16 rounded-lg object-cover mr-4"
              />
              <div>
                <h4 className="font-bold text-gray-800">
                  {mascota.refugio?.nombre ?? "No especificado"}
                </h4>
                <p className="text-gray-600 text-sm">
                  {mascota.refugio?.descripcion ?? "No especificado"}
                </p>
              </div>
            </div>
            <p className="text-gray-700">
              {mascota.refugio?.info ?? "No especificado"}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-3">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt text-gray-500 mr-3"></i>{" "}
                {mascota.refugio.direccion?.calle ?? "No especificado"}
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone text-gray-500 mr-3"></i>
                {mascota.refugio.contacto?.telefono ?? "No especificado"}
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope text-gray-500 mr-3"></i>{" "}
                {mascota.refugio.contacto?.email ?? "No especificado"}
              </li>
              <li className="flex items-center">
                <i className="fas fa-globe text-gray-500 mr-3"></i>{" "}
                {mascota.refugio.contacto?.web ?? "No especificado"}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mascotas && mascotas.length > 0 ? (
            mascotas
              .filter((m) => m.id !== mascota.id) // 👈 filtra la actual
              .slice(0, 4)
              .map((m) => <CardMascota key={m.id} mascota={m} />)
          ) : (
            <p>No hay mascotas disponibles</p>
          )}
        </div>
      </div>
    </main>
  );
}
