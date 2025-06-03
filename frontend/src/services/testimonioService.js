const BASE_URL = "http://localhost:4000/api";

// Obtener todos los testimonios
export async function obtenerTestimonios() {
  try {
    const response = await fetch(`${BASE_URL}/testimonios`);
    if (!response.ok) throw new Error("Error al obtener testimonios");

    const json = await response.json();

    if (!json?.data) {
      throw new Error("No se encontraron testimonios");
    }

    return json.data; // devuelve el array de testimonios
  } catch (error) {
    console.error("Error en obtenerTestimonios:", error.message);
    throw error;
  }
}

// Obtener un testimonio por ID
export async function obtenerTestimonioPorId(id) {
  try {
    const response = await fetch(`${BASE_URL}/testimonios/${id}`);
    if (!response.ok) throw new Error("No se pudo obtener el testimonio");

    const json = await response.json();

    if (!json?.data) {
      throw new Error("El testimonio no fue encontrado en la respuesta");
    }

    return json.data;
  } catch (error) {
    console.error("Error en obtenerTestimonioPorId:", error.message);
    throw error;
  }
}

// Crear un nuevo testimonio (puede incluir imagen)
export async function crearTestimonio(testimonio) {
  try {
    const formData = new FormData();
    for (const key in testimonio) {
      formData.append(key, testimonio[key]);
    }

    const response = await fetch(`${BASE_URL}/admin/testimonios`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Error al crear testimonio");
    return await response.json();
  } catch (error) {
    console.error("Error en crearTestimonio:", error);
    throw error;
  }
}

// Actualizar testimonio por ID
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
    console.error("Error en actualizarTestimonio:", error);
    throw error;
  }
}

// Eliminar testimonio por ID
export async function eliminarTestimonio(id) {
  try {
    const response = await fetch(`${BASE_URL}/admin/testimonios/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Error al eliminar testimonio");

    return await response.json();
  } catch (error) {
    console.error("Error en eliminarTestimonio:", error);
    throw error;
  }
}
