const BASE_URL = import.meta.env.VITE_API_URL;

export async function obtenerPersonalidades() {
    const token = sessionStorage.getItem("token");

    if (!token) {
        throw new Error("No hay token de autenticación disponible");
    }

    try {
        const res = await fetch(`${BASE_URL}/admin/personalidades`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error("Error al obtener personalidades");

        const json = await res.json();
        return json.data || [];
    } catch (error) {
        console.error("Error en obtenerPersonalidades:", error);
        throw error;
    }
}


export async function obtenerPersonalidadPorId(id) {
    const token = sessionStorage.getItem("token");

    if (!token) {
        throw new Error("No hay token de autenticación disponible");
    }

    try {
        const res = await fetch(`${BASE_URL}/admin/personalidades/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        if (!res.ok) throw new Error("Error al obtener personalidad");
        const json = await res.json();
        return json.data;
    } catch (error) {
        console.error("Error en personalidad:", error);
        throw error;
    }
}

export async function crearPersonalidad(nombre) {
    const token = sessionStorage.getItem("token");

    if (!token) {
        throw new Error("No hay token de autenticación disponible");
    }

    try {
        const response = await fetch(`${BASE_URL}/admin/personalidades`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ nombre }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Error al crear personalidad:", data);
            throw new Error(data.message || "Error al crear personalidad");
        }

        return data;
    } catch (error) {
        console.error("Error en crearPersonalidad:", error);
        throw error;
    }
}

export async function editarPersonalidad(id, nombre) {
    const token = sessionStorage.getItem("token");

    if (!token) {
        throw new Error("No hay token de autenticación disponible");
    }

    try {
        const response = await fetch(`${BASE_URL}/admin/personalidades/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ nombre }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Error al editar personalidad:", data);
            throw new Error(data.message || "Error al editar personalidad");
        }

        return data;
    } catch (error) {
        console.error("Error en editarPersonalidad:", error);
        throw error;
    }
}

export async function eliminarPersonalidad(id) {
    const token = sessionStorage.getItem("token");

    if (!token) {
        throw new Error("No hay token de autenticación disponible");
    }

    try {
        const response = await fetch(`${BASE_URL}/admin/personalidades/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Error al eliminar personalidad:", data);
            throw new Error(data.message || "Error al eliminar personalidad");
        }

        return data;
    } catch (error) {
        console.error("Error en eliminarPersonalidad:", error);
        throw error;
    }
}



