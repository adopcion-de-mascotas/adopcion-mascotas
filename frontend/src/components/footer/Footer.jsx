import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Footer() {

  const initialState = {
    email: "",
  }
  const [formContacto, setFormContacto] = useState(initialState)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formContacto.email == "") {
      Swal.fire({
        icon: "warning",
        title: "Falta email",
        text: `Ingreselo nuevamente`,
        timer: 1000,
        showConfirmButton: false,
      });
      return
    }
    Swal.fire({
      icon: "success",
      title: "Email registrado",
      text: `Muchas gracias`,
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
      {/* Footer Component */}
      <footer className="bg-gray-800 text-white dark:text-black py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <i className="fas fa-paw text-3xl text-indigo-400 dark:text-indigo-300 mr-2"></i>
                <h3 className="text-2xl font-bold text-indigo-400 dark:text-indigo-300">
                  Happy Paws
                </h3>
              </div>
              <p className="text-gray-400 dark:text-gray-300 mb-4">
                Dedicados a encontrar hogares amorosos para mascotas abandonadas
                y promover la adopción responsable.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors duration-200"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors duration-200"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors duration-200"
                >
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-white dark:text-gray-100">
                Enlaces Rápidos
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-gray-400 hover:text-white">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#pets" className="text-gray-400 hover:text-white">
                    Mascotas
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white">
                    Nosotros
                  </a>
                </li>
                <li>
                  <a href="#blog" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-white dark:text-gray-100">
                Adopción
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors duration-200"
                  >
                    Proceso de Adopción
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors duration-200"
                  >
                    Preguntas Frecuentes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors duration-200"
                  >
                    Requisitos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors duration-200"
                  >
                    Historias de Éxito
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors duration-200"
                  >
                    Hogares Temporales
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-white dark:text-gray-100">
                Boletín
              </h4>
              <p className="text-gray-400 dark:text-gray-300 mb-4">
                Suscríbete para recibir noticias sobre mascotas disponibles y
                eventos de adopción.
              </p>
              <form className="flex">
                <input
                  type="email"
                  name="email"
                  placeholder="Tu email"
                  className="px-4 py-2 rounded-l-lg focus:outline-none  text-gray-200 bg-gray-700 placeholder-gray-400 w-full transition-colors duration-200"
                  onChange={handleChange}
                  value={formContacto.email}
                />
                <button
                  className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-r-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-200"
                  onClick={handleSubmit}
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-700 dark:border-gray-600 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2023 Happy Paws. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Términos de Servicio
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
