const BASE_URL = import.meta.env.VITE_API_URL;
import { jwtDecode } from "jwt-decode";


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

export async function crearRefugio(refugio) {
    const token = sessionStorage.getItem("token");
    const decoded = jwtDecode(token);
    const admin_id = decoded.id;

    try {
        const formData = new FormData();

        formData.append("nombre", refugio.nombre || "");
        formData.append("descripcion", refugio.descripcion || "");
        formData.append("info", refugio.info || "");
        formData.append("direccion_id", refugio.direccion_id?.toString() || "");
        formData.append("admin_id", admin_id);

        if (refugio.imagen) {
            formData.append("imagen", refugio.imagen); // archivo
        }

        // Si vas a enviar también contacto:
        if (refugio.contacto) {
            if (refugio.contacto) {
                formData.append("nombre", refugio.contacto.nombre || "");
                formData.append("telefono", refugio.contacto.telefono || "");
                formData.append("email", refugio.contacto.email || "");
                formData.append("web", refugio.contacto.web || "");
            }

        }


        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        const response = await fetch(`${BASE_URL}/admin/refugios`, {
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
                console.error("Errores del formulario:", JSON.stringify(data.errors, null, 2));
            }
            throw new Error("Error al crear refugio");
        }

        return data;
    } catch (error) {
        console.error("Error en crearRefugio:", error);
        throw error;
    }
}

export async function actualizarRefugio(id, refugio) {
    const token = sessionStorage.getItem("token");
    const decoded = jwtDecode(token);
    const admin_id = decoded.id;

    try {
        const formData = new FormData();

        formData.append("nombre", refugio.nombre || "");
        formData.append("descripcion", refugio.descripcion || "");
        formData.append("info", refugio.info || "");
        formData.append("direccion_id", refugio.direccion_id?.toString() || "");
        formData.append("admin_id", admin_id);

        if (refugio.imagen) {
            formData.append("imagen", refugio.imagen); // archivo
        }

        if (refugio.contacto) {
            formData.append("nombre", refugio.contacto.nombre || "");
            formData.append("telefono", refugio.contacto.telefono || "");
            formData.append("email", refugio.contacto.email || "");
            formData.append("web", refugio.contacto.web || "");
        }

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        const response = await fetch(`${BASE_URL}/admin/refugios/${id}`, {
            method: "PUT", // o "PATCH", según tu backend
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Respuesta del servidor:", data);
            if (data.errors) {
                console.error("Errores del formulario:", JSON.stringify(data.errors, null, 2));
            }
            throw new Error("Error al actualizar refugio");
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
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error("Error al eliminar refugios");

        return await response.json();
    } catch (error) {
        console.error("Error al eliminar refugios:", error);
        throw error;
    }
}
