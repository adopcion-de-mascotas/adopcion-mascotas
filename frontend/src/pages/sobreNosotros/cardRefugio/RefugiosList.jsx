/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { obtenerRefugios, obtenerRefugioPorId } from "../../../services/refugioService";
import { obtenerDireccionPorId } from "../../../services/direccionesService";

export default function RefugiosList() {
  const [refugiosConDatos, setRefugiosConDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRefugiosConDatos = async () => {
      try {
        const refugios = await obtenerRefugios();

        const refugiosDetallados = await Promise.all(
          refugios.map(async (r) => {
            try {
              const detallado = await obtenerRefugioPorId(r.id);
              const direccion = await obtenerDireccionPorId(r.direccion_id);
              return {
                ...r,
                contacto: detallado.contacto || null,
                direccion: direccion || null,
              };
            } catch (err) {
              console.warn("No se pudo obtener datos completos de", r.nombre);
              return r;
            }
          })
        );

        setRefugiosConDatos(refugiosDetallados);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRefugiosConDatos();
  }, []);

  if (loading) return <p className="text-center mt-6">Cargando refugios...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-12">
        Refugios que apoyamos
      </h2>

      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {refugiosConDatos.map((refugio) => (
          <div
            key={refugio.id}
            className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden hover:scale-[1.02] transition-all border border-gray-200 dark:border-gray-700"
          >
            {refugio.imagen ? (
              <img
                src={refugio.imagen}
                alt={refugio.nombre}
                className="w-full h-52 object-cover"
              />
            ) : (
              <div className="w-full h-52 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                Sin imagen
              </div>
            )}

            <div className="p-6">
              <h3 className="text-2xl font-semibold text-indigo-700 mb-1">
                {refugio.nombre}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 italic mb-2">
                {refugio.descripcion}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {refugio.info}
              </p>

              {/* Dirección */}
              {refugio.direccion && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  📍 {refugio.direccion.calle}, {refugio.direccion.barrio}
                </p>
              )}

              {/* Contacto */}
              {refugio.contacto && (
                <div className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                  {refugio.contacto.telefono && (
                    <p>
                      📞{" "}
                      <span className="font-medium">
                        {refugio.contacto.telefono}
                      </span>
                    </p>
                  )}
                  {refugio.contacto.email && (
                    <p>
                      ✉️{" "}
                      <a
                        href={`mailto:${refugio.contacto.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {refugio.contacto.email}
                      </a>
                    </p>
                  )}
                  {refugio.contacto.web && (
                    <a
                      href={refugio.contacto.web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md mt-2 transition"
                    >
                      🌐 Visitar sitio web
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
