/* eslint-disable no-useless-catch */
const BASE_URL = import.meta.env.VITE_API_URL;

export async function login({ email, password, rememberMe }) {
  try {
    const res = await fetch(`${BASE_URL}/admin/session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, rememberMe }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error al iniciar sesión");
    }

    return data; // Contiene el token u otros datos útiles
  } catch (error) {
    throw error;
  }
}

export function logout() {
  sessionStorage.removeItem("token");
  window.location.href = "/";
}

export function isAuthenticated() {
  return !!sessionStorage.getItem("token");
}

// ✅ Registro de usuario
export async function registerUser(userData) {
  try {
    const res = await fetch(`${BASE_URL}/admin/session/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error al registrar usuario");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// ✏️ Editar usuario (requiere token)
export async function editUser(updatedData) {
  try {
    const token = sessionStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/admin/session/editar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error al actualizar usuario");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// 🧾 Obtener usuario actual (perfil)
export async function getCurrentUser() {
  try {
    const token = sessionStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/admin/session/:id`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error al obtener datos del usuario");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// 🗑️ Eliminar cuenta de usuario
export async function deleteUser() {
  try {
    const token = sessionStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/admin/session/deleted`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Error al eliminar cuenta");
    }

    return { message: "Cuenta eliminada correctamente" };
  } catch (error) {
    throw error;
  }
}
