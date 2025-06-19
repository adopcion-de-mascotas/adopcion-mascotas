const BASE_URL = import.meta.env.VITE_API_URL;
//import { jwtDecode } from "jwt-decode";

export async function obtenerDirecciones() {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("No hay token de autenticación disponible");
    }

    // Si más adelante necesito el ID del admin, puedo decodificarlo aquí.
    // const decoded = jwtDecode(token);
    // const admin_id = decoded.id;

    try {
        const res = await fetch(`${BASE_URL}/admin/direcciones`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error("Error al obtener direcciones");

         
        return res.json();

    } catch (error) {
        console.error("Error en obtenerDirecciones:", error);
        throw error;
    }
}

export async function obtenerDireccionPorId(id) {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("No hay token de autenticación disponible");
    }

    try {
        const res = await fetch(`${BASE_URL}/admin/direcciones/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error("Error al obtener la dirección");

        const json = await res.json();
        return json.data; // Suponiendo que la dirección viene en `data`

    } catch (error) {
        console.error("Error en obtenerDireccionPorId:", error);
        throw error;
    }
}

export async function crearDireccion(direccion) {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No hay token de autenticación disponible");

    try {
        const response = await fetch(`${BASE_URL}/admin/direcciones`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(direccion),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Respuesta del servidor:", data);
            throw new Error("Error al crear la dirección");
        }

        return data.data;
    } catch (error) {
        console.error("Error en crearDireccion:", error);
        throw error;
    }
}

export async function editarDireccion(id, direccion) {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No hay token de autenticación disponible");

    try {
        const response = await fetch(`${BASE_URL}/admin/direcciones/${id}`, {
            method: "PUT", // o PATCH, según tu backend
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(direccion),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Respuesta del servidor:", data);
            throw new Error("Error al editar la dirección");
        }

        return data;
    } catch (error) {
        console.error("Error en editarDireccion:", error);
        throw error;
    }
}

export async function eliminarDireccion(id) {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No hay token de autenticación disponible");

    try {
        const response = await fetch(`${BASE_URL}/admin/direcciones/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Respuesta del servidor:", data);
            throw new Error("Error al eliminar la dirección");
        }

        return data;
    } catch (error) {
        console.error("Error en eliminarDireccion:", error);
        throw error;
    }
}
