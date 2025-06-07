const BASE_URL = import.meta.env.VITE_API_URL;

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

// Obtener detalle de noticia por ID
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
