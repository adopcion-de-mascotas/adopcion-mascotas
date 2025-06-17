const BASE_URL = import.meta.env.VITE_API_URL;
import { jwtDecode } from "jwt-decode";
export async function obtenerTestimonios({ search, page, limit } = {}) {
  try {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);

    const response = await fetch(`${BASE_URL}/testimonios?${params}`);
    return await response.json(); // <- IMPORTANTE
  } catch (error) {
    console.error("Error al obtener testimonios:", error);
    return { data: [], options: { length: 0 } };
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

export async function crearTestimonio(testimonio) {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const admin_id = decoded.id;  // o el campo que uses en tu token

  try {
    const formData = new FormData();

    formData.append("comentario", testimonio.comentario || "");
    formData.append("autor", testimonio.autor || "");
    formData.append("estrellas", testimonio.estrellas?.toString() || "");
    formData.append("mascota_id", testimonio.mascota_id?.toString() || "");
    formData.append("fecha", new Date().toISOString().split("T")[0]);
    formData.append("admin_id", admin_id);

    if (testimonio.foto) {
      formData.append("foto", testimonio.foto);
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }


    const response = await fetch(`${BASE_URL}/admin/testimonios`, {
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
      throw new Error("Error al crear testimonio");
    }

    return data;
  } catch (error) {
    console.error("Error en crearTestimonio:", error);
    throw error;
  }
}

// Actualizar testimonio por ID

export async function actualizarTestimonio(id, testimonio) {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const admin_id = decoded.id;

  try {
    const formData = new FormData();
    
    formData.append("comentario", testimonio.comentario || "");
    formData.append("autor", testimonio.autor || "");
    formData.append("estrellas", testimonio.estrellas?.toString() || "");
    formData.append("mascota_id", testimonio.mascota_id?.toString() || "");
    
    // Opcional, según cómo maneje el backend
    formData.append("admin_id", admin_id);

    if (testimonio.foto instanceof File) {
      formData.append("foto", testimonio.foto); // solo si hay una nueva foto
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await fetch(`${BASE_URL}/admin/testimonios/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        // NO pongas Content-Type, fetch lo hace automáticamente con FormData
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Respuesta del servidor:", data);
      throw new Error("Error al actualizar testimonio");
    }

    return data;
  } catch (error) {
    console.error("Error en actualizarTestimonio:", error);
    throw error;
  }
}


// Eliminar testimonio por ID
export async function eliminarTestimonio(id) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token de autenticación disponible");
  }
  try {
    const response = await fetch(`${BASE_URL}/admin/testimonios/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Respuesta del servidor:", errorBody);
      throw new Error("Error al eliminar testimonio");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en eliminarTestimonio:", error);
    throw error;
  }
}
