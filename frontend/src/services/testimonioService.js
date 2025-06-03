const BASE_URL = "http://localhost:4000/api";

// Obtener listado de mascotas con filtros
export async function obtenerTestimonios({ search, page, limit, tipo, raza, tamaño } = {}) {
  try {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    if (tipo) params.append("tipo", tipo);
    if (raza) params.append("raza", raza);
    if (tamaño) params.append("tamaño", tamaño);

    const url = `${BASE_URL}/testimonios?${params}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Error en la respuesta del servidor");
    const json = await response.json()
    console.log(json.data.items)
    return json.data.items
  } catch (error) {
    console.error("Error al obtener mascotas:", error);
    throw error;
  }
}

// Obtener detalle por ID
export async function obtenerTestimonioPorId(id) {
  try {
    const response = await fetch(`${BASE_URL}/testimonios/${id}`);
    if (!response.ok) throw new Error("No se pudo obtener el testimonio");

    return await response.json();
  } catch (error) {
    console.error("Error al obtener el testimonio por ID:", error);
    throw error;
  }
}

// Crear una nueva mascota (requiere imagen)
export async function crearTestimonio(mascota) {
  try {
    const formData = new FormData();
    for (const key in mascota) {
      formData.append(key, mascota[key]);
    }

    const response = await fetch(`${BASE_URL}/admin/testimonio`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Error al crear testimonio");
    return await response.json();
  } catch (error) {
    console.error("Error al crear testimonio:", error);
    throw error;
  }
}

// Actualizar mascota por ID (con o sin imagen)
export async function actualizarTestimonio(id, datosActualizados) {
  try {
    const formData = new FormData();
    for (const key in datosActualizados) {
      formData.append(key, datosActualizados[key]);
    }

    const response = await fetch(`${BASE_URL}/admin/testimonios/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) throw new Error("Error al actualizar testimonio");
    return await response.json();
  } catch (error) {
    console.error("Error al actualizar testimonio:", error);
    throw error;
  }
}
