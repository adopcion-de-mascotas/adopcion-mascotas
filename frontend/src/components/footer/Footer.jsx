import React from 'react'

export default function Footer() {
  return (
    <>
    {/* Footer Component */}
    <footer class="bg-gray-800 text-white py-12">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                    <div class="flex items-center mb-4">
                        <i class="fas fa-paw text-3xl text-indigo-400 mr-2"></i>
                        <h3 class="text-2xl font-bold text-indigo-400">Happy Paws</h3>
                    </div>
                    <p class="text-gray-400 mb-4">Dedicados a encontrar hogares amorosos para mascotas abandonadas y promover la adopción responsable.</p>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-400 hover:text-white">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-white">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-white">
                            <i class="fab fa-twitter"></i>
                        </a>
                    </div>
                </div>
                
                <div>
                    <h4 class="text-lg font-bold mb-4">Enlaces Rápidos</h4>
                    <ul class="space-y-2">
                        <li><a href="#home" class="text-gray-400 hover:text-white">Inicio</a></li>
                        <li><a href="#pets" class="text-gray-400 hover:text-white">Mascotas</a></li>
                        <li><a href="#about" class="text-gray-400 hover:text-white">Nosotros</a></li>
                        <li><a href="#blog" class="text-gray-400 hover:text-white">Blog</a></li>
                        <li><a href="#contact" class="text-gray-400 hover:text-white">Contacto</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="text-lg font-bold mb-4">Adopción</h4>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-400 hover:text-white">Proceso de Adopción</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Preguntas Frecuentes</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Requisitos</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Historias de Éxito</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Hogares Temporales</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="text-lg font-bold mb-4">Boletín</h4>
                    <p class="text-gray-400 mb-4">Suscríbete para recibir noticias sobre mascotas disponibles y eventos de adopción.</p>
                    <form class="flex">
                        <input type="email" placeholder="Tu email" class="px-4 py-2 rounded-l-lg focus:outline-none text-gray-800 w-full"/>
                        <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>
            
            <div class="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p class="text-gray-400 mb-4 md:mb-0">© 2023 Happy Paws. Todos los derechos reservados.</p>
                <div class="flex space-x-6">
                    <a href="#" class="text-gray-400 hover:text-white">Política de Privacidad</a>
                    <a href="#" class="text-gray-400 hover:text-white">Términos de Servicio</a>
                </div>
            </div>
        </div>
    </footer>

</>
  )
}
