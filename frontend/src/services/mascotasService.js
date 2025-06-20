const BASE_URL = import.meta.env.VITE_API_URL;
import { jwtDecode } from "jwt-decode";


export async function obtenerMascotas({ search, page, limit, tipo, raza, edad, tamanio, estado, ciudad, genero } = {}) {
  try {
    const params = new URLSearchParams();

    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    if (tipo) params.append("tipo", tipo);
    if (raza) params.append("raza", raza);
    if (edad) params.append("edad", edad);
    if (tamanio) params.append("tamanio", tamanio);
    if (genero) params.append("genero", genero);
    if (estado) params.append("estado", estado);
    if (ciudad) params.append("ciudad", ciudad);
    if (search) params.append("search", search);

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
  const token = sessionStorage.getItem("token");
  const decoded = jwtDecode(token);
  const admin_id = decoded.id;

  try {
    const formData = new FormData();

    formData.append("nombre", mascota.nombre || "");
    formData.append("edad", mascota.edad || "");
    formData.append("tipo", mascota.tipo || "");
    formData.append("raza", mascota.raza || "");
    formData.append("genero", mascota.genero || "");
    formData.append("tamanio", mascota.tamanio || "");
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
    /*     if (mascota.comportamiento) {
          formData.append("comportamiento[niños]", mascota.comportamiento.niños || "");
          formData.append("comportamiento[perros]", mascota.comportamiento.perros || "");
          formData.append("comportamiento[gatos]", mascota.comportamiento.gatos || "");
          formData.append("comportamiento[apartamento]", mascota.comportamiento.apartamento || "");
        } */

    if (mascota.comportamientoId) {
      formData.append("comportamientoId", mascota.comportamientoId || "")
    }

    // Salud
    /*     if (mascota.salud) {
          formData.append("salud[estado]", mascota.salud.estado || "");
          formData.append("salud[tratamiento]", mascota.salud.tratamiento || "");
          formData.append("salud[info_veterinaria]", mascota.salud.info_veterinaria || "");
        } */
    if (mascota.saludId) {
      formData.append("saludId", mascota.saludId || "")
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

  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("No hay token de autenticación");

  const decoded = jwtDecode(token);
  const admin_id = decoded.id;

  try {
    const formData = new FormData();
    formData.append("id", mascotaId);

    // Campos obligatorios - validar y convertir
    if (!mascota.nombre?.trim()) throw new Error("El nombre es obligatorio");
    if (!mascota.tipo?.trim()) throw new Error("El tipo es obligatorio");
    if (!mascota.refugioId) throw new Error("El refugio es obligatorio");

    // Campos básicos con validación
    formData.append("nombre", mascota.nombre.trim());
    formData.append("edad", String(mascota.edad));
    formData.append("tipo", mascota.tipo.trim());
    formData.append("raza", mascota.raza?.trim() || "");
    formData.append("genero", mascota.genero?.trim() || "");
    formData.append("tamanio", mascota.tamanio?.trim() || "");
    formData.append("peso", mascota.peso !== undefined && mascota.peso !== null ? String(mascota.peso) : "");
    formData.append("esterelizado", mascota.esterelizado ? "true" : "false");
    formData.append("estado", mascota.estado?.trim() || "");
    formData.append("ciudad", mascota.ciudad?.trim() || "");
    formData.append("descripcion", mascota.descripcion?.trim() || "");
    formData.append("historia", mascota.historia?.trim() || "");
    formData.append("refugioId", String(mascota.refugioId));
    formData.append("admin_id", String(admin_id));

    // Imagen principal (solo si hay una nueva para actualizar)
    if (mascota.imagen_principal instanceof File) {
      formData.append("imagen_principal", mascota.imagen_principal);
    }

    // Personalidad (array de ids)
    const personalidad = Array.isArray(mascota.personalidad) ? mascota.personalidad : [];
    personalidad.forEach(idPerso => {
      if (idPerso) formData.append("personalidad[]", String(idPerso));
    });

    // Galería de imágenes (archivos)
    if (Array.isArray(mascota.galeria)) {
      mascota.galeria.forEach(file => {
        if (file instanceof File) {
          formData.append("galeria", file);
        }
      });
    }

    // Comportamiento (objeto con campos específicos)
    const comportamiento = mascota.comportamiento || {};
    formData.append("comportamiento[niños]", comportamiento.niños?.trim() || "");
    formData.append("comportamiento[perros]", comportamiento.perros?.trim() || "");
    formData.append("comportamiento[gatos]", comportamiento.gatos?.trim() || "");
    formData.append("comportamiento[apartamento]", comportamiento.apartamento?.trim() || "");

    // Salud (objeto)
    const salud = mascota.salud || {};
    formData.append("salud[estado]", salud.estado?.trim() || "");
    formData.append("salud[tratamiento]", salud.tratamiento?.trim() || "");
    formData.append("salud[info_veterinaria]", salud.info_veterinaria?.trim() || "");

    // Vacunas (array de ids)
    const vacunas = Array.isArray(mascota.vacunas) ? mascota.vacunas : [];
    vacunas.forEach(idVacuna => {
      if (idVacuna) formData.append("vacunas[]", String(idVacuna));
    });

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
  const token = sessionStorage.getItem("token");

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
