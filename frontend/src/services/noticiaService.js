const BASE_URL = import.meta.env.VITE_API_URL;

// Obtener listado de noticias
export async function obtenerNoticias() {
  try {
    const response = await fetch(`${BASE_URL}/noticias`);
    if (!response.ok) throw new Error("Error en la respuesta del servidor");
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error al obtener noticias:", error);
    throw error;
  }
}

// Obtener una noticia por ID
export async function obtenerNoticiaPorId(id) {
  try {
    const response = await fetch(`${BASE_URL}/noticias/${id}`);
    if (!response.ok) throw new Error("No se pudo obtener la noticia");
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error al obtener noticia por ID:", error);
    throw error;
  }
}

// Agregar una nueva noticia
export async function agregarNoticia(noticia) {
  try {
    const response = await fetch(`${BASE_URL}/noticias`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noticia),
    });

    if (!response.ok) throw new Error("No se pudo agregar la noticia");
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error al agregar noticia:", error);
    throw error;
  }
}

// Editar una noticia existente
export async function editarNoticia(id, noticiaActualizada) {
  try {
    const response = await fetch(`${BASE_URL}/noticias/${id}`, {
      method: "PUT", // O PATCH si sólo actualizas campos parciales
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noticiaActualizada),
    });

    if (!response.ok) throw new Error("No se pudo actualizar la noticia");
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error al editar noticia:", error);
    throw error;
  }
}

// Eliminar testimonio por ID
export async function eliminarNoticia(id) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token de autenticación disponible");
  }
  try {
    const response = await fetch(`${BASE_URL}/admin/noticias/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Respuesta del servidor:", errorBody);
      throw new Error("Error al eliminar noticia");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en eliminarNoticia:", error);
    throw error;
  }
}
