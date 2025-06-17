import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerTestimonioPorId, actualizarTestimonio } from "../../services/testimonioService";

export default function useTestimonioFormEdit() {
  const { id } = useParams();

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
  const [mascotas, setMascotas] = useState([]);

  // Obtener datos del testimonio actual
  useEffect(() => {
    if (id) {
      obtenerTestimonioPorId(id)
        .then((data) => {
          setFormData({
            comentario: data.comentario || "",
            autor: data.autor || "",
            estrellas: data.estrellas || 5,
            mascota_id: data.mascota_id || "",
            foto: null, // no se trae la imagen como File
            fotoPreview: data.foto || null,
          });
        })
        .catch(() => {
          setErrors({ general: "No se pudo cargar el testimonio" });
        });
    }
  }, [id]);

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

  const handleDrop = (e) => {
    e.preventDefault();
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
  };

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
      newErrors.comentario = "El comentario debe tener al menos 150 caracteres";
      valid = false;
    }

    if (formData.estrellas < 1 || formData.estrellas > 5) {
      newErrors.estrellas = "La calificación debe estar entre 1 y 5 estrellas";
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
      await actualizarTestimonio(id, formData);
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Error al actualizar testimonio:", error);
      setErrors((prev) => ({
        ...prev,
        general: "Ocurrió un error al actualizar el testimonio.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

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

    useEffect(() => {
    async function fetchMascotas() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/mascotas`);
        const data = await res.json();
        setMascotas(data.data.items || []);
      } catch (error) {
        console.error("Error al cargar mascotas:", error);
      }
    }
    fetchMascotas();
  }, []);

  return {
    formData,
    mascotas,
    errors,
    isSubmitting,
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
