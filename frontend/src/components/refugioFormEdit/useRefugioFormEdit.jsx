import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { obtenerDirecciones } from "../../services/direccionesService";
import {
  actualizarRefugio,
  obtenerRefugioPorId,
} from "../../services/refugioService";

export default function useRefugioFormEdit() {
  const { id: idRefugio } = useParams();

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    info: "",
    imagen: null,
    imagenPreview: null,
    direccion: {
      calle: "",
      barrio: "",
      localidad: "",
      provincia: "",
      pais: "Argentina",
      codigo_postal: "",
    },
    contacto: {
      nombre: "",
      telefono: "",
      email: "",
      web: "",
    },
  });

  const [direcciones, setDirecciones] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    async function cargarRefugioExistente() {
      try {
        const data = await obtenerRefugioPorId(idRefugio);

        const contacto = data.contacto || {};
        const direccion = data.direccion || {};

        setFormData({
          nombre: data.nombre || "",
          descripcion: data.descripcion || "",
          info: data.info || "",
          imagen: null,
          imagenPreview: data.imagen || null,
          direccion: {
            calle: direccion.calle || "",
            barrio: direccion.barrio || "",
            localidad: direccion.localidad || "",
            provincia: direccion.provincia || "",
            pais: direccion.pais || "Argentina",
            codigo_postal: direccion.codigo_postal || "",
          },
          contacto: {
            nombre: contacto.nombre || "",
            telefono: contacto.telefono || "",
            email: contacto.email || "",
            web: contacto.web || "",
          },
        });
      } catch (error) {
        console.error("Error al obtener refugio:", error);
      }
    }

    if (idRefugio) cargarRefugioExistente();
  }, [idRefugio]);

  useEffect(() => {
    async function cargarDirecciones() {
      try {
        const data = await obtenerDirecciones();
        setDirecciones(data.data);
      } catch (error) {
        console.error("Error al cargar direcciones:", error);
      }
    }
    cargarDirecciones();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("direccion.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        direccion: {
          ...prev.direccion,
          [field]: value,
        },
      }));
    } else if (name.startsWith("contacto.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contacto: {
          ...prev.contacto,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imagen: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imagenPreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, imagen: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imagenPreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const validateForm = () => {
    const newErrors = {};
    let valid = true;

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
      valid = false;
    }
    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es requerida";
      valid = false;
    }
    if (!formData.info.trim()) {
      newErrors.info = "La información adicional es requerida";
      valid = false;
    }

    // Asegurar que contacto siempre tiene strings
    const contacto = {
      nombre: formData.contacto.nombre || "",
      telefono: formData.contacto.telefono || "",
      email: formData.contacto.email || "",
      web: formData.contacto.web || "",
    };

    if (!contacto.nombre.trim()) {
      newErrors["contacto.nombre"] = "Nombre requerido";
      valid = false;
    }
    if (!contacto.telefono.trim()) {
      newErrors["contacto.telefono"] = "Teléfono requerido";
      valid = false;
    }
    if (!contacto.email.trim()) {
      newErrors["contacto.email"] = "Email requerido";
      valid = false;
    }
    if (!contacto.web.trim()) {
      newErrors["contacto.web"] = "Web requerida";
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
      const formToSend = new FormData();
      formToSend.append("nombre", formData.nombre);
      formToSend.append("descripcion", formData.descripcion);
      formToSend.append("info", formData.info);

      if (formData.imagen) {
        formToSend.append("imagen", formData.imagen);
      }

      Object.entries(formData.direccion).forEach(([key, value]) => {
        formToSend.append(key, value);
      });

      Object.entries(formData.contacto).forEach(([key, value]) => {
        formToSend.append(`contacto_${key}`, value || ""); // <-- aseguro string
      });

      await actualizarRefugio(idRefugio, formToSend);
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Error al actualizar refugio:", error);
      setErrors((prev) => ({
        ...prev,
        general: "Ocurrió un error al actualizar el refugio. Intenta nuevamente.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    direcciones,
    errors,
    isSubmitting,
    submitSuccess,
    handleChange,
    handleImageChange,
    handleDrop,
    handleDragOver,
    handleSubmit,
    setFormData,
  };
}
