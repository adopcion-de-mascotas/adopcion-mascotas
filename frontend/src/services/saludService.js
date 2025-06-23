const BASE_URL = import.meta.env.VITE_API_URL;
const saludUrl = `${BASE_URL}/admin/salud`;

const fetchData = async (url, options = {}) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};

export const addSaludMascota = (data) => {
    const token = sessionStorage.getItem("token");
    return fetchData(saludUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    });
};

export const updateSalud = (id, data) => {
    const token = sessionStorage.getItem("token");

    console.log(data)

    return fetchData(
        `${saludUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    });
}   