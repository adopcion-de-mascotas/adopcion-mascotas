const BASE_URL = import.meta.env.VITE_API_URL;
import { createContacto } from "./contactoService";


export async function obtenerRefugios() {
    const res = await fetch(`${BASE_URL}/refugios`);
    if (!res.ok) throw new Error("Error al obtener los refugios");

    const json = await res.json();
    return json.data;
}

export async function obtenerRefugioPorId(id) {
    const token = sessionStorage.getItem("token");

    if (!token) {
        throw new Error("No hay token de autenticación disponible");
    }

    try {
        const response = await fetch(`${BASE_URL}/admin/refugios/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error al obtener refugio por ID:", errorData);
            throw new Error("Error al obtener refugio");
        }

        const data = await response.json();
        return data.data; // o simplemente `return data;` si tu backend no envuelve la respuesta en `data`
    } catch (error) {
        console.error("Error en obtenerRefugioPorId:", error);
        throw error;
    }
}

export async function crearRefugio(formData) {

    const token = sessionStorage.getItem("token");


    try {
        const response = await fetch(`${BASE_URL}/admin/refugios`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Error en la respuesta:", data);
            throw new Error(data.message || "Error al crear el refugio");
        }

        const dataFormContact = {
            refugio_id: data?.data.id || "",
            nombre: formData.get("contacto_nombre") || "",
            email: formData.get("contacto_email") || "",
            telefono: formData.get("contacto_telefono") || "",
            web: formData.get("contacto_web") || ""
        };

        await createContacto(dataFormContact, token)

        return data;
    } catch (error) {
        console.error("Error en crearRefugio:", error);
        throw error;
    }
}


export async function actualizarRefugio(id, formData) {
    const token = sessionStorage.getItem("token");

    try {
        const response = await fetch(`${BASE_URL}/admin/refugios/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Error en respuesta del servidor:", data);
            throw new Error(data.message || "Error al actualizar el refugio");
        }

        return data;
    } catch (error) {
        console.error("Error en actualizarRefugio:", error);
        throw error;
    }
}


export async function eliminarRefugio(id) {
    const token = sessionStorage.getItem("token");

    if (!token) {
        throw new Error("No hay token de autenticación disponible");
    }
    try {
        const response = await fetch(`${BASE_URL}/admin/refugios/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error("Error al eliminar refugios");

        return await response.json();
    } catch (error) {
        console.error("Error al eliminar refugios:", error);
        throw error;
    }
}
