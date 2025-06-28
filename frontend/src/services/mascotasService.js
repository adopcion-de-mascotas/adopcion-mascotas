const BASE_URL = import.meta.env.VITE_API_URL;
import { jwtDecode } from "jwt-decode";
import { postGalery, updateGalery } from "./galeriaService";


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
    // 1. Crear FormData sin galería
    const formDataSinGaleria = new FormData();

    const agregarCampo = (key, valor) => {
      if (valor !== undefined && valor !== null) {
        formDataSinGaleria.append(key, valor);
      }
    };

    agregarCampo("nombre", mascota.nombre);
    agregarCampo("edad", mascota.edad);
    agregarCampo("tipo", mascota.tipo);
    agregarCampo("raza", mascota.raza);
    agregarCampo("genero", mascota.genero);
    agregarCampo("tamanio", mascota.tamanio);
    agregarCampo("peso", mascota.peso?.toString());
    agregarCampo("esterelizado", mascota.esterelizado ? "true" : "false");
    agregarCampo("estado", mascota.estado);
    agregarCampo("ciudad", mascota.ciudad);
    agregarCampo("descripcion", mascota.descripcion);
    agregarCampo("historia", mascota.historia);
    agregarCampo("refugioId", mascota.refugioId?.toString());
    agregarCampo("admin_id", admin_id);

    if (mascota.imagen_principal) {
      formDataSinGaleria.append("imagen_principal", mascota.imagen_principal);
    }

    if (mascota.personalidad?.length) {
      mascota.personalidad.forEach(id => {
        formDataSinGaleria.append("personalidad[]", id.toString());
      });
    }

    if (mascota.comportamientoId) {
      agregarCampo("comportamientoId", mascota.comportamientoId);
    }

    if (mascota.saludId) {
      agregarCampo("saludId", mascota.saludId);
    }

    if (mascota.vacunas?.length) {
      mascota.vacunas.forEach(id => {
        formDataSinGaleria.append("vacunas[]", id.toString());
      });
    }

    // 2. Enviar datos al backend (sin galería)
    const response = await fetch(`${BASE_URL}/admin/mascotas`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataSinGaleria,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error al crear mascota:", data);
      throw new Error("Error al crear la mascota");
    }

    // 3. Enviar galería si existe
    if (Array.isArray(mascota.galeria) && mascota.galeria.length > 0) {
      const mascotaId = data.data.id;

      try {
        const galeriaResponse = await postGalery(mascotaId, mascota.galeria);

        if (!galeriaResponse || galeriaResponse.error) {
          console.error("Error al subir galería:", galeriaResponse);
          throw new Error("Error al subir la galería de imágenes");
        }
      } catch (error) {
        console.error("Error subiendo galería:", error);
        throw new Error("No se pudo subir la galería de imágenes");
      }
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
    const formDataSinGaleria = new FormData();
    formDataSinGaleria.append("id", mascotaId);

    // Campos obligatorios - validar y convertir
    if (!mascota.nombre?.trim()) throw new Error("El nombre es obligatorio");
    if (!mascota.tipo?.trim()) throw new Error("El tipo es obligatorio");
    if (!mascota.refugioId) throw new Error("El refugio es obligatorio");

    // Campos básicos con validación
    formDataSinGaleria.append("nombre", mascota.nombre.trim());
    formDataSinGaleria.append("edad", String(mascota.edad));
    formDataSinGaleria.append("tipo", mascota.tipo.trim());
    formDataSinGaleria.append("raza", mascota.raza?.trim() || "");
    formDataSinGaleria.append("genero", mascota.genero?.trim() || "");
    formDataSinGaleria.append("tamanio", mascota.tamanio?.trim() || "");
    formDataSinGaleria.append("peso", mascota.peso !== undefined && mascota.peso !== null ? String(mascota.peso) : "");
    formDataSinGaleria.append("esterelizado", mascota.esterelizado ? "true" : "false");
    formDataSinGaleria.append("estado", mascota.estado?.trim() || "");
    formDataSinGaleria.append("ciudad", mascota.ciudad?.trim() || "");
    formDataSinGaleria.append("descripcion", mascota.descripcion?.trim() || "");
    formDataSinGaleria.append("historia", mascota.historia?.trim() || "");
    formDataSinGaleria.append("refugioId", String(mascota.refugioId));
    formDataSinGaleria.append("admin_id", String(admin_id));

    // Imagen principal (solo si hay una nueva para actualizar)
    if (mascota.imagen_principal instanceof File) {
      formDataSinGaleria.append("imagen_principal", mascota.imagen_principal);
    }

    // Personalidad (array de ids)
    const personalidad = Array.isArray(mascota.personalidad) ? mascota.personalidad : [];
    personalidad.forEach(idPerso => {
      if (idPerso) formDataSinGaleria.append("personalidad[]", String(idPerso));
    });

    const formData2 = new FormData()
    // Galería de imágenes (archivos)
    if (Array.isArray(mascota.galeria)) {
      mascota.galeria.forEach(file => {
        if (file instanceof File) {
          formData2.append("galeria", file);
        }
      });
    }

    // Comportamiento (objeto con campos específicos)
    const comportamiento = mascota.comportamiento || {};
    formDataSinGaleria.append("comportamiento[niños]", comportamiento.niños?.trim() || "");
    formDataSinGaleria.append("comportamiento[perros]", comportamiento.perros?.trim() || "");
    formDataSinGaleria.append("comportamiento[gatos]", comportamiento.gatos?.trim() || "");
    formDataSinGaleria.append("comportamiento[apartamento]", comportamiento.apartamento?.trim() || "");

    // Salud (objeto)
    const salud = mascota.salud || {};
    formDataSinGaleria.append("salud[estado]", salud.estado?.trim() || "");
    formDataSinGaleria.append("salud[tratamiento]", salud.tratamiento?.trim() || "");
    formDataSinGaleria.append("salud[info_veterinaria]", salud.info_veterinaria?.trim() || "");
    formDataSinGaleria.append("saludId", mascota.saludId || "");

    // Vacunas (array de ids)
    const vacunas = Array.isArray(mascota.vacunas) ? mascota.vacunas : [];
    vacunas.forEach(idVacuna => {
      if (idVacuna) formDataSinGaleria.append("vacunas[]", String(idVacuna));
    });

    // Enviamos la info general (sin galería)
    const response = await fetch(`${BASE_URL}/admin/mascotas/${mascotaId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataSinGaleria,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Respuesta del servidor:", data);
      if (data.errors) {
        console.error("Errores del formulario:", JSON.stringify(data.errors, null, 2));
      }
      throw new Error(data.message || "Error al actualizar mascota");
    }

    // 👉 Enviar galería solo si hay archivos nuevos
    if (Array.isArray(mascota.galeria)) {
      const nuevasImagenes = mascota.galeria.filter((file) => file instanceof File);
      if (nuevasImagenes.length > 0) {
        await updateGalery(mascotaId, nuevasImagenes);
      }
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
