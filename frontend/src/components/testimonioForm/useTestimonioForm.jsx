import { useState } from "react";
import { crearTestimonio } from "../../services/testimonioService";

export default function useTestimonioForm() {
  const [formData, setFormData] = useState({
    comentario: "",
    autor: "",
    estrellas: 5,
    mascota_id: "",
    foto: null,
    fotoPreview: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Manejo de inputs de texto y select
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "estrellas" ? parseInt(value) : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Manejo cambio de imagen por input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, foto: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, fotoPreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file && file.type.match("image.*")) {
      setFormData((prev) => ({ ...prev, foto: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, fotoPreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Validación del formulario
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.autor.trim()) {
      newErrors.autor = "El nombre del autor es requerido";
      valid = false;
    }

    if (!formData.comentario.trim()) {
      newErrors.comentario = "El comentario es requerido";
      valid = false;
    } else if (formData.comentario.trim().length < 50) {
      newErrors.comentario = "El comentario debe tener al menos 50 caracteres";
      valid = false;
    }

    if (!formData.foto) {
      newErrors.foto = "Por favor selecciona una foto";
      valid = false;
    }

    if (formData.estrellas < 1 || formData.estrellas > 5) {
      newErrors.estrellas = "La calificación debe estar entre 1 y 5 estrellas";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});
    setSubmitSuccess(false);

    try {
      await crearTestimonio(formData);
      setSubmitSuccess(true);

      // Resetear formulario
      setFormData({
        comentario: "",
        autor: "",
        estrellas: 5,
        mascota_id: "",
        foto: null,
        fotoPreview: null,
      });
    } catch (error) {
      console.error("Error al enviar testimonio:", error);
      setErrors((prev) => ({
        ...prev,
        general: "Ocurrió un error al enviar el testimonio. Intenta nuevamente.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cancelar (resetear)
  const handleCancel = () => {
    setFormData({
      comentario: "",
      autor: "",
      estrellas: 5,
      mascota_id: "",
      foto: null,
      fotoPreview: null,
    });
    setErrors({});
    setSubmitSuccess(false);
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitSuccess,
    handleChange,
    handleImageChange,
    handleDrop,
    handleDragOver,
    handleSubmit,
    handleCancel,
    setFormData, // si quieres acceso para cambios específicos desde UI
  };
}
