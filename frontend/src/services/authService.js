/* eslint-disable no-useless-catch */
const API_URL = "http://localhost:4000/api/admin";

export async function login({ email, password, rememberMe }) {
  try {
    const res = await fetch(`${API_URL}/session`, {
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
  localStorage.removeItem("token");
  window.location.href = "/";
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}

// ✅ Registro de usuario
export async function registerUser(userData) {
  try {
    const res = await fetch(`${API_URL}/session/create`, {
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
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/me`, {
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
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/me`, {
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
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/me`, {
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
