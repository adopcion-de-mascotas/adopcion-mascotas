const BASE_URL = import.meta.env.VITE_API_URL;
import { jwtDecode } from "jwt-decode";

// Obtener listado de mascotas con filtros
export async function obtenerMascotas({ search, page, limit, tipo, raza, tamaño } = {}) {
  try {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    if (tipo) params.append("tipo", tipo);
    if (raza) params.append("raza", raza);
    if (tamaño) params.append("tamaño", tamaño);

    const url = `${BASE_URL}/mascotas?${params}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Error en la respuesta del servidor");
    const json = await response.json()
    return json.data.items
  } catch (error) {
    console.error("Error al obtener mascotas:", error);
    throw error;
  }
}

export async function obtenerMascotas2({ search, page, limit, tipo, raza, tamaño } = {}) {
  try {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    if (tipo) params.append("tipo", tipo);
    if (raza) params.append("raza", raza);
    if (tamaño) params.append("tamaño", tamaño);

    const url = `${BASE_URL}/mascotas?${params}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Error en la respuesta del servidor");
    const json = await response.json()
    return json
  } catch (error) {
    console.error("Error al obtener mascotas:", error);
    throw error;
  }
}

export async function obtenerRefugios() {
  const res = await fetch(`${BASE_URL}/refugios`);
  if (!res.ok) throw new Error("Error al obtener los refugios");

  const json = await res.json();
  return json.data;
}


export async function obtenerComportamientos() {
  try {
    const res = await fetch(`${BASE_URL}/admin/comportamientos`);
    if (!res.ok) throw new Error("Error al obtener comportamientos");
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error en comportamientos:", error);
    throw error;
  }
}

export async function obtenerDirecciones() {
  try {
    const res = await fetch(`${BASE_URL}/admin/direcciones`);
    if (!res.ok) throw new Error("Error al obtener direcciones");
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error en direcciones:", error);
    throw error;
  }
}

export async function obtenerPersonalidadPorId(id) {
  try {
    const res = await fetch(`${BASE_URL}/admin/personalidades/${id}`);
    if (!res.ok) throw new Error("Error al obtener personalidad");
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error en personalidad:", error);
    throw error;
  }
}


// Obtener detalle por ID
export async function obtenerMascotaPorId(id) {
  try {
    const response = await fetch(`${BASE_URL}/mascotas/${id}`);
    if (!response.ok) throw new Error("No se pudo obtener la mascota");

    const json = await response.json();

    if (!json?.data) {
      throw new Error("La mascota no fue encontrada en la respuesta");
    }

    return json.data;
  } catch (error) {
    console.error("Error al obtener mascota por ID:", error.message);
    throw error;
  }
}


export async function crearMascota(mascota) {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const admin_id = decoded.id;

  try {
    const formData = new FormData();

    formData.append("nombre", mascota.nombre || "");
    formData.append("edad", mascota.edad || "");
    formData.append("tipo", mascota.tipo || "");
    formData.append("raza", mascota.raza || "");
    formData.append("genero", mascota.genero || ""); // corregido
    formData.append("tamanio", mascota.tamanio || ""); // corregido
    formData.append("peso", mascota.peso?.toString() || "");
    formData.append("esterelizado", mascota.esterelizado ? "true" : "false");
    formData.append("estado", mascota.estado || "");
    formData.append("ciudad", mascota.ciudad || "");
    formData.append("descripcion", mascota.descripcion || "");
    formData.append("historia", mascota.historia || "");
    formData.append("refugioId", mascota.refugioId?.toString() || "");
    formData.append("admin_id", admin_id);

    // Imagen principal
    if (mascota.imagen_principal) {
      formData.append("imagen_principal", mascota.imagen_principal);
    }

    // Personalidad (array de ids)
    if (mascota.personalidad && mascota.personalidad.length > 0) {
      mascota.personalidad.forEach((id) => {
        formData.append("personalidad[]", id.toString());
      });
    }

    // Galería
    if (Array.isArray(mascota.galeria)) {
      mascota.galeria.forEach((file) => {
        formData.append("galeria[]", file);
      });
    } else if (mascota.galeria) {
      console.warn("La galería no es un array. Tipo recibido:", typeof mascota.galeria, mascota.galeria);
    }


    // Comportamiento
    if (mascota.comportamiento) {
      formData.append("comportamiento[niños]", mascota.comportamiento.niños || "");
      formData.append("comportamiento[perros]", mascota.comportamiento.perros || "");
      formData.append("comportamiento[gatos]", mascota.comportamiento.gatos || "");
      formData.append("comportamiento[apartamento]", mascota.comportamiento.apartamento || "");
    }

    // Salud
    if (mascota.salud) {
      formData.append("salud[estado]", mascota.salud.estado || "");
      formData.append("salud[tratamiento]", mascota.salud.tratamiento || "");
      formData.append("salud[info_veterinaria]", mascota.salud.info_veterinaria || "");
    }

    // Vacunas (array de ids)
    if (mascota.vacunas && mascota.vacunas.length > 0) {
      mascota.vacunas.forEach((id) => {
        formData.append("vacunas[]", id.toString());
      });
    }

    // Debug del FormData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await fetch(`${BASE_URL}/admin/mascotas`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Respuesta del servidor:", data);
      if (data.errors) {
        console.error("Errores del formulario:", JSON.stringify(data.errors, null, 2));
      }
      throw new Error("Error al crear mascota");
    }

    return data;
  } catch (error) {
    console.error("Error en crearMascota:", error);
    throw error;
  }
}

export async function actualizarMascota(mascotaId, mascota) {
  if (!mascotaId) throw new Error("El id de la mascota es obligatorio");

  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token de autenticación");

  const decoded = jwtDecode(token);
  const admin_id = decoded.id;

  try {
    const formData = new FormData();
    formData.append("id", mascotaId);

    formData.append("nombre", mascota.nombre || "");
    formData.append("edad", mascota.edad || "");
    formData.append("tipo", mascota.tipo || "");
    formData.append("raza", mascota.raza || "");
    formData.append("genero", mascota.genero || "");
    formData.append("tamanio", mascota.tamanio || "");
    formData.append("peso", mascota.peso || "");
    // Nota: corregí el nombre de la propiedad a 'esterilizado' que es lo correcto en español
    formData.append("esterelizado", mascota.esterelizado ? "true" : "false");
    formData.append("estado", mascota.estado || "");
    formData.append("ciudad", mascota.ciudad || "");
    formData.append("descripcion", mascota.descripcion || "");
    formData.append("historia", mascota.historia || "");
    formData.append("refugioId", mascota.refugioId?.toString() || "");
    formData.append("admin_id", admin_id);

    // Imagen principal (solo si hay una nueva para actualizar)
    if (mascota.imagen_principal) {
      formData.append("imagen_principal", mascota.imagen_principal);
    }

    // Personalidad (array de ids)
    if (Array.isArray(mascota.personalidad) && mascota.personalidad.length > 0) {
      mascota.personalidad.forEach(idPerso => {
        formData.append("personalidad[]", idPerso.toString());
      });
    }

    // Galería de imágenes (archivos)
    if (Array.isArray(mascota.galeria)) {
      mascota.galeria.forEach(file => {
        // Cambié de "galeria[]" a "galeria" para evitar problema con backend que no acepte corchetes
        formData.append("galeria", file);
      });
    } else if (mascota.galeria) {
      console.warn("La galería no es un array. Tipo recibido:", typeof mascota.galeria, mascota.galeria);
    }

    // Comportamiento (objeto con campos específicos)
    if (mascota.comportamiento) {
      formData.append("comportamiento[niños]", mascota.comportamiento.niños || "");
      formData.append("comportamiento[perros]", mascota.comportamiento.perros || "");
      formData.append("comportamiento[gatos]", mascota.comportamiento.gatos || "");
      formData.append("comportamiento[apartamento]", mascota.comportamiento.apartamento || "");
    }

    // Salud (objeto)
    if (mascota.salud) {
      formData.append("salud[estado]", mascota.salud.estado || "");
      formData.append("salud[tratamiento]", mascota.salud.tratamiento || "");
      formData.append("salud[info_veterinaria]", mascota.salud.info_veterinaria || "");
    }

    // Vacunas (array de ids)
    if (Array.isArray(mascota.vacunas) && mascota.vacunas.length > 0) {
      mascota.vacunas.forEach(idVacuna => {
        formData.append("vacunas[]", idVacuna.toString());
      });
    }

    // Debug FormData - opcional para desarrollo
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await fetch(`${BASE_URL}/admin/mascotas/${mascotaId}`, {
      method: "PUT", // o PATCH según API
      headers: {
        Authorization: `Bearer ${token}`,
        // No usar 'Content-Type' aquí porque fetch lo asigna automáticamente con FormData
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Respuesta del servidor:", data);
      if (data.errors) {
        console.error("Errores del formulario:", JSON.stringify(data.errors, null, 2));
      }
      throw new Error(data.message || "Error al actualizar mascota");
    }

    return data;

  } catch (error) {
    console.error("Error en actualizarMascota:", error);
    throw error;
  }
}

// Eliminar mascota por ID
export async function eliminarMascota(id) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token de autenticación disponible");
  }
  try {
    const response = await fetch(`${BASE_URL}/admin/mascotas/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Error al eliminar mascota");

    return await response.json();
  } catch (error) {
    console.error("Error al eliminar mascota:", error);
    throw error;
  }
}
