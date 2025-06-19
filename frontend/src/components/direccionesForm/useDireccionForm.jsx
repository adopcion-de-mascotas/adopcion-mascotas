import { useState, useEffect } from "react";
import { crearDireccion } from "../../services/direccionesService";

export default function useDireccionForm() {
  const [formData, setFormData] = useState({
    calle: "",
    barrio: "",
    localidad: "",
    provincia: "",
    pais: "",
    codigo_postal: "",
    descripcion: "",
    refugio_id: "", // el usuario elige un refugio del select
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [refugios, setRefugios] = useState([]);

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Validación simple
  const validateForm = () => {
    const requiredFields = ["calle", "localidad", "provincia", "pais", "codigo_postal", "refugio_id"];
    const newErrors = {};
    let valid = true;

    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = `El campo ${field.replace("_", " ")} es obligatorio.`;
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      await crearDireccion(formData);
      setSubmitSuccess(true);
      setFormData({
        calle: "",
        barrio: "",
        localidad: "",
        provincia: "",
        pais: "",
        codigo_postal: "",
        descripcion: "",
        refugio_id: "",
      });
    } catch (error) {
      console.error("Error al crear la dirección:", error);
      setErrors({ general: "Ocurrió un error al crear la dirección." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cancelar y limpiar
  const handleCancel = () => {
    setFormData({
      calle: "",
      barrio: "",
      localidad: "",
      provincia: "",
      pais: "",
      codigo_postal: "",
      descripcion: "",
      refugio_id: "",
    });
    setErrors({});
    setSubmitSuccess(false);
  };

  // Cargar refugios disponibles
  useEffect(() => {
    async function fetchRefugios() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/refugios`);
        const data = await res.json();
        setRefugios(data.data || []);
      } catch (error) {
        console.error("Error al cargar refugios:", error);
      }
    }

    fetchRefugios();
  }, []);

  return {
    formData,
    errors,
    refugios,
    isSubmitting,
    submitSuccess,
    handleChange,
    handleSubmit,
    handleCancel,
  };
}
