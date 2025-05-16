import React from 'react'

export default function Blog() {
  return (
    <>
    <section id="blog" class="py-16 bg-gray-50">
            <div class="container mx-auto px-4">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-800 mb-4">Consejos y Noticias</h2>
                    <p class="text-gray-600 max-w-2xl mx-auto">Aprende sobre cuidado de mascotas, historias de adopción y nuestras últimas noticias.</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Blog Post 1 */}
                    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div class="h-48 overflow-hidden">
                            <img src="https://perritosbebes.com/wp-content/uploads/2023/08/tips-para-cuidado-de-perro.jpg" 
                                 alt="Cuidado de perros" class="w-full h-full object-cover"/>
                        </div>
                        <div class="p-6">
                            <div class="flex items-center text-sm text-gray-500 mb-3">
                                <span>15 Junio 2023</span>
                                <span class="mx-2">•</span>
                                <span>Consejos</span>
                            </div>
                            <h3 class="text-xl font-bold text-gray-800 mb-3">10 Consejos para el cuidado de tu perro adoptado</h3>
                            <p class="text-gray-600 mb-4">La adopción es solo el primer paso. Aprende cómo ayudar a tu nuevo compañero a adaptarse a su hogar.</p>
                            <a href="#" class="text-indigo-600 font-medium hover:text-indigo-700 flex items-center">
                                Leer más <i class="fas fa-arrow-right ml-2"></i>
                            </a>
                        </div>
                    </div>
                    
                    {/* Blog Post 2 */}
                    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div class="h-48 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                                 alt="Historia de adopción" class="w-full h-full object-cover"/>
                        </div>
                        <div class="p-6">
                            <div class="flex items-center text-sm text-gray-500 mb-3">
                                <span>2 Junio 2023</span>
                                <span class="mx-2">•</span>
                                <span>Historias</span>
                            </div>
                            <h3 class="text-xl font-bold text-gray-800 mb-3">De la calle a un hogar: La historia de Bella</h3>
                            <p class="text-gray-600 mb-4">Conoce cómo Bella, una perrita rescatada en mal estado, encontró una familia que la ama incondicionalmente.</p>
                            <a href="#" class="text-indigo-600 font-medium hover:text-indigo-700 flex items-center">
                                Leer más <i class="fas fa-arrow-right ml-2"></i>
                            </a>
                        </div>
                    </div>
                    
                    {/* Blog Post 3 */}
                    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div class="h-48 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80" 
                                 alt="Evento de adopción" class="w-full h-full object-cover"/>
                        </div>
                        <div class="p-6">
                            <div class="flex items-center text-sm text-gray-500 mb-3">
                                <span>25 Mayo 2023</span>
                                <span class="mx-2">•</span>
                                <span>Eventos</span>
                            </div>
                            <h3 class="text-xl font-bold text-gray-800 mb-3">Gran evento de adopción este fin de semana</h3>
                            <p class="text-gray-600 mb-4">Más de 50 mascotas estarán esperando por su familia en nuestro evento especial de adopción.</p>
                            <a href="#" class="text-indigo-600 font-medium hover:text-indigo-700 flex items-center">
                                Leer más <i class="fas fa-arrow-right ml-2"></i>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="text-center mt-12">
                    <a href="#" class="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
                        Ver más artículos
                    </a>
                </div>
            </div>
        </section>
    </>
  )
}
