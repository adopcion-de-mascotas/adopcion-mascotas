const BASE_URL = "http://localhost:4000/api";

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

    const url = `${BASE_URL}/mascotas?${params.toString()}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Error en la respuesta del servidor");

    return await response.json();
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

    return await response.json();
  } catch (error) {
    console.error("Error al obtener mascota por ID:", error);
    throw error;
  }
}

// Crear una nueva mascota (requiere imagen)
export async function crearMascota(mascota) {
  try {
    const formData = new FormData();
    for (const key in mascota) {
      formData.append(key, mascota[key]);
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

// Actualizar mascota por ID (con o sin imagen)
export async function actualizarMascota(id, datosActualizados) {
  try {
    const formData = new FormData();
    for (const key in datosActualizados) {
      formData.append(key, datosActualizados[key]);
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
