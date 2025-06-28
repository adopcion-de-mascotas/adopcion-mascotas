import { useState, useEffect } from "react";
import { obtenerDirecciones } from "../../services/direccionesService";
import { crearRefugio } from "../../services/refugioService";

export default function useRefugioForm() {
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

  const handleDragOver = (e) => {
    e.preventDefault();
  };

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
    if (!formData.contacto.nombre.trim()) {
      newErrors["contacto.nombre"] = "Nombre requerido";
      valid = false;
    }
    if (!formData.contacto.telefono.trim()) {
      newErrors["contacto.telefono"] = "Teléfono requerido";
      valid = false;
    }
    if (!formData.contacto.email.trim()) {
      newErrors["contacto.email"] = "Email requerido";
      valid = false;
    }
    if (!formData.contacto.web.trim()) {
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
        formToSend.append("imagen_principal", formData.imagen);
      }

      if (formData.direccion && typeof formData.direccion === "object") {
        Object.entries(formData.direccion).forEach(([key, value]) => {
          formToSend.append(`direccion[${key}]`, value);
        });
      }

      if (formData.contacto && typeof formData.contacto === "object") {
        Object.entries(formData.contacto).forEach(([key, value]) => {
          formToSend.append(`contacto_${key}`, value);
        });
      }
      
      for (let [key, value] of formToSend.entries()) {
        console.log(`${key}:`, value);
      }

      await crearRefugio(formToSend);
      setSubmitSuccess(true);

      setFormData({
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
    } catch (error) {
      console.error("Error al enviar refugio:", error);
      setErrors((prev) => ({
        ...prev,
        general: "Ocurrió un error al enviar el refugio. Intenta nuevamente.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
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
    setErrors({});
    setSubmitSuccess(false);
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
    handleCancel,
    setFormData,
  };
}
