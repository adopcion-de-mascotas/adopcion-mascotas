const BASE_URL = import.meta.env.VITE_API_URL;

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
  return await res.json();
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
  try {
    const formData = new FormData();

    // Datos simples
    formData.append("nombre", mascota.nombre);
    formData.append("tipo", mascota.tipo);
    formData.append("raza", mascota.raza);
    formData.append("tamaño", mascota.tamaño);
    formData.append("edad", mascota.edad);
    formData.append("descripcion", mascota.descripcion);
    formData.append("sexo", mascota.sexo);
    formData.append("refugioId", mascota.refugioId);

    // Imagen principal
    if (mascota.imagen) {
      formData.append("imagen", mascota.imagen);
    }

    // Galería (múltiples archivos)
    if (mascota.galeria && mascota.galeria.length > 0) {
      for (const file of mascota.galeria) {
        formData.append("galeria[]", file);
      }
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

    // Vacunas
    if (mascota.vacunas && mascota.vacunas.length > 0) {
      for (const vacuna of mascota.vacunas) {
        formData.append("vacunas[]", vacuna);
      }
    }

    const response = await fetch(`${BASE_URL}/admin/mascotas`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Error al crear mascota");
    return await response.json();
  } catch (error) {
    console.error("Error al crear mascota:", error);
    throw error;
  }
}

export async function actualizarMascota(id, mascota) {
  try {
    const formData = new FormData();

    formData.append("nombre", mascota.nombre);
    formData.append("tipo", mascota.tipo);
    formData.append("raza", mascota.raza);
    formData.append("tamaño", mascota.tamaño);
    formData.append("edad", mascota.edad);
    formData.append("descripcion", mascota.descripcion);
    formData.append("sexo", mascota.sexo);
    formData.append("refugioId", mascota.refugioId);

    if (mascota.imagen) {
      formData.append("imagen", mascota.imagen);
    }

    if (mascota.galeria && mascota.galeria.length > 0) {
      for (const file of mascota.galeria) {
        formData.append("galeria[]", file);
      }
    }

    if (mascota.comportamiento) {
      formData.append("comportamiento[niños]", mascota.comportamiento.niños || "");
      formData.append("comportamiento[perros]", mascota.comportamiento.perros || "");
      formData.append("comportamiento[gatos]", mascota.comportamiento.gatos || "");
      formData.append("comportamiento[apartamento]", mascota.comportamiento.apartamento || "");
    }

    if (mascota.salud) {
      formData.append("salud[estado]", mascota.salud.estado || "");
      formData.append("salud[tratamiento]", mascota.salud.tratamiento || "");
      formData.append("salud[info_veterinaria]", mascota.salud.info_veterinaria || "");
    }

    if (mascota.vacunas && mascota.vacunas.length > 0) {
      for (const vacuna of mascota.vacunas) {
        formData.append("vacunas[]", vacuna);
      }
    }

    const response = await fetch(`${BASE_URL}/admin/mascotas/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) throw new Error("Error al actualizar mascota");
    return await response.json();
  } catch (error) {
    console.error("Error al actualizar mascota:", error);
    throw error;
  }
}


// Eliminar mascota por ID
export async function eliminarMascota(id) {
  try {
    const response = await fetch(`${BASE_URL}/admin/mascotas/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Error al eliminar mascota");

    return await response.json();
  } catch (error) {
    console.error("Error al eliminar mascota:", error);
    throw error;
  }
}
