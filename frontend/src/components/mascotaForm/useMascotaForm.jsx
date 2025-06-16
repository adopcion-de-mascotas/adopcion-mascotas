// src/hooks/useMascotaForm.js
import { useState } from "react";
import { crearMascota } from "../../services/mascotasService";

export function useMascotaForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    tipo: "",
    raza: "",
    genero: "",
    tamanio: "",
    peso: "",
    esterilizado: false,
    estado: "",
    ciudad: "",
    descripcion: "",
    historia: "",
    imagen_principal: null,
    personalidad: [],
  });

  const [mensaje, setMensaje] = useState("");

  const personalidadesDisponibles = [
    { id: 1, nombre: "Juguetón" },
    { id: 2, nombre: "Cariñoso" },
    { id: 3, nombre: "Protector" },
    { id: 4, nombre: "Tranquilo" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else if (type === "checkbox" && name === "personalidad") {
      const newValues = checked
        ? [...formData.personalidad, parseInt(value)]
        : formData.personalidad.filter((id) => id !== parseInt(value));
      setFormData((prev) => ({ ...prev, personalidad: newValues }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      if (key === "personalidad") {
        formData.personalidad.forEach((id) =>
          form.append("personalidad[]", id)
        );
      } else {
        form.append(key, formData[key]);
      }
    }

    try {
      await crearMascota(form);
      setMensaje("✅ Mascota creada exitosamente");
    } catch (error) {
      setMensaje("❌ Error al crear la mascota");
      console.error(error);
    }
  };

  return {
    formData,
    mensaje,
    personalidadesDisponibles,
    handleChange,
    handleSubmit,
  };
}
