const BASE_URL = import.meta.env.VITE_API_URL;
const contactoUrl = `${BASE_URL}/admin/contactos`
import { fetchData } from "../utils/fetchApi"

export const createContacto = (data, token) => {
    return fetchData(
        contactoUrl,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    )
}

export const updateContacto = (id, data) => {
    const token = sessionStorage.getItem("token")
    console.log(data, "Sadasdasd");
    console.log(data, "Sadasdasd");


    return fetchData(
        `${contactoUrl}/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    )
}