const BASE_URL = import.meta.env.VITE_API_URL;
import { jwtDecode } from "jwt-decode";

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


export async function agregarNoticia(noticia) {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const admin_id = decoded.id;  // o el campo que uses en tu token

  try {
    const formData = new FormData();

    formData.append("titulo", noticia.titulo || "");
    formData.append("texto", noticia.texto || "");

    formData.append("fecha", new Date().toISOString().split("T")[0]);
    formData.append("admin_id", admin_id);

    if (noticia.foto) {
      formData.append("foto", noticia.foto);
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }


    const response = await fetch(`${BASE_URL}/admin/noticias`, {
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
        console.error("Errores en el formulario:", JSON.stringify(data.errors, null, 2));
      }
      throw new Error("Error al crear una noticia");
    }

    return data;
  } catch (error) {
    console.error("Error en crearNoticia:", error);
    throw error;
  }
}


// Editar una noticia existente

export async function editarNoticia(id, noticia) {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const admin_id = decoded.id;

  try {
    const formData = new FormData();

    formData.append("titulo", noticia.titulo || "");
    formData.append("texto", noticia.texto || "");
    formData.append("admin_id", admin_id);

    // Opcional: si querés actualizar la fecha a la fecha actual
    formData.append("fecha", new Date().toISOString().split("T")[0]);

    if (noticia.foto instanceof File) {
      formData.append("foto", noticia.foto); // solo si se cargó una nueva
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await fetch(`${BASE_URL}/admin/noticias/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        // No pongas Content-Type cuando usás FormData
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Respuesta del servidor:", data);
      if (data.errors) {
        console.error("Errores en el formulario:", JSON.stringify(data.errors, null, 2));
      }
      throw new Error("Error al actualizar noticia");
    }

    return data;
  } catch (error) {
    console.error("Error en actualizarNoticia:", error);
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
