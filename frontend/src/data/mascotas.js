const mascotas = [
  {
    id: "max",
    estado: "adoptado",
    nombre: "Max",
    edad: "2 años",
    tipo: "Perro",
    raza: "Golden Retriever",
    genero: "Hembra",
    tamaño: "Chico",
    peso: "10 kg",
    esterelizado: "Sí",
    ciudad: "Madrid",
    imagen:
      "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=500&q=80",
    descripcion:
      "Max es un perro juguetón y cariñoso que adora los paseos y jugar con pelotas.",
    galeria: [
      "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=800&q=80"
    ],
    personalidad: ["Juguetón", "Amigable"],
    comportamiento: {
      niños: "Excelente",
      perros: "Bueno",
      gatos: "No probado",
      apartamento: "Sí"
    },
    historia: "Encontrada en un parque, Max busca una familia con energía para paseos largos.",
    salud: {
      estado: "Salud excelente",
      vacunas: ["Rabia", "Parvovirus"],
      tratamiento: "Antipulgas mensual",
      info_veterinaria: "Dr. Martínez, clínica SanCan"
    },
    liked: false,
    likes: 0,
    refugio: {
      nombre: "Patitas Felices",
      descripcion: "Refugio especializado en perros grandes.",
      info: "Desde 2010 ayudando a perros como Max.",
      imagen: "https://images.unsplash.com/photo-1601758003122-53c40e686a19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      contacto: {
        direccion: "Calle Rescate 45, Madrid",
        telefono: "+34 911 234 567",
        email: "info@patitasfelices.org",
        web: "https://www.patitasfelices.org"
      }
    }
  },

  {
    id: "luna",
    nombre: "Luna",
    edad: "1 año",
    tipo: "Gato",
    raza: "Persa",
    genero: "Macho",
    tamaño: "Chico",
    peso: "10 kg",
    esterelizado: "Sí",
    ciudad: "Barcelona",
    imagen:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=500&q=80",
    descripcion:
      "Luna es tranquila y le encanta dormir en lugares cálidos. Ideal para apartamentos.",
    galeria: [
      "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=800&q=80"
    ],
    personalidad: ["Juguetón", "Amigable"],
    comportamiento: {
      niños: "Excelente",
      perros: "Bueno",
      gatos: "No probado",
      apartamento: "Sí"
    },
    historia: "Encontrada en un parque, Max busca una familia con energía para paseos largos.",
    salud: {
      estado: "Salud excelente",
      vacunas: ["Rabia", "Parvovirus"],
      tratamiento: "Antipulgas mensual",
      info_veterinaria: "Dr. Martínez, clínica SanCan"
    },
    liked: false,
    likes: 0,
    refugio: {
      nombre: "Patitas Felices",
      descripcion: "Refugio especializado en perros grandes.",
      info: "Desde 2010 ayudando a perros como Max.",
      imagen: "https://images.unsplash.com/photo-1601758003122-53c40e686a19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      contacto: {
        direccion: "Calle Rescate 45, Madrid",
        telefono: "+34 911 234 567",
        email: "info@patitasfelices.org",
        web: "https://www.patitasfelices.org"
      }
    }
  },
  {
    id: "copo",
    nombre: "Copo",
    edad: "6 meses",
    tipo: "Conejo",
    raza: "Conejo blanco",
    genero: "Hembra",
    tamaño: "Chico",
    peso: "10 kg",
    esterelizado: "Sí",
    ciudad: "Valencia",
    imagen:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=500&q=80",
    descripcion:
      "Copo es un conejo muy tranquilo y limpio. Perfecto para niños responsables.",
    galeria: [
      "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=800&q=80"
    ],
    personalidad: ["Juguetón", "Amigable"],
    comportamiento: {
      niños: "Excelente",
      perros: "Bueno",
      gatos: "No probado",
      apartamento: "Sí"
    },
    historia: "Encontrada en un parque, Max busca una familia con energía para paseos largos.",
    salud: {
      estado: "Salud excelente",
      vacunas: ["Rabia", "Parvovirus"],
      tratamiento: "Antipulgas mensual",
      info_veterinaria: "Dr. Martínez, clínica SanCan"
    },
    liked: false,
    likes: 0,
    refugio: {
      nombre: "Patitas Felices",
      descripcion: "Refugio especializado en perros grandes.",
      info: "Desde 2010 ayudando a perros como Max.",
      imagen: "https://images.unsplash.com/photo-1601758003122-53c40e686a19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      contacto: {
        direccion: "Calle Rescate 45, Madrid",
        telefono: "+34 911 234 567",
        email: "info@patitasfelices.org",
        web: "https://www.patitasfelices.org"
      }
    }
  },
  {
    id: "toby",
    nombre: "Toby",
    edad: "3 años",
    tipo: "perro",
    raza: "Chihuahua",
    genero: "Macho",
    tamaño: "Chico",
    peso: "10 kg",
    esterelizado: "Sí",
    ciudad: "Sevilla",
    imagen:
      "https://images.unsplash.com/photo-1594149929911-78975a43d4f5?auto=format&fit=crop&w=500&q=80",
    descripcion:
      "Toby es pequeño pero con mucha personalidad. Ideal para personas mayores.",
    galeria: [
      "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=800&q=80"
    ],
    personalidad: ["Juguetón", "Amigable"],
    comportamiento: {
      niños: "Excelente",
      perros: "Bueno",
      gatos: "No probado",
      apartamento: "Sí"
    },
    historia: "Encontrada en un parque, Max busca una familia con energía para paseos largos.",
    salud: {
      estado: "Salud excelente",
      vacunas: ["Rabia", "Parvovirus"],
      tratamiento: "Antipulgas mensual",
      info_veterinaria: "Dr. Martínez, clínica SanCan"
    },
    liked: false,
    likes: 0,
    refugio: {
      nombre: "Patitas Felices",
      descripcion: "Refugio especializado en perros grandes.",
      info: "Desde 2010 ayudando a perros como Max.",
      imagen: "https://images.unsplash.com/photo-1601758003122-53c40e686a19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      contacto: {
        direccion: "Calle Rescate 45, Madrid",
        telefono: "+34 911 234 567",
        email: "info@patitasfelices.org",
        web: "https://www.patitasfelices.org"
      }
    }
  },
  {
    id: "milo",
    nombre: "Milo",
    edad: "4 meses",
    tipo: "Gato",
    raza: "Siamés",
    genero: "Macho",
    tamaño: "Chico",
    peso: "10 kg",
    esterelizado: "Sí",
    ciudad: "Bilbao",
    imagen:
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=500&q=80",
    descripcion:
      "Milo es curioso y juguetón. Le encanta explorar y necesita espacio para correr.",
    galeria: [
      "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=800&q=80"
    ],
    personalidad: ["Juguetón", "Amigable"],
    comportamiento: {
      niños: "Excelente",
      perros: "Bueno",
      gatos: "No probado",
      apartamento: "Sí"
    },
    historia: "Encontrada en un parque, Max busca una familia con energía para paseos largos.",
    salud: {
      estado: "Salud excelente",
      vacunas: ["Rabia", "Parvovirus"],
      tratamiento: "Antipulgas mensual",
      info_veterinaria: "Dr. Martínez, clínica SanCan"
    },
    liked: false,
    likes: 0,
    refugio: {
      nombre: "Patitas Felices",
      descripcion: "Refugio especializado en perros grandes.",
      info: "Desde 2010 ayudando a perros como Max.",
      imagen: "https://images.unsplash.com/photo-1601758003122-53c40e686a19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      contacto: {
        direccion: "Calle Rescate 45, Madrid",
        telefono: "+34 911 234 567",
        email: "info@patitasfelices.org",
        web: "https://www.patitasfelices.org"
      }
    }
  },
  {
    id: "rocky",
    nombre: "Rocky",
    edad: "5 años",
    tipo: "Aves",
    raza: "Loro silvestre",
    genero: "Macho",
    tamaño: "Chico",
    peso: "10 kg",
    esterelizado: "Sí",
    ciudad: "Málaga",
    imagen:
      "https://images.unsplash.com/photo-1555169062-013468b47731?auto=format&fit=crop&w=500&q=80",
    descripcion:
      "Rocky es un perro muy obediente y cariñoso. Adora el agua y jugar a buscar.",
    galeria: [
      "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=800&q=80"
    ],
    personalidad: ["Juguetón", "Amigable"],
    comportamiento: {
      niños: "Excelente",
      perros: "Bueno",
      gatos: "No probado",
      apartamento: "Sí"
    },
    historia: "Encontrada en un parque, Max busca una familia con energía para paseos largos.",
    salud: {
      estado: "Salud excelente",
      vacunas: ["Rabia", "Parvovirus"],
      tratamiento: "Antipulgas mensual",
      info_veterinaria: "Dr. Martínez, clínica SanCan"
    },
    liked: false,
    likes: 0,
    refugio: {
      nombre: "Patitas Felices",
      descripcion: "Refugio especializado en perros grandes.",
      info: "Desde 2010 ayudando a perros como Max.",
      imagen: "https://images.unsplash.com/photo-1601758003122-53c40e686a19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      contacto: {
        direccion: "Calle Rescate 45, Madrid",
        telefono: "+34 911 234 567",
        email: "info@patitasfelices.org",
        web: "https://www.patitasfelices.org"
      }
    }
  },
  {
    id: "rex",
    nombre: "Rex",
    edad: "3 años",
    tipo: "Perro",
    raza: "Pastor Alemán",
    genero: "Macho",
    tamaño: "Chico",
    peso: "10 kg",
    esterelizado: "Sí",
    ciudad: "Zaragoza",
    imagen:
      "https://images.unsplash.com/photo-1554530700-747e22bb4e56?auto=format&fit=crop&w=500&q=80",
    descripcion:
      "Rex es inteligente y protector. Necesita dueños activos que lo ejerciten.",
    galeria: [
      "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=800&q=80"
    ],
    personalidad: ["Juguetón", "Amigable"],
    comportamiento: {
      niños: "Excelente",
      perros: "Bueno",
      gatos: "No probado",
      apartamento: "Sí"
    },
    historia: "Encontrada en un parque, Max busca una familia con energía para paseos largos.",
    salud: {
      estado: "Salud excelente",
      vacunas: ["Rabia", "Parvovirus"],
      tratamiento: "Antipulgas mensual",
      info_veterinaria: "Dr. Martínez, clínica SanCan"
    },
    liked: false,
    likes: 0,
    refugio: {
      nombre: "Patitas Felices",
      descripcion: "Refugio especializado en perros grandes.",
      info: "Desde 2010 ayudando a perros como Max.",
      imagen: "https://images.unsplash.com/photo-1601758003122-53c40e686a19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      contacto: {
        direccion: "Calle Rescate 45, Madrid",
        telefono: "+34 911 234 567",
        email: "info@patitasfelices.org",
        web: "https://www.patitasfelices.org"
      }
    }
  },
  {
    id: "daisy",
    nombre: "Daisy",
    edad: "2 años",
    tipo: "Cerdo",
    raza: "Cerdo Beagle",
    genero: "Hembra",
    tamaño: "Chico",
    peso: "10 kg",
    esterelizado: "Sí",
    ciudad: "Valencia",
    imagen:
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=500&q=80",
    descripcion:
      "Daisy es dulce y sociable. Se lleva bien con otros perros y niños.",
    galeria: [
      "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=800&q=80"
    ],
    personalidad: ["Juguetón", "Amigable"],
    comportamiento: {
      niños: "Excelente",
      perros: "Bueno",
      gatos: "No probado",
      apartamento: "Sí"
    },
    historia: "Encontrada en un parque, Max busca una familia con energía para paseos largos.",
    salud: {
      estado: "Salud excelente",
      vacunas: ["Rabia", "Parvovirus"],
      tratamiento: "Antipulgas mensual",
      info_veterinaria: "Dr. Martínez, clínica SanCan"
    },
    liked: false,
    likes: 0,
    refugio: {
      nombre: "Patitas Felices",
      descripcion: "Refugio especializado en perros grandes.",
      info: "Desde 2010 ayudando a perros como Max.",
      imagen: "https://images.unsplash.com/photo-1601758003122-53c40e686a19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      contacto: {
        direccion: "Calle Rescate 45, Madrid",
        telefono: "+34 911 234 567",
        email: "info@patitasfelices.org",
        web: "https://www.patitasfelices.org"
      }
    }
  },
];

export default mascotas;
