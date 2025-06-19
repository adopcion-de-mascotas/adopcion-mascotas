import { useState, useEffect } from "react";
import {
  obtenerDireccionPorId,
  editarDireccion,
} from "../../services/direccionesService";
import { useParams } from "react-router-dom";

export default function useDireccionesFormEdit() {
  const { id } = useParams();
  console.log(id);
  
  const [formData, setFormData] = useState({
    calle: "",
    barrio: "",
    localidad: "",
    provincia: "",
    pais: "",
    codigo_postal: "",
    descripcion: "",
    refugio_id: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [refugios, setRefugios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDireccion() {
      if (!id) {
        setIsLoading(false); // Por si no hay id, corta la carga
        return;
      }
      try {
        setIsLoading(true);
        const data = await obtenerDireccionPorId(id);
        console.log(id);
        
        setFormData({
          calle: data.calle || "",
          barrio: data.barrio || "",
          localidad: data.localidad || "",
          provincia: data.provincia || "",
          pais: data.pais || "",
          codigo_postal: data.codigo_postal || "",
          descripcion: data.descripcion || "",
          refugio_id: data.refugio?.id || "", 
        });
      } catch (error) {
        console.error("Error al cargar la dirección:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDireccion();
  }, [id]);

  // Cargar refugios disponibles
  useEffect(() => {
    async function fetchDireccion() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/refugios`);
        const data = await res.json();
        setRefugios(data.data || []);
      } catch (error) {
        console.error("Error al cargar refugios:", error);
      }
    }

    fetchDireccion();
  }, []);

  // Manejo de cambios en inputs
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

  // Validación simple (igual que en creación)
  const validateForm = () => {
  const requiredFields = [
    "calle",
    "localidad",
    "provincia",
    "pais",
    "codigo_postal",
    "refugio_id",
  ];
  const newErrors = {};
  let valid = true;

  requiredFields.forEach((field) => {
    const value = formData[field];
    if (!value || String(value).trim() === "") {
      newErrors[field] = `El campo ${field.replace("_", " ")} es obligatorio.`;
      valid = false;
    }
  });

  setErrors(newErrors);
  return valid;
};


  // Enviar formulario de edición
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      await editarDireccion(id, formData);
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Error al actualizar la dirección:", error);
      setErrors({ general: "Ocurrió un error al actualizar la dirección." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cancelar edición (podés resetear a datos originales o limpiar)
  const handleCancel = () => {
    // Opcional: resetear a los datos originales cargados
    setErrors({});
    setSubmitSuccess(false);

    // Si querés resetear a datos originales:
    // fetchDireccion() acá no se puede usar directamente, deberías extraerla fuera de useEffect
  };

  return {
    formData,
    errors,
    refugios,
    isSubmitting,
    submitSuccess,
    isLoading,
    handleChange,
    handleSubmit,
    handleCancel,
  };
}
