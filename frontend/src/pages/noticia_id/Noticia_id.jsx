import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { obtenerNoticiaPorId } from "../../services/noticiaService";

export default function Noticia_id() {
  const { id } = useParams();

  // Estado para listado de noticiasId
  const [noticia, setNoticia] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Estado para listado de noticias
  {
    /*const [noticias, setNoticias] = useState([]);*/
  }

  // Cargar noticia Id
  useEffect(() => {
    setLoading(true);
    setError(null);
    obtenerNoticiaPorId(id)
      .then((data) => {
        setNoticia(data);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudo cargar la mascota.");
        setLoading(false);
      });
  }, [id]);

  // Cargar listado de noticias
  {
    /*  useEffect(() => {
    obtenerNoticias().then(setNoticias).catch(setError);
  }, []);
*/
  }
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600">
        Cargando noticias...
      </div>
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
    <>
      <main className="container mx-auto px-4 py-8 animate-fadeIn">
        {/* Botón Volver */}
        <div className="mb-6">
          <Link
            to="/noticias"
            className="inline-flex items-center text-yellow-500 hover:text-yellow-600 font-medium"
          >
            <i className="fas fa-arrow-left mr-2"></i> Volver a noticias
          </Link>
        </div>
        <article className="news-article max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          {/* Article Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="tag bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Mascotas
                  </span>
                  <span className="tag bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Salud
                  </span>
                  <span className="tag bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Cuidados
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {noticia.titulo}
                </h1>
                <div className="flex items-center text-gray-500 text-sm space-x-4">
                  <span>
                    <i className="far fa-calendar-alt mr-1"></i> 15 Junio 2023
                  </span>
                  <span>
                    <i className="far fa-clock mr-1"></i> 5 min lectura
                  </span>
                  <span>
                    <i className="far fa-eye mr-1"></i> 1,245 vistas
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="social-share bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full">
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button className="social-share bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-full">
                  <i className="fab fa-twitter"></i>
                </button>
                <button className="social-share bg-red-500 hover:bg-red-600 text-white p-2 rounded-full">
                  <i className="fab fa-pinterest-p"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Article Image */}
          <div className="w-full h-64 md:h-96 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
              alt="Perro y gato juntos"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="p-6 md:p-8">
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                Un reciente estudio publicado en el Journal of Veterinary
                Nutrition ha demostrado que las dietas naturales preparadas en
                casa pueden tener beneficios significativos para la salud de
                nuestras mascotas, especialmente en perros y gatos con problemas
                digestivos o alergias.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                ¿Qué encontró el estudio?
              </h2>
              <p className="text-gray-700 mb-4">
                La investigación, que duró 18 meses y analizó a más de 500
                mascotas, encontró que:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>
                  Mejora en la condición del pelaje en un 78% de los casos
                </li>
                <li>Reducción de problemas digestivos en un 65%</li>
                <li>Menor incidencia de alergias cutáneas</li>
                <li>Aumento de los niveles de energía</li>
                <li>Mejor salud dental al reducirse la acumulación de sarro</li>
              </ul>

              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 my-6">
                <p className="text-indigo-700 italic">
                  "Los resultados sugieren que una dieta balanceada hecha en
                  casa puede ser una excelente alternativa a los alimentos
                  comerciales, siempre que sea supervisada por un veterinario
                  nutricionista" - Dra. María Rodríguez, autora principal del
                  estudio.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                ¿Cómo comenzar con una dieta natural?
              </h2>
              <p className="text-gray-700 mb-4">
                Si estás considerando cambiar la dieta de tu mascota, estos son
                los pasos recomendados por los expertos:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      1
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">
                      Consulta con un veterinario
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    Es fundamental que un especialista evalúe las necesidades
                    nutricionales específicas de tu mascota antes de hacer
                    cualquier cambio en su dieta.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      2
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">
                      Transición gradual
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    No cambies la comida de golpe. Mezcla el alimento nuevo con
                    el antiguo durante 7-10 días, aumentando progresivamente la
                    proporción.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      3
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">
                      Balance adecuado
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    Las mascotas necesitan proteínas, carbohidratos, grasas,
                    vitaminas y minerales en proporciones específicas según su
                    edad, tamaño y estado de salud.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      4
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">
                      Higiene y seguridad
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    Manipula los alimentos con las mismas precauciones que para
                    consumo humano. Algunos alimentos seguros para nosotros
                    pueden ser tóxicos para mascotas.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Receta básica aprobada
              </h2>
              <p className="text-gray-700 mb-4">
                Los investigadores compartieron esta receta básica que cumple
                con los requerimientos nutricionales para perros adultos sanos:
              </p>

              <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ingrediente
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cantidad
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Beneficio
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        Carne magra (pollo, pavo, res)
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">50%</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        Proteínas esenciales
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-700">
                        Verduras (zanahoria, calabaza, espinaca)
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">25%</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        Vitaminas y fibra
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        Carbohidratos (arroz integral, quinoa)
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">15%</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        Energía sostenida
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-700">
                        Grasas saludables (aceite de pescado, aceite de coco)
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">5%</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        Piel y pelo saludables
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        Suplementos vitamínicos
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">5%</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        Balance nutricional
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
                <div className="flex">
                  <div className="flex-shrink-0 text-yellow-600 mt-1">
                    <i className="fas fa-exclamation-circle"></i>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      ¡Precaución!
                    </h3>
                    <div className="mt-1 text-sm text-yellow-700">
                      <p>
                        No todos los alimentos humanos son seguros para
                        mascotas. Evita cebolla, ajo, chocolate, uvas, nueces de
                        macadamia, edulcorantes artificiales y alcohol.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Article Footer */}
            <div className="border-t border-gray-200 pt-6 mt-8">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://randomuser.me/api/portraits/women/65.jpg"
                    alt="Autora"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Dra. Ana Beltrán
                    </p>
                    <p className="text-sm text-gray-500">
                      Veterinaria especialista en nutrición animal
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800">
                    <i className="far fa-bookmark"></i>
                  </button>
                  <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center">
                    <i className="far fa-thumbs-up mr-2"></i>
                    <span>Me gusta (248)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section className="max-w-4xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Más noticias sobre mascotas
          </h2>
          {/*noticias && noticias.length > 0 ? (
            noticias
              .slice(0, 3)
              .map((noticia) => (
                <CardNoticia key={noticia.id} noticia={noticia} />
              ))
          ) : (
            <p>No hay noticias disponibles</p>
          )*/}
        </section>
      </main>
    </>
  );
}
