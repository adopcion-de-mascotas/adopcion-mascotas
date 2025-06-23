const BASE_URL = import.meta.env.VITE_API_URL;
const vacunaUrl = `${BASE_URL}/admin/vacunas`

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


export const getAllVacunas = async () => {
    const token = sessionStorage.getItem("token");

    return fetchData(
        vacunaUrl,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    )
}