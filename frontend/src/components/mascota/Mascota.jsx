import React from 'react'
import './Mascota.css'
export default function Mascota() {
  return (
    <>
     <section id="pets" class="py-16 ">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-800 mb-4">Mascotas en Adopción</h2>
                <p class="text-gray-600 max-w-2xl mx-auto">Estos adorables compañeros están buscando un hogar amoroso. Cada uno tiene su propia personalidad y necesidades especiales.</p>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Pet Card 1 */}
                <div class="pet-card bg-white rounded-xl shadow-md overflow-hidden transition duration-300">
                    <div class="relative h-64 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
                             alt="Perro Golden Retriever" class="w-full h-full object-cover"/>
                        <div class="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Disponible
                        </div>
                    </div>
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="text-xl font-bold text-gray-800">Max</h3>
                            <span class="text-gray-600">2 años</span>
                        </div>
                        <div class="flex items-center mb-4">
                            <i class="fas fa-dog text-indigo-500 mr-2"></i>
                            <span class="text-gray-600">Golden Retriever</span>
                        </div>
                        <p class="text-gray-600 mb-4">Max es un perro juguetón y cariñoso que adora los paseos y jugar con pelotas. Se lleva bien con niños y otros perros.</p>
                        <div class="flex justify-between items-center">
                            <button class="view-details-btn px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg font-medium hover:bg-indigo-200" data-pet-id="1">
                                Ver Detalles
                            </button>
                            <button class="adopt-btn px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
                                Adoptar
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Pet Card 2 */}
                <div class="pet-card bg-white rounded-xl shadow-md overflow-hidden transition duration-300">
                    <div class="relative h-64 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1386&q=80" 
                             alt="Gato atigrado" class="w-full h-full object-cover"/>
                        <div class="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Disponible
                        </div>
                    </div>
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="text-xl font-bold text-gray-800">Luna</h3>
                            <span class="text-gray-600">1 año</span>
                        </div>
                        <div class="flex items-center mb-4">
                            <i class="fas fa-cat text-indigo-500 mr-2"></i>
                            <span class="text-gray-600">Atigrado</span>
                        </div>
                        <p class="text-gray-600 mb-4">Luna es una gata tranquila que disfruta de las caricias y los lugares cálidos. Es perfecta para un hogar tranquilo.</p>
                        <div class="flex justify-between items-center">
                            <button class="view-details-btn px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg font-medium hover:bg-indigo-200" data-pet-id="2">
                                Ver Detalles
                            </button>
                            <button class="adopt-btn px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
                                Adoptar
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Pet Card 3 */}
                <div class="pet-card bg-white rounded-xl shadow-md overflow-hidden transition duration-300">
                    <div class="relative h-64 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                             alt="Conejo blanco" class="w-full h-full object-cover"/>
                        <div class="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Disponible
                        </div>
                    </div>
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="text-xl font-bold text-gray-800">Snow</h3>
                            <span class="text-gray-600">6 meses</span>
                        </div>
                        <div class="flex items-center mb-4">
                            <i class="fas fa-paw text-indigo-500 mr-2"></i>
                            <span class="text-gray-600">Conejo enano</span>
                        </div>
                        <p class="text-gray-600 mb-4">Snow es un conejo juguetón y curioso. Le encanta explorar y necesita espacio para saltar y jugar.</p>
                        <div class="flex justify-between items-center">
                            <button class="view-details-btn px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg font-medium hover:bg-indigo-200" data-pet-id="3">
                                Ver Detalles
                            </button>
                            <button class="adopt-btn px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
                                Adoptar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="text-center mt-12">
                <a href="#" class="px-6 py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50">
                    Ver más mascotas
                </a>
            </div>
        </div>
    </section>
    </>
  )
}
