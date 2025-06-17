/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { obtenerNoticiaPorId, editarNoticia } from "../../services/noticiaService";

export function useNoticiaFormEdit(id) {
  const [formData, setFormData] = useState({
    titulo: "",
    texto: "",
    foto: null,
    fotoPreview: null,
  });

  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar datos de la noticia por ID
  useEffect(() => {
    async function cargarNoticia() {
      setIsLoading(true);
      try {
        const data = await obtenerNoticiaPorId(id);
        setFormData({
          titulo: data.titulo || "",
          texto: data.texto || "",
          foto: null,
          fotoPreview: data.foto || null,
        });
      } catch (e) {
        setErrors((prev) => ({
          ...prev,
          general: "Error al cargar la noticia.",
        }));
      } finally {
        setIsLoading(false);
      }
    }

    if (id) cargarNoticia();
  }, [id]);

  // Manejo de campos de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Manejo de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) previewImage(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.match("image.*")) previewImage(file);
  };

  const handleDragOver = (e) => e.preventDefault();

  const previewImage = (file) => {
    setFormData((prev) => ({ ...prev, foto: file }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, fotoPreview: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const newErrors = {};
    let valid = true;

    if (!formData.titulo.trim()) {
      newErrors.titulo = "El título es requerido";
      valid = false;
    }

    if (!formData.texto.trim()) {
      newErrors.texto = "El contenido es requerido";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});
    setSubmitSuccess(false);

    try {
      await editarNoticia(id, formData);
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Error al actualizar la noticia:", error);
      setErrors((prev) => ({
        ...prev,
        general: "Error al actualizar la noticia.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      titulo: "",
      texto: "",
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
    isLoading,
    submitSuccess,
    handleChange,
    handleImageChange,
    handleDrop,
    handleDragOver,
    handleSubmit,
    handleCancel,
    setFormData,
  };
}
