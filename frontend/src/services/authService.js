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

export async function editUser(data, id) {
  const token = sessionStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/admin/session/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al actualizar");
  }

  return response.json();
}

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

export async function deleteUser() {
  try {
    const token = sessionStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/admin/session/:id`, {
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
