import React from 'react'

export default function Contact() {
  return (
    <>
    <section id="contact" class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-800 mb-4">Contáctanos</h2>
                <p class="text-gray-600 max-w-2xl mx-auto">¿Tienes preguntas sobre adopción, quieres ser voluntario o necesitas ayuda con tu mascota? Escríbenos.</p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div class="bg-white rounded-xl shadow-sm p-8">
                    <h3 class="text-xl font-bold text-gray-800 mb-6">Envíanos un mensaje</h3>
                    <form>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label for="name" class="block text-gray-700 font-medium mb-2">Nombre</label>
                                <input type="text" id="name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"/>
                            </div>
                            <div>
                                <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
                                <input type="email" id="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"/>
                            </div>
                        </div>
                        <div class="mb-6">
                            <label for="subject" class="block text-gray-700 font-medium mb-2">Asunto</label>
                            <input type="text" id="subject" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"/>
                        </div>
                        <div class="mb-6">
                            <label for="message" class="block text-gray-700 font-medium mb-2">Mensaje</label>
                            <textarea id="message" rows="5" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"></textarea>
                        </div>
                        <button type="submit" class="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
                            Enviar Mensaje
                        </button>
                    </form>
                </div>
                
                <div>
                    <div class="bg-white rounded-xl shadow-sm p-8 mb-8">
                        <h3 class="text-xl font-bold text-gray-800 mb-6">Información de Contacto</h3>
                        <div class="space-y-4">
                            <div class="flex items-start">
                                <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4 mt-1">
                                    <i class="fas fa-map-marker-alt text-indigo-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-800">Dirección</h4>
                                    <p class="text-gray-600">Calle Ficticia 123, Ciudad Imaginaria</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start">
                                <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4 mt-1">
                                    <i class="fas fa-phone-alt text-indigo-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-800">Teléfono</h4>
                                    <p class="text-gray-600">+1 234 567 890</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start">
                                <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4 mt-1">
                                    <i class="fas fa-envelope text-indigo-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-800">Email</h4>
                                    <p class="text-gray-600">info@happypaws.com</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start">
                                <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4 mt-1">
                                    <i class="fas fa-clock text-indigo-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-800">Horario</h4>
                                    <p class="text-gray-600">Lunes a Viernes: 9am - 6pm</p>
                                    <p class="text-gray-600">Sábados: 10am - 4pm</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-sm p-8">
                        <h3 class="text-xl font-bold text-gray-800 mb-6">Síguenos</h3>
                        <div class="flex space-x-4">
                            <a href="#" class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-200">
                                <i class="fab fa-facebook-f text-xl"></i>
                            </a>
                            <a href="#" class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-200">
                                <i class="fab fa-instagram text-xl"></i>
                            </a>
                            <a href="#" class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-200">
                                <i class="fab fa-twitter text-xl"></i>
                            </a>
                            <a href="#" class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-200">
                                <i class="fab fa-youtube text-xl"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    </>
  )
}
