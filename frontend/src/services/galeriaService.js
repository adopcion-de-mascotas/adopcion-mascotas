import { fetchData } from "../utils/fetchApi";

const BASE_URL = import.meta.env.VITE_API_URL;
const galeriaUrl = `${BASE_URL}/admin/mascotas/galeria`;

// POST: Agregar imágenes a la galería existente
export const postGalery = async (id, files = []) => {
    const token = sessionStorage.getItem("token");

    const formData = new FormData();
    files.forEach((file) => {
        formData.append("galeria", file);
    });

    return fetchData(`${galeriaUrl}/${id}`, {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// PUT: Reemplazar todas las imágenes de la galería
export const updateGalery = async (id, files = []) => {
    const token = sessionStorage.getItem("token");

    const formData = new FormData();
    files.forEach((file) => {
        formData.append("galeria", file);
    });

    return fetchData(`${galeriaUrl}/${id}`, {
        method: "PUT",
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
