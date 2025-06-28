import { useState } from "react";
import Swal from "sweetalert2";

export default function Contact() {
  const initialState = {
    nombre: "",
    email: "",
    asunto: "",
    mensaje: ""
  }
  const [formContacto, setFormContacto] = useState(initialState)

  const handleSubmit = (e) => {
    e.preventDefault()
    Swal.fire({
      icon: "success",
      title: "Mensaje enviado",
      text: `Te responderemos a la brevedad: ${formContacto.nombre}`,
      timer: 1000,
      showConfirmButton: false,
    });

    setFormContacto(initialState)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormContacto((prev) => ({
      ...prev,
      [name]: value,
    }));
  }


  return (
    <>
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Contáctanos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ¿Tienes preguntas sobre adopción, quieres ser voluntario o
              necesitas ayuda con tu mascota? Escríbenos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Envíanos un mensaje
              </h3>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="nombre"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                      onChange={handleChange}
                      value={formContacto.nombre}
                    />
                  </div>
                  <div>
                    <label

                      htmlFor="email"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                      onChange={handleChange}
                      value={formContacto.email}
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label

                    htmlFor="asunto"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="asunto"
                    name="asunto"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                    onChange={handleChange}
                    value={formContacto.asunto}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="mensaje"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                    onChange={handleChange}
                    value={formContacto.mensaje}
                  ></textarea>
                </div>
                <button
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
                  onClick={handleSubmit}
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>

            <div>
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Información de Contacto
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <i className="fas fa-map-marker-alt text-indigo-600"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Dirección</h4>
                      <p className="text-gray-600">
                        Calle Ficticia 123, Ciudad Imaginaria
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <i className="fas fa-phone-alt text-indigo-600"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Teléfono</h4>
                      <p className="text-gray-600">+1 234 567 890</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <i className="fas fa-envelope text-indigo-600"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Email</h4>
                      <p className="text-gray-600">info@happypaws.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <i className="fas fa-clock text-indigo-600"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Horario</h4>
                      <p className="text-gray-600">
                        Lunes a Viernes: 9am - 6pm
                      </p>
                      <p className="text-gray-600">Sábados: 10am - 4pm</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Síguenos
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-200"
                  >
                    <i className="fab fa-facebook-f text-xl"></i>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-200"
                  >
                    <i className="fab fa-instagram text-xl"></i>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-200"
                  >
                    <i className="fab fa-twitter text-xl"></i>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-200"
                  >
                    <i className="fab fa-youtube text-xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
