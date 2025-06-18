const BASE_URL = import.meta.env.VITE_API_URL;

export async function obtenerComportamientos() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token de autenticación disponible");
  }

  try {
    const res = await fetch(`${BASE_URL}/admin/comportamientos`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Error al obtener comportamientos");

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error en comportamientos:", error);
    throw error;
  }
}

export async function obtenerComportamientoPorId(id) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token de autenticación disponible");

  try {
    const res = await fetch(`${BASE_URL}/admin/comportamientos/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Error al obtener el comportamiento");

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error en obtenerComportamientoPorId:", error);
    throw error;
  }
}

export async function crearComportamiento({ niños, perros, gatos, apartamento }) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token de autenticación disponible");

  try {
    const res = await fetch(`${BASE_URL}/admin/comportamientos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ niños, perros, gatos, apartamento }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Error al crear comportamiento:", data);
      throw new Error(data.message || "Error al crear comportamiento");
    }

    return data;
  } catch (error) {
    console.error("Error en crearComportamiento:", error);
    throw error;
  }
}

export async function editarComportamiento(id, { niños, perros, gatos, apartamento }) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token de autenticación disponible");

  try {
    const res = await fetch(`${BASE_URL}/admin/comportamientos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ niños, perros, gatos, apartamento }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Error al editar comportamiento:", data);
      throw new Error(data.message || "Error al editar comportamiento");
    }

    return data;
  } catch (error) {
    console.error("Error en editarComportamiento:", error);
    throw error;
  }
}

export async function eliminarComportamiento(id) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token de autenticación disponible");

  try {
    const res = await fetch(`${BASE_URL}/admin/comportamientos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Error al eliminar comportamiento:", data);
      throw new Error(data.message || "Error al eliminar comportamiento");
    }

    return data;
  } catch (error) {
    console.error("Error en eliminarComportamiento:", error);
    throw error;
  }
}
